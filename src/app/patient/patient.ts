import {Visit} from '../visit/visit';

export class Patient {
    id: string;
    address: string;
    gender: string;
    // tslint:disable-next-line:variable-name
    patient_name: string;
    // tslint:disable-next-line:variable-name
    birth_Date: Date;
    visitList: Array<Visit>;
}
