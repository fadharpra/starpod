import { createClient } from '@libsql/client'
import people from './data/people'
import peoplePerEpisode from './data/people-per-episode'
import sponsors from './data/sponsors'
import sponsorsPerEpisode from './data/sponsors-per-episode'
import { getAllEpisodes } from '../src/lib/rss'

// Inisialisasi koneksi ke Turso
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

async function seed() {
  // 1. Insert Person
  for (const person of people) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO Person (id, name, img) VALUES (?, ?, ?)`,
      args: [person.id, person.name, person.img || null],
    })
  }

  // 2. Insert Sponsor
  for (const sponsor of sponsors) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO Sponsor (id, name, img, url) VALUES (?, ?, ?, ?)`,
      args: [sponsor.id, sponsor.name, sponsor.img || null, sponsor.url || null],
    })
  }

  // 3. Insert Episodes
  const allEpisodes = await getAllEpisodes()
  const episodes = allEpisodes.map((e) => e.episodeSlug)

  for (const slug of episodes) {
    await client.execute({
      sql: `INSERT OR IGNORE INTO Episode (episodeSlug) VALUES (?)`,
      args: [slug],
    })
  }

  // 4. Insert HostOrGuest
  for (const slug of episodes) {
    const peopleInEpisode = peoplePerEpisode[slug]
    if (!peopleInEpisode) continue

    for (const person of peopleInEpisode) {
      const isHost =
        person.id === 'chuckcarpenter' ||
        person.id === 'robbiethewagner' ||
        Boolean(person.host)

      await client.execute({
        sql: `INSERT OR IGNORE INTO HostOrGuest (episodeSlug, personId, isHost) VALUES (?, ?, ?)`,
        args: [slug, person.id, isHost ? 1 : 0],
      })
    }
  }

  // 5. Insert SponsorForEpisode
  for (const slug of episodes) {
    const sponsorList = sponsorsPerEpisode[slug]
    if (!sponsorList) continue

    for (const sponsor of sponsorList) {
      await client.execute({
        sql: `INSERT OR IGNORE INTO SponsorForEpisode (episodeSlug, sponsorId) VALUES (?, ?)`,
        args: [slug, sponsor.id],
      })
    }
  }

  console.log('✅ Seeding complete')
}

seed().catch((err) => {
  console.error('❌ Error seeding:', err)
  process.exit(1)
})

