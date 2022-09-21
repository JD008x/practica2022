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
  constructor(private http: HttpClient) {
    this.inventoryData = new Array<InventoryItem>();
  }

  getDataFromBackend(): Observable<InventoryItem[]>{
    return this.http.get<InventoryItem[]>(this.inventoryUrl);
  }

  getUsersFromBackend(): Observable<User[]>{
    return this.http.get<User[]>(this.userUrl);
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
  
/*
  getUserById(id : ObjectId): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/user/:id');
  }

  postUser(user : User): Observable<User[]>{
    return this.http.post<User[]>('http://localhost:3000/user', user);
  }*/
  deleteUsers(id : ObjectId): Observable<User[]>{
    return this.http.delete<User[]>('http://localhost:3000/user/:id');
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