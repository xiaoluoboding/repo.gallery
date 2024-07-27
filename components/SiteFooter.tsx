import Link from "next/link"

import { PROFILES } from "@/lib/useConstants"
import { Logo } from "./Logo"
import { cn } from "@/lib/utils"

const SiteFooter = () => {
  return (
    <footer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="-mb-0.5 w-full"
        viewBox="0 0 1367.743 181.155"
      >
        <path
          className="fill-current text-neutral-50 dark:text-neutral-900/80"
          id="wave"
          data-name="wave"
          d="M0,0S166.91-56.211,405.877-49.5,715.838,14.48,955.869,26.854,1366,0,1366,0V115H0Z"
          transform="translate(1.743 66.155)"
        ></path>
      </svg>
      <div className="bg-gradient-to-b from-neutral-50 to-transparent dark:from-neutral-900 dark:to-transparent pt-1">
        <div className="container m-auto space-y-8 px-6 text-neutral-600 dark:text-neutral-400 md:px-12 lg:px-20">
          <div className="grid grid-cols-8 gap-6 md:gap-0">
            <div className="col-span-8 border-r border-neutral-50 dark:border-neutral-800 md:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between gap-6 border-b border-white dark:border-neutral-800 py-6 md:block md:space-y-6 md:border-none md:py-0">
                <a
                  className="flex items-center space-x-3 text-lg font-semibold text-neutral-600 dark:text-neutral-100 selection:bg-emerald-500 mr-10"
                  href="/"
                >
                  <div className="relative h-8 w-8 md:h-6 md:w-6 bg-transparent text-white flex items-center justify-center rounded-md text-sm antialiased">
                    <div className="text-sm text-emerald-500 relative z-20">
                      <Logo className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-primary text-xl">Repo Gallery</h1>
                  </div>
                </a>
                <div className="flex gap-2">
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
              </div>
            </div>
            <div className="col-span-8 md:col-span-6 lg:col-span-5">
              <div className="grid grid-cols-2 gap-6 pb-16 sm:grid-cols-3 md:pl-16">
                <div>
                  <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                    Explore
                  </h6>
                  <ul className="mt-4 list-inside space-y-4">
                    <li className="pl-0">
                      <Link href="/categories" target="_blank">
                        Categories
                      </Link>
                    </li>
                    <li className="pl-0">
                      <Link href="/topics" target="_blank">
                        Topics
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                    GitHub Tools
                  </h6>
                  <ul className="mt-4 list-inside space-y-4">
                    <li className="pl-0">
                      <Link
                        href={"https://github.com/dashboard-feed"}
                        target="_blank"
                      >
                        Dashboard Feed
                      </Link>
                    </li>
                    <li className="pl-0">
                      <Link href={"https://repo.new"} target="_blank">
                        New Repo
                      </Link>
                    </li>
                    <li className="pl-0">
                      <Link href={"https://star-history.com"} target="_blank">
                        Star History
                      </Link>
                    </li>
                    <li className="pl-0">
                      <Link href={"https://socialify.git.ci/"} target="_blank">
                        GitHub Socialify
                      </Link>
                    </li>
                    <li className="pl-0">
                      <Link
                        href={"https://app.opensauced.pizza/star-search"}
                        target="_blank"
                      >
                        Star Search
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                    Other Projects
                  </h6>
                  <ul className="mt-4 list-inside space-y-4">
                    <li className="pl-0">
                      <Link
                        href={"https://onetab.group/?ref=repo.gallery"}
                        target="_blank"
                      >
                        One Tab Group
                      </Link>
                    </li>

                    <li className="pl-0">
                      <Link
                        href={
                          "https://img2txt2audio.vercel.app/?ref=repo.gallery"
                        }
                        target="_blank"
                      >
                        Bookmark Style
                      </Link>
                    </li>

                    <li className="pl-0">
                      <Link
                        href={
                          "https://img2txt2audio.vercel.app/?ref=repo.gallery"
                        }
                        target="_blank"
                      >
                        Side Space
                      </Link>
                    </li>

                    <li className="pl-0">
                      <Link
                        href={
                          "https://img2txt2audio.vercel.app/?ref=repo.gallery"
                        }
                        target="_blank"
                      >
                        img2txt2audio
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between border-t border-neutral-100 dark:border-neutral-800 py-4 pb-8 md:pl-16">
                Copyright © {new Date().getFullYear()}. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
