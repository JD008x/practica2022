import { Router, Request, Response, NextFunction } from "express";
import { InventoryLocation } from "../models/inventoryLocation.model";
import { InventoryLocationDB } from "../schemas/inventoryLocation.schema";
import * as inventoryLocationService from "../services/inventoryLocation.service";

const inventoryLocationRouter = Router();

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

inventoryLocationRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const inventoryLocations = await InventoryLocationDB.find();
      res.send(inventoryLocations);
    } catch (ex) {
      return next(ex);
    }
  });

  export {inventoryLocationRouter};