import { Router, Request, Response, NextFunction } from "express";
import { Category } from "../models/category.model";
import { CategoryDB } from "../schemas/category.schema";
import * as categoryService from "../services/category.service";

//create inventory item
const inventoryCategoryRouter = Router();

inventoryCategoryRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  let randomVariable: Error | Category;

  try {
    randomVariable = await categoryService.postInventory(body);
  } catch (ex) {
    return next(ex);
  }
  if (randomVariable instanceof Error) {
    return next(randomVariable);
  }

  res.send(randomVariable);
});

//get inventory item
inventoryCategoryRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inventoryItemById = await CategoryDB.findById(req.params.id);
    res.send(inventoryItemById);
  } catch (ex) {
    return next(ex);
  }
});

//get all inventory items
inventoryCategoryRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const inventoryCategories = await CategoryDB.find();
    res.send(inventoryCategories);
  } catch (ex) {
    return next(ex);
  }
});
//update inventory item
inventoryCategoryRouter.patch("/:id", async (req: Request, _res: Response, next: NextFunction) => {
  try { 
    await CategoryDB.findOneAndUpdate(
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
inventoryCategoryRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await CategoryDB.findByIdAndDelete(req.params.id);
    res.send('Deleted Category');
  } catch (ex) {
    return next(ex);
  }
});

export { inventoryCategoryRouter };
