import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { AuthService} from 'angular2-social-login';
import {Router} from '@angular/router';
import {UtilService} from './util.service';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {
  sub;
  // baseUrl = 'http://mozorest.some-one.me';
  baseUrl = 'http://localhost:8000';
  authToken = null;
  isLoggedIn = false;
  user = null;
  userExpenses = null;
  userTransactions= null;
  userFriends = null;
  constructor(private http: Http, private socialAuth: AuthService, private router: Router, private utilService: UtilService) {
    if (localStorage.getItem('localUser')) {
      const data = JSON.parse(localStorage.getItem('localUser'));
      console.log(data);
      this.isLoggedIn = true;
      this.authToken = new Headers({'Authorization': 'Token ' + localStorage.getItem('token')});
      this.user = data;
      this.preloadData();
    }
  }
  preloadData() {
    console.log(this.user);
    const promise = new Promise((resolve, reject) => {
      this.getExpenses()
        .then((data) => {
          this.userExpenses = data;
        });
      this.getTransactions()
        .then((data) => {
          this.userTransactions = data;
        });
      this.getFriends()
        .then((data) => {
          this.userFriends = data;
        });
      resolve(true);
    });
    return promise;
  }
  onSocialConnect(provider) {
    this.sub = this.socialAuth.login(provider).subscribe((data) => {
      if (!data.hasOwnProperty('error')) {
        console.log(data['token']);
        data = {'token': data['token']};
        if (provider === 'facebook') {
          this.http.post(this.baseUrl + '/social-fb/', data).subscribe((res: Response) => {
            this.user = res.json().userData;
            localStorage.setItem('localUser', JSON.stringify(res.json().userData));
          });
        } else {
          this.http.post(this.baseUrl + '/social-google/', data).subscribe((res: Response) => {
            this.user = res.json().userData;
            localStorage.setItem('localUser', JSON.stringify({'isVerified': 1, 'userData': res.json().userData}));
          });
        }
      }
    });
  }
  onSocialSignIn(provider) {
    const promise = new Promise((resolve, reject) => {
      this.sub = this.socialAuth.login(provider).subscribe((data) => {
        if (!data.hasOwnProperty('error')) {
          data = {'token': data['token']};
          const providerUrl = provider === 'facebook' ? '/social-fb/' : '/social-google/';
          this.http.post(this.baseUrl + providerUrl, data).subscribe((res: Response) => {
            const resData = res.json();
            this.isLoggedIn = true;
            this.user = resData.userData;
            this.authToken = new Headers({'Authorization': 'Token ' + resData.token});
            localStorage.setItem('localUser', JSON.stringify(resData.userData));
            localStorage.setItem('token', resData.token);
            resolve(this.isLoggedIn);
          }, (error: Response) => {
            console.log(error);
            reject(error);
          });
        }
      });
    });
    return promise;
  }

  loginUser(data: {'username': '', 'password': ''}) {
    const promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/get-user-and-auth/', data).subscribe((res: Response) => {
        const resData = res.json();
        this.isLoggedIn = true;
        this.user = resData.user;
        this.authToken = new Headers({'Authorization': 'Token ' + resData.token});
        localStorage.setItem('token', resData.token);
        localStorage.setItem('localUser', JSON.stringify(resData.user));
        resolve(this.isLoggedIn);
      }, (error: Response) => {
        this.utilService.modal({'type': 'alert', 'title': 'Invalid', 'content': 'username and password does not match ! Try Again'});
      });
    });
    return promise;
  }
  registerUser(data) {
    const registerUserPromise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/user/', data).subscribe((resData: Response) => {
        this.user = resData.json();
        this.loginUser({'username': data['username'], 'password': data['password']})
          .then((isLoggedIn: boolean) => {
          resolve(isLoggedIn);
          });
      }, (error: Response) => {
        this.utilService.modal({'type': 'alert-failure', 'title': 'User already exists', 'content': 'try again with other email'});
      });
    });
    return registerUserPromise;
  }
  logoutUser() {
    const logoutPromise = new Promise((resolve, reject) => {
      localStorage.clear();
      this.isLoggedIn = false;
      this.user = null;
      this.authToken = null;
      resolve(true);
    });
    return logoutPromise;
  }
  updateUserName(data: {'first_name': '', 'last_name': ''}) {
    const updateNamePromise = new Promise((resolve, reject) => {
      this.http.patch(this.baseUrl + /user/ + this.user.id + '/', data).subscribe((resData: Response) => {
        this.user = resData.json();
        localStorage.setItem('localUser', JSON.stringify(resData.json()));
        resolve(true);
      }, (error: Response) => {
        console.log(error);
      });
    });
    return updateNamePromise;
  }
  onSearchPeoples(data) {
    return this.http.post(this.baseUrl + '/search-friends/', data);
  }
  updateBalance(data) {
    return this.http.patch(this.baseUrl + '/user/' + this.user.id + '/'  , data);
  }
  refreshTokenNUser(data) {
    this.user = data;
    localStorage.setItem('localUser', JSON.stringify(data));
  }
  addExpense(data) {
     return this.http.post(this.baseUrl + '/expenses/', data, {headers: this.authToken}).subscribe((resData: Response) => {
       console.log(resData.json());
       this.userExpenses.push(resData.json());
       this.utilService.modal({'type': 'alert', 'title': 'Success', 'content': 'Added Expense'});
     }, (error: Response) => {
       console.log(error.json());
     });
  }
  getExpenses() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/expenses/', {headers: this.authToken}).subscribe((resData: Response) => {
        this.userExpenses = resData.json();
        resolve(this.userExpenses);
      }, (error: Response) => {
        reject(error);
        alert(error.text);
      });
    });
    return promise;
  }
  getFriends() {
    const friends = this.user.friends;
    const promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/get-friends/', friends, {headers: this.authToken}).subscribe((resData: Response) => {
        this.userFriends = resData.json();
        resolve(resData.json());
      }, (error: Response) => {
        reject(error);
      });
    });
    return promise;
  }
  addFriend(id) {
    this.user.friends.push(id);
    const data = {'friends': this.user.friends};
    const promise = new Promise((resolve, reject) => {
      this.http.patch(this.baseUrl + '/user/' + this.user.id + '/', data, {headers: this.authToken}).subscribe(
        (resData: Response) => {
          this.refreshTokenNUser(resData.json());
          resolve(resData.json());
        }, (error: Response) => {
          reject(error.json());
        }
      );
    });
    return promise;
  }
  getTransactions() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/transactions/', {headers: this.authToken}).subscribe((resData: Response)=> {
        this.userTransactions = resData.json();
        resolve(resData.json());
      }, (error: Response) => {
        reject(error.json());
      });
    });
    return promise;
  }
  addTransaction(data) {
    const promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/transactions/', data, {headers: this.authToken}).subscribe((resData: Response) =>  {
        this.userTransactions.push(resData.json());
        resolve(resData.json());
      }, (error: Response) => {
        console.log(error.json());
        reject(error);
      });
    });
    return promise;
  }
}
