import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilService} from '../util.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy{
  sideNavIsHidden = true;
  constructor(private utilService: UtilService) { }
  ngOnInit() {
    this.utilService.sideNav.subscribe((res: boolean) => {
      this.onToggle();
    });
  }
  onToggle() {
    this.sideNavIsHidden = !this.sideNavIsHidden;
  }
  ngOnDestroy() {
    this.utilService.sideNav.unsubscribe();
  }



}
