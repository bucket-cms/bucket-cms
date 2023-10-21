import React, { useState } from "react"
import { Button } from "."
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons"
import { cn } from "./utils"

interface CodeBlockProps {
  code: string
  copy?: boolean
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, copy }) => {
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
    <div className="w-full relative">
      <div className="absolute top-0 right-0 p-3 z-10 flex">
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

      <pre className="!text-[13px] !text-left !bg-slate-100 border-l border-b border-r opacity-80 overflow-auto px-2 py-4 !mt-0">
        <code className="language-ts">{code}</code>
      </pre>
    </div>
  )
}
