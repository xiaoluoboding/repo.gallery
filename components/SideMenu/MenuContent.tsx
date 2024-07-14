import Link from "next/link"
import NextImage from "next/image"

import { NavigationLink } from "../NavigationLint"
import { DarkmodeToggle } from "../DarkmodeToggle"
import { useConstants } from "@/lib/useConstants"

export const MenuContent = () => {
  const { LINKS, PROFILES } = useConstants()
  return (
    <div className="flex w-full flex-col text-sm">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="link-card inline-flex items-center gap-2 p-2 flex-1"
          >
            <NextImage
              src="/assets/me.png"
              alt="Repo Gallery"
              width={40}
              height={40}
              loading="lazy"
              className="rounded-full border shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-accent-foreground">
                Repo Gallery
              </span>
              <span className="text-secondary-foreground">
                Software Engineer
              </span>
            </div>
          </Link>
          <DarkmodeToggle />
        </div>

        <div className="flex flex-col gap-1">
          {LINKS.map((link, linkIndex) => (
            <NavigationLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              shortcutNumber={linkIndex + 1}
            />
          ))}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2 text-sm">
        <span className="px-2 text-xs font-medium leading-relaxed text-gray-600">
          Online
        </span>
        <div className="flex flex-col gap-1">
          {Object.values(PROFILES).map((profile) => (
            <NavigationLink
              key={profile.url}
              href={profile.url}
              label={profile.title}
              icon={profile?.icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
