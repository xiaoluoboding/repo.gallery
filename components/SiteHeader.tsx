import Link from "next/link"
import { StarIcon } from "lucide-react"

import { Logo } from "@/components/Logo"
import { XButton } from "@/components/ui/XButton"
import { DarkmodeToggle } from "@/components/DarkmodeToggle"
import { SubmitBookmarkDialog } from "./dialog/SubmitBookmarkDialog"
import { useRepoStore } from "@/store/repo"
import { isProd } from "@/lib/utils"

const SiteHeader = () => {
  const repoStore = useRepoStore()
  return (
    <header className="flex h-16 items-center mx-auto bg-background/60 backdrop-blur fixed w-full top-0 z-50 border-b dark:border-neutral-800">
      <div className="container max-w-screen-lg flex justify-between px-4 sm:px-8">
        <div className="mr-4">
          <a
            className="flex items-center justify-center space-x-1 sm:space-x-3 text-lg font-semibold py-6 text-center text-neutral-600 dark:text-neutral-100 selection:bg-emerald-500 mr-10"
            href="/"
          >
            <div className="relative h-8 w-8 md:h-6 md:w-6 bg-transparent text-white flex items-center justify-center rounded-md text-sm antialiased">
              <div className="text-sm text-emerald-500 relative z-20">
                <Logo className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <div className="flex items-center">
              <h1 className="text-primary text-sm sm:text-xl">Repo Gallery</h1>
            </div>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
            <DarkmodeToggle />
            <Link
              href="https://github.com/xiaoluoboding/repo.gallery"
              target="_blank"
            >
              <XButton size="sm" variant={"outline"}>
                <StarIcon className="h-4 w-4 mr-1" />
                Star
              </XButton>
            </Link>
            {!isProd && (
              <SubmitBookmarkDialog currentRepo={repoStore.repoList[0]} />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
