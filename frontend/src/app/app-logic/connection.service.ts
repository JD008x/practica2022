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
  locationUrl = 'http://localhost:3000/location';
  categoryUrl = 'http://localhost:3000/category';

  locationData: Array<InventoryLocation>;
  inventoryData: Array<InventoryItem>;
  userData: Array<User>;
  categoryData: Array<Category>;

  constructor(private http: HttpClient) {
    this.inventoryData = new Array<InventoryItem>();
    this.locationData = new Array<InventoryLocation>();
    this.userData = new Array<User>();
    this.categoryData = new Array<Category>();
  }

  //LOCATION ACTIONS
  getInventoryLocationData(): Observable<InventoryLocation[]> {
    return this.http.get<InventoryLocation[]>(this.locationUrl);
  }

  getLocationById(id: ObjectId): Observable<InventoryLocation | null> {
    const url = `${this.locationUrl}/${id}`;
    return this.http.get<InventoryLocation>(url);
  }

  addLocation(location: InventoryLocation): Observable<InventoryLocation> {
    return this.http.post<InventoryLocation>(
      this.locationUrl,
      location,
      this.httpOptions
    );
  }

  updateLocation(location: InventoryLocation): Observable<InventoryLocation>{
    const url = this.locationUrl + '/' + location._id;
    return this.http.put<InventoryLocation>(url, location, this.httpOptions);
  }

  deleteLocation(id: ObjectId) {
    const url = this.locationUrl + '/' + id;
    return this.http.delete(url);
  }

  //CATEGORY ACTIONS
  getCategoryData(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getCategoryById(id: ObjectId): Observable<Category | null> {
    const url = `${this.categoryUrl}/${id}`;
    return this.http.get<Category>(url);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      this.categoryUrl,
      category,
      this.httpOptions
    );
  }

  updateCategory(category: Category): Observable<Category> {
    const url = this.categoryUrl + '/' + category._id;
    console.log(url);
    return this.http.put<Category>(url, category, this.httpOptions);
  }

  deleteCategory(id: ObjectId) {
    const url = this.categoryUrl + '/' + id;
    return this.http.delete(url);
  }

  getCategoriesFromBackend(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.categoryUrl)
      .pipe(tap((result: Category[]) => (this.categoryData = result)));
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

  updateItem(inventoryItem: InventoryItem): Observable<InventoryItem> {
    const url = this.inventoryUrl + '/' + inventoryItem._id;
    console.log(url);
    return this.http.patch<InventoryItem>(url, inventoryItem, this.httpOptions);
  }

  //USER ACTIONS
  getUserData(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions);
  }

  updateUser(user: User): Observable<User> {
    const url = this.userUrl + '/' + user._id;
    console.log(url);
    return this.http.put<User>(url, user, this.httpOptions);
  }

  deleteUser(id: ObjectId) {
    const url = this.userUrl + '/' + id;
    return this.http.delete(url);
  }

  getUsersFromBackend(): Observable<User[]> {
    return this.http
      .get<User[]>(this.userUrl)
      .pipe(tap((result: User[]) => (this.userData = result)));
  }

  getUserById(id: ObjectId): Observable<User | null> {
    // editUser/632c147d72828689cbfa1ef7 on backend should bring an User object or null (if not found)
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url);
  }
}
