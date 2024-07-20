import { cn } from "@/lib/utils"

function XSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

function XSkeletonWithLoading({
  className,
  loading,
  children,
  fallback,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  loading: boolean
  fallback: React.ReactNode
  children: React.ReactNode
}) {
  return <>{loading ? fallback : children}</>
}

export { XSkeleton, XSkeletonWithLoading }
