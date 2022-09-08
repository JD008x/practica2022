import { Router, Request, Response, NextFunction } from "express";
import { InventoryItem } from "../models/inventoryItem.model";
import { InventoryItemDB } from "../schemas/inventoryItem.schema";
import * as inventoryItemService from "../services/inventoryItem.service";

//create inventory item
const inventoryItemRouter = Router();

inventoryItemRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
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
});

//get inventory item
inventoryItemRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inventoryItemById = await InventoryItemDB.findById(req.params.id);
    res.send(inventoryItemById);
  } catch (ex) {
    return next(ex);
  }
});

//get all inventory items
inventoryItemRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const inventoryItems = await InventoryItemDB.find();
    res.send(inventoryItems);
  } catch (ex) {
    return next(ex);
  }
});
//update inventory item
inventoryItemRouter.patch("/:id", async (req: Request, _res: Response, next: NextFunction) => {
  try { 
    await InventoryItemDB.findOneAndUpdate(
      {id : req.params.id},
      {
      //aici trebuie sa poti sa updatezi din app orice camp
      name: 'AndreiUpdated',
      location:'acasa',
      modifiedDate: Date.now()
      },
      {new: true}
    );
    console.log('updated');
  } catch (ex) {
    return next(ex);
  }
});

//delete inventory item
inventoryItemRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await InventoryItemDB.findByIdAndDelete(req.params.id);
    res.send('Deleted Item');
  } catch (ex) {
    return next(ex);
  }
});

export { inventoryItemRouter };
