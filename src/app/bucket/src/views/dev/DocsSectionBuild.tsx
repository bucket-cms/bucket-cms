import React from "react"
import { useAIConfigValidation } from "../../hooks"
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import DocsSectionBuildChat from "./DocsSectionBuildChat"
import { CollectionFieldsData, CollectionItemData } from "../../types"

function DocsSectionBuild({ collection, items }: { collection: CollectionFieldsData; items: CollectionItemData[] }) {
  const { configValidation, loading } = useAIConfigValidation()

  return (
    <div className="w-full relative">
      {!loading && (
        <>
          <div
            className={`absolute -top-4 right-0 py-1 px-2 inline-flex gap-2 rounded-lg text-xs uppercase tracking-wide font-mono items-center font-semibold ${
              configValidation?.isAIConfigured ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {configValidation?.isAIConfigured ? <CheckCircledIcon /> : <CrossCircledIcon />}
            <span>OpenAI</span>
          </div>
          {configValidation?.isAIConfigured && <DocsSectionBuildChat collection={collection} type="view" items={items} />}
          {configValidation?.isAIConfigured ?? <div className="py-12">Add an Open AI Key to your project’s environment variables to begin using AI to create components.</div>}
        </>
      )}
    </div>
  )
}

export default DocsSectionBuild
