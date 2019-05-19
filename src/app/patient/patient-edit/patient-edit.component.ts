import {Component, OnInit} from '@angular/core';
import {PatientApiService} from '../../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Patient} from '../patient';
import {Visit} from '../../visit/visit';

@Component({
    selector: 'app-patient-edit',
    templateUrl: './patient-edit.component.html',
    styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

    patientForm: FormGroup;
    id = '';
    // // tslint:disable-next-line:variable-name
    // patient_name = '';
    // gender = '';
    // address = '';
    // // tslint:disable-next-line:variable-name
    // birth_Date = Date;
    isLoadingResults = false;

    genders = ['Male', 'Female'];

    patientEditDefault: Patient = { id: '', patient_name: '', address: '', gender: '', birth_Date: null, visitList: Array<Visit>() };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private api: PatientApiService,
        private titleService: Title
    ) {
    }

    ngOnInit() {
        this.getPatient(this.route.snapshot.params.id);
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

    getPatient(id) {
        this.api.getSinglePatient(id).subscribe(data => {
            this.id = data.id;

            this.patientEditDefault = data;

            this.patientForm.setValue({
                patient_name: data.patient_name,
                gender: data.gender,
                address: data.address,
                birth_Date: new Date(data.birth_Date),
            });
        });
    }

    onFormSubmit(form: NgForm) {
        this.isLoadingResults = true;

        const id = this.id;
        // console.log(form.value);
        // console.log(id);

        this.api.updatePatient(id, form)
            .subscribe(res => {
                    console.log(form.value);
                    this.isLoadingResults = false;
                    this.router.navigate(['/patient']);
                }, (err) => {
                    console.log(err);
                    this.isLoadingResults = true;
                }
            );
    }

}
