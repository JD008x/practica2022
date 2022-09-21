import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryItem } from '../../../../backend/src/models/inventoryItem.model';
import { Observable } from 'rxjs';
import { ObjectId } from 'mongoose';
import { InventoryItemDB } from '../../../../backend/src/schemas/inventoryItem.schema';
import {postInventory} from '../../../../backend/src/services/inventoryItem.service'
@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  inventoryData !: Array<InventoryItem>;

  constructor(private http: HttpClient) {}

  getDataFromBackend(): Observable<InventoryItem[]>{
    return this.http.get<InventoryItem[]>('http://localhost:3000/inventory');
  }

  getItemById(id:ObjectId):InventoryItem{
    this.getDataFromBackend().subscribe(result => {
      if(!result){
        return ;
      }
      this.inventoryData = result;
     })
    return this.inventoryData.filter((x) => x._id == id)[0];

  }

  addItem(item:InventoryItem){
    console.log(item);
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



}
