import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import Link, { LinkProps } from "next/link"

export const buttonLinkVariants = cva(
  "flex items-center space-x-1 rounded-lg border text-sm px-2 py-1 transition-all hover:ring-2 hover:ring-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-neutral-200",
  {
    variants: {
      variant: {
        primary: "border-black bg-black text-white hover:bg-neutral-800",
        secondary:
          "border-neutral-200 bg-white hover:border-neutral-600 hover:text-neutral-800 text-neutral-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export interface ButtonLinkProps extends LinkProps {
  variant?: "primary" | "secondary"
  className?: string
  children: React.ReactNode
}

export default function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      target={href.toString().startsWith("http") ? "_blank" : undefined}
      className={cn(buttonLinkVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Link>
  )
}
