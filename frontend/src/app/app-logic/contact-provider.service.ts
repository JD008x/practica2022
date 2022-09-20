import { Injectable } from '@angular/core';
import {ContactData} from './contact-data';

@Injectable({
  providedIn: 'root'
})
export class ContactProviderService {
  providedData = <ContactData>{
    info: 'Inventory application',
    address: 'Str. Turnului, Nr. 5',
    openDays: 'Luni - Vineri',
    timeSlot: '09:00 - 17:00',
    phone: '+40 747 432 345'
  }

  constructor() { }

  getData(): ContactData {
    return this.providedData;
  }
}
