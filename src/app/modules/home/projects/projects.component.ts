import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProjectComponent} from './project/project.component';
import {ProjectsService} from './state/projects.service';
import {Observable, of, Subscription} from 'rxjs';
import {ProjectsQuery} from './state/projects.query';
import {Project} from './state/projects.store';
import {switchMap} from 'rxjs/operators';
import {ID} from '@datorama/akita';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportsService} from '../reports/state';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  projectsList$: Observable<Project[]>;
  isLoading$: Observable<boolean>;
  routerQueryParams$: Subscription;
  projectsSubscription$: Subscription;

  constructor(
    private reportService: ReportsService,
    private projectsService: ProjectsService,
    public projectsQuery: ProjectsQuery,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.routerQueryParams$ = route.queryParams.subscribe(params => {
      if (params.create) {
        this.createProject();
      } else if (params.id) {
        this.editProject(params.id);
      }
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.projectsQuery.selectLoading();
    this.projectsList$ = this.projectsQuery.selectAll();

    // if cached, don't call API
    this.projectsSubscription$ = this.projectsService.checkCache().subscribe();
  }

  ngOnDestroy(): void {
    this.routerQueryParams$.unsubscribe();
    this.projectsSubscription$.unsubscribe();
  }

  createProject(): void {
    this.openDialog({
      newProject: true
    }).afterClosed().subscribe(() => {
      this.router.navigate(['.'], {relativeTo: this.route});
    });
  }

  editProject(id: ID): void {
    const project = this.projectsQuery.getEntity(id);
    const dialogRef = this.openDialog({
      ...project,
      id,
      newProject: false
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['.'], {relativeTo: this.route});
    });
  }

  refreshProjects() {
    this.isLoading$ = this.projectsQuery.selectLoading();
    this.projectsService.resetStore();

    this.projectsService.getAll().subscribe();
  }

  openDialog(data): MatDialogRef<ProjectComponent> {
    return this.dialog.open(ProjectComponent, {
      width: '600px',
      data
    });
  }

  onRunClick(id: ID, title: string) {
    this.reportService.create(id)
      .subscribe(() => {
        this.snackBar.open(`New report for ${title} is ready!`, 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      });

    this.snackBar.open(`Starting tests for ${title}...`, 'OK', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  onDelete(id: ID) {
    this.projectsService.delete(id);
  }

  determineTime(date: Date) {
    return moment(date).fromNow();
  }
}
