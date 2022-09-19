// import { InventoryLocation } from "./inventoryLocation.model";
// import { User } from "./user.model";

export class InventoryItem {
  // user!:User;
  user!: string;
  name?:string;
  category?:string;
  inventoryNumber!: number;
  addedDate?:Date;
  modifiedDate?:Date;
  // location?:InventoryLocation;
  location?:string;
  isDeleted!:boolean;

  public constructor(init?:Partial<InventoryItem>){
    Object.assign(this, init);
}

}
