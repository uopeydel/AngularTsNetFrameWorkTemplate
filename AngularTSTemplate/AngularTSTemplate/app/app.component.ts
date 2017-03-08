import { Component ,OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: '../app/app.background.html'
})
export class AppComponent implements OnInit { 
	name = 'Angular'; 

    constructor(private localStorageService: LocalStorageService) {
       
    }

    public ngOnInit() {
        this.localStorageService.set('id', 'testid');
        console.log(this.localStorageService.get('id')); 
    }

}
