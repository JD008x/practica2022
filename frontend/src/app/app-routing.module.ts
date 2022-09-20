import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { InventoryComponent } from './menu-items/inventory/inventory.component';
import { ScanComponent } from './menu-items/scan/scan.component';
import { AddItemComponent } from './menu-items/add-item/add-item.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { UsersPageComponent } from './menu-items/administration/users-page/users-page.component';
import { LocationPageComponent } from './menu-items/administration/location-page/location-page.component';
import { ShowItemComponent } from './show-item/show-item.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon'

const routes: Routes = [
<<<<<<< HEAD
  {path:'', component: HomePageComponent},
  {path:'inventory', component:InventoryComponent},
  {path:'scan', component:ScanComponent},
  {path:'add-item', component:AddItemComponent},
  {path:'edit/:id', component:AddItemComponent},
  {path:'item/:id', component:ShowItemComponent},
  {path:'contact', component:ContactComponent},
  {path:'users', component:UsersPageComponent},
  {path:'location', component:LocationPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            MatMenuModule,
            MatIconModule],
  exports: [RouterModule,
            MatMenuModule,
            MatIconModule]
=======
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'edit/:id', component: AddItemComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'administration', component: AdministrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
>>>>>>> 8ad67f5cfed52b1f1fd6e501a890591f8532831e
})
export class AppRoutingModule {}
export const RoutingComponent = [
  HomePageComponent,
  InventoryComponent,
  ScanComponent,
  AddItemComponent,
  ContactComponent,
];
