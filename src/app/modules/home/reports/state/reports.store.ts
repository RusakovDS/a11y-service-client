import {StoreConfig, ID, EntityState, EntityStore} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {Report} from './report.model';

export interface ReportsState extends EntityState<Report> {}

@StoreConfig({
  name: 'reports',
})
@Injectable({
  providedIn: 'root'
})
export class ReportsStore extends EntityStore<ReportsState, Report> {
  constructor() {
    super();
  }
}
