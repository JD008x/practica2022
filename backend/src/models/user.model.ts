import { ObjectId } from "mongoose";

export class User{
    id!:ObjectId
    firstName!:string;
    lastName!:string;
    phoneNumber!:string;
    email!:string;

  constructor(user: User){
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
  }

  }