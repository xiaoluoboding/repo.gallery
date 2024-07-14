"use client"

import * as React from "react"
import { Drawer as XDrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const XDrawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof XDrawerPrimitive.Root>) => (
  <XDrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
XDrawer.displayName = "XDrawer"

const XDrawerTrigger = XDrawerPrimitive.Trigger

const XDrawerPortal = XDrawerPrimitive.Portal

const XDrawerClose = XDrawerPrimitive.Close

const XDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof XDrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof XDrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <XDrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
XDrawerOverlay.displayName = XDrawerPrimitive.Overlay.displayName

const XDrawerContent = React.forwardRef<
  React.ElementRef<typeof XDrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof XDrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <XDrawerPortal>
    <XDrawerOverlay />
    <XDrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed bottom-0 z-50 flex h-auto flex-col border bg-background",
        className
      )}
      {...props}
    >
      {/* <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" /> */}
      {children}
    </XDrawerPrimitive.Content>
  </XDrawerPortal>
))
XDrawerContent.displayName = "XDrawerContent"

const XDrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
XDrawerHeader.displayName = "XDrawerHeader"

const XDrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
XDrawerFooter.displayName = "XDrawerFooter"

const XDrawerTitle = React.forwardRef<
  React.ElementRef<typeof XDrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof XDrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <XDrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
XDrawerTitle.displayName = XDrawerPrimitive.Title.displayName

const XDrawerDescription = React.forwardRef<
  React.ElementRef<typeof XDrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof XDrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <XDrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
XDrawerDescription.displayName = XDrawerPrimitive.Description.displayName

export {
  XDrawer,
  XDrawerPortal,
  XDrawerOverlay,
  XDrawerTrigger,
  XDrawerClose,
  XDrawerContent,
  XDrawerHeader,
  XDrawerFooter,
  XDrawerTitle,
  XDrawerDescription,
}
