import {Component, OnInit} from '@angular/core';
import {Node, Report, ReportsService} from '../state';
import {ActivatedRoute} from '@angular/router';
import {ReportsQuery} from '../state/reports.query';
import {Observable, of} from 'rxjs';
import * as moment from 'moment';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit {

  private reportId: number;
  loading$: Observable<boolean>;
  report$: Observable<Report>;
  tests: Array<any> = [];
  testNodes: Node[] = [];

  constructor(
    private route: ActivatedRoute,
    private reportsQuery: ReportsQuery,
    private reportService: ReportsService,
  ) {
    this.route.params.subscribe(params => {
      this.reportId = params.id;
    });
  }

  ngOnInit(): void {
    this.loading$ = this.reportsQuery.selectLoading();
    this.report$ = this.reportsQuery.selectEntity(this.reportId);

    this.reportsQuery.selectHasCache()
      .pipe(switchMap(hasCache => {
        return hasCache ? of() : this.reportService.getOneById(this.route.snapshot.params.id);
      })).subscribe(() => this.tests = this.reportsQuery.getTestsByReport(this.reportId));

    if (this.reportsQuery.getHasCache()) {
      this.tests = this.reportsQuery.getTestsByReport(this.reportId);
    }
  }
}
