import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ConnectionService } from 'src/app/app-logic/connection.service';
import { Category } from '../../../../../../backend/src/models/category.model';
import { Observable, tap } from 'rxjs';
import { ObjectId } from 'mongoose';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css'],
})
export class CategoryPageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  categorys: any;
  category!: Category;

  categoryColumns: 
  string[] = [
    'select', 
    'name', 
    'parentCategory',
    'actions'
  ];
  selection = new SelectionModel<Element>(true, []);

  constructor(
    private categoryService: ConnectionService,
    private router: Router
    ) {
    this.categoryService.getCategoryData();
    }
  
  ngOnInit(): void {
    this.categoryService.getCategoryData().subscribe((result) => {
      if (!result) {
        return;
      }
      this.categorys = new MatTableDataSource(result);
      this.categorys.sort = this.sort;
      this.categorys.paginator = this.paginator;
    });
  }
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.categorys.data.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.categorys.data.forEach((row: Element) => this.selection.select(row));
  }

  onDelete(id: ObjectId) {
    this.categoryService.deleteCategory(id).subscribe();
    window.location.reload();
  }

  onEdit(id: ObjectId) {
    this.router.navigate(['editCategory/' + id]);
  }
}
