import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../backend.service';
import {UtilService} from '../../util.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {


  editMode = false;
  constructor(public backendService: BackendService, private utilService: UtilService) { }
  ngOnInit() {
  }
  onEdit() {
    this.editMode = !this.editMode;
  }
  onUpdate() {
    const user = JSON.parse(localStorage.getItem('localUser'));
    if (this.backendService.user.first_name !== user.first_name || this.backendService.user.last_name !== user.last_name) {
      const updateData = {'first_name': this.backendService.user.first_name, 'last_name': this.backendService.user.last_name};
      this.backendService.updateUserName(updateData)
        .then((isupdated) => {
        if (isupdated) {
          this.utilService.modal({'type': 'alert', 'title': 'updated', 'content': 'Successfully'});
        }
        });
    }
  }
  connectSocial(provider) {
    console.log(provider);
    this.backendService.onSocialConnect(provider);
  }
}

