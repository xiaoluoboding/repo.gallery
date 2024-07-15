import {
  RiBookmarkLine,
  RiCodeSSlashLine,
  RiGithubLine,
  RiGuideLine,
  RiHomeLine,
  RiTwitterXLine,
} from "@remixicon/react"

import { React } from "@/components/icons"

export const PROFILES = {
  twitter: {
    title: "X (Twitter)",
    username: "robert_shaw_x",
    url: "https://twitter.com/intent/user?screen_name=robert_shaw_x",
    icon: <RiTwitterXLine size={24} />,
  },
  github: {
    title: "GitHub",
    url: "https://github.com/xiaoluoboding/repo.gallery",
    icon: <RiGithubLine size={24} />,
  },
}

export const LINKS = [
  {
    href: "/",
    label: "Home",
    icon: <RiHomeLine size={16} />,
  },
  {
    href: "/repos",
    label: "Repos",
    icon: <RiBookmarkLine size={16} />,
  },
]

export const useConstants = () => {
  return {
    PROFILES,
    LINKS,
  }
}
