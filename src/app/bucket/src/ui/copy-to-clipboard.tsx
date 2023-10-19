import React, { useState } from "react"
import { Button } from "."
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons"

interface CopyToClipboardProps {
  textToCopy: string
  className?: string
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ textToCopy, className }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      })
      .catch((err) => console.error("Copy failed: ", err))
  }

  return (
    <Button onClick={handleCopyClick} className={className}>
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
  )
}
