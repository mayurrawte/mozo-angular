"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var dialog_component_1 = require("./dialog/dialog.component");
var UtilService = (function () {
    function UtilService(dialog) {
        this.dialog = dialog;
        this.sideNav = new Subject_1.Subject();
        this.spinner = new Subject_1.Subject();
    }
    UtilService.prototype.ngOnInit = function () {
    };
    UtilService.prototype.modal = function (data) {
        var dialogRef;
        dialogRef = this.dialog.open(dialog_component_1.DialogComponent);
        dialogRef.componentInstance.type = data.type;
        dialogRef.componentInstance.title = data.title;
        dialogRef.componentInstance.content = data.content;
        return dialogRef.afterClosed();
    };
    return UtilService;
}());
UtilService = __decorate([
    core_1.Injectable()
], UtilService);
exports.UtilService = UtilService;
