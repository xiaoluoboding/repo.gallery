"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { XTooltip, XTooltipContent, XTooltipTrigger } from "./ui/XTooltip"

interface App {
  name: string
  iconUrl: string
}

const DockImage = motion(Image)
const placeholderImageUrl = "/assets/placeholder.png"

const DockItem = ({ app }: { app: App }) => {
  const variants = {
    hover: {
      width: 92,
      height: 80,
    },
    initial: {
      width: 80,
      height: 80,
    },
  }

  return (
    <XTooltip>
      <XTooltipTrigger>
        <Link href={`#`}>
          <motion.div
            variants={variants}
            whileHover="hover"
            initial="initial"
            className="dockItem h-[60px]"
            transition={{
              type: "spring",
              damping: 60,
              stiffness: 500,
              mass: 1,
            }}
          >
            <DockImage
              height={92}
              width={92}
              variants={{
                hover: {
                  width: 92,
                  height: 92,
                  y: -12,
                },
                initial: {
                  width: 80,
                  height: 80,
                },
              }}
              transition={{
                type: "spring",
                damping: 60,
                stiffness: 500,
                mass: 1,
              }}
              alt={`${app.name} app icon`}
              whileHover="hover"
              initial="initial"
              className={"absolute border-none"}
              src={app.iconUrl ?? placeholderImageUrl}
            />
          </motion.div>
        </Link>
      </XTooltipTrigger>
      <XTooltipContent className="z-20">
        <div
          className={
            "rounded-[4px] border border-[#49494B] bg-[#272728] py-[4px] px-[10px] text-xs text-white"
          }
        >
          {app.name}
        </div>
      </XTooltipContent>
    </XTooltip>
  )
}

export function DockBar({ apps }: { apps: App[] }) {
  return (
    <div className="relative">
      {/* Dock background */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] max-w-full rounded-[22px] border border-gray-600/60 bg-gray-800/60" />
      {/* Scrollable container */}
      <ScrollArea.Root>
        <ScrollArea.Viewport>
          <div className="overflow-hidden max-w-full">
            <div className="fade-lr relative flex max-w-full flex-1 overflow-x-auto pt-4">
              {apps.map((app) => (
                <DockItem key={app.name} app={app} />
              ))}
            </div>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar orientation="horizontal">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  )
}
