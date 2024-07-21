"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import dayjs from "dayjs"
import { toast } from "sonner"
import { ChangeEvent, useState } from "react"
import { nanoid } from "nanoid"
import { MinusIcon, PlusIcon } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { pick } from "lodash-es"

import {
  XForm,
  XFormControl,
  XFormDescription,
  XFormField,
  XFormItem,
  XFormLabel,
  XFormMessage,
} from "@/components/ui/XForm"
import { XButton } from "@/components/ui/XButton"
import { XInput } from "@/components/ui/XInput"
import { XTextarea } from "@/components/ui/XTextarea"
import { Bookmark, Repo } from "@/lib/types"
import { useRepoStore } from "@/store/repo"
import { getRepo, getRepoLanguageColor } from "@/lib/github"

const formSchema = z.object({
  title: z.string().min(0, {
    message: "Please enter a title.",
  }),
  link: z.string().min(0, {
    message: "Please enter a link.",
  }),
  description: z.string().min(0, {
    message: "Please enter a description.",
  }),
  tags: z.array(
    z.object({ id: z.string(), name: z.string(), color: z.string() })
  ),
})

interface UpdateFormProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  repo: Repo
}

export function UpdateBookmarkForm({ repo, setDialogOpen }: UpdateFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const repoStore = useRepoStore()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: repo.title,
      link: repo.link,
      description: repo.description,
      tags: repo.tags,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // console.log(values)
    try {
      await handleUpdateBookmarkByLink(values.link)
      repoStore.setRepoState({
        isReRender: true,
      })
      toast.success("Repo updated successfully")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
      setDialogOpen(false)
    }
  }

  const handleChangeTagField = (value: string, id: string) => {
    const newTagList = form.getValues("tags").map((tag) => {
      if (tag.id === id) {
        return {
          ...tag,
          name: value,
        }
      }
      return tag
    })
    form.setValue("tags", newTagList)
  }

  const handleAddEmptyTag = () => {
    const newTagList = [...repo.tags, { id: nanoid(32), name: "", color: "" }]
    form.setValue("tags", newTagList)
  }

  const handleFetchBookmarkMetadata = async (link: string) => {
    let data: Partial<Bookmark> = {}
    try {
      const res = await fetch(`/api/metafy/${encodeURIComponent(link)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      data = (await res.json()) as Partial<Bookmark>
      return data
    } catch (error) {
      console.log(error)
      return {}
    }
  }

  async function handleUpdateBookmarkByLink(link: string) {
    setIsLoading(true)
    const metadata = await handleFetchBookmarkMetadata(link)
    const repodata = await getRepo(link)
    const languageColor = await getRepoLanguageColor(repodata.language)
    const repoRecord = {
      ...repo,
      ...metadata,
      ...repodata,
      original_image: metadata.originalOGImage,
      language: repodata.language === null ? "Markdown" : repodata.language,
      language_color: languageColor,
    }

    const pickedRepoRecord = {
      ...pick(repoRecord, [
        "title",
        "slug",
        "homepage",
        "description",
        "image",
        "original_image",
        "logo",
        "author",
        "publisher",
        "language",
        "language_color",
        "stars",
        "forks",
        "contributors",
        "used_by",
        "issues",
        "discussions",
        "tags",
        "topics",
        "owner_name",
        "owner_url",
        "owner_avatar",
        "owner_type",
        "created_at",
      ]),
      link: form.getValues("link"),
      tags: form.getValues("tags"),
      updated_at: dayjs().valueOf(),
    }

    try {
      await fetch(`/api/sdb/repos/${repo.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pickedRepoRecord),
      })
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <XForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <XFormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <XFormItem>
              <XFormLabel>Link</XFormLabel>
              <XFormControl>
                <XInput placeholder="Please enter a link." {...field} />
              </XFormControl>
              <XFormMessage />
            </XFormItem>
          )}
        />
        <XFormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <XFormItem>
              <XFormLabel className="text-accent-foreground">Title</XFormLabel>
              <XFormControl>
                <XInput placeholder="Please enter a title." {...field} />
              </XFormControl>
              <XFormMessage />
            </XFormItem>
          )}
        />
        <XFormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <XFormItem>
              <XFormLabel className="text-accent-foreground">
                Description
              </XFormLabel>
              <XFormControl>
                <XTextarea
                  className="h-32"
                  placeholder="Please enter a description."
                  {...field}
                />
              </XFormControl>
              <XFormMessage />
            </XFormItem>
          )}
        />
        <XFormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <XFormItem>
              <XFormLabel className="flex justify-between items-center text-accent-foreground">
                <span>Tags</span>
                <XButton
                  variant={"ghost"}
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault()
                    handleAddEmptyTag()
                  }}
                >
                  <PlusIcon className="h-4 w-4" />
                </XButton>
              </XFormLabel>
              {form.getValues("tags").map((item) => {
                return (
                  <div key={item.id} className="flex items-center gap-2">
                    <XFormControl>
                      <XInput
                        placeholder="Please enter a tag name."
                        defaultValue={item.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChangeTagField(e.target.value, item.id)
                        }
                      />
                    </XFormControl>
                    <XButton
                      variant={"ghost"}
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault()
                        form.setValue(
                          "tags",
                          form
                            .getValues("tags")
                            .filter((tag) => tag.id !== item.id)
                        )
                      }}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </XButton>
                  </div>
                )
              })}
              <XFormDescription>
                Click <kbd>+</kbd> to add a new tag
              </XFormDescription>
              <XFormMessage />
            </XFormItem>
          )}
        />
        <XButton type="submit" className="w-full" disabled={isLoading}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isLoading ? "summitting" : "submit"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </motion.span>
          </AnimatePresence>
        </XButton>
      </form>
    </XForm>
  )
}
