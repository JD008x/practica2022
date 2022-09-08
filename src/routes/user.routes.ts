import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
//import { UserDB } from "../schemas/user.schema";
import * as userService from "../services/user.service";

//create user
const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  let randomVariable: Error | User;

  try {
    randomVariable = await userService.postInventory(body);
  } catch (ex) {
    return next(ex);
  }
  if (randomVariable instanceof Error) {
    return next(randomVariable);
  }

  res.send(randomVariable);
});

/*
//get inventory item
inventoryItemRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    
  } catch (ex) {
    return next(ex);
  }
});

//get all inventory items
inventoryItemRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    
  } catch (ex) {
    return next(ex);
  }
});
//update inventory item
inventoryItemRouter.patch("/:id", (_req: Request, _res: Response, next: NextFunction) => {
  try {
  } catch (ex) {
    return next(ex);
  }
});

//delete inventory item
inventoryItemRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    
  } catch (ex) {
    return next(ex);
  }
});
*/
export { userRouter };
