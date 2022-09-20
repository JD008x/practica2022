import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ConnectionService } from 'src/app/app-logic/connection.service';
import { InventoryItem } from '../../../../../backend/src/models/inventoryItem.model'
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
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
    'actions'
  ];
  selection = new SelectionModel<Element>(true, []);

  constructor(private inventoryList: ConnectionService) {
    this.inventoryItems = inventoryList.getDataFromBackend();
   }

  ngOnInit(): void {
    this.inventoryList.getDataFromBackend().subscribe(result => {

      if(!result){
        return ;
      }
      this.inventoryItems= new MatTableDataSource(result);
      this.inventoryItems.sort= this.sort;
      this.inventoryItems.paginator=this.paginator;
     })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.inventoryItems.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() :
      this.inventoryItems.data.forEach((row: Element) => this.selection.select(row));
  }
}
