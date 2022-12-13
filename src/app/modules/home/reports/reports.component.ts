import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Project, Url} from '../projects/state/projects.store';
import {ProjectsQuery} from '../projects/state/projects.query';
import {ProjectsService} from '../projects/state/projects.service';
import {Report, ReportsService} from './state';
import {ReportsQuery} from './state/reports.query';
import {Data} from '../../../shared/chart/data.model';
import * as moment from 'moment';

interface ProjectsTitles {
  id: number;
  title: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  selected: Project;
  projectsList: ProjectsTitles[];
  reportsList: Report[];
  data: Data[];
  projectsSubscription$: Subscription;

  constructor(
    private reportsQuery: ReportsQuery,
    private projectsQuery: ProjectsQuery,
    private projectsService: ProjectsService,
    private reportsService: ReportsService
  ) {
  }

  ngOnInit(): void {
    this.projectsSubscription$ = this.projectsService
      .getAllProjectsTitles()
      .subscribe((receivedData) => {
        this.projectsList = receivedData;
      });
  }

  ngOnDestroy(): void {
    this.projectsSubscription$.unsubscribe();
  }

  onSelect(projectId) {
    this.isLoading$ = this.reportsQuery.selectLoading();
    if (projectId) {
      if (!this.reportsQuery.getHasCache()) {
        this.reportsService.getAllByProjectId(projectId).subscribe();
      }

      this.reportsList = this.reportsQuery.getReportsByProjectId(projectId);

      this.data = this.reportsQuery.getViolatedRulesCountByReports(this.reportsList);
    }
  }

  determineTime(date: Date) {
    return moment(date).fromNow();
  }
}
