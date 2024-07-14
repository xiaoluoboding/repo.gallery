"use client"

import React, { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
const inputVariants = cva(
  "flex items-center w-full h-10 overflow-hidden dark:bg-neutral-950 border rounded-md focus-within:ring-4",
  {
    variants: {
      size: {
        default: "h-10",
        sm: "h-9",
        lg: "h-11",
        xl: "h-14",
      },
      status: {
        default:
          "focus-within:ring-neutral-300/25 dark:focus-within:ring-neutral-400/25 focus-within:border-neutral-300 dark:focus-within:border-brand-400 border-neutral-300 dark:border-neutral-700",
        error:
          "focus-within:ring-error-300/25 dark:focus-within:ring-error-400/25 border-error-300 dark:border-error-400",
      },
    },
    defaultVariants: {
      size: "default",
      status: "default",
    },
  }
)
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    VariantProps<typeof inputVariants> {
  prefix?: ReactNode
  suffix?: ReactNode
}

const XInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, status, prefix, suffix, ...props }, ref) => {
    return (
      <div className={cn(inputVariants({ size, status }), className)}>
        {prefix && (
          <div className="ml-2 text-neutral-500 dark:text-neutral-400 flex select-none">
            {prefix}
          </div>
        )}
        <input
          className={
            "h-full w-full px-2 flex-1 border-none bg-transparent outline-none dark:text-neutral-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:text-neutral-500 disabled:bg-neutral-50 dark:disabled:bg-neutral-900"
          }
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="flex ml-auto mr-2 text-neutral-500 dark:neutral-400 select-none">
            {suffix}
          </div>
        )}
      </div>
    )
  }
)
XInput.displayName = "XInput"

export { XInput }
