import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Visit} from './visit/visit';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Patient} from './patient/patient';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', Accept: 'application/json'})
};

const apiUrl = 'http://localhost:8080/api/visits';

@Injectable({
    providedIn: 'root'
})
export class VisitApiService {

    constructor(private http: HttpClient) {}

    getAllVisits(): Observable<Visit[]> {
        return this.http.get<Visit[]>(apiUrl).pipe(
            catchError(this.handleError('getAllPatient', []))
        );
    }

    addVisitByPatientID(id, visit): Observable<Visit> {
        return this.http.post<Visit>(`${apiUrl}/addNewVisitByPatientId/${id}`, visit, httpOptions).pipe(
            catchError(this.handleError<Visit>('addVisitByPatientID'))
        );
    }

    findVisitByPatientID(id: number): Observable<Visit> {
        return this.http.get<Visit>(`${apiUrl}/findVisitByPatientId/${id}`).pipe(
            catchError(this.handleError<Visit>(`findVisitByPatientID id=${id}`))
        );
    }

    deleteVisitByPatientId(id): Observable<Visit> {
        return this.http.delete<Visit>(`${apiUrl}/deleteVisitByPatientId/${id}`, httpOptions).pipe(
            catchError(this.handleError<Visit>('deleteVisitByPatientId'))
        );
    }

    deleteVisit(id): Observable<Visit> {
        return this.http.delete<Visit>(`${apiUrl}/delete/${id}`, httpOptions).pipe(
            catchError(this.handleError<Visit>('deleteVisit'))
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
