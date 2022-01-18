import fetch from "node-fetch";
import { System } from "../systems";
import { loadJIRAAuth, loadJIRAConfig } from "../config";

const auth = loadJIRAAuth();
const config = loadJIRAConfig();

const baseURL = "https://dsdmoj.atlassian.net/rest/agile/1.0";

export const withIssues = async (system: Promise<System>): Promise<System> => {
  const r_system = await system;
  const url = `${baseURL}/board/${config.board_id}/issue?jql=component="${r_system.name}"+AND+statusCategory+IN+("To+Do","In+Progress")`;

  const token = Buffer.from(auth.jira_token as string).toString("base64");
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  const data = (await response.json()) as { issues: [] };
  return { ...r_system, open_issues: data.issues.length };
};
