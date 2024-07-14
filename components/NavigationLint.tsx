"use client"

import { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRightIcon, AtSignIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface IProps {
  href: string
  label: string
  icon?: React.ReactNode
  shortcutNumber?: number
}

export const NavigationLink = memo(
  ({ href, label, icon, shortcutNumber }: IProps) => {
    const pathname = usePathname()
    const iconCmp = icon ?? <AtSignIcon size={16} />

    const isInternal = href.startsWith("/")
    if (!isInternal) {
      return (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center justify-between rounded-lg p-2 text-accent-foreground hover:bg-accent"
          )}
        >
          <span className="inline-flex items-center gap-2 font-medium">
            {iconCmp} {label}
          </span>
          <ArrowUpRightIcon size={16} />
        </a>
      )
    }

    let isActive = false
    if (pathname?.length > 0) {
      const splittedPathname = pathname.split("/")
      const currentPathname = splittedPathname[1] ?? ""
      isActive = currentPathname === href.split("/")[1]
    }

    return (
      <Link
        key={href}
        href={href}
        className={cn(
          "group flex items-center justify-between rounded-lg p-2 text-accent-foreground",
          isActive
            ? "bg-black dark:bg-accent text-accent dark:text-accent-foreground"
            : "hover:bg-accent"
        )}
      >
        <span className="flex items-center gap-2">
          {iconCmp}
          <span className={cn("font-medium", isActive && "text-white")}>
            {label}
          </span>
        </span>
        {shortcutNumber && (
          <span
            className={cn(
              "hidden h-5 w-5 place-content-center rounded border border-neutral-200 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 text-xs font-medium text-neutral-500 transition-colors duration-200 group-hover:border-neutral-300 lg:grid",
              isActive &&
                "border-neutral-600 bg-neutral-700 text-neutral-200 group-hover:border-neutral-600"
            )}
            title={`Shortcut key: ${shortcutNumber}`}
          >
            {shortcutNumber}
          </span>
        )}
      </Link>
    )
  }
)

NavigationLink.displayName = "NavigationLink"
