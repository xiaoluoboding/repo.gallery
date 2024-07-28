"use client"

import { useState } from "react"
import { SendIcon } from "lucide-react"

import {
  XDialog,
  XDialogContent,
  XDialogDescription,
  XDialogHeader,
  XDialogTitle,
  XDialogTrigger,
} from "@/components/ui/XDialog"
import { XButton } from "@/components/ui/XButton"
import { Repo } from "@/lib/types"
import { InsertBookmarkForm } from "@/app/repos/modules/InsertBookmarkForm"

interface IProps {
  currentRepo: Repo
}

export const SubmitBookmarkDialog = ({ currentRepo }: IProps) => {
  const [open, setOpen] = useState(false)

  return (
    <XDialog open={open} onOpenChange={setOpen}>
      <XDialogTrigger asChild>
        <XButton size="sm" className="relative hidden sm:flex">
          <SendIcon size={16} className="mr-2" />
          Submit
          <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
          </span>
        </XButton>
      </XDialogTrigger>
      <XDialogContent className="border-border">
        <XDialogHeader>
          <XDialogTitle>Submit a repo</XDialogTitle>
          <XDialogDescription>It must be a valid repo.</XDialogDescription>
        </XDialogHeader>
        <InsertBookmarkForm setDialogOpen={setOpen} currentRepo={currentRepo} />
      </XDialogContent>
    </XDialog>
  )
}
