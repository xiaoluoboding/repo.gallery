"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons"
import * as XSelectPrimitive from "@radix-ui/react-select"

import { cn } from "@/lib/utils"

const XSelect = XSelectPrimitive.Root

const XSelectGroup = XSelectPrimitive.Group

const XSelectValue = XSelectPrimitive.Value

const XSelectTrigger = React.forwardRef<
  React.ElementRef<typeof XSelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof XSelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <XSelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <XSelectPrimitive.Icon asChild>
      <CaretSortIcon className="h-4 w-4 opacity-50" />
    </XSelectPrimitive.Icon>
  </XSelectPrimitive.Trigger>
))
XSelectTrigger.displayName = XSelectPrimitive.Trigger.displayName

const XSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof XSelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof XSelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <XSelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUpIcon />
  </XSelectPrimitive.ScrollUpButton>
))
XSelectScrollUpButton.displayName = XSelectPrimitive.ScrollUpButton.displayName

const XSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof XSelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof XSelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <XSelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDownIcon />
  </XSelectPrimitive.ScrollDownButton>
))
XSelectScrollDownButton.displayName =
  XSelectPrimitive.ScrollDownButton.displayName

const XSelectContent = React.forwardRef<
  React.ElementRef<typeof XSelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof XSelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <XSelectPrimitive.Portal>
    <XSelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <XSelectScrollUpButton />
      <XSelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </XSelectPrimitive.Viewport>
      <XSelectScrollDownButton />
    </XSelectPrimitive.Content>
  </XSelectPrimitive.Portal>
))
XSelectContent.displayName = XSelectPrimitive.Content.displayName

const XSelectLabel = React.forwardRef<
  React.ElementRef<typeof XSelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof XSelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <XSelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
XSelectLabel.displayName = XSelectPrimitive.Label.displayName

const XSelectItem = React.forwardRef<
  React.ElementRef<typeof XSelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof XSelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <XSelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <XSelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </XSelectPrimitive.ItemIndicator>
    </span>
    <XSelectPrimitive.ItemText>{children}</XSelectPrimitive.ItemText>
  </XSelectPrimitive.Item>
))
XSelectItem.displayName = XSelectPrimitive.Item.displayName

const XSelectSeparator = React.forwardRef<
  React.ElementRef<typeof XSelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof XSelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <XSelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
XSelectSeparator.displayName = XSelectPrimitive.Separator.displayName

export {
  XSelect,
  XSelectGroup,
  XSelectValue,
  XSelectTrigger,
  XSelectContent,
  XSelectLabel,
  XSelectItem,
  XSelectSeparator,
  XSelectScrollUpButton,
  XSelectScrollDownButton,
}
