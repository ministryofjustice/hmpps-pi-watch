import { config } from "dotenv";

config();

export const loadGitHubAuth = () => ({
  github_token: process.env.GITHUB_TOKEN,
});

export const loadCircleCIAuth = () => ({
  circleci_token: process.env.CIRCLECI_TOKEN,
});

export const loadJIRAAuth = () => ({
  jira_token: process.env.JIRA_TOKEN,
});

export const loadJIRAConfig = () => ({
  board_id: process.env.JIRA_BOARD_ID,
});
