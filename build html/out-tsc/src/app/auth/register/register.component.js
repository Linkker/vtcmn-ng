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
import { AuthServices } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(auth, router, route) {
        this.auth = auth;
        this.router = router;
        this.route = route;
        this.formData = {};
        this.errors = [];
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.auth.register(this.formData).subscribe(function () {
            _this.router.navigate(['/login', { registered: 'success' }], { fragment: 'dangnhap' });
        }, function (errorResponse) {
            _this.errors = errorResponse.error.errors;
        });
    };
    RegisterComponent = __decorate([
        Component({
            selector: 'vtc-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        }),
        __metadata("design:paramtypes", [AuthServices,
            Router,
            ActivatedRoute])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map