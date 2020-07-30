import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  id: any;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getUser();
  }

  getUser() {
    this.userService.getById(this.id)
      .subscribe((data) => {
        this.user = data;
      }, (error) => {
        this.alertService.error(error);
      })
  }
}
