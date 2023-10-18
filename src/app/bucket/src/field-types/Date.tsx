"use client"
import React, { ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"
import { Input } from "../ui"
import { FieldTypeSchemas } from "./schemas"

const schema = FieldTypeSchemas.Date
export type DateData = z.infer<typeof schema>

export const DateField: FieldType<DateData> = {
  renderAdmin: ({ data, setData }: FieldTypeProps<DateData>): ReactElement => {
    return <Input type="date" defaultValue={data?.value || ""} onChange={(e) => setData && setData({ value: e.target.value })} />
  },
  validate: (data: DateData) => {
    const validationResult = schema.safeParse(data)
    if (validationResult.success) {
      return { isValid: true }
    } else {
      return {
        isValid: false,
        errorMessage: validationResult.error.issues[0]?.message || "Invalid data",
      }
    }
  },
  schema: schema,
}
