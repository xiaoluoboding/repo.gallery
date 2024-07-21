import Link from "next/link"
import { StarIcon } from "lucide-react"

import { Logo } from "@/components/Logo"
import { XButton } from "@/components/ui/XButton"
import { DarkmodeToggle } from "@/components/DarkmodeToggle"
import { SubmitBookmarkDialog } from "./dialog/SubmitBookmarkDialog"
import { useRepoStore } from "@/store/repo"

const SiteHeader = () => {
  const repoStore = useRepoStore()
  return (
    <header className="flex h-16 items-center mx-auto bg-background/60 backdrop-blur fixed w-full top-0 z-50 border-b dark:border-neutral-800">
      <div className="container max-w-screen-lg flex justify-between px-4 sm:px-8">
        <div className="mr-4">
          <a
            className="flex items-center justify-center space-x-3 text-lg font-semibold py-6 text-center text-neutral-600 dark:text-neutral-100 selection:bg-emerald-500 mr-10"
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
        </div>
        <div className="flex items-center gap-4">
          <nav className="items-center space-x-2 text-sm font-medium hidden xl:flex">
            <XButton variant="link">
              <Link href={"https://github.com/dashboard-feed"} target="_blank">
                Dashboard Feed
              </Link>
            </XButton>
            <XButton variant="link" onClick={() => {}}>
              <Link href="/repos">Repos</Link>
            </XButton>
            <XButton variant="link" onClick={() => {}}>
              <Link href="/topics">Topics</Link>
            </XButton>
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
            <DarkmodeToggle />
            <XButton size="sm" variant="outline">
              <StarIcon className="h-4 w-4 mr-1" />
              Star
            </XButton>
            <SubmitBookmarkDialog currentRepo={repoStore.repoList[0]} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
