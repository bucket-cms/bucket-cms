import React, { useState } from "react"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { Button, CodeBlock, DynamicComponentPreview, Textarea, Loader } from "../../ui"
import { CollectionFieldsData, CollectionItemData } from "../../types"
import { useStreamingDataFromPrompt } from "../../hooks/useStreamingDataFromPrompt"
import { generateTypeScriptDataInterface } from "../../util"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"

function DocsSectionBuildChat({ collection, items, type }: { collection: CollectionFieldsData; items: CollectionItemData[]; type: "view" | "form" }) {
  const [prompt, setPrompt] = useState(
    `Create a well designed React Component to ${type === "view" ? "view" : "enter and submit"} a single instance of ${collection.name} data in TypeScript styled with Tailwind.`
  )
  const [componentCode, setComponentCode] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const formattedCollectionName = collection.name.replace(/\b\w/g, (match) => match.toUpperCase()).replace(/\s+/g, "")
  const formattedComponentName = formattedCollectionName + type.replace(/\b\w/g, (match) => match.toUpperCase()).replace(/\s+/g, "")
  const functionalComponentExample = `const ${formattedComponentName}: React.FC<${formattedCollectionName}Data> = ({ data }) => {}`

  const enrichedPrompt =
    prompt +
    ` The component MUST be named ${formattedComponentName} - respond only in code that can be pasted directly into a TSX file. Do not include comments in the code. Only allow imports from react unless previously stated differently. Do not import CSS (use Tailwind only). Type the functional component as ${functionalComponentExample} - this is the TypeScript interface for ${formattedCollectionName} data: \n\n${generateTypeScriptDataInterface(
      { ...collection, name: formattedCollectionName }
    )} If a data.Date.value is included, assume it is a string and not a Date object.`

  function generateComponent() {
    setComponentCode("")
    setIsGenerating(true)

    useStreamingDataFromPrompt({
      prompt: enrichedPrompt,
      onData: (data) => {
        try {
          if (data) {
            const jsx = data.replace("```tsx", "").replace("```jsx", "").replace("```", "")
            setComponentCode(jsx)
          }
        } catch (error) {
          console.error("Parsing error:", error)
        }
      },
      onDone: (data) => {
        setIsGenerating(false)
        try {
          const jsx = data.replace("```tsx", "").replace("```jsx", "").replace("```", "")
          setComponentCode(jsx)
          Prism.highlightAll()
        } catch (e) {
          console.error("Parsing error:", e)
          if (retryCount < 3) {
            setRetryCount(retryCount + 1)
            generateComponent()
          }
        }
      },
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    generateComponent()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-4">
        <h2 className="text-3xl pt-4 pb-8 text-gray-600 text-center">{`<${formattedComponentName} />`}</h2>
        <div className="h-24 pb-1">
          <Textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value)
            }}
            className="w-full md:w-[504px] h-full leading-relaxed text-base text-gray-800 focus-visible:ring-gray-300"
          />
        </div>
        <div className="flex justify-center mb-8">
          <Button disabled={isGenerating} type="submit" className="disabled:opacity-100 disabled:bg-gray-300 relative flex gap-2 h-auto text-lg pl-8 pr-6">
            {isGenerating ? (
              <>
                <span className="opacity-0">Generating...</span>
                <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center scale-125">
                  <Loader />
                </div>
              </>
            ) : (
              <>
                Generate Component <PaperPlaneIcon className="relative left-1 scale-110" />
              </>
            )}
          </Button>
        </div>
      </form>
      <div className={`relative overflow-hidden transition-all ease-in-out ${componentCode && !isGenerating ? "h-[504px]" : "h-0"}`}>
        {componentCode && !isGenerating && <DynamicComponentPreview componentName={formattedComponentName} componentCode={componentCode} componentData={items[0].data} />}
      </div>
      {componentCode && <CodeBlock copy={!isGenerating} code={componentCode} />}
    </>
  )
}

export default DocsSectionBuildChat
