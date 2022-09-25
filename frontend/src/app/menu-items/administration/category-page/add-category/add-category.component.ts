import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { ConnectionService } from 'src/app/app-logic/connection.service';
import { Category } from '../../../../../../../backend/src/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm!: FormGroup;
  category: Category = new Category();
  categoryId!: ObjectId;
  categoryNotFound = false;
  constructor(
    private fb: FormBuilder,
    private categoryService: ConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      this.categoryId = params['id'] ?? '0';
    });

    this.addCategoryForm = this.fb.group({
      name: [this.category.name, Validators.required],
      parentCategory: [this.category.parentCategory, Validators.required],
    });
  }

  private async getCategory(): Promise<Category | null> {
    const category = await firstValueFrom(
      this.categoryService.getCategoryById(this.categoryId)
    );
    return category;
  }

  ngOnInit(): void {
    if (String(this.categoryId) != '0') {
      this.getCategory().then((c) => {
        if (c) {
          this.category = c;

          this.addCategoryForm = this.fb.group({
            name: [this.category.name, Validators.required],
            parentCategory: [this.category.parentCategory, Validators.required],
          });
        } else {
          this.categoryNotFound = true;
        }
      });
    }
  }

  onSubmit() {
    if (String(this.categoryId) == '0') {
      this.category = new Category(this.addCategoryForm.value);
      this.categoryService.addCategory(this.category).subscribe();
    } else {
      this.category.name = this.addCategoryForm.value.name;
      this.category.parentCategory = this.addCategoryForm.value.parentCategory;
      this.categoryService.updateCategory(this.category).subscribe();
    }
    this.router.navigate(['/category']);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addCategoryForm.controls[controlName].hasError(errorName);
  };
}
