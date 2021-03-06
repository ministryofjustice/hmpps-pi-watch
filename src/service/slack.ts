import { HeaderBlock, DividerBlock, SectionBlock } from "@slack/web-api";
import { IncomingWebhook } from "@slack/webhook";

import { loadSlackConfig } from "../config";
import { System } from "../systems";

const config = loadSlackConfig();
const webhook = new IncomingWebhook(config.slack_webhook || "");

export const toSlack = (systems: System[]) => {
  const report = systems
    .map((system: System) => {
      return message(system);
    })
    .flat();

  return webhook.send({
    text: report.toString(),
    blocks: report
  });
};

const message = (
  system: System
): (HeaderBlock | SectionBlock | DividerBlock)[] => {
  const version = `*Prod Version:*                ${system.prod_version}`;
  const deployed = `*Last Deployed:*             ${system.last_deployed}`;
  const branches = `*Code Branches:*            ${system.branch_count}`;
  const prs = `*Open PRs:*                     ${system.pull_requests}`;
  const commits = `*Undeployed Commits:* ${system.undeployed_commits}`;
  const issues = `*Open Issues:*                 ${system.open_issues}`;
  const security = `*Failing Security For:*     ${system.failing_security_for}`;

  const header: HeaderBlock = {
    type: "header",
    text: {
      type: "plain_text",
      text: `PI Watch 🕵️ ${system.name}`,
      emoji: true,
    },
  };

  const section: SectionBlock = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `> ${version}\n> ${deployed}\n> ${branches}\n> ${prs}\n> ${commits}\n> ${issues}\n> ${security}`,
    },
  };

  const divider: DividerBlock = { type: "divider" };

  return [header, section, divider];
};
