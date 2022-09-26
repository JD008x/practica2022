import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ConnectionService } from 'src/app/app-logic/connection.service';
import { ObjectId } from 'mongoose';
import { Router } from '@angular/router';

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  inventoryItems: any;

  inventoryColumns: string[] = [
    'select',
    'id',
    'name',
    'description',
    'user',
    'location',
    'inventoryNumber',
    'addedDate',
    'modifiedDate',
    'isDeleted',
    'actions',
  ];
  selection = new SelectionModel<Element>(true, []);

  constructor(
    private inventoryList: ConnectionService,
    private router: Router
  ) {
    this.inventoryItems = inventoryList.getInventoryData();
  }

  ngOnInit(): void {
    this.inventoryList.getInventoryData().subscribe((result) => {
      if (!result) {
        return;
      }
      this.inventoryItems = new MatTableDataSource(result);
      this.inventoryItems.sort = this.sort;
      this.inventoryItems.paginator = this.paginator;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.inventoryItems.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.inventoryItems.data.forEach((row: Element) =>
          this.selection.select(row)
        );
  }

  onEdit(id: ObjectId) {
    this.router.navigate(['edit/' + id]);
  }
  onDelete(id: ObjectId) {
    this.inventoryList.deleteItem(id).subscribe();
    location.reload();
  }
}
