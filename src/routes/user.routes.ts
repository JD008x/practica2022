import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { UserDB } from "../schemas/user.schema";
import * as userService from "../services/user.service";

import { InventoryItemDB } from "../schemas/inventoryItem.schema";

//create user
const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  let randomVariable: Error | User;

  try {
    randomVariable = await userService.postUser(body);
  } catch (ex) {
    return next(ex);
  }
  if (randomVariable instanceof Error) {
    return next(randomVariable);
  }

  res.send(randomVariable);
});
//get 
userRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userById = await UserDB.findById(req.params.id);
    res.send(userById);
  } catch (ex) {
    return next(ex);
  }
});

//get all 
userRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const userItems = await UserDB.find();
    res.send(userItems);
  } catch (ex) {
    return next(ex);
  }
});
//update
userRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    user : body;
    if(body.firstName || body.lastName || body.phoneNumber || body.email)
    {
      try {
      const findUser = await UserDB.findByIdAndUpdate(
            { _id : req.params.id},
            {   firstName: body.firstName,
                lastName: body.lastName,
                phoneNumber: body.phoneNumber,
                email: body.email },
            //res.send(UserDB)
          );
        if(findUser == null)
            return next('Could not find user!');
        console.log('updated');
        const userById = await UserDB.findById(req.params.id);
        res.send(userById);
    } catch (ex) {
      return next(ex);
    }
  }else{
    return next('No attributes found!');
  }
  });


//delete
userRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserDB.findById(req.params.id);
    const fullname = user?.firstName?.concat(" ").concat(user.lastName);

    await UserDB.findByIdAndDelete(req.params.id);
    res.send('Deleted Item');
    console.log('deleted')
    
    await InventoryItemDB.findOneAndUpdate(
        { user : fullname},
        { user : null }
    );

  } catch (ex) {
    return next(ex);
  }
});

export { userRouter };
