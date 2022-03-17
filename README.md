# HMPPS PI-Watch

Generate an overview report for the systems managed by the HMPPS Probation Integration team

## Build and Run

```sh
# Create .env file in the project root
cd hmpps-pi-watch

cat << EOF > .env
GITHUB_TOKEN=<Your GitHub Token>
CIRCLECI_TOKEN=<Your CircleCI Token>
JIRA_TOKEN=<Your JIRA Username>:<Your JIRA Token>
JIRA_BOARD_ID=<JIRA Project Board ID e.g. 760>
SLACK_WEBHOOK=<Your Slack Application Webhook URL>

EOF

# Install
npm install

# Build and run
npm run exec
```
