import fetch from "node-fetch";
import {
  formatDistanceToNow,
  formatDistanceToNowStrict,
  subDays,
} from "date-fns";

import { System } from "../systems";
import { loadCircleCIAuth } from "../config";

const baseURL = "https://circleci.com/api/v2";

interface CircleResponse {
  items: [{ stopped_at: string; status: string }];
}

const auth = loadCircleCIAuth();

const searchParams = new URLSearchParams({
  branch: "main",
  "end-date": new Date().toISOString(),
  "start-date": subDays(new Date(), 89).toISOString(),
});

export const withDeployAge = async (
  system: Promise<System>
): Promise<System> => {
  const r_system = await system;
  const url = `${baseURL}/insights/gh/ministryofjustice/${
    r_system.name
  }/workflows/build-test-and-deploy/jobs/${
    r_system.deploy_job
  }?${searchParams.toString()}`;

  const response = await fetch(url);
  const data = (await response.json()) as CircleResponse;

  const latest = data.items.sort((a, b) =>
    a.stopped_at < b.stopped_at ? 1 : -1
  )[0];

  const age = formatDistanceToNow(new Date(latest.stopped_at));
  return { ...r_system, last_deployed: `${age} ago` };
};

export const withSecurity = async (
  system: Promise<System>
): Promise<System> => {
  const r_system = await system;
  const url = `${baseURL}/insights/gh/ministryofjustice/${
    r_system.name
  }/workflows/${r_system.security_job}?${searchParams.toString()}`;

  const response = await fetch(url);
  const data = (await response.json()) as CircleResponse;

  const sortedResponses = data.items.sort((a, b) => {
    return a.stopped_at < b.stopped_at ? 1 : -1;
  });

  const firstSuccess = sortedResponses.findIndex((res) => {
    return res.status == "success";
  });

  const latestFailures = sortedResponses.slice(0, firstSuccess - 1);

  const age = formatDistanceToNowStrict(
    new Date(latestFailures?.at(-1)?.stopped_at ?? Date.now())
  );

  return { ...r_system, failing_security_for: `${age}` };
};
