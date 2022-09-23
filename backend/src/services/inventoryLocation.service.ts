import { InventoryLocation } from "../models/inventoryLocation.model";
import { InventoryLocationDB } from "../schemas/inventoryLocation.schema";

export async function postLocation(
    inventoryLocation: InventoryLocation
): Promise<Error | InventoryLocation>{
    if(!inventoryLocation || !inventoryLocation.locationName){
        return Error("The parameters given are not valid!");
    }
    try {
        const exists = await InventoryLocationDB.findOne({ locationName: inventoryLocation.locationName });
        if (exists) {
          return Error("The item added to the database already exists!");
        }
      } catch (ex: any) {
        return ex;
      }
    const NewInventoryLocation = new InventoryLocationDB({
        locationName: inventoryLocation.locationName,
        address: inventoryLocation.address,
        managerName: inventoryLocation.managerName,
        phoneNumber: inventoryLocation.phoneNumber
    })
    NewInventoryLocation.save();
    return NewInventoryLocation;
}