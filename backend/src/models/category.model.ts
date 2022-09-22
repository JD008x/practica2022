import { ObjectId } from "mongoose";

export class Category {
  _id!: ObjectId;
  name!: string;
  parentCategory?: string;

  public constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
}
