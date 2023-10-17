import React, { useState } from "react"
import { Button } from "."
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons"
import { cn } from "./utils"

interface CodeBlockProps {
  code: string
  copy?: boolean
  preview?: () => void
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, copy, preview }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true)
        // Reset after 3 seconds
        setTimeout(() => setCopied(false), 3000)
      })
      .catch((err) => console.error("Copy failed: ", err))
  }

  return (
    <div className="w-full relative mt-8">
      <div className="absolute top-0 right-0 p-1 z-10 flex">
        {Boolean(preview) && (
          <Button className="scale-90" onClick={preview}>
            Preview
          </Button>
        )}
        {copy && (
          <Button className={cn("scale-90", copied && "bg-green-600")} onClick={copyToClipboard}>
            {copied ? (
              <>
                <CheckIcon className="mr-2" /> Copied
              </>
            ) : (
              <>
                <CopyIcon className="mr-2" /> Copy
              </>
            )}
          </Button>
        )}
      </div>

      <pre className="!text-[13px] !text-left !bg-gray-100 p-2 opacity-80 overflow-auto rounded">
        <code className="language-ts">{code}</code>
      </pre>
    </div>
  )
}
