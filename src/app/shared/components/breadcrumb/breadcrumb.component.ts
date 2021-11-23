import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
    @Input()
    title: string;

    @Input()
    path: string;

    constructor(private location: Location) {}

    ngOnInit(): void {}

    back(): void {
        this.location.back();
    }
}
