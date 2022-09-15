import { Category } from "../models/category.model";
import { CategoryDB } from "../schemas/category.schema";

export async function postCategory(
    category: Category
): Promise<Error | Category>{
    if(!category || !category.name){
        return Error("The parameters given are not valid!");
    }
    try {
        const exists = await CategoryDB.findOne({ name: category.name });
        if (exists) {
          return Error("The item added to the database already exists!");
        }
      } catch (ex: any) {
        return ex;
      }
    const NewCategory = new CategoryDB({
        name: category.name,
        parentCategory: category.parentCategory
    })
    NewCategory.save();
    return NewCategory;
}
