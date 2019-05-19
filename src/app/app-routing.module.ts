import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsComponent } from './patient/patients/patients.component';
import { PatientDetailComponent } from './patient/patient-detail/patient-detail.component';
import { PatientAddComponent } from './patient/patient-add/patient-add.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {VisitsComponent} from './visit/visits/visits.component';
import {VisitAddComponent} from './visit/visit-add/visit-add.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'patient',
    // component: PatientsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PatientsComponent,
        data: { title: 'List of Patients' }
      }, // url: patient/patients
      {
        path: 'add',
        pathMatch: 'full',
        component: PatientAddComponent,
        data: { title: 'Add Patient' }
      }, // url: patient/add
      {
        path: 'detail/:id',
        pathMatch: 'full',
        component: PatientDetailComponent,
        data: { title: 'Patient Details' }
      }, // url: patient/detail/:id
      {
        path: 'edit/:id',
        component: PatientEditComponent,
        data: { title: 'Edit Patient' }
      }, // url: patient/edit/:id
    ]
  },
  {
    path: 'visit',
    // component: PatientsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: VisitsComponent,
        data: { title: 'List of Visits' }
      }, // url: visit
      {
        path: 'add',
        pathMatch: 'full',
        component: VisitAddComponent,
        data: { title: 'Add new visit' }
      }, // url: visit/add
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
