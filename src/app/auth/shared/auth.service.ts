import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import 'rxjs/Rx';

const jwt = new JwtHelperService();
class DecodedToken {
  exp: number = 0;
  id: string = '';
}

@Injectable()
export class AuthServices {
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('vtc_meta')) || new DecodedToken();
  }

  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);
    console.log("Luu Token vào bo nho");
    localStorage.setItem('vtc_auth', token);
    localStorage.setItem('vtc_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  public register(userData: any): Observable<any> {
    return this.http.post('api/user/signup', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('api/user/signin', userData).pipe
    (map((token: string) => this.saveToken(token)));
  }

  public authgoogle(userData: any): Observable<any> {
    return this.http.post('api/user/oauth/google', userData).pipe
    (map((token: string) => this.saveToken(token)));
  }

  public logout() {
    localStorage.removeItem('vtc_auth');
    localStorage.removeItem('vtc_meta');
    this.decodedToken = new DecodedToken();
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }
  public isAuthenticated(): boolean {
    if(moment().isBefore(this.getExpiration())){
      return moment().isBefore(this.getExpiration());
    } else {
      this.logout();
    }
  }

  public getAuthToken(): string {
    return localStorage.getItem('vtc_auth');
  }

  public getId(): string {
    return this.decodedToken.sub;
  }

  public getEmail(): string {
    return this.decodedToken.email;
  }

  public getGroup(): string {
    return this.decodedToken.group;
  }

  public getLevel(): string {
    return this.decodedToken.level;
  }

  public isAuthUser(): boolean {
    return this.getLevel()==='user';
  }

  public isAuthMod(): boolean {
    return (this.getLevel()==='mod'||this.isAuthAdmin());
  }

  public isAuthAdmin(): boolean {
    return (this.getLevel()==='admin'||this.isAuthSa())
  }

  public isAuthSa(): boolean {
    return this.getLevel()==='sa';
  }

  public isP00(): boolean {
    return this.getGroup()=== 'trungtam';
  }

  public isP01(): boolean {
    return this.getGroup() === 'tonghop';
  }

  public isP02(): boolean {
    return this.getGroup() === 'noidung';
  }

  public isP03(): boolean {
    return this.getGroup() === 'thehien';
  }

  public isP04(): boolean {
    return this.getGroup() === 'hkcn';
  }

  public isTrungtam(): boolean {
    return (this.isP01()||this.isP02()||this.isP03()||this.isP04()||this.isP00())
  }
}
