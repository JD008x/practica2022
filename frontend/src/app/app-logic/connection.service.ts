import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryItem } from '../../../../backend/src/models/inventoryItem.model';
import { Observable, tap } from 'rxjs';

import { User } from '../../../../backend/src/models/user.model';
import { InventoryLocation } from '../../../../backend/src/models/inventoryLocation.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  constructor(private http: HttpClient) {}

  getDataFromBackend(): Observable<InventoryItem[]>{
    return this.http.get<InventoryItem[]>('http://localhost:3000/inventory');
  }

  getUsersFromBackend(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/user');
  }

  getInventoryLocation():Observable<InventoryLocation[]>{
    return this.http.get<InventoryLocation[]>('http://localhost:3000/location');
  }
  
}