import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {PatientApiService} from '../../api.service';
import {VisitApiService} from '../../visit-api.service';
import {Patient} from '../../patient/patient';

@Component({
    selector: 'app-visit-add',
    templateUrl: './visit-add.component.html',
    styleUrls: ['./visit-add.component.css']
})
export class VisitAddComponent implements OnInit {

    visitForm: FormGroup;
    // tslint:disable-next-line:variable-name
    visit_reason = '';
    // tslint:disable-next-line:variable-name
    main_diagnose = '';
    // tslint:disable-next-line:variable-name
    optional_diagnose = '';
    // tslint:disable-next-line:variable-name
    select_patient_id = '';

    patientList: Array<Patient>;

    isLoadingResults = false;

    constructor(
        private router: Router,
        private patientApiService: PatientApiService,
        private visitApiService: VisitApiService,
        private formBuilder: FormBuilder,
        private titleService: Title
    ) {
    }

    ngOnInit() {
        this.visitForm = this.formBuilder.group({
            visit_reason: [null, Validators.required],
            main_diagnose: [null, Validators.required],
            optional_diagnose: [null],
            patientList: [null, Validators.required],
        });
        this.patientApiService.getAllPatient().subscribe(
            res => {
                this.patientList = res;
            }
        );
    }

    selectChangeHandler(event: any) {
        this.select_patient_id = event.target.value;
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle + ' | s3325238 - COSC2440 - Software Architecture: Design & Implementation');
    }

    onFormSubmit(form: NgForm) {
        this.isLoadingResults = true;
        this.visitApiService.addVisitByPatientID(this.select_patient_id, form)
            .subscribe(res => {

                const id = res.id;

                this.isLoadingResults = false;
                // this.router.navigate(['/patient-detail', id]);
                this.router.navigate(['/visit']);
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }

}
