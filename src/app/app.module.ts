import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExportAsModule } from 'ngx-export-as';
import { DataTablesModule } from 'angular-datatables';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';
import { NgxUiLoaderHttpModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION, NgxUiLoaderModule } from 'ngx-ui-loader';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { FloorComponent } from './floor/floor.component';
import { DeskComponent } from './desk/desk.component';
import { FloorListComponent } from './masters/floor-list/floor-list.component';
import { FloorAddComponent } from './masters/floor-add/floor-add.component';
import { DeskListComponent } from './masters/desk-list/desk-list.component';
import { DeskAddComponent } from './masters/desk-add/desk-add.component';
import { ChairAddComponent } from './masters/chair-add/chair-add.component';
import { ChairListComponent } from './masters/chair-list/chair-list.component';



// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_MOMENT_FORMATS = {
  parseInput: 'MM/DD/YYYY',
  fullPickerInput: 'MM/DD/YYYY HH:mm',
  datePickerInput: 'MM/DD/YYYY',
  timePickerInput: 'HH:mm',
  monthYearLabel: 'MMM-YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM-YYYY'
};

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#136a8a',
  bgsPosition: POSITION.centerCenter,
  bgsSize: 60,
  bgsType: SPINNER.rectangleBouncePulseOut, // background spinner type
  fgsType: SPINNER.rectangleBouncePulseOut, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

/**
 *
 */
@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
  /**
   *
   * @param value
   * @returns {number}
   */
  transform(value: number): number {
    return Math.round(value);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AlertComponent,
    LoginComponent,
    RoundPipe,
    UserListComponent,
    UserAddComponent,
    UserDetailComponent,
    FloorComponent,
    DeskComponent,
    FloorListComponent,
    FloorAddComponent,
    DeskListComponent,
    DeskAddComponent,
    ChairAddComponent,
    ChairListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ExportAsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    AngularFontAwesomeModule,
    DataTablesModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    OwlMomentDateTimeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: OWL_DATE_TIME_FORMATS,
      useValue: MY_MOMENT_FORMATS
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
