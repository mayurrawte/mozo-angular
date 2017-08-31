import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../../backend.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name' : new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }
  onRegister() {
    if (this.registerForm.valid) {
      const registerData = {
        'username': this.registerForm.value.email,
        'password': this.registerForm.value.password,
        'email' : this.registerForm.value.email,
        'first_name': this.registerForm.value.first_name,
        'last_name': this.registerForm.value.last_name
      };
      this.backendService.registerUser(registerData)
        .then((data) => {
          if (data) {
            this.router.navigateByUrl('/dash');
          }
        });
    }
  }
}
