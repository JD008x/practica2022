import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ConnectionService } from 'src/app/app-logic/connection.service';
import { Category } from '../../../../../../backend/src/models/category.model';
import { Observable, tap } from 'rxjs';

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

  category: any;

  categoryColumns: string[] = ['select', 'name', 'parentCategory'];
  selection = new SelectionModel<Element>(true, []);

  constructor(private connectionService: ConnectionService) {
    this.connectionService.getCategoryData().subscribe((result) => {
      if (!result) {
        return;
      }
      this.category = result;
    });
  }
  ngOnInit(): void {
    this.connectionService.getCategoryData().subscribe((result) => {
      if (!result) {
        return;
      }
      this.category = new MatTableDataSource(result);
      this.category.sort = this.sort;
      this.category.paginator = this.paginator;
    });
  }
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.connectionService.getCategoryData.length;
    return numSelected == numRows;
  }

  masterToggle() {
    /*this.isAllSelected() ? this.selection.clear() :*/
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      /*var locations= this.inventoryLocation.getInventoryLocation();
        locations.forEach(function (value) {
          console.log(value);
          
        });*/
    }
  }
}
