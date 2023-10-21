import React from "react"

const FeaturesView: React.FC = () => {
  return (
    <section className="px-4 py-12 w-full max-w-[1100px] mx-auto sm:grid md:grid-cols-3 gap-12">
      <div className="col-span-3 flex flex-col items-center">
        <h2 className="text-2xl sm:text-5xl font-extrabold text-blue-600 text-center md:text-left">The Portable Drop-In Headless CMS</h2>
        <h2 className="text-lg sm:text-3xl text-blue-500 text-center md:text-left py-8">No Database. No Problem.</h2>
      </div>
      <div>
        <div className="shadow border rounded-lg px-4 w-24 h-16">
          <img className="w-full h-full" src="/images/icons/next-js.svg" alt="Next.js logo" width="100" height="100" />
        </div>
        <h3 className="mt-6 text-2xl text-blue-600 font-medium pb-2">Headless for Next.js</h3>
        <p className="opacity-70">Headless CMS designed specifically for Next.js projects</p>
      </div>
      <div>
        <div className="shadow border rounded-lg px-8 w-24 h-16 flex items-center justify-center">
          <img className="w-full h-full scale-90" src="/images/icons/s3.svg" alt="" width="100" height="100" />
        </div>
        <h3 className="mt-6 text-2xl text-blue-600 font-medium pb-2">S3 All Things</h3>
        <p className="opacity-70">Use your S3 account for storing structured JSON content with version control, security, performance, portability and scalability</p>
      </div>
      <div>
        <div className="shadow border rounded-lg px-8 w-24 h-16 flex items-center justify-center">
          <img className="w-full h-full scale-90" src="/images/icons/cli.svg" alt="" width="100" height="100" />
        </div>
        <h3 className="mt-6 text-2xl text-blue-600 font-medium pb-2">Drop-In and Go</h3>
        <p className="opacity-70">Install with a single command, set your env keys and deploy to start managing your content with built-in API routes and admin interface</p>
      </div>
      <div>
        <div className="shadow border rounded-lg px-8 w-24 h-16 flex items-center justify-center">
          <img className="w-full h-full scale-90" src="/images/icons/no-cloud.svg" alt="" width="100" height="100" />
        </div>
        <h3 className="mt-6 text-2xl text-blue-600 font-medium pb-2">Own Your Admin</h3>
        <p className="opacity-70">Stop sending admin off platform and eliminate recurring cloud service fees</p>
      </div>
      <div>
        <div className="shadow border rounded-lg px-8 w-24 h-16 flex items-center justify-center">
          <img className="w-full h-full scale-90" src="/images/icons/open-ai.svg" alt="" width="100" height="100" />
        </div>
        <h3 className="mt-6 text-2xl text-blue-600 font-medium pb-2">Build with AI</h3>
        <p className="opacity-70">Integrate with Open AI to build and design your own custom component code</p>
      </div>
      <div>
        <div className="shadow border rounded-lg px-8 w-24 h-16 flex items-center justify-center">
          <img className="w-full h-full scale-90" src="/images/icons/data.svg" alt="" width="100" height="100" />
        </div>
        <h3 className="mt-6 text-2xl text-blue-600 font-medium pb-2">On-The-Fly Data Schema</h3>
        <p className="opacity-70">Build your forms then Bucket CMS will generate your data schema</p>
      </div>
      <div>
        <div className="shadow border rounded-lg px-8 w-24 h-16 flex items-center justify-center">
          <img className="w-full h-full scale-90" src="/images/icons/shield.svg" alt="" width="100" height="100" />
        </div>
        <h3 className="mt-6 text-2xl text-blue-600 font-medium pb-2">Type-Safe Validation</h3>
        <p className="opacity-70">
          Combines the speed and simplicity of flat files with the data integrity with{" "}
          <a className="text-blue-700" href="https://zod.dev/">
            Zod
          </a>
        </p>
      </div>
      <div>
        <div className="shadow border rounded-lg px-8 w-24 h-16 flex items-center justify-center">
          <img className="w-full h-full scale-90" src="/images/icons/doc-gen.svg" alt="" width="100" height="100" />
        </div>
        <h3 className="mt-6 text-2xl text-blue-600 font-medium pb-2">Auto-Generated Docs</h3>
        <p className="opacity-70">Streamline development for developers with automatically generated documentation.</p>
      </div>
      <div>
        <div className="shadow border rounded-lg px-8 w-24 h-16 flex items-center justify-center">
          <img className="w-full h-full scale-90" src="/images/icons/users.svg" alt="" width="100" height="100" />
        </div>
        <h3 className="mt-6 text-2xl text-blue-600 font-medium pb-2">Auth Integration</h3>
        <p className="opacity-70">Configure behind your own authentication provider and control who can view or change data.</p>
      </div>
    </section>
  )
}

export default FeaturesView
