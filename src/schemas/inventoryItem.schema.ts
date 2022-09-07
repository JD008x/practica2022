import mongoose from "mongoose";
const { model, Schema } = mongoose;

import { env } from "../env";
import { InventoryItem } from "../models/inventoryItem.model";

const InventoryItemSchema = new Schema<InventoryItem>(
  {
    user: { type: String, required: true },
  },
  {
    collection: env.INVENTORY_MANAGEMENT,
  }
);

const InventoryItemDB = model<InventoryItem>(
  "inventoryItem",
  InventoryItemSchema
);

export { InventoryItemDB };
