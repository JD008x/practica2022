import mongoose from 'mongoose';
const {model, Schema} = mongoose;

import {env} from '../env';
import { InventoryLocation } from '../models/inventoryLocation.model';

const InventoryLocationSchema = new Schema<InventoryLocation>(
    {
        locationName:{type:String, required:true},
        address:{type:String, required: false, default:''},
        managerName:{type:String, required:false, default:''},
        phoneNumber:{type:String, required:false, default:''}
    },
    {
      collection: env.LOCATION_MANAGEMENT,
    }
  );

  const InventoryLocationDB = model<InventoryLocation>(
    "inventoryLocation",
    InventoryLocationSchema
  );

  export {InventoryLocationDB};