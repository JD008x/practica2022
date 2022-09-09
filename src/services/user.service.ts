import { User } from "../models/user.model";
import { UserDB } from "../schemas/user.schema";

export async function postInventory(
  user: User
): Promise<Error | User> {
  if (!user || !user.firstName || !user.lastName || !user.phoneNumber) {
    return Error("The parameters given are not valid!");
  }

  try {
    const emailExists = await UserDB.findOne({ email: user.email });
    if (emailExists) {
      return Error("The user added to the database already exists!");
    }
    const phoneNumberExists = await UserDB.findOne({phoneNumber: user.phoneNumber})
    if(phoneNumberExists){
      return Error("The user number added to the database already exists!");
    }
  } catch (ex: any) {
    return ex;
  }

  const NewUser = new UserDB({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
  });
  NewUser.save();
  return NewUser;
}
