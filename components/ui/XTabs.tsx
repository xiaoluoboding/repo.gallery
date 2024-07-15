"use client"

import * as React from "react"
import * as XTabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const XTabs = XTabsPrimitive.Root

const XTabsList = React.forwardRef<
  React.ElementRef<typeof XTabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof XTabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <XTabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
XTabsList.displayName = XTabsPrimitive.List.displayName

const XTabsTrigger = React.forwardRef<
  React.ElementRef<typeof XTabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof XTabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <XTabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
XTabsTrigger.displayName = XTabsPrimitive.Trigger.displayName

const XTabsContent = React.forwardRef<
  React.ElementRef<typeof XTabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof XTabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <XTabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
XTabsContent.displayName = XTabsPrimitive.Content.displayName

export { XTabs, XTabsList, XTabsTrigger, XTabsContent }
