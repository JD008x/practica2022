import { Router, Request, Response, NextFunction } from "express";
import { InventoryLocation } from "../models/inventoryLocation.model";
import { InventoryLocationDB } from "../schemas/inventoryLocation.schema";
import * as inventoryLocationService from "../services/inventoryLocation.service";

const inventoryLocationRouter = Router();
//create
inventoryLocationRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  let randomVariable: Error | InventoryLocation;

  try {
    randomVariable = await inventoryLocationService.postLocation(body);
  } catch (ex) {
    return next(ex);
  }
  if (randomVariable instanceof Error) {
    return next(randomVariable);
  }

  res.send(randomVariable);
});
//get all
inventoryLocationRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const inventoryLocations = await InventoryLocationDB.find();
      res.send(inventoryLocations);
    } catch (ex) {
      return next(ex);
    }
  });
//get 1
inventoryLocationRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inventoryLocationItem = await InventoryLocationDB.findById(req.params.id);
      res.send(inventoryLocationItem);
    } catch (ex) {
      return next(ex);
    }
  });
//update
inventoryLocationRouter.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  location : body;
  if(body.locationName || body.address || body.managerName || body.phoneNumber)
  {
    try {
      const findLocation = await InventoryLocationDB.findByIdAndUpdate(
          { _id : req.params.id},
          {   locationName: body.locationName,
              address: body.address,
              managerName: body.managerName,
              phoneNumber: body.phoneNumber },
        );
      if(findLocation == null)
          return next("Could not find this location");
      console.log('updated');
      const inventoryLocationById = await InventoryLocationDB.findById(req.params.id);
      res.send(inventoryLocationById);
    } catch (ex) {
      return next(ex);
    }
  }else{
    return next('No attributes found!');
  }
  });
//delete 
inventoryLocationRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await InventoryLocationDB.findByIdAndDelete(req.params.id);
    res.send('Deleted Item');
  } catch (ex) {
    return next(ex);
  }
});
  export {inventoryLocationRouter};