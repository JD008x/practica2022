export class InventoryLocation {
    locationName!:string;
    address?:string;
    managerName?:string
    phoneNumber?:string

    constructor(location: InventoryLocation){
      this.locationName = location.locationName;
      this.address = location.address;
      this.managerName = location.managerName;
      this.phoneNumber = location.phoneNumber;
    }
    

  }
  