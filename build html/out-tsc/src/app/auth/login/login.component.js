var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServices } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, auth, router, route, socialAuthService) {
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.route = route;
        this.socialAuthService = socialAuthService;
        this.errors = [];
        this.notifyMessage = '';
        this.buttonClicked = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.route.params.subscribe(function (params) {
            if (params['registered'] === 'success') {
                _this.notifyMessage = 'You have been succesfuly registered, you can login now!';
            }
        });
    };
    LoginComponent.prototype.initForm = function () {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required,
                    Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
            password: ['', Validators.required]
        });
    };
    LoginComponent.prototype.isInvalidForm = function (fieldName) {
        if (this.loginForm)
            return this.loginForm.controls[fieldName].invalid &&
                (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
    };
    LoginComponent.prototype.isRequired = function (fieldName) {
        return this.loginForm.controls[fieldName].errors.required;
    };
    LoginComponent.prototype.socialSignIn = function (socialPlatform) {
        var _this = this;
        if (socialPlatform === void 0) { socialPlatform = 'google'; }
        var socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then(function (userData) {
            console.log(socialPlatform + " sign in data Token : ", userData.token);
            _this.auth.authgoogle({ access_token: userData.token }).subscribe(function (token) {
                _this.router.navigate(['/']);
            }, function (errorResponse) {
                _this.errors = errorResponse.error.errors;
            });
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.buttonClicked == 'signin') {
            this.auth.login(this.loginForm.value).subscribe(function (token) {
                _this.router.navigate(['/']);
            }, function (errorResponse) {
                _this.errors = errorResponse.error.errors;
            });
        }
        if (this.buttonClicked == 'signingoogle') {
            this.socialSignIn();
        }
    };
    LoginComponent = __decorate([
        Component({
            selector: 'vtc-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            AuthServices,
            Router,
            ActivatedRoute,
            AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map