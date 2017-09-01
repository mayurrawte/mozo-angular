import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../backend.service';
import {FormControl, FormGroup} from '@angular/forms';
import { Response } from '@angular/http';
import {UtilService} from '../../util.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  addMode = false;
  expenseForm: FormGroup;
  allExpenses = null;
  constructor(public backendService: BackendService, private utilService: UtilService) { }
  ngOnInit() {
    this.expenseForm = new FormGroup({
      'type': new FormControl(null),
      'item': new FormControl(null),
      'amount': new FormControl(null)
    });
    this.backendService.getExpenses();
  }

  onAddExpense() {
    console.log();
    if (this.expenseForm.valid) {
      const expenseData = {
        'type': this.expenseForm.value.type,
        'expenseItem': this.expenseForm.value.item,
        'expenseAmount': this.expenseForm.value.amount
      };
      this.backendService.addExpense(expenseData)
        .then(() => {
        this.utilService.modal({'type': 'alert', 'title': 'Added', 'content': 'Expense Added'});
        })
        .catch();
      this.expenseForm.reset();
      this.addMode = false;
    }
  }
}
