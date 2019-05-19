import {Patient} from '../patient/patient';

export class Visit {
    id: string;
    // tslint:disable-next-line:variable-name
    visit_reason: string;
    // tslint:disable-next-line:variable-name
    main_diagnose: string;
    // tslint:disable-next-line:variable-name
    optional_diagnose: string;
    patient: Array<Patient>;
}
