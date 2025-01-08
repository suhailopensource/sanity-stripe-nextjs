import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: "skMWP4b64ozTiez7QwFOMoQ65l0WDuy4JYM8zl8q85vSQwQTmL8X71qsSbMD8m3iL14NKLzcfR1H2DwuBf3hHavOrHV7tEL4doN1M1iJvvcym30tc0MS9PxQkdF3eCj1Zkf1losVXC8OjSVp6G4MJYOqe2yAiJxnHmIvvBlYF3xEdYgwwXN9" // Set to false if statically generating pages, using ISR or tag-based revalidation
})
