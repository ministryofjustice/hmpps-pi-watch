export interface System {
  name: string;
  job: string;
  preprod_url?: string;
  prod_url?: string;
  last_deployed?: string;
  branch_count?: number;
  pull_requests?: number;
  undeployed_commits?: number;
  open_issues?: number;
  prod_version?: string;
}

export const systems: System[] = [
  {
    name: "hmpps-delius-api",
    job: "deploy-to-prod",
    prod_url: "https://delius-api.probation.service.justice.gov.uk/info",
  },
  {
    name: "community-api",
    job: "deploy_to_production",
    prod_url: "https://community-api.probation.service.justice.gov.uk/info",
  },
  {
    name: "probation-offender-events",
    job: "deploy_prod",
    prod_url:
      "https://probation-offender-events.hmpps.service.justice.gov.uk/info",
  },
  {
    name: "probation-offender-search",
    job: "deploy_prod",
    prod_url:
      "https://probation-offender-search.hmpps.service.justice.gov.uk/info",
  },
  {
    name: "probation-offender-search-indexer",
    job: "deploy_prod",
    prod_url:
      "https://probation-search-indexer.hmpps.service.justice.gov.uk/info",
  },
  {
    name: "case-notes-to-probation",
    job: "deploy_prod",
    prod_url:
      "https://case-notes-to-probation.prison.service.justice.gov.uk/info",
  },
  {
    name: "prison-to-probation-update",
    job: "deploy_prod",
    prod_url:
      "https://prison-to-probation-update.prison.service.justice.gov.uk/info",
  },
];
