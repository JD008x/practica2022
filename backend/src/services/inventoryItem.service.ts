import { InventoryItem } from "../models/inventoryItem.model";
import { InventoryItemDB } from "../schemas/inventoryItem.schema";

export async function postInventory(
  inventoryItem: InventoryItem
): Promise<Error | InventoryItem> {
  if (!inventoryItem || !inventoryItem.user || !inventoryItem.inventoryNumber) {
    return Error("The parameters given are not valid!");
  }

  try {
    const exists = await InventoryItemDB.findOne({ user: inventoryItem.user });
    if (exists) {
      return Error(
        "The item added to the database already exists based on the User!"
      );
    }
    const inventoryNumberExists = await InventoryItemDB.findOne({
      inventoryNumber: inventoryItem.inventoryNumber,
    });
    if (inventoryNumberExists) {
      return Error(
        "The item added to the database already exists based on the Inventory Number!"
      );
    }
  } catch (ex: any) {
    return ex;
  }

  const NewInventoryItem = new InventoryItemDB({
    user: inventoryItem.user,
    name: inventoryItem.name,
    category: inventoryItem.category,
    inventoryNumber: inventoryItem.inventoryNumber,
    addedDate: inventoryItem.addedDate,
    modifiedDate: inventoryItem.modifiedDate,
    location: inventoryItem.location,
    isDeleted: inventoryItem.isDeleted,
  });
  NewInventoryItem.save();
  return NewInventoryItem;
}
