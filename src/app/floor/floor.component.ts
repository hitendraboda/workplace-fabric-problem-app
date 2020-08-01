import { Component, OnInit, Output } from '@angular/core';
import { FloorService } from 'src/app/services/floor.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {
  floors: [];
  constructor(
    private floorService: FloorService,
    private alertService: AlertService) {

  }

  ngOnInit() {
    this.getFloors();
  }

  getFloors() {
    this.floorService.getAll()
      .subscribe((data) => {
        this.floors = data;
        data.forEach(floor => {
          let noOfChairs = 0;
          let availableChairs = 0;
          floor.desks.forEach(desk => {
            noOfChairs = noOfChairs + desk.chairs.length;
            let bookedChairs = desk.chairs.filter(c => !c.booked);
            availableChairs = availableChairs + bookedChairs.length;
          });
          floor.noOfChairs = noOfChairs;
          floor.availableChairs = availableChairs;
        });
      },
        (error) => {
          this.alertService.error(error);
        })
  }

}
