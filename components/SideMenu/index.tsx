"use client"

import { useRouter, usePathname } from "next/navigation"
import { RadioIcon } from "lucide-react"

import { XScrollArea } from "@/components/ui/XScrollArea"
import { useKeyPress } from "@/hooks/useKeyPress"
import { cn, isProd } from "@/lib/utils"
import { XButton } from "@/components/ui/XButton"
import { SubmitBookmarkDialog } from "../dialog/SubmitBookmarkDialog"

const keyCodePathnameMapping: Record<string, string> = {
  Digit1: "/",
  Digit3: "/repos",
}

interface IProps {
  className?: string
  children: React.ReactNode
  title?: string
  bookmarks?: any[]
  isInner?: boolean
}

export const SideMenu = ({
  className = "",
  children,
  title,
  bookmarks = [],
  isInner,
}: IProps) => {
  const router = useRouter()
  const pathname = usePathname()
  useKeyPress(onKeyPress, Object.keys(keyCodePathnameMapping))

  function onKeyPress(event: KeyboardEvent) {
    const key = event.code
    const targetPathname = keyCodePathnameMapping[key]
    if (targetPathname && targetPathname !== pathname)
      router.push(targetPathname)
  }

  const isReposPath = pathname.startsWith("/repos")
  const currentRepo = bookmarks.find(
    (bookmark) => `/repos/${bookmark.slug}` === pathname
  )

  return (
    <XScrollArea
      className={cn(
        "hidden bg-neutral-50 dark:bg-neutral-900 lg:flex lg:flex-col lg:border-r border-accent scrollable-area",
        isInner ? "lg:w-80 xl:w-96" : "lg:w-60 xl:w-72",
        className
      )}
    >
      {title && (
        <div className="sticky top-0 z-10 border-b border-accent bg-neutral-50 dark:bg-neutral-900 px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-primary text-sm font-semibold tracking-tight">
              {title}
            </span>
            <div className="flex items-center gap-2">
              {isReposPath && (
                <XButton variant="outline" size="sm" asChild>
                  <a
                    href={"/repos.xml"}
                    title="RSS feed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-foreground"
                  >
                    <RadioIcon size={16} className="mr-2" />
                    RSS feed
                  </a>
                </XButton>
              )}
              {isReposPath && !isProd && (
                <SubmitBookmarkDialog currentRepo={currentRepo} />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="bg-neutral-50 dark:bg-neutral-900 p-3">{children}</div>
    </XScrollArea>
  )
}
