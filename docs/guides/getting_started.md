# Getting Started

This starter template includes every building block required to build API Micro-Services using nodejs and expressjs, that offer great performance and quicker starts.

You will be building the service in plain Javascript. If you are new to Javascript or Nodejs eco-system in general, you may refer to [Essentials of Javascript](./javascript_essentials.md) and [Essentials of NodeJS](./nodejs_essentials.js) to understand some of the essential concepts you need to learn to be able to build great services on nodejs.

## Before you get started..

Discuss with Solution Architect and Team Leads to identify the needs of the service and evaluate if it makes sense to build it as an independent micro-service or add additional features to an existing micro-service.

If it will be a new service, as part of this discussion, it is also important to finalize the following:

- [ ] Name of your API Micro-Service
- [ ] API Path of your service
- [ ] If API will be consumed by HPMS frontend Web application
  - [ ] Enumerate User Access Types
- [ ] If API will be consumed by external consumers, linked to HPMS Plan Users
  - [ ] Enumerate API Access Scopes in addition to User Access Types
- [ ] If API will be consumed by external consumers, NOT linked to a HPMS Plan User
  - [ ] Enumerate API Access Scopes
- [ ] List of Data Sources (Schemas and Databases)
  - [ ] Enumerate data schema, data sources

If you will be primarily adding addtional functionality or features to an existing service, evaluate the above list for updates/impacts.

### Data Access

For all the data schemas and data sources identified in the above step, create a Jira ticket to DBA Team to provision and grant appropriate permissions.

### CI/CD Pipelines

Create a Jira ticket to DevOps team to setup Continuous Integration (CI) pipelines and Continuous Deployment (CD) pipelines for your service.
You are required to include a list of all environment variables that must be included as part of CI/CD, so you may do this once all environment variables
are properly setup and test those variables.
