import { pipe } from "rxjs";

import { System, systems } from "./systems";
import { withJusticeServiceVersion } from "./service/moj";
import { withDeployAge, withSecurity } from "./service/circleci";
import { withIssues } from "./service/jira";
import {
  withBranchCount,
  withPullRequestCount,
  withUndeployedCommitCount,
} from "./service/github";
import { toSlack } from "./service/slack";

const systemData: System[] = await Promise.all(
  systems.map(async (system) => {
    return pipe(
      withJusticeServiceVersion,
      withDeployAge,
      withBranchCount,
      withUndeployedCommitCount,
      withPullRequestCount,
      withIssues,
      withSecurity
    )(Promise.resolve(system));
  })
);

console.table(systemData, [
  "name",
  "last_deployed",
  "branch_count",
  "prod_version",
  "pull_requests",
  "undeployed_commits",
  "open_issues",
  "failing_security_for",
]);

toSlack(systemData);
