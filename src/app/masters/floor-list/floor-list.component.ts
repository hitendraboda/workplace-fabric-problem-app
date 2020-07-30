import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FloorService } from 'src/app/services/floor.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.scss']
})
export class FloorListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  floors: [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private floorService: FloorService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.dtOptions = {
      order: [],
      pagingType: 'full_numbers',
      pageLength: 50,
      columnDefs: [{ "orderable": false, "targets": 0 }]
    };
    this.getFloors();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getFloors() {
    this.floorService.getAll()
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          this.floors = data;
          data.forEach(floor => {
            let noOfChairs = 0;
            let availableChairs = 0;
            floor.desks.forEach(desk => {
              noOfChairs = noOfChairs + desk.chairs.length;
              let bookedChairs = desk.chairs.filter(c => c.booked);
              availableChairs = availableChairs + bookedChairs.length;
            });
            floor.noOfChairs = noOfChairs;
            floor.availableChairs = availableChairs;
          });
          this.dtTrigger.next();
        });
      },
        (error) => {
          this.alertService.error(error);
        })
  }

  onDelete(floor: any) {
    if (confirm("Are you sure? Would you like to delete " + floor.floorName + "?")) {
      this.floorService.deleteFloor(floor.id)
        .subscribe((data) => {
          this.getFloors();
          this.alertService.success('Well done! Floor deleted successfully.')
        }, (error) => {
          this.alertService.error(error);
        });
    }
  }
}
