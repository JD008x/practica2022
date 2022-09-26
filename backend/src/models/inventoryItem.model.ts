// import { InventoryLocation } from "./inventoryLocation.model";
// import { User } from "./user.model";

import { ObjectId } from "mongoose";

export class InventoryItem {
  // user!:User;
  _id!:ObjectId;
  user!:string;
  name!:string;
  category!:string;
  inventoryNumber!:number;
  addedDate= new Date();
  modifiedDate= new Date();
  // location?:InventoryLocation;
  location!:string;
  isDeleted!:boolean;

  public constructor(init?:Partial<InventoryItem>){
    Object.assign(this, init);
}

}