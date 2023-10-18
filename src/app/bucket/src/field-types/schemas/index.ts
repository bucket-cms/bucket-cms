import { z } from "zod"

const stringValue = z.object({
  value: z.string().min(1, "Value cannot be empty"),
})
const fileValue = z.object({
  url: z.string().url("Invalid file URL"),
  name: z.string(),
})
const imageValue = z.object({
  url: z.string().url("Invalid image URL"),
  width: z.number().min(1, "Missing image width"),
  height: z.number().min(1, "Missing image height"),
  alt: z.string(),
})

export const FieldTypeSchemas = {
  Address: z.object({
    street: z.string().min(1, "Street address cannot be empty"),
    city: z.string().min(1, "City cannot be empty"),
    state: z.string().min(1, "State cannot be empty"),
    postalCode: z.string().min(1, "Postal code cannot be empty"),
    country: z.string().min(1, "Country cannot be empty"),
  }),
  CollectionReference: stringValue,
  Date: z.object({
    value: z.string().refine((data) => !isNaN(Date.parse(data)), { message: "Invalid date format" }),
  }),
  Email: z.object({
    value: z.string().email("Invalid email address").min(1, "Email cannot be empty"),
  }),
  FileLibrary: z.array(fileValue),
  FileUpload: fileValue,
  ImageGallery: z.array(imageValue),
  ImageUpload: imageValue,
  Labels: z.object({
    value: z.array(z.string().min(1, "Value cannot be empty")),
  }),
  Phone: z.object({
    countryCode: z
      .string()
      .regex(/^\+\d{1,3}$/, "Invalid country code format")
      .min(1, "Country code cannot be empty"),
    phoneNumber: z
      .string()
      .regex(/^[\d\s-()]+$/, "Invalid phone number format")
      .min(1, "Phone number cannot be empty"),
  }),
  RichText: stringValue,
  Select: stringValue,
  Statistic: z.object({
    value: z.string().min(1, "Metric cannot be empty"),
    metric: z.string().min(1, "Metric cannot be empty"),
  }),
  Text: stringValue,
  Toggle: z.object({
    value: z.boolean(),
  }),
  URL: z.object({
    value: z.string().url("Invalid URL").min(1, "URL cannot be empty"),
  }),
  VideoEmbed: z.object({
    value: z
      .string()
      .min(1, "URL cannot be empty")
      .refine(
        (value) => {
          // We could improve these regex to match YouTube and Vimeo URL patterns more precisely
          const youtubePattern = /^(https:\/\/www\.youtube\.com\/watch\?v=|https:\/\/youtu\.be\/)/
          const vimeoPattern = /^(https:\/\/vimeo\.com\/)/
          return youtubePattern.test(value) || vimeoPattern.test(value)
        },
        {
          message: "Invalid YouTube or Vimeo URL",
          path: ["value"], // Specify the path to the field
        }
      ),
  }),
}
