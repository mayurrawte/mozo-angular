import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {BackendService} from './backend.service';
import {UtilService} from './util.service';

@Injectable()
export class AuthGardGuard implements CanActivate {
  constructor(private backendService: BackendService, private utilService: UtilService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.backendService.isLoggedIn) {
     return true;
    } else {
      this.utilService.modal({'type': 'alert-failure', 'title': 'Unauthorized', 'content': 'Please login to continue'});
      this.router.navigate(['/'])
        .then((data) => { console.log(data); })
        .catch((data) => {console.log(data); });
    }
  }
}
