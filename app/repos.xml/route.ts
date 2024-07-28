import { fetchRepoList } from "@/lib/supabase"
import { Feed } from "feed"

export async function GET() {
  const bookmarkList = await fetchRepoList()

  const date = new Date()
  const siteURL = "https://repo.gallery"
  const author = {
    name: "Robert Shaw",
    link: "https://repo.gallery",
  }

  const feed = new Feed({
    title: `Repos RSS feed by ${author.name}`,
    description:
      "Stay up to date with my latest selection of various handpicked bookmarks",
    id: siteURL,
    link: `${siteURL}/repos`,
    language: "en",
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    author,
    feedLinks: {
      rss2: `${siteURL}/repos/rss.xml`,
    },
  })

  const newBookmarkList: any[] = []
  bookmarkList.slice(0, 10).forEach((bookmark) => {
    newBookmarkList.push({
      id: bookmark.id,
      guid: bookmark.id,
      title: bookmark.title,
      link: bookmark.link,
      description: bookmark.description,
      content: bookmark.description,
      image: bookmark.image,
      date: new Date(Number(bookmark.created_at)),
      updated: new Date(Number(bookmark.updated_at)),
      author: [author],
      contributor: [author],
    })
  })

  const sortedBookmarks = newBookmarkList.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  )
  sortedBookmarks.forEach((bookmark) => {
    feed.addItem({ ...bookmark })
  })

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
