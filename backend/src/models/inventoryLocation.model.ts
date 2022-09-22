import { ObjectId } from "mongoose";

export class InventoryLocation {
    _id!:ObjectId;
    locationName='';
    address='';
    managerName='';
    phoneNumber='';

    public constructor(init?:Partial<InventoryLocation>){
      Object.assign(this, init);
    }
      /*
    constructor(location: InventoryLocation){
      this.locationName = location.locationName;
      this.address = location.address;
      this.managerName = location.managerName;
      this.phoneNumber = location.phoneNumber;
    }
    */
  }
  