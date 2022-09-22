import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryItem } from '../../../../backend/src/models/inventoryItem.model';
import { Observable, tap } from 'rxjs';
import { ObjectId } from 'mongoose';
import { InventoryItemDB } from '../../../../backend/src/schemas/inventoryItem.schema';
import {postInventory} from '../../../../backend/src/services/inventoryItem.service'
import { User } from '../../../../backend/src/models/user.model';
import { InventoryLocation } from '../../../../backend/src/models/inventoryLocation.model';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    }),
  };
  inventoryUrl = 'http://localhost:3000/inventory';
  userUrl = 'http://localhost:3000/user';
  locationUrl = 'http://localhost:3000/location';

  inventoryData: Array<InventoryItem>;
  userData: Array<User>;
  locationData: Array<InventoryLocation>;

  constructor(private http: HttpClient) {
    this.inventoryData = new Array<InventoryItem>();
    this.userData = new Array<User>();
    this.locationData = new Array<InventoryLocation>();
  }

  getDataFromBackend(): Observable<InventoryItem[]>{
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


  getUsersFromBackend(): Observable<User[]>{
    return this.http
    .get<User[]>(this.userUrl)
    .pipe(
      tap((result: User[]) => this.userData = result)
    );
  }

  getUserById(id : ObjectId): Observable<User | null> {
    // editUser/632c147d72828689cbfa1ef7 on backend should bring an User object or null (if not found)
    const url = `${this.userUrl}/${id}`;
    return this.http
    .get<User>(url);
  }

  addUser(user : User): Observable<User>{
    return this.http.post<User>(this.userUrl, user, this.httpOptions);
  }

  updateUser(user : User): Observable<User> {
    const url = this.userUrl+'/'+user._id;
    console.log(url);
    return this.http.put<User>(url, user, this.httpOptions);
    
  }

  deleteUser(id:ObjectId) {
    const url = this.userUrl+'/'+id;
    return this.http.delete(url);
  }


  getInventoryLocation():Observable<InventoryLocation[]>{
    return this.http.get<InventoryLocation[]>(this.locationUrl);
  }

  getLocationById(id : ObjectId): InventoryLocation {
    this.getInventoryLocation().subscribe((result) => {
      if (!result) {
        return;
      }
      this.locationData = result;
    });
    return this.locationData.filter((x) => x._id == id)[0];
  }

  addLocation(location : InventoryLocation): Observable<InventoryLocation>{
    return this.http.post<InventoryLocation>(this.locationUrl, location, this.httpOptions);
  }

  updateLocation(id: ObjectId) {
    const url = this.locationUrl+'/'+id;
    return this.http.put(url, this.httpOptions);
  }

  deleteLocation(id:ObjectId) {
    const url = this.locationUrl+'/'+id;
    return this.http.delete(url);
  }

  /*
  getItemById(id:ObjectId):InventoryItem{
    this.getDataFromBackend().subscribe(result => {
      if(!result){
        return ;
      }
      this.inventoryData = result;
     })
    return this.inventoryData.filter((x) => x._id == id)[0];

  }*/

 // addItem(item:InventoryItem){
 //   console.log(item);
    // console.log(InventoryItemDB.db.name);
    // const NewInventoryItem = new InventoryItemDB({
    //   user : item.user,
    //   name: item.name ,
    //   category: item.category ,
    //   inventoryNumber : item.inventoryNumber,
    //   addedDate: item.addedDate,
    //   modifiedDate: item.modifiedDate ,
    //   location: item.location,
    //   isDeleted: item.isDeleted
    // });

    // NewInventoryItem.save();


}
