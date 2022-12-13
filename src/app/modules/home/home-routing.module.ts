import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectsComponent } from "./projects/projects.component";
import { ProfileComponent } from "./profile/profile.component";
import { ReportsComponent } from "./reports/reports.component";
import { ReportDetailsComponent } from "./reports/report-details/report-details.component";

const routes: Routes = [
  { path: "projects", component: ProjectsComponent },
  { path: "reports", component: ReportsComponent },
  { path: "reports/:id", component: ReportDetailsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "", redirectTo: "projects", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
