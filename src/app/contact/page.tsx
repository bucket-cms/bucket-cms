import Footer from "../demo/components/ui/footer"
import { BrandImageWithGradient, PageHeading } from "../bucket/src/views/brand"
import ContactForm from "../demo/components/views/ContactForm"
import TransitionWrapper from "../bucket/src/views/admin/TransitionWrapper"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bucket CMS | Contact",
}

export default function Contact() {
  return (
    <main>
      <div className="py-24 px-8 border-t max-w-[480px] mx-auto text-center">
        <TransitionWrapper>
          <BrandImageWithGradient />
          <PageHeading>Say Hello</PageHeading>
          <ContactForm />
        </TransitionWrapper>
      </div>
    </main>
  )
}
