import { Tweet, TweetSkeleton } from "react-tweet"

import { cn } from "@/lib/utils"
import styles from "./TweetCard.module.css"

export const TweetCard = ({ id }: { id: string }) => {
  if (!id) return null

  return (
    <div
      className={cn(
        "thumbnail-shadow relative w-full min-w-full overflow-hidden rounded-xl",
        styles.tweetCard
      )}
    >
      <Tweet
        id={id}
        fallback={
          <div>
            <TweetSkeleton />
          </div>
        }
      />
    </div>
  )
}
