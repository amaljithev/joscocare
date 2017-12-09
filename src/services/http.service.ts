import { Injectable } from '@angular/core';
import { Http,Headers } from "@angular/http";

import 'rxjs/add/operator/map'

@Injectable()
export class HttpService {
    baseURL = "http://josco-apps-api-dev.azurewebsites.net/api/";
    headers = new Headers();
    constructor(private http:Http){
        if(localStorage.getItem('auth_token')){
            this.headers.set('token',localStorage.getItem('auth_token'));
        }
        this.headers.set('Content-Type','application/json');
        this.headers.set('Accept','application/json');
    }

    public login(email,mpin,deviceId){
        let data = {
            "UserName" : email,
            "Mpin" : mpin,
            "DeviceId" : deviceId
        };
        return this.http.post(this.baseURL+'register/login',JSON.stringify(data),{headers: this.headers});
    }

    public register(email){
        let data = {
            "UserName" : email
        };
        return this.http.post(this.baseURL+'register/registeruser',JSON.stringify(data),{headers: this.headers});
    }

    public setAuthToken(token){
        this.headers.set('token',token);
    }
}