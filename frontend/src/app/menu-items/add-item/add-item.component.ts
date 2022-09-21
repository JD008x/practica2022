import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/app-logic/connection.service';
import { InventoryItem } from '../../../../../backend/src/models/inventoryItem.model';
import { ObjectId } from 'mongoose';

@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  addItemForm!: FormGroup;
  item!: InventoryItem;
  itemId!: ObjectId;
  constructor(
    private fb: FormBuilder,
    private connectionService: ConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      this.itemId = params['_id'] ?? '0';
    });
  }

  ngOnInit(): void {
    this.item =
      String(this.itemId) == '0'
        ? new InventoryItem()
        : this.connectionService.getItemById(this.itemId);
    this.addItemForm = this.fb.group({
      name: [this.item.name, Validators.required],
      user: [this.item.user, Validators.required],
      category: [this.item.category, Validators.required],
      location: [this.item.location, Validators.required],
      inventoryNumber: [this.item.inventoryNumber, Validators.required],
      addedDate: [
        this.item.addedDate.toISOString().split('T')[0],
        Validators.required,
      ],
    });
  }

  onSubmit() {
    let exists = false;
    if (String(this.itemId) == '0') {
      this.item = new InventoryItem(this.addItemForm.value);
      this.item.modifiedDate = new Date();
      this.item.isDeleted = false;
    } else {
      this.item.name = this.addItemForm.value.name;
      this.item.location = this.addItemForm.value.location;
      this.item.user = this.addItemForm.value.user;

      this.item.inventoryNumber = this.addItemForm.value.inventoryNumber;
      this.item.addedDate = new Date(this.addItemForm.value.addedDate);
      this.item.modifiedDate = new Date();
      this.item.isDeleted = this.addItemForm.value.isDeleted;
      this.item.category = this.addItemForm.value.category;
    }

    this.connectionService
      .addItem(this.item)
      .subscribe((x) => this.connectionService.inventoryData.push(x));
    this.router.navigate(['/inventory']);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addItemForm.controls[controlName].hasError(errorName);
  };
}
