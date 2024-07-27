/* eslint-disable @next/next/no-img-element */
"use client"

import { SearchIcon } from "lucide-react"
import React, { cache, useCallback, useEffect, useState } from "react"
import Fuse from "fuse.js"
import { isEmpty } from "lodash-es"

import { XInput } from "./ui/XInput"
import { Repo } from "@/lib/types"
import { useDebounce } from "@/hooks/useDebounce"
import BadgeDefault from "@/assets/images/starstruck-default.png"
import BadgeGold from "@/assets/images/starstruck-gold.png"
import BadgeSliver from "@/assets/images/starstruck-silver.png"
import BadgeBronze from "@/assets/images/starstruck-bronze.png"
import { XTooltip, XTooltipContent, XTooltipTrigger } from "./ui/XTooltip"
import { cn } from "@/lib/utils"

const fuseOptions = {
  threshold: 0.2,
  keys: ["title", "link", "homepage", "description", "topics"],
}

const FilterBar = ({
  list,
  originalList,
  setList,
}: {
  list: Repo[]
  originalList: Repo[]
  setList: React.Dispatch<React.SetStateAction<Repo[]>>
}) => {
  const [searchText, setSearchText] = useState("")
  const [stars, setStars] = useState(0)

  const fuse = cache(() => {
    const fuseIndex = Fuse.createIndex(fuseOptions.keys, list)
    return new Fuse(list, fuseOptions, fuseIndex)
  })

  const handleFilterList = useCallback(
    useDebounce((text: string) => {
      const starFilter = (r: Repo) => {
        switch (stars) {
          case 0:
            return true
          case 16:
            return r.stars >= 16 && r.stars < 128
          case 128:
            return r.stars >= 128 && r.stars < 512
          case 512:
            return r.stars >= 512 && r.stars < 4096
          case 4096:
            return r.stars >= 4096
          default:
            return true
        }
      }

      if (!isEmpty(text)) {
        const repoList = fuse()
          .search(text)
          .sort((a, b) => a.refIndex - b.refIndex)
          .map((b) => b.item)
          .filter(starFilter)
        setList(repoList)
      } else {
        const repoList = originalList.filter(starFilter)
        setList(repoList)
      }
    }, 333),
    [searchText, stars]
  )

  useEffect(() => {
    handleFilterList(searchText)
  }, [stars])

  return (
    <div className="w-full py-2 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="w-full">
        <XInput
          size={"sm"}
          placeholder="Search by title, description, link..."
          prefix={<SearchIcon className="w-4 h-4" />}
          value={searchText}
          onChange={(e) => {
            e.preventDefault()
            const text = e.target.value
            setSearchText(text)
            handleFilterList(text)
          }}
        />
      </div>
      <div className="flex items-center justify-end gap-1">
        <XTooltip>
          <XTooltipTrigger>
            <img
              src={BadgeDefault.src}
              className={cn(
                "w-8 h-8 rounded-full border-none hover:scale-105",
                stars === 16 && "border-2 border-border"
              )}
              alt="badge default"
              onClick={() => setStars(16)}
            />
          </XTooltipTrigger>
          <XTooltipContent className="p-2">
            <span>Between 16 and 128 stars</span>
          </XTooltipContent>
        </XTooltip>

        <XTooltip>
          <XTooltipTrigger>
            <img
              src={BadgeBronze.src}
              className="w-8 h-8 rounded-full border-none hover:scale-105"
              alt="badge bronze"
              onClick={() => setStars(128)}
            />
          </XTooltipTrigger>
          <XTooltipContent className="p-2">
            <span>Between 128 and 512 stars</span>
          </XTooltipContent>
        </XTooltip>

        <XTooltip>
          <XTooltipTrigger>
            <img
              src={BadgeSliver.src}
              className="w-8 h-8 rounded-full border-none hover:scale-105"
              alt="badge sliver"
              onClick={() => setStars(512)}
            />
          </XTooltipTrigger>
          <XTooltipContent className="p-2">
            <span>Between 512 and 4096 stars</span>
          </XTooltipContent>
        </XTooltip>

        <XTooltip>
          <XTooltipTrigger>
            <img
              src={BadgeGold.src}
              className="w-8 h-8 rounded-full border-none hover:scale-105"
              alt="badge gold"
              onClick={() => setStars(4096)}
            />
          </XTooltipTrigger>
          <XTooltipContent className="p-2">
            <span>More than 4096 stars</span>
          </XTooltipContent>
        </XTooltip>
      </div>
    </div>
  )
}

export default FilterBar
