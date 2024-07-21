"use client"

import * as React from "react"
import { RiMoonLine, RiSunLine } from "@remixicon/react"
import { useTheme } from "next-themes"

import { XButton } from "./ui/XButton"
import {
  XDropdownMenu,
  XDropdownMenuContent,
  XDropdownMenuItem,
  XDropdownMenuTrigger,
} from "./ui/XDropdownMenu"

export function DarkmodeToggle({ accent = false }) {
  const { setTheme } = useTheme()

  return (
    <XDropdownMenu>
      <XDropdownMenuTrigger asChild>
        <XButton variant="ghost" size={"icon"}>
          <div className={accent ? "text-accent" : "text-accent-foreground"}>
            <RiSunLine className="dark:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <RiMoonLine className="hidden dark:block h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </div>
        </XButton>
      </XDropdownMenuTrigger>
      <XDropdownMenuContent className="border-border" align="end">
        <XDropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </XDropdownMenuItem>
        <XDropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </XDropdownMenuItem>
        <XDropdownMenuItem onClick={() => setTheme("system")}>
          System
        </XDropdownMenuItem>
      </XDropdownMenuContent>
    </XDropdownMenu>
  )
}
