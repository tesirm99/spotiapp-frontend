import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tab3Text = 'Login';
  constructor() {}

  ngOnInit() {
    //if is logged in tab3Text = 'Profile'
    //else tab3Text = 'Login'

  }

}
