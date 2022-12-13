import {Component, OnInit} from '@angular/core';
import {AuthQuery} from '../../../modules/auth/state';

@Component({
  selector: 'app-menu-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss']
})
export class SidebarHeaderComponent implements OnInit {

  email: string;

  constructor(
    private authQuery: AuthQuery
  ) {
  }

  ngOnInit(): void {
    this.authQuery.email$.subscribe(
      email => this.email = email
    );
  }

}
