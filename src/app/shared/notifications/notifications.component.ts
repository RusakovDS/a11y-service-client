import { Component, OnInit } from "@angular/core";
import { ReportsQuery } from "../../modules/home/reports/state/reports.query";
import { ProjectsQuery } from "../../modules/home/projects/state/projects.query";
import { ID } from "@datorama/akita";
import { ProjectsService } from "../../modules/home/projects/state/projects.service";
import { Project } from "../../modules/home/projects/state/projects.store";

interface Notification {
  reportId: ID;
  projectTitle: string;
}

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  newReports: Notification[] = [];
  newReportsCount: string | null;
  projects: Project[];

  constructor(
    private reportsQuery: ReportsQuery,
    private projectQuery: ProjectsQuery,
    private projectService: ProjectsService
  ) {}

  ngOnInit(): void {
    const newReports$ = this.reportsQuery.selectAll();

    this.projectQuery.selectAll().subscribe((value) => {
      this.projects = value;
    });

    newReports$.subscribe((value) => {
      if (value) {
        this.newReports = value.map((report) => {
          return {
            reportId: report.id,
            projectTitle: this.projects.find(
              (project) => project.id === report.projectId
            ).title,
          };
        });

        const newReportsCount = value.filter(
          (report) => report.status === "new"
        ).length;
        this.newReportsCount = newReportsCount
          ? newReportsCount.toString()
          : null;
      }
    });
  }

  onNotificationFocus(id) {}
}
