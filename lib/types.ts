export type RepoTag = {
  id: string
  name: string
  color: string
}

export interface Repo {
  id: string
  title: string
  link: string
  slug: string
  homepage?: string
  description?: string
  image: string
  original_image: string | null
  logo: string | null
  author: string | null
  publisher: string | null
  tags: RepoTag[]
  language: string
  stars: number
  forks: number
  contributors?: number
  used_by?: number
  issues?: number
  discussions?: number
  topics: string[]
  owner_name?: string
  owner_url?: string
  owner_avatar?: string
  owner_type?: string
  created_at?: string
  updated_at?: string
}

export interface Bookmark {
  title: string
  description: string
  author: string
  publisher: string
  image: string
  feeds: any[]
  date: string
  lang: string
  logo: string
  video: string
  keywords: string
  jsonld: string
  link: string
  domain: string
  type: string
  originalOGImage: string
}

export interface Collection {
  id: string
  title: string
  slug: string
  count: number
}
