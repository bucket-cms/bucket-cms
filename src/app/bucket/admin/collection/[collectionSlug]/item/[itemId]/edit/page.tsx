import ItemForm from "../../../../../../src/views/admin/ItemForm"
import { CollectionItemData } from "../../../../../../src/types"
import { readCollectionItem } from "../../../../../../../api/bucket/s3/operations"
import { PageHeading } from "../../../../../../src/views/brand"

export default async function EditItemPage({ params }: { params: { collectionSlug: string; itemId: string } }) {
  const collectionName = params.collectionSlug.replace(/_/g, " ")
  const itemId = params.itemId
  const itemData: CollectionItemData = await readCollectionItem(collectionName, itemId)

  return (
    <div className="pb-32 flex flex-col items-center gap-8">
      <PageHeading>Edit {collectionName} Item</PageHeading>
      <ItemForm collectionName={collectionName} onCancel="../../manage" onComplete="../../manage" itemToEdit={itemData} />
    </div>
  )
}
