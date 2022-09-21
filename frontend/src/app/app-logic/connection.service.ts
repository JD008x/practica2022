import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryItem } from '../../../../backend/src/models/inventoryItem.model';
import { Observable } from 'rxjs';
import { ObjectId } from 'mongoose';
import { InventoryItemDB } from '../../../../backend/src/schemas/inventoryItem.schema';
import { postInventory } from '../../../../backend/src/services/inventoryItem.service';
import { User } from '../../../../backend/src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };
  inventoryUrl = 'http://localhost:3000/inventory';
  userUrl = 'http://localhost:3000/user';
  inventoryData: Array<InventoryItem>;

  constructor(private http: HttpClient) {
    this.inventoryData = new Array<InventoryItem>();
  }

  getDataFromBackend(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.inventoryUrl);
  }

  getUsersFromBackend(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  // getItemById(id: ObjectId) {
  //   return this.http.get<InventoryItem>(this.inventoryUrl + String(id));
  // }
  getItemById(id: ObjectId): InventoryItem {
    this.getDataFromBackend().subscribe((result) => {
      if (!result) {
        return;
      }
      this.inventoryData = result;
    });
    return this.inventoryData.filter((x) => x._id == id)[0];
  }

  verifyExistance(inventoryNumber: number): boolean {
    this.getDataFromBackend().subscribe((result) => {
      if (!result) {
        return;
      }
      this.inventoryData = result;
    });
    if (
      this.inventoryData.filter((x) => x.inventoryNumber == inventoryNumber)[0]
    ) {
      return true;
    }
    return false;
  }

  addItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(
      this.inventoryUrl,
      item,
      this.httpOptions
    );
  }
}
