"use client"

import { ReactNode, memo, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { ArrowLeftIcon, RadioIcon } from "lucide-react"

import { MobileDrawer } from "@/components/MobileDrawer/MoblieDrawer"
import { XButton } from "@/components/ui/XButton"
import { SCROLL_AREA_ID, MOBILE_SCROLL_THRESHOLD } from "@/lib/constants"
import { SubmitBookmarkDialog } from "./dialog/SubmitBookmarkDialog"
import { cn, isProd } from "@/lib/utils"
import { DarkmodeToggle } from "./DarkmodeToggle"

interface IProps {
  scrollTitle?: string
  title?: string
  goBackLink?: string
  bookmarks?: any
  currentRepo?: any
  children?: React.ReactNode
}

export const FloatingHeader = memo(
  ({
    scrollTitle,
    title,
    goBackLink,
    bookmarks,
    currentRepo,
    children,
  }: IProps) => {
    const [transformValues, setTransformValues] = useState({
      translateY: 0,
      opacity: scrollTitle ? 0 : 1,
    })
    const pathname = usePathname()
    const isWritingIndexPage = pathname === "/writing"
    const isWritingPath = pathname.startsWith("/writing")
    const isBookmarksIndexPage = pathname === "/bookmarks"
    const isBookmarkPath = pathname.startsWith("/bookmarks")
    const isDockIndexPage = pathname === "/dock"

    useEffect(() => {
      const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`)

      const onScroll = (e: any) => {
        const scrollY = e.target.scrollTop as number

        const translateY = Math.max(100 - scrollY, 0)

        const opacity = Math.min(
          Math.max(
            Number(
              (
                (scrollY -
                  MOBILE_SCROLL_THRESHOLD *
                    (MOBILE_SCROLL_THRESHOLD / (scrollY ** 2 / 100))) /
                100
              ).toFixed(2)
            ),
            0
          ),
          1
        )

        setTransformValues({ translateY, opacity })
      }

      if (scrollTitle && scrollAreaElem) {
        scrollAreaElem.addEventListener("scroll", onScroll, {
          passive: true,
        })
      }
      return () => scrollAreaElem?.removeEventListener("scroll", onScroll)
    }, [scrollTitle])

    return (
      <header
        className={cn(
          "sticky inset-x-0 top-0 z-10 mx-auto flex h-12 w-full shrink-0 items-center overflow-hidden border-b bg-accent text-accent-foreground border-b-neutral-200 dark:border-b-accent text-sm font-medium lg:hidden",
          isDockIndexPage
            ? "bg-white/10 text-white backdrop-blur-3xl border-none"
            : ""
        )}
      >
        <div className="flex h-full w-full items-center px-3">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-1 items-center gap-1">
              {goBackLink ? (
                <XButton
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  asChild
                >
                  <Link href={goBackLink} title="Go back">
                    <ArrowLeftIcon size={16} />
                  </Link>
                </XButton>
              ) : (
                <MobileDrawer />
              )}
              <div className="flex flex-1 items-center justify-between">
                {scrollTitle && (
                  <span
                    className="line-clamp-2 font-semibold tracking-tight"
                    style={{
                      transform: `translateY(${transformValues.translateY}%)`,
                      opacity: transformValues.opacity,
                    }}
                  >
                    {scrollTitle}
                  </span>
                )}
                {title && (
                  <Balancer ratio={0.35}>
                    <span className="line-clamp-2 font-semibold tracking-tight">
                      {title}
                    </span>
                  </Balancer>
                )}
                <div className="flex items-center gap-2">
                  {(isWritingIndexPage || isBookmarksIndexPage) && (
                    <XButton variant="outline" size="sm" asChild>
                      <a
                        href={
                          isWritingIndexPage ? "/writing.xml" : "/bookmarks.xml"
                        }
                        title="RSS feed"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-foreground hover:text-accent-foreground/80"
                      >
                        <RadioIcon size={16} className="mr-2" />
                        RSS feed
                      </a>
                    </XButton>
                  )}
                  {isBookmarkPath && !isProd && (
                    <SubmitBookmarkDialog
                      repos={bookmarks}
                      currentRepo={currentRepo}
                    />
                  )}
                  <DarkmodeToggle accent={isDockIndexPage} />
                </div>
              </div>
            </div>
            {/* This is a hack to show writing views with framer motion reveal effect */}
            {scrollTitle && isWritingPath && (
              <div className="flex min-w-[50px] justify-end">{children}</div>
            )}
          </div>
        </div>
      </header>
    )
  }
)

FloatingHeader.displayName = "FloatingHeader"
