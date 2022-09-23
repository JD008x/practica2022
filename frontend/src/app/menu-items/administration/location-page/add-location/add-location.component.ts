import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/app-logic/connection.service';
import { InventoryLocation } from '../../../../../../../backend/src/models/inventoryLocation.model';
import { ObjectId } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  addLocationForm!: FormGroup;
  location: InventoryLocation = new InventoryLocation();
  locationId!: ObjectId;
  locationNotFound = false;

  constructor(
    private fb: FormBuilder,
    private locationService: ConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      this.locationId = params['id'] ?? '0';
    });

    this.addLocationForm = this.fb.group({
      locationName: [this.location.locationName, Validators.required],
        address: [this.location.address, Validators.required],    
        managerName: [this.location.managerName, Validators.required],  
        phoneNumber: [this.location.phoneNumber, Validators.required],
    });
  }

  private async getLocation(): Promise<InventoryLocation | null> {
    const location = await firstValueFrom(
      this.locationService.getLocationById(this.locationId)
    );
    return location;
    }

  ngOnInit(): void {
    if (String(this.locationId) != '0') {
      this.getLocation().then((l) => {
        if (l) {
          this.location = l;

          this.addLocationForm = this.fb.group({
            locationName: [this.location.locationName, Validators.required],
            address: [this.location.address, Validators.required],    
            managerName: [this.location.managerName, Validators.required],  
            phoneNumber: [this.location.phoneNumber, Validators.required],
          });
        } else {
          this.locationNotFound = true;
        }
      });
    }
  }

  onSubmit() {
    if (String(this.locationId) == '0') {
      this.location = new InventoryLocation(this.addLocationForm.value);
      this.locationService.addLocation(this.location).subscribe();
    } else {
      this.location.locationName = this.addLocationForm.value.locationName;
      this.location.address = this.addLocationForm.value.address;
      this.location.managerName = this.addLocationForm.value.managerName;
      this.location.phoneNumber = this.addLocationForm.value.phoneNumber;
      this.locationService.updateLocation(this.location).subscribe();
    }
    this.router.navigate(['/location']);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addLocationForm.controls[controlName].hasError(errorName);
  };

}
