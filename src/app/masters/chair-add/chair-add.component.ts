import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-chair-add',
  templateUrl: './chair-add.component.html',
  styleUrls: ['./chair-add.component.scss']
})
export class ChairAddComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  floorId: any;
  deskId: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private floorService: FloorService
  ) {
    this.addForm = this.formBuilder.group({
      chairName: ['', Validators.required],
      chairType: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.floorId = this.route.snapshot.paramMap.get("floorId");
    this.deskId = this.route.snapshot.paramMap.get("deskId");
  }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid    
    if (this.addForm.invalid) {
      return;
    }
    let chairData = {
      floorId: this.floorId,
      deskId: this.deskId,
      chairName: this.addForm.value.chairName,
      chairType: this.addForm.value.chairType,
      booked: false,
      deskPosition: {
        x: 0,
        y: 0
      }
    }

    this.floorService.addChair(chairData)
      .subscribe((data) => {
        this.router.navigate(['/master/chair/list', this.floorId, this.deskId]);
        this.alertService.success("Well done! Chair created successfully.")
      }, (error) => {
        this.alertService.error(error);
      });
  }
}
