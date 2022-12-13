import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {ProjectsComponent} from './projects/projects.component';
import {ProfileComponent} from './profile/profile.component';

import {HomeLayoutComponent} from '../../shared/layout/home-layout/home-layout.component';
import {SidebarContentComponent} from '../../shared/sidebar/sidebar-content/sidebar-content.component';
import {SidebarHeaderComponent} from '../../shared/sidebar/sidebar-header/sidebar-header.component';
import {NotificationsComponent} from '../../shared/notifications/notifications.component';
import {ReportsComponent} from './reports/reports.component';
import {AngularMaterialModule} from '../../shared/angular-material/angular-material.module';
import {ProjectComponent} from './projects/project/project.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartComponent} from '../../shared/chart/chart.component';
import {ReportDetailsComponent} from './reports/report-details/report-details.component';
import {TestsViolatedRulesComponent} from './reports/report-details/tests-violated-rules/tests-violated-rules.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    ProfileComponent,
    HomeLayoutComponent,
    SidebarContentComponent,
    SidebarHeaderComponent,
    NotificationsComponent,
    ReportsComponent,
    ChartComponent,
    ReportDetailsComponent,
    TestsViolatedRulesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: []
    }
  ]
})
export class HomeModule {
}
