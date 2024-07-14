/* eslint-disable @next/next/no-img-element */
import { Repo } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Link2Icon } from "lucide-react"

// import { TweetCard } from "@/components/tweet-card/tweet-card"
// import { TWEETS_COLLECTION_ID } from "@/lib/constants"
import Image from "next/image"
import FlipCard from "./FlipCard"

interface IProps {
  bookmark: Repo
  order: number
  tidy?: boolean
}

export const BookmarkCard = ({ bookmark, order, tidy = false }: IProps) => {
  // if (bookmark.link && bookmark.collectionId === TWEETS_COLLECTION_ID) {
  //   const match = bookmark.link.match(/\/status\/(\d+)/) ?? []
  //   const tweetId = match[1]
  //   return <TweetCard id={tweetId} />
  // }

  return (
    <div
      key={bookmark.link}
      className="thumbnail-shadow flex aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-white dark:bg-accent p-4 transition-colors duration-300 hover:bg-neutral-100/80"
      rel="noopener noreferrer"
      data-bookmark-order={order}
    >
      <span className="aspect-[1200/630] overflow-hidden rounded-lg">
        <FlipCard
          frontImage={bookmark.image || "/assets/fallback.webp"}
          backImage={bookmark.original_image || "/assets/fallback.webp"}
        />
      </span>
      <div className="flex flex-col gap-1.5">
        <h2
          className={cn(
            "text-lg leading-snug font-semibold text-accent-foreground",
            tidy ? "line-clamp-1" : "line-clamp-2"
          )}
        >
          {bookmark.title}
        </h2>
        <span
          className={cn(
            "text-sm text-accent-foreground",
            tidy ? "line-clamp-2" : "line-clamp-3"
          )}
        >
          {bookmark.description || bookmark.publisher}
        </span>
        <span className="line-clamp-1 truncate inline-flex items-center gap-1 text-xs text-neutral-500">
          <img
            src={bookmark.logo || "/assets/fallback.webp"}
            className="inline-block align-text-bottom mr-1 h-4 w-4"
            alt={bookmark.author || ""}
            width={16}
            height={16}
          />
          {bookmark.link}
        </span>
      </div>
    </div>
  )
}
