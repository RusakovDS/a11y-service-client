import {Injectable} from '@angular/core';
import {Project, ProjectsStore} from './projects.store';
import {ApiService} from '../../../../services/api.service';
import {map, switchMap} from 'rxjs/operators';
import {AuthStore} from '../../../auth/state';
import {ID, resetStores} from '@datorama/akita';
import {of} from 'rxjs';
import {ProjectsQuery} from './projects.query';
import {ReportsStore} from '../../reports/state/reports.store';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private authStore: AuthStore,
    private projectsStore: ProjectsStore,
    private reportsStore: ReportsStore,
    private projectsQuery: ProjectsQuery,
    private apiService: ApiService
  ) {
  }

  checkCache() {
    return this.projectsQuery.selectHasCache()
      .pipe(switchMap(hasCache => {
        return hasCache ? of() : this.getAll();
      }));
  }

  resetStore(): void {
    this.projectsStore.setHasCache(false);
    this.projectsStore.destroy();
  }

  getAll() {
    return this.apiService.get(`projects`).pipe(
      map(response => {

        const allReports = [];
        const projects = response.map(currentProject => {
          const {report, ...project} = currentProject;
          project.report = [];

          for (const currentReport of report) {
            allReports.push(currentReport);
            project.report.push(currentReport.id);
          }
          return project;
        });

        this.reportsStore.set(allReports);
        this.projectsStore.set(projects);
      }),
    );
  }

  getAllProjectsTitles() {
    return this.apiService.get('projects/titles');
  }

  create(formValues: Project) {
    return this.apiService.post('projects', formValues)
      .pipe(map(newEntity => {
        if (newEntity) {
          this.projectsStore.add({
              ...newEntity,
              updateDate: moment(newEntity.createdDate).local()
            }
          );
        }
      }));
  }

  edit(formValues: Project, id: ID) {
    return this.apiService.put(`projects/${id}`, formValues)
      .pipe(map(updEntity => {
        if (updEntity) {
          this.projectsStore.update(id, updEntity);
          this.projectsStore.setHasCache(false);
        }
      }));
  }

  delete(id: ID) {
    this.apiService.delete(`projects/${id}`)
      .subscribe(
        () => {
          this.projectsStore.setHasCache(false);
        }
      );
  }
}
