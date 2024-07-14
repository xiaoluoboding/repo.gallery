import { Drawer } from "vaul"
import { CommandIcon } from "lucide-react"

import { MobileMenuContent } from "./MobileMenuContent"
import { XButton } from "@/components/ui/XButton"

function MobileDrawer() {
  return (
    <Drawer.Root shouldScaleBackground>
      <XButton variant="ghost" size="icon" title="Toggle drawer" asChild>
        <Drawer.Trigger>
          <CommandIcon size={16} />
        </Drawer.Trigger>
      </XButton>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[80%] flex-col rounded-t-lg bg-neutral-100 dark:bg-accent">
          <div className="flex-1 overflow-y-auto rounded-t-lg bg-white dark:bg-black">
            <div className="pointer-events-none sticky inset-x-0 top-0 flex h-10 items-center justify-center overflow-hidden bg-white dark:bg-accent">
              <div className="h-1.5 w-12 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>
            <div className="p-4 bg-white dark:bg-black">
              <MobileMenuContent />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export { MobileDrawer }
