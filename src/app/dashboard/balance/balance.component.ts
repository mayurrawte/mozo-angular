import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../backend.service';
import {UtilService} from '../../util.service';
import { Response} from '@angular/http';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  newBalance;
  constructor(public backendService: BackendService, private utilService: UtilService) { }
  ngOnInit() {
  }
  onAddBalance() {
    const totalBalance = {'balance': this.backendService.user.balance + this.newBalance};
    this.newBalance = null;
    this.backendService.updateBalance(totalBalance)
      .then(() => {
        this.utilService.modal({'type': 'alert', 'title': 'Successful', 'content': 'Balance Updated'});
      })
      .catch(() => {
        this.utilService.modal({'type': 'alert-failure', 'title': 'Low Balance', 'content': 'you are low on balance'});
      });
  }
}
