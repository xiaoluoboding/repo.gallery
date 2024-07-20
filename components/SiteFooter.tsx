import Link from "next/link"

import { PROFILES } from "@/lib/useConstants"
import { Logo } from "./Logo"
import { cn } from "@/lib/utils"

const SiteFooter = () => {
  return (
    <footer className="container max-w-screen-lg w-full h-16 mt-24 sm:mt-32 flex items-center justify-between  px-4 sm:px-8">
      <div className="flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 lg:mt-0 ">
        <a
          className="flex items-center justify-center space-x-3 text-lg font-semibold text-center text-neutral-600 dark:text-neutral-100 selection:bg-emerald-500 mr-10"
          href="/"
        >
          <div className="relative h-8 w-8 md:h-6 md:w-6 bg-background text-white flex items-center justify-center rounded-md text-sm antialiased">
            <div className="text-sm text-emerald-500 relative z-20">
              <Logo className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-primary text-xl">Repo Gallery</h1>
          </div>
        </a>
        <div className="mr-4 hidden md:flex items-center">
          <div className="text-neutral-500 dark:text-neutral-400 text-sm">
            Copyright © {new Date().getFullYear()}. All rights reserved.
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.values(PROFILES).map((link, linkIndex) => {
          return (
            <Link
              key={link.url}
              href={link.url}
              className={cn(
                "group flex items-center justify-between rounded-lg p-2 text-accent-foreground hover:underline"
              )}
            >
              <span className="flex items-center gap-2 w-5 h-5">
                {link.icon}
              </span>
            </Link>
          )
        })}
      </div>
    </footer>
  )
}

export default SiteFooter
