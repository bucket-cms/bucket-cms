import { getSessionUser } from "../api/bucket/auth/get-session-user"
import { BrandImage } from "./src/views/brand/BrandImage"
import { AdminFooter } from "./src/views/admin/AdminFooter"
import BucketProvider from "./src/views/providers/BucketProvider"

export default async function BucketLayout({ children }: { children: React.ReactNode }) {
  const sessionUser = await getSessionUser()

  const isLocalhostAuth = process.env.NODE_ENV === "development" && sessionUser?.name === "Localhost"
  const isAuthorized = (sessionUser && sessionUser.name !== "Localhost") || isLocalhostAuth

  return (
    <div className="flex flex-col grow justify-start items-center relative w-full h-full bg-white">
      {isAuthorized ? (
        <BucketProvider>{children}</BucketProvider>
      ) : (
        <div className="w-screen h-screen flex flex-col items-center px-8 py-16 gap-2">
          <BrandImage />
          <p className="text-2xl font-semibold pb-8 italic opacity-70">Authentication required</p>
        </div>
      )}
      <AdminFooter showAuthenticationWarning={isLocalhostAuth} />
    </div>
  )
}
