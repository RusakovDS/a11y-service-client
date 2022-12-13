import {QueryEntity} from '@datorama/akita';
import {ProjectsState, ProjectsStore} from './projects.store';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProjectsQuery extends QueryEntity<ProjectsState> {

  constructor(protected store: ProjectsStore) {
    super(store);
  }

}
