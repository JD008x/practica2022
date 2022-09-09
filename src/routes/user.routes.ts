import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { UserDB } from "../schemas/user.schema";
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


//get user
userRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userById = await UserDB.findById(req.params.id);
    res.send(userById);
  } catch (ex) {
    return next(ex);
  }
});


//get all users
userRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const userItems = await UserDB.find();
      res.send(userItems);
    } catch (ex) {
      return next(ex);
    }
  });
//update user
/*
userRouter.patch("/:id", async (req: Request, _res: Response, next: NextFunction) => {
    try { 
      await UserDB.findOneAndUpdate(
        {id : req.params.id},
        {
        name: 'AlexandraUpdated',
        location:'facultate',
        modifiedDate: Date.now()
        },
        {new: true}
      );
      console.log('updated');
    } catch (ex) {
      return next(ex);
    }
  });
  */

//delete inventory item
userRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserDB.findByIdAndDelete(req.params.id);
      res.send('Deleted Item');
    } catch (ex) {
      return next(ex);
    }
  });

export { userRouter };