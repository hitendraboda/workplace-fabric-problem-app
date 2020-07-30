import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-floor-add',
  templateUrl: './floor-add.component.html',
  styleUrls: ['./floor-add.component.scss']
})
export class FloorAddComponent implements OnInit {

  addForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private floorService: FloorService) {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
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
    let floorData = {
      floorName: this.addForm.value.name
    }
    this.floorService.addFloor(floorData)
      .subscribe((data) => {
        this.router.navigate(['/master/floor/list']);
        this.alertService.success("Well done! Floor created successfully.")
      }, (error) => {
        this.alertService.error(error);
      });
  }
}
