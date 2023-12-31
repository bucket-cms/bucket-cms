import "./globals.css"
import "prismjs/themes/prism.css"
import Header from "./demo/components/ui/header"
import Footer from "./demo/components/ui/footer"

import type { Metadata } from "next"

const title = "Bucket CMS"
const description = "Bucket CMS is the world’s first Portable Drop-in AI-Enabled Headless CMS designed for Next.js (no database necessary)"
const url = "https://bucket-cms.com"
const screenshot = "https://bucket-cms.com/screenshot.jpg"

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/favicon-32x32.png",
  },
  openGraph: {
    title,
    description,
    siteName: "Bucket CMS",
    images: [screenshot],
    url,
  },
  twitter: {
    card: "summary_large_image",
    site: "bucket_cms",
    images: [
      {
        url: screenshot,
        alt: "Bucket CMS Website, Install with npx create-bucket-cms",
        type: "image/jpeg",
        width: 1259,
        height: 710,
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="smooth-scroll">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
