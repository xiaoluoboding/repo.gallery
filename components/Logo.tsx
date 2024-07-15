import { cn } from "@/lib/utils"
import React from "react"

interface IProps {
  className?: string
}

export const Logo = (props: IProps) => (
  <svg
    className={cn("coolshapes wheel-7", props.className)}
    height="400"
    width="400"
    fill="none"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      height="192"
      id="cs_mask_1_wheel-7"
      style={{ maskType: "alpha" }}
      width="200"
      x="0"
      y="4"
      maskUnits="userSpaceOnUse"
    >
      <path
        d="M85.087 196v-80.513L9.223 140.369 0 111.717l75.86-24.881L28.98 21.7 53.114 4 100 69.14 146.886 4l24.135 17.7-46.882 65.136L200 111.717l-9.223 28.652-75.864-24.882V196H85.087z"
        fill="#fff"
      />
    </mask>
    <g mask="url(#cs_mask_1_wheel-7)">
      <path d="M200 0H0v200h200V0z" fill="#fff" />
      <path d="M200 0H0v200h200V0z" fill="#06F" />
      <g filter="url(#filter0_f_844_2790)">
        <path d="M150 56H-15v129h165V56z" fill="#FFE500" />
        <ellipse
          cx="107.987"
          cy="146.246"
          fill="#FF58E4"
          rx="79.158"
          ry="47.123"
          transform="rotate(-33.875 107.987 146.246)"
        />
      </g>
    </g>
    <g style={{ mixBlendMode: "overlay" }} mask="url(#cs_mask_1_wheel-7)">
      <path
        d="M200 0H0v200h200V0z"
        fill="gray"
        stroke="transparent"
        filter="url(#cs_noise_1_wheel-7)"
      />
    </g>
    <defs>
      <filter
        height="309.216"
        id="filter0_f_844_2790"
        width="353.782"
        x="-95"
        y="-24"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
        <feGaussianBlur
          result="effect1_foregroundBlur_844_2790"
          stdDeviation="40"
        />
      </filter>
    </defs>
    <defs>
      <filter
        height="100%"
        id="cs_noise_1_wheel-7"
        width="100%"
        x="0%"
        y="0%"
        filterUnits="objectBoundingBox"
      >
        <feBlend result="out3" in="SourceGraphic" in2="out2" />
      </filter>
    </defs>
  </svg>
)
