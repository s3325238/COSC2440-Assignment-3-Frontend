import {Injectable} from '@angular/core';

import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import {Patient} from './patient/patient';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', Accept: 'application/json'})
};
const apiUrl = 'http://localhost:8080/api/patients';

@Injectable({
    providedIn: 'root'
})
export class PatientApiService {

    constructor(private http: HttpClient) {
    }

    getAllPatient(): Observable<Patient[]> {
        return this.http.get<Patient[]>(apiUrl).pipe(
            catchError(this.handleError('getAllPatient', []))
        );
    }

    getSinglePatient(id: number): Observable<Patient> {
        return this.http.get<Patient>(`${apiUrl}/getPatientById/${id}`).pipe(
            catchError(this.handleError<Patient>(`getSinglePatient id=${id}`))
        );
    }

    addPatient(patient): Observable<Patient> {
        return this.http.post<Patient>(`${apiUrl}/add`, patient, httpOptions).pipe(
            catchError(this.handleError<Patient>('addPatient'))
        );
    }

    /** PUT: update the patient on the server */
    updatePatient(id, patient): Observable<any> {

        const headers = new HttpHeaders().append('Content-Type', 'application/json');

        return this.http.put(`${apiUrl}/update/${id}`, patient, {headers}).pipe(
            catchError(this.handleError<any>('updatePatient'))
        );
    }

    deletePatient(id): Observable<Patient> {
        return this.http.delete<Patient>(`${apiUrl}/delete/${id}`, httpOptions).pipe(
            catchError(this.handleError<Patient>('deletePatient'))
        );
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
