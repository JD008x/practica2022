import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ConnectionService } from 'src/app/app-logic/connection.service';
import { InventoryLocation } from '../../../../../../backend/src/models/inventoryLocation.model';
import { Observable, tap } from 'rxjs';
import { ObjectId } from 'mongoose';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css'],
})
export class LocationPageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  locations: any;
  locationId!: ObjectId;

  locationColumns: string[] = [
    'select',
    'id',
    'locationName',
    'address',
    'managerName',
    'phoneNumber',
    'actions',
  ];
  selection = new SelectionModel<Element>(true, []);

  constructor(
    private connectionService: ConnectionService,
    private router: Router
  ) {
    this.locations = connectionService.getInventoryLocationData();
  }
  ngOnInit(): void {
    this.connectionService
      .getInventoryLocationData()
      .subscribe((result: unknown[] | undefined) => {
        if (!result) {
          return;
        }
        this.locations = new MatTableDataSource(result);
        this.locations.sort = this.sort;
        this.locations.paginator = this.paginator;
      });
  }
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.connectionService.getInventoryLocationData.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.locations.data.forEach((row: Element) =>
          this.selection.select(row)
        );
  }

  onDelete(id: ObjectId) {
    this.connectionService.deleteLocation(id).subscribe();
    window.location.reload();
  }

  onEdit(id: ObjectId) {
    this.router.navigate(['editLocation/' + id]);
  }
}
