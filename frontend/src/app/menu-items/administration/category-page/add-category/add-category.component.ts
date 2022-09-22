import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongoose';
import { ConnectionService } from 'src/app/app-logic/connection.service';
import { Category } from '../../../../../../../backend/src/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm!: FormGroup;
  category!: Category;
  categoryId!: ObjectId;
  constructor(
    private fb: FormBuilder,
    private connectionService: ConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      this.categoryId = params['_id'] ?? '0';
    });
  }

  ngOnInit(): void {
    this.category =
      String(this.categoryId) == '0'
        ? new Category()
        : this.connectionService.getCategoryById(this.categoryId);
    this.addCategoryForm = this.fb.group({
      name: [this.category.name, Validators.required],
      parentCategory: [this.category.parentCategory, Validators.required],
    });
  }

  onSubmit() {
    if (String(this.categoryId) == '0') {
      this.category = new Category(this.addCategoryForm.value);
    } else {
      this.category.name = this.addCategoryForm.value.name;
      this.category.parentCategory = this.addCategoryForm.value.parentCategory;
    }
    this.connectionService
      .addCategory(this.category)
      .subscribe((x) => this.connectionService.categoryData.push(x));
    this.router.navigate(['/category']);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addCategoryForm.controls[controlName].hasError(errorName);
  };
}
