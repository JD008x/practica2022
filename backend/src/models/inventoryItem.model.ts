// import { InventoryLocation } from "./inventoryLocation.model";
// import { User } from "./user.model";

import { ObjectId } from "mongoose";

export class InventoryItem {
  // user!:User;
  _id!:ObjectId;
  user = '';
  name= '';
  category= '';
  inventoryNumber=0;
  addedDate= new Date();
  modifiedDate= new Date();
  // location?:InventoryLocation;
  location='';
  isDeleted=false;

  public constructor(init?:Partial<InventoryItem>){
    Object.assign(this, init);
}

}
