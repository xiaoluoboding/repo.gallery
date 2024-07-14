"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface IProps {
  title: string
  description?: string
  path: string
}

export const ListItem = ({ title, description, path }: IProps) => {
  const pathname = usePathname()
  const isActive = pathname === path

  return (
    <Link
      key={path}
      href={path}
      className={cn(
        "flex flex-col gap-1 rounded-lg p-2 transition-colors duration-300 [&>*]:transition-colors [&>*]:duration-300",
        isActive
          ? "bg-black dark:bg-accent text-accent dark:text-accent-foreground"
          : "hover:bg-accent"
      )}
    >
      <span
        className={cn(
          "font-medium text-secondary-foreground dark:text-accent-foreground",
          isActive && "text-accent dark:text-accent-foreground"
        )}
      >
        {title}
      </span>
      {description && (
        <span
          className={cn(isActive ? "text-neutral-300" : "text-neutral-500")}
        >
          {description}
        </span>
      )}
    </Link>
  )
}
