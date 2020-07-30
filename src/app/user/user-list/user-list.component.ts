import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  users: [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      order: [],
      pagingType: 'full_numbers',
      pageLength: 50,
      columnDefs: [{ "orderable": false, "targets": 0 }]
    };
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  getUsers() {
    this.userService.getAll()
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          this.users = data;
          this.dtTrigger.next();
        });
      },
        (error) => {
          this.alertService.error(error);
        })
  }
}
