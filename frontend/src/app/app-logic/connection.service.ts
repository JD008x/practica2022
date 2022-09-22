import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryItem } from '../../../../backend/src/models/inventoryItem.model';
import { Observable, tap } from 'rxjs';
import { ObjectId } from 'mongoose';
import { User } from '../../../../backend/src/models/user.model';
import { InventoryLocation } from '../../../../backend/src/models/inventoryLocation.model';
import { Category } from '../../../../backend/src/models/category.model';
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
  userIdUrl = 'http://localhost:3000/user/:id';
  locationUrl = 'http://localhost:3000/location';
  categoryUrl = 'http://localhost:3000/category';

  locationData: Array<Location>;
  inventoryData: Array<InventoryItem>;
  userData: Array<User>;
  categoryData: Array<Category>;
  constructor(private http: HttpClient) {
    this.inventoryData = new Array<InventoryItem>();
    this.locationData = new Array<Location>();
    this.userData = new Array<User>();
    this.categoryData = new Array<Category>();
  }

  //LOCATION ACTIONS
  getInventoryLocationData(): Observable<InventoryLocation[]> {
    return this.http.get<InventoryLocation[]>(this.locationUrl);
  }

  //CATEGORY ACTIONS
  getCategoryData(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getCategoryById(id: ObjectId): Category {
    this.getCategoryData().subscribe((result) => {
      if (!result) {
        return;
      }
      this.categoryData = result;
    });
    return this.categoryData.filter((x) => x._id == id)[0];
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      this.categoryUrl,
      category,
      this.httpOptions
    );
  }

  deleteCategory(id: ObjectId): Observable<Category[]> {
    return this.http.delete<Category[]>(this.categoryUrl);
  }

  //INVENTORY ACTIONS
  getInventoryData(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.inventoryUrl);
  }

  verifyExistance(inventoryNumber: number): boolean {
    this.getInventoryData().subscribe((result) => {
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

  getItemById(id: ObjectId): Observable<InventoryItem> {
    console.log(this.http.get<InventoryItem>(this.inventoryUrl + id));
    return this.http.get<InventoryItem>(this.inventoryUrl + '/' + id);
  }

  deleteInventoryItem(id: ObjectId): Observable<InventoryItem[]> {
    return this.http.delete<InventoryItem[]>(this.inventoryUrl);
  }

  //USER ACTIONS
  getUserData(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  getUserById(id: ObjectId): User {
    this.getUserData().subscribe((result) => {
      if (!result) {
        return;
      }
      this.userData = result;
    });
    return this.userData.filter((x) => x._id == id)[0];
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions);
  }

  deleteUsers(id: ObjectId): Observable<User[]> {
    return this.http.delete<User[]>(this.userIdUrl);
  }
}
