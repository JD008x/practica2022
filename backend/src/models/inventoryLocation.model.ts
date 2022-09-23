import { ObjectId } from "mongoose";

export class InventoryLocation {
    _id!:ObjectId;
    locationName!:string;
    address!:string;
    managerName!:string;
    phoneNumber!:string;

    public constructor(init?:Partial<InventoryLocation>){
      Object.assign(this, init);
    }
    
  }
  