import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {UtilService} from '../util.service';
import {AuthService} from "angular2-social-login";
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showHeader = true;
  sideNavIsHidden = false;
  constructor(private router: Router,
              public backendService: BackendService,
              private utilService: UtilService,
              private SocialService: AuthService) { }
  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        if (data.url === '/login' || data.url === '/register') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }
  onMenuOpen() {
    this.utilService.sideNav.next(this.sideNavIsHidden);
    this.sideNavIsHidden = !this.sideNavIsHidden;
  }
  onLogout() {
    this.backendService.logoutUser()
      .then((isLogout) => {
      if(isLogout) {
        this.utilService.modal({'type': 'alert', 'title': 'Logged Out', 'content': 'successfully'});
        this.router.navigateByUrl('/');
      }
      });
  }
}
