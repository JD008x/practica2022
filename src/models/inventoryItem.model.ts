export class InventoryItem {
  user!:string;
  name?:string;
  category?:string;
  inventoryNumber!: number;
  addedDate?:Date;
  modifiedDate?:Date;
  location?:string;
  isDeleted!:boolean;
}
