import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,  ConnectionBackend, RequestOptionsArgs, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ConfigurationService } from './Configuration/Configuration.service';

import { /*PlatformLocation,*/ Location } from '@angular/common';
//import { ActivatedRoute,  } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';


let TEST_auth_conf : any = {
    client_id: ""
} as any;

function get_TEST_auth(): any {
    return TEST_auth_conf;
};

function TEST_auth_initial(conf: any) {
    TEST_auth_conf = conf;
};

@Injectable()
export class TESTAuthSrv {
    constructor(
        private http: Http,
        private location: Location,
        private config: ConfigurationService/*,
        private localStorageService: LocalStorageService*/
    ) {
        
    }
   

    login() {
        this.logOut();
        var obj = {
            redirectURI: encodeURIComponent(this.config.root + this.location.prepareExternalUrl(this.location.path())),
            client_id: get_TEST_auth().client_id
        };
        var jsonObject = JSON.stringify(obj);
        window.open('https://[link]authapp.on.[link]/#/login?params=' + jsonObject, '_self');
    }
    logOut() {
        //this.localStorageService.remove('authorizationData'); 
    }
    getCurrentUser() {
        //var authData = this.localStorageService.get('authorizationData');
        //if (authData) {
        //    return authData;
        //} else {
        //    return null;
        //}
    }
    getUserProfile() {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        let apiroot = 'https://[link]]resserver.on.[link]/api/profile/get';
        return this.http.get(apiroot, options).map(res => res.json());
    }
}

@Injectable()
export class authInterceptorService extends Http {
    constructor(
        private backend: ConnectionBackend,
        private defaultOptions: RequestOptions,
        private LocalStorageSrv: LocalStorageService
    ) {
        super(backend, defaultOptions);  
        
    }  

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        TEST_auth_initial({ client_id: "asd" });
        console.log(get_TEST_auth());
        this.LocalStorageSrv.set('aaq' , '123456');
        console.log(this.LocalStorageSrv.get('aaq'));
        let authData: any ='asd';// = this.localStorageServ.get('asd');// this.localStorageService.get('authorizationData');
        if (authData !== null) {
            console.log('authData => ', authData);
            console.log('url => ', url);
            console.log('options => ', options);
            //let usingTESTAuthToken = false;
            //for (var i = 0; i < this.mainAuthSrv.get_TEST_auth().resource_servers.length; i++) {
            //    if (url.split('/')[2] === this.mainAuthSrv.get_TEST_auth().resource_servers[i]) {
            //        usingTESTAuthToken = true;
            //    }
            //}
            //if (url.split('/')[2] === "[link]authserver.on.[link]") {

            //} else if (usingTESTAuthToken) {
            //    options.headers.Authorization = 'Bearer ' + authData.token;
            //}
        }
        else {
            console.log('null');
        }
        return super.request(url, options).catch(this.catchAuthError(this));
    }

    private catchAuthError(self: authInterceptorService) {
        return (res: Response) => {
            console.log(res);
            if (res.status === 401 || res.status === 403) {
                // if not authenticated
                console.log('not authenticated', res);
            }
            return Observable.throw(res);
        };
    }

    public responseError(rejection: any) {
        let authData: any;// = this.localStorageService.get('authorizationData');
        if (rejection.status === 401) {
            if (authData !== null) {
                var usingTESTAuthToken = false;
                for (var i = 0; i < get_TEST_auth().resource_servers.length; i++) {
                    if (rejection.config.url.split('/')[2] === get_TEST_auth().resource_servers[i]) {
                        usingTESTAuthToken = true;
                    }
                }
                if (usingTESTAuthToken) {
                    this.requestAccessToken({
                        refresh_token: authData.refreshToken,
                        grant_type: 'refresh_token',
                        client_id: get_TEST_auth().client_id
                    }).subscribe(data => {
                        console.log(data);
                        //this.localStorageServ.set('authorizationData', {
                        //    token: data.access_token,
                        //    userName: authData.userName,
                        //    refreshToken: data.refresh_token,
                        //    useRefreshTokens: true
                        //});
                        location.reload(true);
                    }, error => {
                        console.log(error);
                    });
                }
            }
        }
    }
    public requestAccessToken(obj: any) { 
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        let objJson: string = JSON.stringify(obj);
        let apiroot = 'https://[link]authserver.on.[link]/oauth2/token';
        return this.post(apiroot, objJson, options).map(res => res.json());
    }

}

