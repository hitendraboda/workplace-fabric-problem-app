import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloorService } from 'src/app/services/floor.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.scss']
})
export class DeskComponent implements OnInit {
  floorId: any;
  floor: any;
  desks: [];
  chairs: [];
  constructor(
    private route: ActivatedRoute,
    private floorService: FloorService,
    private alertService: AlertService) {

  }

  ngOnInit() {
    this.floorId = this.route.snapshot.paramMap.get("id");
    this.getFloor();
  }

  getFloor() {
    this.floorService.getById(this.floorId)
      .subscribe((data) => {
        this.floor = data;
        this.desks = data.desks;
        this.chairs = data.desks.chairs;
      }, (error) => {
        this.alertService.error(error);
      })
  }
  onBookClick(deskId: any, chair: any): void {
    if (confirm("Are you sure? Would you like to book " + chair.chairName + "?")) {
      let data = {
        floorId: this.floorId,
        deskId: deskId,
        chairId: chair._id,
        booked: true
      }
      this.floorService.bookChair(data)
        .subscribe((data) => {
          this.getFloor();
          this.alertService.success('Well done! Your chair booked successfully.')
        }, (error) => {
          this.alertService.error(error);
        })


    }
  }

  onReleaseClick(deskId: any, chair: any): void {
    if (confirm("Are you sure? Would you like to release " + chair.chairName + "?")) {
      let data = {
        floorId: this.floorId,
        deskId: deskId,
        chairId: chair._id,
        booked: false
      }
      this.floorService.bookChair(data)
        .subscribe((data) => {
          this.getFloor();
          this.alertService.success('Well done! Your chair released successfully.')
        }, (error) => {
          this.alertService.error(error);
        })


    }
  }
}
