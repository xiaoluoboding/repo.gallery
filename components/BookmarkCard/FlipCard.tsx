/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils"

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  front: string
  back: string
  direction?: "horizontal" | "vertical"
}

export default function FlipCard({
  front,
  back,
  direction = "vertical",
  className,
  ...props
}: FlipCardProps) {
  const rotationClass = {
    horizontal: [
      "group-hover:[transform:rotateX(180deg)]",
      "[transform:rotateX(180deg)]",
    ],
    vertical: [
      "group-hover:[transform:rotateY(180deg)]",
      "[transform:rotateY(180deg)]",
    ],
  }
  const self = rotationClass[direction]

  return (
    <div className={cn("group  [perspective:1000px]", className)} {...props}>
      <div
        className={cn(
          "relative h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]",
          self[0]
        )}
      >
        {/* Front */}
        <div className="absolute h-full w-full [backface-visibility:hidden]">
          <img
            src={front}
            alt="image"
            className="aspect-[1200/630] animate-reveal rounded-lg border dark:border-neutral-700/80 bg-cover bg-center bg-no-repeat object-cover shadow-black/40"
          />
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute h-full w-full [backface-visibility:hidden]",
            self[1]
          )}
        >
          <img
            src={back}
            alt="image"
            className="aspect-[1200/630] animate-reveal rounded-lg border dark:border-neutral-700/80 bg-cover bg-center bg-no-repeat object-cover shadow-black/40"
          />
        </div>
      </div>
    </div>
  )
}
