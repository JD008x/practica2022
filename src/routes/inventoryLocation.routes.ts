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
inventoryLocationRouter.patch("/:id", async (req: Request, _res: Response, next: NextFunction) => {
    try { 
      await InventoryLocationDB.findOneAndUpdate(
        {id : req.params.id},
        {
        //aici trebuie sa poti sa updatezi din app orice camp
        locationName: 'AndreiUpdated',
        managerName: 'Andrei'
        },
        {new: true}
      );
      console.log('updated');
    } catch (ex) {
      return next(ex);
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