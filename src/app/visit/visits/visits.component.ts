import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {VisitApiService} from '../../visit-api.service';
import {Visit} from '../visit';

@Component({
    selector: 'app-visits',
    templateUrl: './visits.component.html',
    styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

    data: Visit[] = [];
    isLoadingResults = false;

    constructor(
        private visitApiService: VisitApiService,
        private titleService: Title
    ) {
    }

    ngOnInit() {
        this.visitApiService.getAllVisits()
            .subscribe(res => {
                this.data = res;

                // console.log(this.data);

                this.isLoadingResults = false;
            }, err => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle + ' | s3325238 - COSC2440 - Software Architecture: Design & Implementation');
    }

    deleteVisit(id) {
        this.isLoadingResults = true;
        this.visitApiService.deleteVisit(id)
            .subscribe(res => {
                    this.isLoadingResults = false;

                    this.data = this.data.filter(item => item.id !== id);
                }, (err) => {
                    console.log(err);
                    this.isLoadingResults = false;
                }
            );
    }

}
