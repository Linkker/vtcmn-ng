var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from './auth.service';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.handleAuthState = function () {
        if (this.isLoginOrRegister()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    };
    AuthGuard.prototype.handleNotAuthState = function () {
        if (this.isLoginOrRegister()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard.prototype.isLoginOrRegister = function () {
        if (this.url.includes('login') || this.url.includes('register')) {
            return true;
        }
        return false;
    };
    AuthGuard.prototype.canActivate = function (route, state) {
        this.url = state.url;
        if (this.auth.isAuthenticated()) {
            return this.handleAuthState();
        }
        return this.handleNotAuthState();
    };
    AuthGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthServices,
            Router])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map