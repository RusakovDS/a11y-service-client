import { StoreConfig, ID, EntityState, EntityStore } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { Report } from "../../reports/state";

export interface Url {
  id: ID;
  name: string;
  status: string;
}

export interface Project {
  id: ID;
  title: string;
  description: string;
  url: Url[];
  report: (Report | ID)[];
  updateDate: Date;
}

export interface ProjectsState extends EntityState<Project> {}

@StoreConfig({
  name: "projects",
})
@Injectable({
  providedIn: "root",
})
export class ProjectsStore extends EntityStore<ProjectsState, Project> {
  constructor() {
    super();
  }
}
