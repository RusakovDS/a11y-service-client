import { ID, QueryConfig, QueryEntity } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { ReportsState, ReportsStore } from "./reports.store";
import { Report } from "./report.model";
import { Data } from "../../../../shared/chart/data.model";
import { Project } from "../../projects/state/projects.store";
import * as moment from "moment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
@QueryConfig({
  sortBy: "createdDate",
})
export class ReportsQuery extends QueryEntity<ReportsState> {
  constructor(protected store: ReportsStore) {
    super(store);
  }

  getViolatedRulesCountByReports(reports: Report[]): Data[] {
    return reports.map((report) => {
      const violatedCount = report.test
        .map((test) => test.violatedRules.length)
        .reduce((accumulator, value) => accumulator + value);

      return {
        timestamp: report.createdDate,
        violatedRules: violatedCount,
      };
    });
  }

  getTestsByReport(reportId) {
    const report = this.getEntity(reportId);

    if (report) {
      return report.test.map((test) => {
        const violatedRules = [];
        const testNodes = [];

        test.node.map((testNode) => {
          testNodes.push(testNode);
        });

        test.violatedRules.map((rule) => {
          violatedRules.push({
            ...rule,
            testNodes: testNodes.filter((item) => item.ruleId === rule.id),
          });
        });

        return {
          ...test,
          timestamp: moment(test.timestamp).format("MMMM Do YYYY, h:mm:ss a"),
          violatedRules,
          url: test.url,
        };
      });
    }
  }

  getReportsByProjectId(projectId: Project | ID): Report[] {
    return this.getAll().filter((report) => report.projectId === projectId);
  }

  selectNew(): Observable<Report[]> {
    return this.selectAll({
      filterBy: ({ status }) => status === "new",
    });
  }
}
