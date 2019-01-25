var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import 'rxjs/Rx';
var jwt = new JwtHelperService();
var DecodedToken = /** @class */ (function () {
    function DecodedToken() {
        this.exp = 0;
        this.id = '';
    }
    return DecodedToken;
}());
var AuthServices = /** @class */ (function () {
    function AuthServices(http) {
        this.http = http;
        this.decodedToken = JSON.parse(localStorage.getItem('vtc_meta')) || new DecodedToken();
    }
    AuthServices.prototype.saveToken = function (token) {
        this.decodedToken = jwt.decodeToken(token);
        console.log("Luu Token vào bo nho");
        localStorage.setItem('vtc_auth', token);
        localStorage.setItem('vtc_meta', JSON.stringify(this.decodedToken));
        return token;
    };
    AuthServices.prototype.register = function (userData) {
        return this.http.post('api/user/signup', userData);
    };
    AuthServices.prototype.login = function (userData) {
        var _this = this;
        return this.http.post('api/user/signin', userData).pipe(map(function (token) { return _this.saveToken(token); }));
    };
    AuthServices.prototype.authgoogle = function (userData) {
        var _this = this;
        return this.http.post('api/user/oauth/google', userData)
            .map(function (token) { return _this.saveToken(token); });
    };
    AuthServices.prototype.logout = function () {
        localStorage.removeItem('vtc_auth');
        localStorage.removeItem('vtc_meta');
        this.decodedToken = new DecodedToken();
    };
    AuthServices.prototype.getExpiration = function () {
        return moment.unix(this.decodedToken.exp);
    };
    AuthServices.prototype.isAuthenticated = function () {
        return moment().isBefore(this.getExpiration());
    };
    AuthServices.prototype.getAuthToken = function () {
        return localStorage.getItem('vtc_auth');
    };
    AuthServices.prototype.getId = function () {
        return this.decodedToken.sub;
    };
    AuthServices.prototype.getEmail = function () {
        return this.decodedToken.email;
    };
    AuthServices.prototype.getGroup = function () {
        return this.decodedToken.group;
    };
    AuthServices.prototype.getLevel = function () {
        return this.decodedToken.level;
    };
    AuthServices = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], AuthServices);
    return AuthServices;
}());
export { AuthServices };
//# sourceMappingURL=auth.service.js.map