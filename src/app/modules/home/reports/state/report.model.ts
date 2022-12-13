import { ID } from "@datorama/akita";
import { Url } from "../../projects/state/projects.store";

export interface Rule {
  readonly id: ID;
  readonly impact: string;
  readonly tags: Array<string>;
  readonly description: string;
  readonly help: string;
  readonly helpUrl: string;
}

export interface Node {
  id: ID;
  ruleId: string;
  testId: number;
  html: string;
}

export interface Test {
  id: ID;
  urlId: ID;
  url: Url[];
  timestamp: string;
  violatedRules: Rule[];
  node: Node[];
}

export interface Report {
  id: ID;
  projectId: ID;
  test: Test[];
  createdDate: Date;
  status: string;
}
