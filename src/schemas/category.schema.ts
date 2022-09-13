import mongoose from "mongoose";
const { model, Schema } = mongoose;

import { env } from "../env";
import { Category } from "../models/category.model";

const CategorySchema = new Schema<Category>(
  {
    name: { type:String, required: false, default:'unknown'},
    parent_category: { type:String, required: false, default:'unknown'}

  },
  {
    collection: env.CATEGORY_MANAGEMENT,
  }
);

const CategoryDB = model<Category>(
  "category",
  CategorySchema
);

export { CategoryDB };
