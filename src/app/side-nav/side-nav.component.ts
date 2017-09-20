import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilService} from '../util.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy{
  sideNavIsHidden = true;
  isatHome = false;
  constructor(private utilService: UtilService, private router: Router) { }
  ngOnInit() {
    this.utilService.sideNav.subscribe((res: boolean) => {
      this.onToggle();
    });
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        console.log(data.url);
        if (data.url === '/') {
          this.isatHome = true;
        } else {
          this.isatHome = false;
        }
      }
    });
  }
  onToggle() {
    this.sideNavIsHidden = !this.sideNavIsHidden;
  }
  ngOnDestroy() {
    this.utilService.sideNav.unsubscribe();
  }



}
