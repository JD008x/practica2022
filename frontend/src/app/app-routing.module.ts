import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { InventoryComponent } from './menu-items/inventory/inventory.component';
import { ScanComponent } from './menu-items/scan/scan.component';
import { AddItemComponent } from './menu-items/add-item/add-item.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { UsersPageComponent } from './menu-items/administration/users-page/users-page.component';
import { AddUserComponent } from './menu-items/administration/users-page/add-user/add-user.component';
import { LocationPageComponent } from './menu-items/administration/location-page/location-page.component';
import { ShowItemComponent } from './show-item/show-item.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon'
import { AddLocationComponent } from './menu-items/administration/location-page/add-location/add-location.component';

const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path:'inventory', component:InventoryComponent},
  {path:'scan', component:ScanComponent},
  {path:'add-item', component:AddItemComponent},
  {path:'edit/:id', component:AddItemComponent},
  {path:'item/:id', component:ShowItemComponent},
  {path:'contact', component:ContactComponent},
  {path:'users', component:UsersPageComponent},
  {path:'addUser', component:AddUserComponent},
  {path:'editUser/:id', component:AddUserComponent},
  {path:'location', component:LocationPageComponent},
  {path:'addLocation', component:AddLocationComponent},
  {path:'editLocation/:id', component:AddLocationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            MatMenuModule,
            MatIconModule],
  exports: [RouterModule,
            MatMenuModule,
            MatIconModule]

})

export class AppRoutingModule {}

export const RoutingComponent = [
  HomePageComponent,
  InventoryComponent,
  ScanComponent,
  AddItemComponent,
  ContactComponent,
  UsersPageComponent,
  AddUserComponent,
];
