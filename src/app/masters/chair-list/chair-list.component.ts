import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloorService } from 'src/app/services/floor.service';
import { AlertService } from 'src/app/services/alert.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chair-list',
  templateUrl: './chair-list.component.html',
  styleUrls: ['./chair-list.component.scss']
})
export class ChairListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  floorId: any;
  deskId: any;

  floor: any;
  chairs: [];

  constructor(
    private route: ActivatedRoute,
    private floorService: FloorService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.floorId = this.route.snapshot.paramMap.get("floorId");
    this.deskId = this.route.snapshot.paramMap.get("deskId");
    this.getFloor();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getFloor() {
    this.floorService.getById(this.floorId)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.floor = data;
          let desk = data.desks.find(d => d._id == this.deskId);
          this.chairs = desk.chairs;
          this.dtTrigger.next();
        });
      }, (error) => {
        this.alertService.error(error);
      })
  }

  onDelete(chair: any) {
    if (confirm("Are you sure? Would you like to delete " + chair.chairName + "?")) {
      let dataChair = {
        floorId: this.floorId,
        deskId: this.deskId,
        chairId: chair._id
      }
      this.floorService.deleteChair(dataChair)
        .subscribe((data) => {
          this.getFloor();
          this.alertService.success('Well done! Chair deleted successfully.')
        }, (error) => {
          this.alertService.error(error);
        });
    }
  }
}
