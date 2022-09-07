import { Router, Request, Response, NextFunction } from "express";
import { InventoryItem } from "../models/inventoryItem.model";
import * as inventoryItemService from "../services/inventoryservice";

//create inventory item
const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
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
router.get("/:id", (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Hello World");
  } catch (ex) {
    return next(ex);
  }
});

//get all inventory items
router.get("/", (_req: Request, _res: Response, next: NextFunction) => {
  try {
  } catch (ex) {
    return next(ex);
  }
});
//update inventory item
router.patch("/:id", (_req: Request, _res: Response, next: NextFunction) => {
  try {
  } catch (ex) {
    return next(ex);
  }
});

//delete inventory item
router.delete("/:id", (_req: Request, _res: Response, next: NextFunction) => {
  try {
  } catch (ex) {
    return next(ex);
  }
});

export { router };
