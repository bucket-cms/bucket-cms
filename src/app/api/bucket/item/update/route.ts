import { NextRequest, NextResponse } from "next/server"
import { checkPublicWriteAccess } from "../../auth/util"
import { readCollectionSchema, updateCollectionItem } from "../../s3/operations"
import { validateFields } from "../../../../../app/bucket/src/util"
import { ItemFormFieldData } from "../../../../../app/bucket/src/types"
import { AllFieldTypes } from "../../../../../app/bucket/src/field-types"

export async function PUT(req: NextRequest): Promise<void | NextResponse> {
  if (req.method === "PUT") {
    try {
      const json = await req.json()
      const { collectionName, itemName, data, itemId } = json

      const { error, response } = await checkPublicWriteAccess(collectionName)
      if (error) {
        return NextResponse.json({ error }, { status: 403 })
      }

      // Fetch the collection schema
      const collection = await readCollectionSchema(collectionName)
      if (!collection) {
        throw new Error("Collection not found")
      }

      // Validate the item data
      const fields: ItemFormFieldData[] = Object.entries(data).map(([name, value]) => {
        return {
          name,
          data: value as Partial<AllFieldTypes>,
        }
      })
      const { allFieldsValid, newErrors } = validateFields({ collectionName, fields }, collection)
      if (!allFieldsValid) {
        return NextResponse.json({ error: "Validation failed", errors: newErrors }, { status: 400 })
      }

      const result = await updateCollectionItem(collectionName, itemName, data, itemId)
      return NextResponse.json(result, { status: 200 })
    } catch (error: any) {
      return NextResponse.json({ error: `${error.message || "An error occurred"}`, stack: error.stack }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: `Method Not Allowed` }, { status: 405 })
  }
}
