/* eslint-disable @next/next/no-img-element */
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GitForkIcon,
  HashIcon,
  Link2Icon,
  Star,
} from "lucide-react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

import OpenSauced from "@/components/icons/OpenSauced"
import SourceGraph from "@/components/icons/SourceGraph"
import { buttonVariants } from "@/components/ui/XButton"
import LibHuntIcon from "@/assets/images/libhunt.png"

import { Repo } from "@/lib/types"
import { cn, isProd } from "@/lib/utils"
import { useRepoStore } from "@/store/repo"

const AsidePanel = ({ repo }: { repo: Repo }) => {
  const repoList = useRepoStore((state) => state.repoList)

  // get prev link before the repo
  const idx = repoList.findIndex((item) => {
    return item.id === repo.id
  })
  const prevLink =
    idx !== -1 ? `/repos/${encodeURIComponent(repoList[idx - 1]?.slug)}` : null
  const nextLink =
    idx !== -1 ? `/repos/${encodeURIComponent(repoList[idx + 1]?.slug)}` : null

  return (
    <aside className="col-span-12 sm:col-span-4 space-y-4">
      <fieldset className="bg-neutral-50 dark:bg-neutral-900 border border-border rounded-lg p-4">
        <figcaption className="text-foreground font-semibold">
          Repository Details
        </figcaption>
        <figure className="flex flex-col gap-2 items-center mt-4">
          <div className="w-full flex gap-2 items-center justify-between text-foreground">
            <span className="text-muted-foreground flex items-center gap-1 text-sm">
              <Star className="h-4 w-4" />
              <span className="">Stars</span>
            </span>
            <span className="text-sm">
              {repo.stars.toLocaleString("en-US")}
            </span>
          </div>
          <div className="w-full flex gap-2 items-center justify-between text-foreground">
            <span className="text-muted-foreground flex items-center gap-1 text-sm">
              <GitForkIcon className="h-4 w-4" />
              <span className="">Forks</span>
            </span>
            <span className="text-sm">
              {repo.forks.toLocaleString("en-US")}
            </span>
          </div>
          <div className="w-full flex gap-2 items-center justify-between text-foreground">
            <span className="text-muted-foreground flex items-center gap-1 text-sm">
              <span
                className={cn("h-4 w-4 p-[2px] rounded-full")}
                style={{
                  backgroundColor: repo.language_color,
                }}
              />
              <span className="">Written in </span>
            </span>
            <span className="text-sm">{repo.language}</span>
          </div>
        </figure>
      </fieldset>
      <fieldset className="bg-neutral-50 dark:bg-neutral-900 border border-border rounded-lg p-4">
        <figcaption className="text-foreground font-semibold">
          Related topics
        </figcaption>
        <figure className="flex gap-x-4 gap-y-3 flex-col items-start w-full mt-4">
          <div className="flex gap-x-3 gap-y-2 flex-row flex-wrap items-center">
            {repo.topics?.map((topic) => (
              <a
                className="flex items-center gap-0.5 text-muted-foreground text-sm hover:text-foreground"
                data-discover="true"
                key={topic}
                href={`/topics/${topic}`}
              >
                <HashIcon className="h-3 w-3" />
                {topic}
              </a>
            ))}
          </div>
        </figure>
      </fieldset>
      <fieldset className="bg-neutral-50 dark:bg-neutral-900 border border-border rounded-lg p-4">
        <figcaption className="text-foreground font-semibold">
          Repository Transformer
        </figcaption>
        <figure className="flex flex-col gap-2 items-center mt-4">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              className={buttonVariants({
                className: "gap-2 w-full flex !justify-between",
                size: "sm",
              })}
            >
              <span className="text-sm">Visit Website</span>
              <Link2Icon className="h-4 w-4" />
            </a>
          )}
          <a
            href={repo.link}
            target="_blank"
            className={buttonVariants({
              variant: "secondary",
              className: "gap-2 w-full flex !justify-between",
              size: "sm",
            })}
          >
            <span className="text-sm">View on GitHub</span>
            <GitHubLogoIcon className="h-4 w-4" />
          </a>
          <a
            href={`https://github.dev/${repo.slug}`}
            target="_blank"
            className={buttonVariants({
              variant: "secondary",
              className: "gap-2 w-full flex !justify-between",
              size: "sm",
            })}
          >
            <span className="text-sm">View on github.dev</span>
            <GitHubLogoIcon className="h-4 w-4" />
          </a>
          <a
            href={`https://app.opensauced.pizza/s/${repo.slug}?hideBots=false`}
            target="_blank"
            className={buttonVariants({
              variant: "secondary",
              className: "gap-2 w-full flex !justify-between",
              size: "sm",
            })}
          >
            <span className="text-sm">View on OpenSauced</span>
            <OpenSauced className="h-4 w-4" />
          </a>
          <a
            href={`https://sourcegraph.com/github.com/${repo.slug}`}
            target="_blank"
            className={buttonVariants({
              variant: "secondary",
              className: "gap-2 w-full flex !justify-between",
              size: "sm",
            })}
          >
            <span className="text-sm">View on Sourcegraph</span>
            <SourceGraph className="h-4 w-4" />
          </a>
          <a
            href={`https://star-history.com/#${repo.slug}&Date`}
            target="_blank"
            className={buttonVariants({
              variant: "secondary",
              className: "gap-2 w-full flex !justify-between",
              size: "sm",
            })}
          >
            <span className="text-sm">View on Star History</span>
            <img
              src={`https://star-history.com/assets/icon.png`}
              className="w-4 h-4 border-none bg-transparent"
              alt="Star History Icon"
            />
          </a>
          <a
            href={`https://www.bookmark.style/?url=${encodeURIComponent(
              repo.link
            )}`}
            target="_blank"
            className={buttonVariants({
              variant: "secondary",
              className: "gap-2 w-full flex !justify-between",
              size: "sm",
            })}
          >
            <span className="text-sm">View on Bookmark Style</span>
            <img
              src={`https://www.bookmark.style/favicon.png`}
              className="w-4 h-4 border-none bg-transparent"
              alt="Bookmark Style Icon"
            />
          </a>
          <a
            href={`https://www.libhunt.com/r/${repo.title}`}
            target="_blank"
            className={buttonVariants({
              variant: "secondary",
              className: "gap-2 w-full flex !justify-between",
              size: "sm",
            })}
          >
            <span className="text-sm">View on LibHunt</span>
            <img
              src={LibHuntIcon.src}
              className="w-4 h-4 border-none rounded-none bg-transparent"
              alt="Star History Icon"
            />
          </a>
        </figure>
      </fieldset>
      {!isProd && (
        <fieldset className="bg-neutral-50 dark:bg-neutral-900 border border-border rounded-lg p-4 grid grid-cols-2 gap-4">
          {prevLink && (
            <a
              href={prevLink}
              className={buttonVariants({
                variant: "secondary",
                className: "gap-2 w-full",
                size: "sm",
              })}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Prev</span>
            </a>
          )}
          {nextLink && (
            <a
              href={nextLink}
              className={buttonVariants({
                variant: "secondary",
                className: "gap-2 w-full",
                size: "sm",
              })}
            >
              <span>Next</span>
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          )}
        </fieldset>
      )}
    </aside>
  )
}

export default AsidePanel
