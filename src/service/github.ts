import fetch from "node-fetch";
import { System } from "../systems";
import { loadGitHubAuth } from "../config";

const auth = loadGitHubAuth();

const baseURL = "https://api.github.com";
const org = "ministryofjustice";

export const withBranchCount = async (
  system: Promise<System>
): Promise<System> => {
  const r_system = await system;
  const url = `${baseURL}/repos/${org}/${r_system.name}/branches`;

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${auth.github_token}`,
    },
  });

  const data = (await response.json()) as [];
  return { ...r_system, branch_count: data.length };
};

export const withPullRequestCount = async (
  system: Promise<System>
): Promise<System> => {
  const r_system = await system;
  const url = `${baseURL}/repos/${org}/${r_system.name}/pulls`;

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${auth.github_token}`,
    },
  });

  const data = (await response.json()) as [];

  return { ...r_system, pull_requests: data.length };
};

export const withUndeployedCommitCount = async (
  system: Promise<System>
): Promise<System> => {
  const r_system = await system;
  const sha = r_system.prod_version?.split(".")[2];

  const searchParams = { sha };
  const url = `${baseURL}/repos/${org}/${
    r_system.name
  }/commits?${searchParams.toString()}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${auth.github_token}`,
    },
  });
  const data = (await response.json()) as [{ sha: string }];

  const latest_deployed = data.findIndex(
    (commit) => commit.sha.substring(0, 7) == sha
  );
  const undeployed = data.slice(0, latest_deployed);

  return { ...r_system, undeployed_commits: undeployed.length };
};
