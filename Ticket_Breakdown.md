# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### 1 - Database changes

A new many to many relationship between Facility and Agent will have to be created. Assuming we're using Prisma, both models will have to be updated to account for this. And also a new model will have to be created, containing a row for each Facility/Agent combination, with a non-nullable column `AgentCustomId` that will default back to the agent ID until each facility add its custom one.

- acceptance criteria: the new model is created and both previously existing models are updated. Migrations are also added

- implementation detail: [Prisma docs](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations)

- effort estimation: 1-3 days depending on assignee familiarity with Prisma

### 2 - `getShiftsByFacility` update

So that the agent metadata inside each shift it returns contains the new `AgentCustomId` field (while also keeping the original AgentId, to avoid any regressions)

- acceptance criteria: each shift returned contains the `AgentCustomId`, besides the AgentId

- implementation detail: update the return types to include the new field. if using the types provided by Prisma, it should be done automatically. Also update existing tests to include this field

- effort estimation: 1/2 day if not using Prisma types

### 3 - use `AgentCustomId` inside `generateReport`

Replace the original AgentId with `AgentCustomId` in the report generated

- acceptance criteria: the agent ID in the report is the custom one given by the Facility in question instead of its internal database id

- implementation detail: Replace the original AgentId with `AgentCustomId` in the report generation logic. Also update existing tests

- effort estimation: 1/2 day
