import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PatientApiService} from '../../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {VisitApiService} from '../../visit-api.service';
import {Visit} from '../../visit/visit';

@Component({
    selector: 'app-patient-add',
    templateUrl: './patient-add.component.html',
    styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

    patientForm: FormGroup;

    // tslint:disable-next-line:variable-name
    patient_name = '';
    gender = '';
    address = '';

    // tslint:disable-next-line:variable-name
    birth_Date = Date;

    visitList: Array<Visit>;

    isLoadingResults = false;

    genders = ['Male', 'Female'];

    constructor(
        private router: Router,
        private api: PatientApiService,
        private visitApi: VisitApiService,
        private formBuilder: FormBuilder,
        private titleService: Title
    ) {
    }

    ngOnInit() {
        this.patientForm = this.formBuilder.group({
            patient_name: [null, Validators.required],
            gender: [null, Validators.required],
            address: [null, Validators.required],
            birth_Date: [null, Validators.required],
        });
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle + ' | s3325238 - COSC2440 - Software Architecture: Design & Implementation');
    }

    onFormSubmit(form: NgForm) {
        this.isLoadingResults = true;

        console.log(this.patient_name);

        this.api.addPatient(form)
            .subscribe(res => {

                const id = res.id;

                this.isLoadingResults = false;
                // this.router.navigate(['/patient-detail', id]);
                this.router.navigate(['/patient']);
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }

}
