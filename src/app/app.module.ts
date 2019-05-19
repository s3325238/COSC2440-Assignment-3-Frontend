import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PatientsComponent } from './patient/patients/patients.component';
import { PatientDetailComponent } from './patient/patient-detail/patient-detail.component';
import { PatientAddComponent } from './patient/patient-add/patient-add.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OrderModule } from 'ngx-order-pipe';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PrescriptionAddComponent } from './prescription/prescription-add/prescription-add.component';
import { PrescriptionsComponent } from './prescription/prescriptions/prescriptions.component';
import { PrescriptionDetailComponent } from './prescription/prescription-detail/prescription-detail.component';
import { PrescriptionEditComponent } from './prescription/prescription-edit/prescription-edit.component';
import { VisitsComponent } from './visit/visits/visits.component';
import { VisitAddComponent } from './visit/visit-add/visit-add.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    PatientDetailComponent,
    PatientAddComponent,
    PatientEditComponent,
    DashboardComponent,
    PrescriptionAddComponent,
    PrescriptionsComponent,
    PrescriptionDetailComponent,
    PrescriptionEditComponent,
    VisitsComponent,
    VisitAddComponent
  ],
  imports: [
    BrowserModule,
    OrderModule,
    FormsModule,
    HttpClientModule,
    // HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Bootstrap DatePicker
    BsDatepickerModule.forRoot(),

    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [
      Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
