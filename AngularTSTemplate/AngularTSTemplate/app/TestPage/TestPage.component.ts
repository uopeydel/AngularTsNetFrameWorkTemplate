﻿import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { PageNotFoundComponent } from '../PageNotFound/PageNotFound.component';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';

import * as _ from 'underscore';
import * as moment from 'moment';


import * as config from 'angular2-infinite-scroll';

@Component({
    selector: 'TestPage',

    styles: [` 
    .search-results {
      height: 300px;
      overflow-y: scroll;
    }`],
    templateUrl: '../app/TestPage/TestPage.html'
})

export class TestPageComponent implements OnInit {
    openDialog() {
        console.log(this.projectCtrl.value);
        //console.log(moment('2016-01-01'));
        //console.log('xxx test ' + _.isNull(null) + " as " + _.isNull('qwer') + ' ' + _.isArray('asd') + ' ' + _.isArray([{'qq':963}, {'ww':48}]));
        this.dialog.open(PageNotFoundComponent);
    }
    //##################################
    //##################################
    clickOptionState(data: any) {
        console.log(data);
    }

    stateCtrl: FormControl;
    filteredStates: any;

    states = [
        { namex: 'xa', lastnamex: 'xw' },
        { namex: 'qa', lastnamex: 'qe' },
        { namex: 'sa', lastnamex: 'sd' },
        { namex: 'sa', lastnamex: 'sf' },
        { namex: 'ea', lastnamex: 'ef' }
    ];

    overStates(state: any, index: number) {
        console.log(state, index);
        //console.log(this.states.length);
        if (this.states.length - 1 == index) {
            this.states.push({ namex: 'add' + index, lastnamex: 'lad' + index });
        }
    }

    filterStates(val: string) {
        return val ? this.states.filter((s) => new RegExp(val, 'gi').test(s.namex + s.lastnamex)) : this.states;
    }

    constructor(public dialog: MdDialog) {

        this.projectCtrl = new FormControl();
        this.projectCtrl.setValue('asdw starter value');
        this.filteredProjects = this.projectCtrl.valueChanges
            .startWith(null)
            .map(proj => this.filterProjects(proj));

        this.stateCtrl = new FormControl();
        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterStates(name));

        //######### inf score
        this.addItems(0, this.sum);


    }
    public ngOnInit() {

    }
    //################################## Project Projects   project projects
    //################################## / แก้ เม้าอยู่ตัวสุดท้าย แต่ถ้าพิมไปแล้วจะไม่ฟิลเตอร


    projectCtrl: FormControl;
    filteredProjects: any;

    projects = [
        { Pnamex: 'Proj00', Plastnamex: 'ja' },
        { Pnamex: 'Proj01', Plastnamex: 'qe' },
        { Pnamex: 'Proj02', Plastnamex: 'sd' },
        { Pnamex: 'Proj03', Plastnamex: 'sf' },
        { Pnamex: 'Proj04', Plastnamex: 'ef' }
    ];


    clickOptionProject(data: any) {
        console.log(data);
    }

    overProjects(project: any, index: number) {
        console.log(project, index);
        //console.log(this.projects.length);
        if (this.projects.length - 1 == index) {
            this.projects.push({ Pnamex: 'Proj0' + index + 1, Plastnamex: 'qwe' + index + 1 });
        }
    }

    filterProjects(val: string) {
        return val ? this.projects.filter((s) => new RegExp(val, 'gi').test(s.Pnamex)) : this.projects;
    }


    //##########################################
    //###

    arrayx: any = [] as any;
    sum = 15;
    throttle = 10; //throttle must less than sum
    scrollDistance = 1;

    addItems(startIndex: any, endIndex: any) {
        for (let i = 0; i < this.sum; ++i) {
            this.arrayx.push([i, ' ', this.generateWord(i)].join(''));
        }
    }
    public onScrollDown() {

        console.log('scrolled!!');

        // add another 20 items
        const start = this.sum;
        this.sum += 3;
        this.addItems(start, this.sum);
    }

    generateWord(ind: number) {
        return 'xx ' + ind;
    }


}
