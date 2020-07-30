import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.addForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid    
    if (this.addForm.invalid) {
      return;
    }
    let userData = {
      firstName: this.addForm.value.firstName,
      lastName: this.addForm.value.lastName,
      email: this.addForm.value.email,
      role: this.addForm.value.role,
      password: 'wpf123'
    }

    this.userService.registerUser(userData)
      .subscribe((data) => {
        this.router.navigate(['/users']);
        this.alertService.success("Well done! User created successfully.")
      }, (error) => {
        this.alertService.error(error);
      });
  }
}
