import TransitionWrapper from "../bucket/src/views/admin/TransitionWrapper"
import { Metadata } from "next"
import SignIn from "./components/views/SignIn"
import { getSessionUser } from "../api/bucket/auth/get-session-user"
import { redirect } from "next/navigation"

const title = "Bucket CMS Demo"
const description = "Try out Bucket CMS, the world’s first AI-Powered Portable Drop-in Headless CMS for Next.js"
const screenshot = "https://bucket-cms.com/images/logo-tagline.jpg"
const url = "https://bucket-cms.com/demo"

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
        alt: "Maybe you don’t need a big cloud CMS... How about a bucket? Bucket CMS is the world’s first AI-Powered Portable Drop-in Headless CMS for Next.js",
        type: "image/jpeg",
        width: 1982,
        height: 1038,
      },
    ],
  },
}

export default async function Demo() {
  const sessionUser = await getSessionUser()
  if (sessionUser) {
    return redirect("/bucket/admin")
  }

  return (
    <main>
      <div className="py-12 px-8 border-t max-w-[480px] mx-auto text-center">
        <TransitionWrapper>
          <SignIn isTestEnv={process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"} />
        </TransitionWrapper>
      </div>
    </main>
  )
}
