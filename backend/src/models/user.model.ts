import { ObjectId } from "mongoose";

export class User{
    _id!:ObjectId;
    firstName!:string;
    lastName!:string;
    phoneNumber!:string;
    email!:string;

    public constructor(init?:Partial<User>){
      Object.assign(this, init);
/*      
constructor(user: User){
  this._id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
  }
*/
}
}