"use client";

import { XButton, buttonVariants } from "@/components/ui/XButton";
import { ChevronLeftIcon, FileWarningIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <section className="w-full">
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center px-6 py-12">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center">
          <p className="rounded-full bg-neutral-100 p-3 text-sm font-medium dark:bg-neutral-700">
            <FileWarningIcon className="h-6 w-6" />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-neutral-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400">
            The page you are looking for doesn&apos;t exist.
          </p>

          <div className="group mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
            <XButton
              onClick={() => router.back()}
              className={buttonVariants({ variant: "secondary" })}
            >
              <ChevronLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Go back</span>
            </XButton>

            <Link href="/" className={buttonVariants({ variant: "default" })}>
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
