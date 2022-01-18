import { pipe } from "rxjs";

import { System, systems } from "./systems";
import { withJusticeServiceVersion } from "./service/moj";
import { withDeployAge } from "./service/circleci";
import { withIssues } from "./service/jira";
import {
  withBranchCount,
  withPullRequestCount,
  withUndeployedCommitCount,
} from "./service/github";

const report: System[] = await Promise.all(
  systems.map(async (system) => {
    return pipe(
      withJusticeServiceVersion,
      withDeployAge,
      withBranchCount,
      withUndeployedCommitCount,
      withPullRequestCount,
      withIssues
    )(Promise.resolve(system));
  })
);

console.table(report, [
  "name",
  "last_deployed",
  "branch_count",
  "prod_version",
  "pull_requests",
  "undeployed_commits",
  "open_issues",
]);
