import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectId } from 'mongoose';
import { InventoryItem } from '../../../../backend/src/models/inventoryItem.model';
import { ConnectionService } from '../app-logic/connection.service';
@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css'],
})
export class ShowItemComponent implements OnInit {
  itemId!: ObjectId;
  item!: InventoryItem;
  itemIsFound = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: ConnectionService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      this.itemId = params['id'] ?? 0;
    });
    this.item = new InventoryItem();
  }

  ngOnInit(): void {
    this.inventoryService.getItemById(this.itemId).subscribe((result) => {
      if (!result) {
        return;
      }
      this.item = result;
    });
    this.itemIsFound = this.item ? true : false;
  }

  editItem() {
    console.log(this.itemId);
    this.router.navigate(['/edit/' + this.itemId]);
  }
}
