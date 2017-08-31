import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../backend.service';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-dash-main',
  templateUrl: './dash-main.component.html',
  styleUrls: ['./dash-main.component.css']
})
export class DashMainComponent implements OnInit {

  constructor(public backendService: BackendService) { }

  dataLoaded = false;
  totalExpenseAmount = 0;
  expenseDataLoaded = false;
  totalTransactionAmount = 0;
  ngOnInit() {
    console.log(this.backendService.authToken);
    this.backendService.getExpenses().
    then((data) => {
      console.log(data);
      for (const i of Object.keys(data)) {
        this.totalExpenseAmount += data[i].expenseAmount;
      }
      this.expenseDataLoaded = true;
    })
    .catch((data) => {
      console.log(data);
    });
    this.backendService.getTransactions().
      then((data) => {
      for (const i of Object.keys(data)) {
        this.totalTransactionAmount += data[i].transactionAmount;
      }
    });
  }
}
