import { Text, TextData } from "./Text"
import { Labels, LabelsData } from "./Labels"
import { DateField, DateData } from "./Date"
import { SelectField, SelectData } from "./Select"
import { Toggle, ToggleData } from "./Toggle"
import { RichText, RichTextData } from "./RichText"
import { Email, EmailData } from "./Email"
import { Phone, PhoneData } from "./Phone"
import { Address, AddressData } from "./Address"
import { URL, URLData } from "./URL"
import { Statistic, StatisticData } from "./Statistic"
import { ImageUpload, ImageData } from "./ImageUpload"
import { ImageGallery, ImageGalleryData } from "./ImageGallery"
import { FileUpload, FileData } from "./FileUpload"
import { FileLibrary, FileLibraryData } from "./FileLibrary"
import { VideoEmbed, VideoEmbedData } from "./VideoEmbed"
import { CollectionReference, CollectionReferenceData } from "./CollectionReference"
import { FieldTypeSchemas } from "./schemas"

export { Text } from "./Text"
export { Labels } from "./Labels"
export { DateField } from "./Date"
export { SelectField } from "./Select"
export { Toggle } from "./Toggle"
export { RichText } from "./RichText"
export { Email } from "./Email"
export { Phone } from "./Phone"
export { Address } from "./Address"
export { URL } from "./URL"
export { Statistic } from "./Statistic"
export { ImageUpload } from "./ImageUpload"
export { ImageGallery } from "./ImageGallery"
export { FileUpload } from "./FileUpload"
export { FileLibrary } from "./FileLibrary"
export { VideoEmbed } from "./VideoEmbed"
export { CollectionReference } from "./CollectionReference"

export type AllFieldTypes =
  | TextData
  | LabelsData
  | DateData
  | SelectData
  | ToggleData
  | RichTextData
  | EmailData
  | PhoneData
  | AddressData
  | URLData
  | StatisticData
  | ImageData
  | ImageGalleryData
  | FileData
  | FileLibraryData
  | VideoEmbedData
  | CollectionReferenceData

const FieldTypes = {
  Text: Text,
  Labels: Labels,
  DateField: DateField,
  SelectField: SelectField,
  Toggle: Toggle,
  RichText: RichText,
  Email: Email,
  Phone: Phone,
  Address: Address,
  URL: URL,
  Statistic: Statistic,
  ImageUpload: ImageUpload,
  ImageGallery: ImageGallery,
  FileUpload: FileUpload,
  FileLibrary: FileLibrary,
  VideoEmbed: VideoEmbed,
  CollectionReference: CollectionReference,
}

export { FieldTypes }

export function getFieldTypeSchema(type: string) {
  return FieldTypeSchemas[type as keyof typeof FieldTypeSchemas]
}
