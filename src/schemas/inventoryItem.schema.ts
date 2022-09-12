import mongoose from "mongoose";
const { model, Schema } = mongoose;

import { env } from "../env";
import { InventoryItem } from "../models/inventoryItem.model";


const InventoryItemSchema = new Schema<InventoryItem>(
  {
    // user: { type:mongoose.Schema.Types.Mixed, required: true},
    user: { type:String, required:true},
    name: { type:String, required: false, default:'unknown'},
    category: { type:String, requierd: false, default:'unknown'},
    inventoryNumber: { type:Number, required: true, unique: true},
    addedDate: {type:Date, required:false , default: Date.now()},
    modifiedDate: {type:Date, required:false, default: Date.now},
    // location: {type:mongoose.Schema.Types.Mixed, required:false},
    location:{type:String, required:false, default:''},
    isDeleted: {type:Boolean, required:true, default:false },
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
