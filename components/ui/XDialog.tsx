"use client"

import * as React from "react"
import * as XDialogPrimitive from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const XDialog = XDialogPrimitive.Root

const XDialogTrigger = XDialogPrimitive.Trigger

const XDialogPortal = XDialogPrimitive.Portal

const XDialogClose = XDialogPrimitive.Close

const XDialogOverlay = React.forwardRef<
  React.ElementRef<typeof XDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof XDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <XDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
XDialogOverlay.displayName = XDialogPrimitive.Overlay.displayName

const XDialogContent = React.forwardRef<
  React.ElementRef<typeof XDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof XDialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <XDialogPortal>
    <XDialogOverlay />
    <XDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <XDialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </XDialogPrimitive.Close>
    </XDialogPrimitive.Content>
  </XDialogPortal>
))
XDialogContent.displayName = XDialogPrimitive.Content.displayName

const XDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
XDialogHeader.displayName = "XDialogHeader"

const XDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
XDialogFooter.displayName = "XDialogFooter"

const XDialogTitle = React.forwardRef<
  React.ElementRef<typeof XDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof XDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <XDialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
XDialogTitle.displayName = XDialogPrimitive.Title.displayName

const XDialogDescription = React.forwardRef<
  React.ElementRef<typeof XDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof XDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <XDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
XDialogDescription.displayName = XDialogPrimitive.Description.displayName

export {
  XDialog,
  XDialogPortal,
  XDialogOverlay,
  XDialogTrigger,
  XDialogClose,
  XDialogContent,
  XDialogHeader,
  XDialogFooter,
  XDialogTitle,
  XDialogDescription,
}
