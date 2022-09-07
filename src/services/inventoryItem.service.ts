import { InventoryItem } from "../models/inventoryItem.model";
import { InventoryItemDB } from "../schemas/inventoryItem.schema";

export async function postInventory(
  inventoryItem: InventoryItem
): Promise<Error | InventoryItem> {
  if (!inventoryItem || !inventoryItem.user) {
    return Error("The parameters given are not valid!");
  }

  try {
    const exists = await InventoryItemDB.findOne({ user: inventoryItem.user });
    if (exists) {
      return Error("The item added to the database already exists!");
    }
  } catch (ex: any) {
    return ex;
  }

  const NewInventoryItem = new InventoryItemDB({
    user: inventoryItem.user,
  });
  NewInventoryItem.save();
  return NewInventoryItem;
}
