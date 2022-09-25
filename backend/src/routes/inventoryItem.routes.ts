import { Router, Request, Response, NextFunction } from "express";
import { InventoryItem } from "../models/inventoryItem.model";
import { InventoryItemDB } from "../schemas/inventoryItem.schema";
import * as inventoryItemService from "../services/inventoryItem.service";

//create inventory item
const inventoryItemRouter = Router();

inventoryItemRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    let randomVariable: Error | InventoryItem;
    try {
      randomVariable = await inventoryItemService.postInventory(body);
    } catch (ex) {
      return next(ex);
    }
    if (randomVariable instanceof Error) {
      return next(randomVariable);
    }

    res.send(randomVariable);
  }
);

//get inventory item
inventoryItemRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inventoryItemById = await InventoryItemDB.findById(req.params.id);
      res.send(inventoryItemById);
    } catch (ex) {
      return next(ex);
    }
  }
);

//get all inventory items
inventoryItemRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const inventoryItems = await InventoryItemDB.find();
      res.send(inventoryItems);
    } catch (ex) {
      return next(ex);
    }
  }
);
//update inventory item
inventoryItemRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    inventoryItem: body;
    if (
      body.user ||
      body.name ||
      body.category ||
      body.inventoryNumber ||
      body.addedDate ||
      body.modifiedDate ||
      body.location ||
      body.isDeleted
    ) {
      try {
        const findInventoryItem = await InventoryItemDB.findByIdAndUpdate(
          { _id: req.params.id },
          {
            user: body.user,
            name: body.name,
            category: body.category,
            inventoryNumber: body.inventoryNumber,
            addedDate: body.addedDate,
            modifiedDate: Date.now(),
            location: body.location,
            isDeleted: body.isDeleted,
          }
        );
        if (findInventoryItem == null)
          return next("Could not find inventory item!");
        console.log("updated");
        const inventoryItemById = await InventoryItemDB.findById(req.params.id);
        res.send(inventoryItemById);
      } catch (ex) {
        return next(ex);
      }
    } else {
      return next("No attributes found!");
    }
  }
);

//delete inventory item
inventoryItemRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await InventoryItemDB.findByIdAndDelete(req.params.id);
      res.send("Deleted Item");
    } catch (ex) {
      return next(ex);
    }
  }
);

export { inventoryItemRouter };