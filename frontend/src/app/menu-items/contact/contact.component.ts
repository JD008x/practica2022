import { Component, OnInit } from '@angular/core';
import { ContactData } from 'src/app/app-logic/contact-data';
import { ContactProviderService } from 'src/app/app-logic/contact-provider.service';


@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactData: ContactData ;
  
  constructor(private contactProviderService:ContactProviderService) {
    this.contactData = contactProviderService.getData();
   }

  ngOnInit(): void {
  }

}
