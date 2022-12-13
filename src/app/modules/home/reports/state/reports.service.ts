import {arrayAdd, ID} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {map} from 'rxjs/operators';
import {Project, ProjectsStore} from '../../projects/state/projects.store';
import {ReportsStore} from './reports.store';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private apiService: ApiService,
    private projectsStore: ProjectsStore,
    private reportsStore: ReportsStore
  ) {
  }

  getAllByProjectId(projectId: number) {
    return this.apiService.get(`reports/project/${projectId}`)
      .pipe(map(receivedData => {
        this.reportsStore.set(receivedData);
      }));
  }

  getOneById(reportId) {
    return this.apiService.get(`reports/${reportId}`)
      .pipe(map(receivedData => {
        this.reportsStore.add(receivedData);
      }));
  }

  create(id: ID) {
    return this.apiService.post('reports', {id})
      .pipe(map(result => {
        if (result) {
          this.reportsStore.add({...result, status: 'new'});
          this.projectsStore.update(result.projectId, arrayAdd<Project>('report', result.id));
        }
      }));
  }
}
