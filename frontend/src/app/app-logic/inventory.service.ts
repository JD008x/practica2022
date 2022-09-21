import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryItem } from '../../../../backend/src/models/inventoryItem.model';
import { catchError, Observable } from 'rxjs';
import { ObjectId } from 'mongoose';
import { InventoryItemDB } from '../../../../backend/src/schemas/inventoryItem.schema';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };
  inventoryUrl = 'http://localhost:3000/inventory';
  inventoryData: Array<InventoryItem>;

  constructor(private http: HttpClient) {
    this.inventoryData = new Array<InventoryItem>();
  }

  getDataFromBackend(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.inventoryUrl);
  }

  getItemById(id: ObjectId): InventoryItem {
    this.getDataFromBackend().subscribe((result) => {
      if (!result) {
        return;
      }
      this.inventoryData = result;
    });
    return this.inventoryData.filter((x) => x._id == id)[0];
  }

  addItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(
      this.inventoryUrl,
      item,
      this.httpOptions
    );
  }
}
