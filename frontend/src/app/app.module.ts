import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { InventoryComponent } from './menu-items/inventory/inventory.component';
import { ScanComponent } from './menu-items/scan/scan.component';
import { AddItemComponent } from './menu-items/add-item/add-item.component';
import { EditComponent } from './menu-items/edit/edit.component';
import { UsersPageComponent } from './menu-items/administration/users-page/users-page.component';
import { LocationPageComponent } from './menu-items/administration/location-page/location-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ShowItemComponent } from './show-item/show-item.component'
import {QRCodeModule} from 'angularx-qrcode'
import {ZXingScannerModule} from '@zxing/ngx-scanner'
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddUserComponent } from './menu-items/administration/users-page/add-user/add-user.component';
import { ShowUserComponent } from './menu-items/administration/users-page/show-user/show-user.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatInputModule } from '@angular/material/input'


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactComponent,
    InventoryComponent,
    ScanComponent,
    AddItemComponent,
    EditComponent,
    UsersPageComponent,
    LocationPageComponent,
    AddUserComponent,
    ShowUserComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    QRCodeModule,
    ZXingScannerModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSortModule,
    MatCheckboxModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
