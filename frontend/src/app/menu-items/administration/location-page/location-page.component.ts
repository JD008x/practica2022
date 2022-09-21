import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ConnectionService } from 'src/app/app-logic/connection.service';
import { InventoryLocation} from '../../../../../../backend/src/models/inventoryLocation.model';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css']
})
export class LocationPageComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  location: any;

  locationColumns: string[] = [
    'select',
    'id',
    'locationName',
    'address',
    'managerName',
    'phoneNumber',
    'actions'
  ];
  selection = new SelectionModel<Element>(true, []);

  constructor(private inventoryLocation : ConnectionService) {
    this.location=inventoryLocation.getInventoryLocation();
   }
  ngOnInit(): void {
    this.inventoryLocation.getInventoryLocation().subscribe((result: unknown[] | undefined)=> {

      if(!result){
        return ;
      }
      this.location= new MatTableDataSource(result);
      this.location.sort= this.sort;
      this.location.paginator=this.paginator;
     })
    }
    isAllSelected(): boolean{
      const numSelected=this.selection.selected.length;
      const numRows=this.inventoryLocation.getInventoryLocation.length;
      return numSelected ==numRows;
    }

    masterToggle(){
      /*this.isAllSelected() ? this.selection.clear() :*/
      if(this.isAllSelected()) 
      {this.selection.clear() } 
      else {
        /*var locations= this.inventoryLocation.getInventoryLocation();
        locations.forEach(function (value) {
          console.log(value);
          
        });*/


      }
    };


    }
  