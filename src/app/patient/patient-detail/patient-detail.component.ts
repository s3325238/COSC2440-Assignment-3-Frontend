import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientApiService} from '../../api.service';
import {Patient} from '../patient';
import {Title} from '@angular/platform-browser';
import {Visit} from '../../visit/visit';
import {VisitApiService} from '../../visit-api.service';


@Component({
    selector: 'app-patient-detail',
    templateUrl: './patient-detail.component.html',
    styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

    patient: Patient = {id: '', patient_name: '', address: '', gender: '', birth_Date: null, visitList: Array<Visit>() };
    visitList: Visit[];
    isLoadingResults = true;

    constructor(
        private route: ActivatedRoute,
        private api: PatientApiService,
        private visitApi: VisitApiService,
        private titleService: Title,
        private router: Router
    ) {
    }

    ngOnInit() {
        // console.log(this.route.snapshot.params.id);
        this.getPatientDetail(this.route.snapshot.params.id);
        // this.getVisitDetail(this.route.snapshot.params.id);
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle + ' | s3325238 - COSC2440 - Software Architecture: Design & Implementation');
    }

    getPatientDetail(id) {
        // this.visitApi.findVisitByPatientID(id).subscribe(response => {
        //     this.visitList = response;
        //     console.log(response);
        // });
        // console.log(id);
        this.api.getSinglePatient(id)
            .subscribe(data => {

                this.visitList = data.visitList;
                this.patient = data;

                // console.log(data);
                this.isLoadingResults = false;
            });
    }

    // getVisitDetail(id) {
    //     this.visitApi.findVisitByPatientID(id).subscribe(response => {
    //         this.visitList = response;
    //         console.log(response);
    //     });
    // }

    deletePatient(id) {
        this.isLoadingResults = true;
        this.api.deletePatient(id)
            .subscribe(res => {
                    this.isLoadingResults = false;
                    this.router.navigate(['/patient']);
                }, (err) => {
                    console.log(err);
                    this.isLoadingResults = false;
                }
            );
    }

}
