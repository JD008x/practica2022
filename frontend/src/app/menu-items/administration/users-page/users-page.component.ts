import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ConnectionService } from 'src/app/app-logic/connection.service';

import { Observable, tap } from 'rxjs';
import { ObjectId } from 'mongoose';
import { User } from '../../../../../../backend/src/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  users: any;
  user!: User;

  userColumns: string[] = [
    'select',
    'id',
    'firstname',
    'lastname',
    'phoneNumber',
    'email',
    'actions',
  ];
  selection = new SelectionModel<Element>(true, []);

  constructor(
    private userService: ConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.users = userService.getUsersFromBackend();
  }

  ngOnInit(): void {
    this.userService.getUsersFromBackend().subscribe((result) => {
      if (!result) {
        return;
      }

      this.users = new MatTableDataSource(result);
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.users.data.forEach((row: Element) => this.selection.select(row));
  }

  onDelete(id: ObjectId) {
    this.userService.deleteUser(id).subscribe();
    window.location.reload();
  }

  onEdit(id: ObjectId) {
    this.router.navigate(['editUser/' + id]);
  }
}
