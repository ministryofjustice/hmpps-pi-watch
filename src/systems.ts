export interface System {
  name: string;
  deploy_job: string;
  security_job: string;
  preprod_url?: string;
  prod_url?: string;
  last_deployed?: string;
  branch_count?: number;
  pull_requests?: number;
  undeployed_commits?: number;
  open_issues?: number;
  prod_version?: string;
  failing_security_for?: string;
}

export const systems: System[] = [
  {
    name: "hmpps-delius-api",
    deploy_job: "deploy-to-prod",
    security_job: "scheduled",
    prod_url: "https://delius-api-public.probation.service.justice.gov.uk/info",
  },
  {
    name: "community-api",
    deploy_job: "deploy_to_production",
    security_job: "security",
    prod_url: "https://community-api-public.probation.service.justice.gov.uk/info",
  },
  {
    name: "probation-offender-events",
    deploy_job: "deploy_prod",
    security_job: "security",
    prod_url:
      "https://probation-offender-events.hmpps.service.justice.gov.uk/info",
  },
  {
    name: "probation-offender-search",
    deploy_job: "deploy_prod",
    security_job: "security",
    prod_url:
      "https://probation-offender-search.hmpps.service.justice.gov.uk/info",
  },
  {
    name: "probation-offender-search-indexer",
    deploy_job: "deploy_prod",
    security_job: "security",
    prod_url:
      "https://probation-search-indexer.hmpps.service.justice.gov.uk/info",
  },
  {
    name: "case-notes-to-probation",
    deploy_job: "deploy_prod",
    security_job: "security",
    prod_url:
      "https://case-notes-to-probation.prison.service.justice.gov.uk/info",
  },
  {
    name: "prison-to-probation-update",
    deploy_job: "deploy_prod",
    security_job: "security",
    prod_url:
      "https://prison-to-probation-update.prison.service.justice.gov.uk/info",
  },
];
