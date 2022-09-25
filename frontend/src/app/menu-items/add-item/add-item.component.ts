import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/app-logic/connection.service';
import { InventoryItem } from '../../../../../backend/src/models/inventoryItem.model';
import { ObjectId } from 'mongoose';
import { InventoryLocation } from '../../../../../backend/src/models/inventoryLocation.model';
import { User } from '../../../../../backend/src/models/user.model';
import { Category } from '../../../../../backend/src/models/category.model';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  addItemForm!: FormGroup;
  item: InventoryItem = new InventoryItem();
  itemId!: ObjectId;
  locations!: Array<InventoryLocation>;
  users!: Array<User>;
  categories!: Array<Category>;
  selectedCategory: string;
  selectedUser: string;
  selectedLocation: string;
  editForm = false;
  itemNotFound = false;
  constructor(
    private fb: FormBuilder,
    private connectionService: ConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      this.itemId = params['id'] ?? '0';
    });

    this.addItemForm = this.fb.group({
      name: [this.item.name, Validators.required],
      user: [this.item.user, Validators.required],
      category: [this.item.category, Validators.required],
      location: [this.item.location, Validators.required],
      inventoryNumber: [this.item.inventoryNumber, Validators.required],
      addedDate: [new Date(this.item.addedDate).toISOString().split('T')[0],
        Validators.required],
    });

    this.connectionService.getInventoryLocationData().subscribe((result) => {
      if (!result) {
        return;
      }
      this.locations = result;
    });
    this.connectionService.getUserData().subscribe((result) => {
      if (!result) {
        return;
      }
      this.users = result;
    });
    this.connectionService.getCategoryData().subscribe((result) => {
      if (!result) {
        return;
      }
      this.categories = result;
    });

    this.selectedCategory = '';
    this.selectedUser = '';
    this.selectedLocation = '';
  }

  private async getItem(): Promise<InventoryItem | null> {
    const item = await firstValueFrom(
      this.connectionService.getItemById(this.itemId)
    );
    return item;
  }

  ngOnInit(): void {
    if (String(this.itemId) != '0') {
      this.getItem().then((i) => {
        if (i) {
          this.item = i;

          this.addItemForm = this.fb.group({
            name: [this.item.name, Validators.required],
            user: [this.item.user, Validators.required],
            category: [this.item.category, Validators.required],
            location: [this.item.location, Validators.required],
            inventoryNumber: [this.item.inventoryNumber, Validators.required],
            addedDate: [new Date(this.item.addedDate).toISOString().split('T')[0],
          Validators.required],
          });
        } else {
          this.itemNotFound = true;
        }
      });
    } else {
      this.editForm = true;
    }
  }

  onSubmit() {
    if (String(this.itemId) == '0') {
      this.item = new InventoryItem(this.addItemForm.value);
      this.item.modifiedDate = new Date();
      this.item.isDeleted = false;
      this.connectionService.addItem(this.item).subscribe();
      
    } else {
      
      this.item.name = this.addItemForm.value.name;
      this.item.inventoryNumber = this.addItemForm.value.inventoryNumber;
      this.item.addedDate = new Date(this.addItemForm.value.addedDate);
      this.item.modifiedDate = new Date();
      this.item.isDeleted = this.addItemForm.value.isDeleted;
      this.connectionService.updateItem(this.item).subscribe();
    }

    this.router.navigate(['/inventory']);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addItemForm.controls[controlName].hasError(errorName);
  };

  changeCategory(): void {
    this.addItemForm.value.category = this.selectedCategory;
    this.item.category = this.selectedCategory;
  }
  changeLocation(): void {
    this.addItemForm.value.location = this.selectedLocation;
    this.item.location = this.selectedLocation;
  }
  changeUser(): void {
    this.addItemForm.value.user = this.selectedUser;
    this.item.user = this.selectedUser;
  }
}