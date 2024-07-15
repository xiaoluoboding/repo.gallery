/* eslint-disable @next/next/no-img-element */
import { Repo } from "@/lib/types"
import { FlipTilt } from "react-flip-tilt"
import Image from "next/image"

import { Link2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import FlipCard from "./FlipCard"

interface IProps {
  bookmark: Repo
  order: number
  tidy?: boolean
  flip?: boolean
}

export const BookmarkCard = ({
  bookmark,
  order,
  tidy = false,
  flip = false,
}: IProps) => {
  return (
    <div
      key={bookmark.link}
      className="thumbnail-shadow flex h-full aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-white dark:bg-accent p-4 transition-colors duration-300 hover:bg-neutral-50/80"
      rel="noopener noreferrer"
      data-bookmark-order={order}
    >
      <span className="aspect-[1200/630] overflow-hidden rounded-lg">
        <img
          src={flip ? bookmark.original_image! : bookmark.image}
          alt="image"
          className="aspect-[1200/630] animate-reveal rounded-lg border dark:border-neutral-700/80 bg-cover bg-center bg-no-repeat object-cover shadow-black/40"
        />
        {/* <FlipCard
          front={bookmark.original_image || "/assets/fallback.webp"}
          back={
            bookmark.image.includes("repository-images.githubusercontent.com")
              ? bookmark.image
              : "/assets/fallback.webp"
          }
        /> */}
        {/* <FlipTilt
          front={bookmark.original_image || "/assets/fallback.webp"}
          back={
            bookmark.image.includes("repository-images.githubusercontent.com")
              ? bookmark.image
              : "/assets/fallback.webp"
          }
          borderColor="rgba(255, 255, 255, 0)"
          borderWidth="0px"
          className="border-none"
        /> */}
      </span>
      <div className="flex flex-col justify-between gap-1.5">
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
            "flex-1 text-sm text-accent-foreground",
            tidy ? "line-clamp-2" : "line-clamp-3"
          )}
        >
          {bookmark.description || bookmark.publisher}
        </span>
        <div className="flex items-center gap-1 text-xs text-neutral-500">
          <img
            src={bookmark.owner_avatar || "/assets/fallback.webp"}
            className="inline-block align-text-bottom mr-1 h-4 w-4"
            alt={bookmark.author || ""}
            width={16}
            height={16}
          />
          <span className="grow truncate">{bookmark.slug}</span>
        </div>
      </div>
    </div>
  )
}
