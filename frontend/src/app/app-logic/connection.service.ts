import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryItem } from '../../../../backend/src/models/inventoryItem.model';
import { Observable } from 'rxjs';
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
      Authorization: 'my-auth-token',
    }),
  };
  inventoryUrl = 'http://localhost:3000/inventory';
  userUrl = 'http://localhost:3000/user';

  inventoryData: Array<InventoryItem>;
  userData: Array<User>;

  constructor(private http: HttpClient) {
    this.inventoryData = new Array<InventoryItem>();
    this.userData = new Array<User>();
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
    return this.http.get<User[]>(this.userUrl);
  }

  getUserById(id : ObjectId): User {
    this.getUsersFromBackend().subscribe((result) => {
      if (!result) {
        return;
      }
      this.userData = result;
    });
    return this.userData.filter((x) => x._id == id)[0];
  }
  
  addUser(user : User): Observable<User>{
    return this.http.post<User>(this.userUrl, user, this.httpOptions);
  }


  getInventoryLocation():Observable<InventoryLocation[]>{
    return this.http.get<InventoryLocation[]>('http://localhost:3000/location');
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