"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BackendService = (function () {
    function BackendService(http, socialAuth, router, utilService) {
        this.http = http;
        this.socialAuth = socialAuth;
        this.router = router;
        this.utilService = utilService;
        this.baseUrl = 'http://mozorest.some-one.me';
        this.authToken = null;
        this.isLoggedIn = false;
    }
    BackendService.prototype.onSocialSignIn = function (provider) {
        var _this = this;
        // this.modalService.spinner.next(true);
        this.sub = this.socialAuth.login(provider).subscribe(function (data) {
            if (!data.hasOwnProperty('error')) {
                console.log(data['token']);
                data = { 'token': data['token'] };
                if (provider === 'facebook') {
                    _this.http.post(_this.baseUrl + '/social-fb/', data).subscribe(function (res) {
                        var resData = res.json();
                        _this.authToken = { 'Authorization': 'Token ' + resData.token };
                        localStorage.setItem('token', resData.token);
                        localStorage.setItem('localUser', JSON.stringify({ 'isVerified': 1, 'userData': resData.userData }));
                        _this.router.navigate(['/dash']);
                        _this.utilService.spinner.next(false);
                    });
                }
                else {
                    _this.http.post(_this.baseUrl + '/social-google/', data).subscribe(function (res) {
                        console.log(res.json());
                        var resData = res.json();
                        _this.authToken = { 'Authorization': 'Token ' + resData.token };
                        localStorage.setItem('token', resData.token);
                        localStorage.setItem('localUser', JSON.stringify({ 'isVerified': 1, 'userData': resData.userData }));
                        _this.router.navigate(['/dash']);
                        _this.utilService.spinner.next(false);
                    });
                }
            }
        });
    };
    BackendService.prototype.getAllUsers = function () {
        this.http.get(this.baseUrl + '/user/');
    };
    BackendService.prototype.loginUser = function (data) {
        var _this = this;
        this.http.post(this.baseUrl + '/get-user-and-auth/', data).subscribe(function (res) {
            var resData = res.json();
            _this.isLoggedIn = true;
            localStorage.setItem('token', resData.token);
            localStorage.setItem('localUser', JSON.stringify({ 'isVerified': 1, 'userData': resData.user }));
        }, function (error) {
            _this.utilService.modal({ 'type': 'alert', 'title': 'Invalid', 'content': 'username and password does not match ! Try Again' });
        });
    };
    BackendService.prototype.registerUser = function (data) {
    };
    BackendService.prototype.logoutUser = function () {
        localStorage.clear();
        this.isLoggedIn = false;
    };
    return BackendService;
}());
BackendService = __decorate([
    core_1.Injectable()
], BackendService);
exports.BackendService = BackendService;
