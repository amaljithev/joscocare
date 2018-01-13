import { Injectable } from '@angular/core';
import { Http,Headers } from "@angular/http";

import 'rxjs/add/operator/map'

@Injectable()
export class HttpService {
    isLoggedin;
    username;
    userId;
    
    baseURL = "http://josco-apps-api-dev.azurewebsites.net/api/";
    headers = new Headers();
    
    constructor(private http:Http){
        if(localStorage.getItem('auth_token') && localStorage.getItem('username') && localStorage.getItem('userId')){
            this.isLoggedin = true;
            this.headers.set('token',localStorage.getItem('auth_token'));
            this.username = localStorage.getItem('username')
            this.userId = localStorage.getItem('userId')
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

    public changeMPIN(ompin,nmpin){
        let data = {
            "UserId" : this.userId,
            "OldMpin" : ompin,
            "NewMpin" : nmpin
        };
        return this.http.post(this.baseURL+'register/changempin',JSON.stringify(data),{headers: this.headers});
    }

    public getCourseDetails(){
        return this.http.get(this.baseURL+'course/courses?UserId='+this.userId,{headers: this.headers});        
    }

    public logout(){
        console.log(this.headers);
        return this.http.post(this.baseURL+'register/logout?UserId='+this.userId,null,{headers: this.headers});        
    }
    
    public updateCourse(data){
        data.UserId = this.userId;
        return this.http.post(this.baseURL+'course/updatesingle',JSON.stringify(data),{headers: this.headers});
    }
    
    public setAuthToken(token){
        this.headers.set('token',token);
    }
}