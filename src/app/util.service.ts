import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DialogComponent} from './dialog/dialog.component';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UtilService implements OnInit{
  sideNav = new Subject();
  constructor(public dialog: MdDialog) {}
  ngOnInit() {
  }
  public modal(data): Observable<boolean> {
    let dialogRef: MdDialogRef<DialogComponent>;
    dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.type = data.type;
    dialogRef.componentInstance.title = data.title;
    dialogRef.componentInstance.content = data.content;
    return dialogRef.afterClosed();
  }
  public spinner(): Observable<boolean> {
    let dialogRef: MdDialogRef<DialogComponent>;
    dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.spinner = true;
    return dialogRef.afterClosed();
  }
  public spinnerClose() {
    let dialogRef: MdDialogRef<DialogComponent>;
    dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.spinner = false;
    this.dialog.closeAll();
  }
}
