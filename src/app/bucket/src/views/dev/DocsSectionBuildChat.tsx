import React, { useState, useRef, useEffect } from "react"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { Button, DynamicComponentPreview, Textarea, Loader } from "../../ui"
import { CollectionFieldsData, CollectionItemData } from "../../types"
import { useStreamingDataFromPrompt } from "../../hooks/useStreamingDataFromPrompt"
import { generateTypeScriptDataInterface } from "../../util"
import Editor from "react-simple-code-editor"
import Prism from "prismjs"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/themes/prism.css"

function DocsSectionBuildChat({ collection, items, type }: { collection: CollectionFieldsData; items: CollectionItemData[]; type: "view" | "form" }) {
  const [prompt, setPrompt] = useState(
    `Create a well designed React Component to ${type === "view" ? "view" : "enter and submit"} a single instance of ${collection.name} data in TypeScript styled with Tailwind.`
  )
  const [componentCode, setComponentCode] = useState<string>("")
  const [lastValidCode, setLastValidCode] = useState<string>("")
  const [pendingCode, setPendingCode] = useState<string>("")

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

  const timeoutRef = useRef<number | null>(null)
  function startTimer(code: string) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setPendingCode(code)
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data.type === "iframe-success") {
        // Update lastValidCode with the current componentCode
        setLastValidCode(componentCode)
      } else if (event.data.type === "iframe-error") {
        console.error("Received error from iframe:", event.data.message)
        setPendingCode(lastValidCode) // Revert to last valid code
        console.log("Reverting due to error: " + event.data.message)
      }
    }

    window.addEventListener("message", handleMessage)

    // Cleanup: remove event listener when component is unmounted
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  function generateComponent() {
    setComponentCode("")
    setPendingCode("")
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
          setPendingCode(jsx)
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
        {pendingCode && <DynamicComponentPreview componentName={formattedComponentName} componentCode={pendingCode} componentData={items[0].data} />}
      </div>
      {componentCode && (
        <div className="border">
          <Editor
            value={componentCode}
            onValueChange={(code) => {
              setComponentCode(code) // Update componentCode immediately
              startTimer(code) // Start the timer to update pendingCode
            }}
            highlight={(code) => Prism.highlight(code, Prism.languages["typescript"], "tsx")}
            style={{ fontSize: "13px", fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` }}
            padding={16}
          />
        </div>
      )}
    </>
  )
}

export default DocsSectionBuildChat
