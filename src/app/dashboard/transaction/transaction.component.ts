import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendService} from '../../backend.service';
import {UtilService} from '../../util.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactionForm: FormGroup;
  addMode = false;
  transactionDataLoaded = false;
  friendList = null;
  viewDataLoaded = false;
  constructor(public backendService: BackendService, private utilService: UtilService) { }
  ngOnInit() {
    this.transactionForm = new FormGroup({
      'transactionType': new FormControl(null),
      'transactionAmount': new FormControl(null),
      'toUser': new FormControl(null),
      'transactionDetail': new FormControl(null)
    });
    this.backendService.getFriends()
      .then((data) => {
      this.friendList = data;
    });
    this.backendService.getTransactions()
      .then((resData) => {
      this.transactionDataLoaded = true;
      this.addMode = false;
      this.viewDataLoaded = true;
      })
      .catch((error) => {
      console.log(error);
      });
  }

  onAddTransactions() {
    console.log(this.transactionForm);
    this.backendService.addTransaction(this.transactionForm.value)
      .then((resData) => {
      console.log(this.backendService.userTransactions);
      this.transactionForm.reset();
      this.utilService.modal({'type': 'alert', 'title': 'Success', 'content': 'Transaction added'});
      this.addMode = false;
      }).catch((data) => {
      console.log(data);
    });
  }
  searchFriendsGetName(email) {
    let a = null;
    this.friendList.forEach((user) => {
      if (user.email === email) {
        console.log(user);
        a = user.first_name + ' ' + user.last_name;
      }
    });
    return a;
  }
}
