import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../backend.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UtilService} from '../../util.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  http: any;
  loginForm: FormGroup;
  result ;
  constructor(private backendService: BackendService, private utilService: UtilService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    });
  }
  onSocialLogin(provider) {
    this.utilService.spinner();
    this.backendService.onSocialSignIn(provider)
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          this.utilService.spinnerClose();
          this.router.navigateByUrl('/dash');
        }
      });
  }
  onSubmit() {
    this.utilService.spinner();
    const data = {'username': this.loginForm.value.email, 'password': this.loginForm.value.password};
    this.backendService.loginUser(data)
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigateByUrl('/dash');
          this.utilService.spinnerClose();
        }
      });
  }

}
