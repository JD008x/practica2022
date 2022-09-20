import { Injectable } from '@angular/core';
import {ContactData} from './contact-data';

@Injectable({
  providedIn: 'root'
})
export class ContactProviderService {
  providedData = <ContactData>{
    info: 'Inventory application',
    address: 'Str. Turnului nr. 5',
    openDays: 'Luni-Vineri',
    timeSlot: '9:00 - 17:00',
    phone: '+40747432345'
  }

  constructor() { }

  getData(): ContactData {
    return this.providedData;
  }
}
