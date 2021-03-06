import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloorService } from 'src/app/services/floor.service';
import { AlertService } from 'src/app/services/alert.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.scss']
})
export class DeskListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  floorId: any;
  floor: any;
  desks: [];
  constructor(
    private route: ActivatedRoute,
    private floorService: FloorService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.dtOptions = {
      order: [],
      pagingType: 'full_numbers',
      pageLength: 50,
      columnDefs: [{ "orderable": false, "targets": 0 }]
    };
    this.floorId = this.route.snapshot.paramMap.get("id");
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
          this.desks = data.desks;
          this.dtTrigger.next();
        });
      }, (error) => {
        this.alertService.error(error);
      })
  }

  onDelete(desk: any) {
    if (confirm("Are you sure? Would you like to delete " + desk.deskName + "?")) {
      console.log(desk);
      let data = {
        floorId: this.floorId,
        deskId: desk._id
      }

      console.log(data);
      this.floorService.deleteDesk(data)
        .subscribe((data) => {
          this.getFloor();
          this.alertService.success('Well done! Desk deleted successfully.')
        }, (error) => {
          this.alertService.error(error);
        });
    }
  }
}
