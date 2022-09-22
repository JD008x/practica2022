import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/app-logic/connection.service';
import { User } from '../../../../../../../backend/src/models/user.model';
import { ObjectId } from 'mongoose';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  user: User = new User();
  userId!: ObjectId;
  userNotFound = false;
  constructor(
    private fb: FormBuilder,
    private userService: ConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      this.userId = params['id'] ?? '0';
    });

    this.addUserForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      phoneNumber: [this.user.phoneNumber, Validators.required],
      email: [this.user.email, Validators.required],
    });
  }

  private async getUser(): Promise<User | null> {
    const user = await firstValueFrom(this.userService.getUserById(this.userId));
    return user;
  }

  ngOnInit(): void {

    if (String(this.userId) != '0') {
        this.getUser()
          .then(
            (u) => {
              if (u) {
                this.user = u;

                this.addUserForm = this.fb.group({
                  firstName: [this.user.firstName, Validators.required],
                  lastName: [this.user.lastName, Validators.required],
                  phoneNumber: [this.user.phoneNumber, Validators.required],
                  email: [this.user.email, Validators.required],
                });
              } else {
                this.userNotFound = true;
              }
            }
          );
    }
  }

  onSubmit() {
    if (String(this.userId) == '0') {
      this.user = new User(this.addUserForm.value);
      this.userService.addUser(this.user).subscribe();
    } else {
      this.user.firstName = this.addUserForm.value.firstName;
      this.user.lastName = this.addUserForm.value.lastName;
      this.user.phoneNumber = this.addUserForm.value.phoneNumber;
      this.user.email = this.addUserForm.value.email;
      this.userService.updateUser(this.user).subscribe();
    }
    //console.log('user' + this.user);
    //console.log('userdata' + this.userService.userData);
    this.router.navigate(['/users']);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addUserForm.controls[controlName].hasError(errorName);
  };

}
