import {Component, OnInit} from '@angular/core';
import {Patient} from '../patient';
import {PatientApiService} from '../../api.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {VisitApiService} from '../../visit-api.service';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

    // displayedColumns: string[] = ['id', 'patient_name', 'gender', 'address', 'birth_Date'];
    data: Patient[] = [];
    isLoadingResults = true;
    showTable = true;
    page = 4;

    constructor(
        private api: PatientApiService,
        private visitApiService: VisitApiService,
        private router: Router,
        private titleService: Title
    ) {
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle + ' | s3325238 - COSC2440 - Software Architecture: Design & Implementation');
    }

    ngOnInit() {
        this.api.getAllPatient()
            .subscribe(res => {
                this.data = res;
                this.isLoadingResults = false;
            }, err => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }

    deletePatient(id) {
        this.isLoadingResults = true;
        this.api.deletePatient(id)
            .subscribe(res => {
                    this.visitApiService.deleteVisitByPatientId(id);
                    this.isLoadingResults = false;

                    this.data = this.data.filter(item => item.id !== id);
                }, (err) => {
                    console.log(err);
                    this.isLoadingResults = false;
                }
            );
    }

}
