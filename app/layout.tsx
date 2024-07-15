import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"

import "./globals.css"
import { SideMenu } from "@/components/SideMenu"
import { XToaster } from "@/components/ui/XToaster"
import { MenuContent } from "@/components/SideMenu/MenuContent"
import { sharedTitle, sharedDescription } from "@/app/shared-metadata"
import { ThemeProvider } from "@/components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://repo.gallery"),
  robots: {
    index: true,
    follow: true,
  },
  title: {
    template: `%s — ${sharedTitle}`,
    default: sharedTitle,
  },
  description: sharedDescription,
  openGraph: {
    title: {
      template: `%s — ${sharedTitle}`,
      default: sharedTitle,
    },
    description: sharedDescription,
    // alt: sharedTitle,
    type: "website",
    url: "/",
    siteName: sharedTitle,
    locale: "zh_CN",
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: `@robert_shaw_x`,
    creator: `@robert_shaw_x`,
  },
  other: {
    pinterest: "nopin",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main
            vaul-drawer-wrapper=""
            className="min-h-screen bg-white dark:bg-neutral-900"
          >
            <div className="min-h-screen lg:flex">
              {/* <SideMenu className="relative hidden lg:flex">
                <MenuContent />
              </SideMenu> */}
              <div className="flex flex-1">{children}</div>
            </div>
          </main>
          <XToaster
            position="top-center"
            toastOptions={{
              duration: 3333,
            }}
          />
        </ThemeProvider>

        <Script
          defer
          data-domain="repo.gallery"
          src="https://plausible.io/js/script.js"
        ></Script>
      </body>
    </html>
  )
}
