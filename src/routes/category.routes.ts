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
    randomVariable = await categoryService.postCategory(body);
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
    const categoryById = await CategoryDB.findById(req.params.id);
    res.send(categoryById);
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
inventoryCategoryRouter.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    inventoryCategory: body;
    if(body.name || body.parentCategory)
    { try { 
        const findCategory = await CategoryDB.findByIdAndUpdate(
          {_id: req.params.id},
          {
            name: body.name,
            parentCategory:body.parentCategory
          }
        );
        if(findCategory == null)
            return next('Could not find category!');
        console.log('updated');
        const categoryById = await CategoryDB.findById(req.params.id);
        res.send(categoryById);
  } catch (ex) {
    return next(ex);
  }
}else{
    return next('No attributes found!');
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
