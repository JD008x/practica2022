import { ObjectId } from "mongoose";

export class User{
    _id!:ObjectId;
    firstName='';
    lastName='';
    phoneNumber='';
    email='';

    public constructor(init?:Partial<User>){
      Object.assign(this, init);
      
 /* constructor(user: User){
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
  }
*/
  }
}