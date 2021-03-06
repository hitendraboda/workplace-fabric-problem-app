import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-desk-add',
  templateUrl: './desk-add.component.html',
  styleUrls: ['./desk-add.component.scss']
})
export class DeskAddComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  floorId: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private floorService: FloorService
  ) {
    this.addForm = this.formBuilder.group({
      deskName: ['', Validators.required],
      deskType: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.floorId = this.route.snapshot.paramMap.get("id");
  }
  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid    
    if (this.addForm.invalid) {
      return;
    }
    let deskData = {
      floorId: this.floorId,
      deskName: this.addForm.value.deskName,
      deskType: this.addForm.value.deskType,
      deskPosition: {
        x: 0,
        y: 0
      }
    }

    this.floorService.addDesk(deskData)
      .subscribe((data) => {
        this.router.navigate(['/master/desk/list', this.floorId]);
        this.alertService.success("Well done! Desk created successfully.")
      }, (error) => {
        this.alertService.error(error);
      });
  }
}
