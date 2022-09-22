```
@App:name("insights-worker")
@App:description("insights-worker")

/* 
For each alert, update the following collections and increment respective counts
    1. Issue Counts
    2. Vehicle Issue Counts & Cost
    3. Area Issue Counts
*/

@source(
    type = "c8streams",
    stream.list = "enriched-telematics",
    replication.type = "global",
    @map(type = "json")
)
define stream EnrichedTelematicsStream(
    Address string,
    Asset string,
    Booked_In string,
    City string,
    Country string,
    Fault string,
    Maintenance_Planned string,
    Postcode string,
    Status_Level string,
    Timestamp string
);

@sink(
    type = "restql-call",
    restql.name = "update_issue_counts"
)
define stream RestQlUpdateIssueCount(
    fault string,
    count int
);

@sink(
    type = "restql-call",
    restql.name = "update_area_issue_counts"
)
define stream RestQlUpdateAreaIssueCount(
    city string,
    count int
);

@sink(
    type = "restql-call",
    restql.name = "update_vehicle_issue_counts"
)
define stream RestQlUpdateVehicleIssueCount(
    asset string,
    count int,
    total_cost int
);

select
    Fault as fault,
    1 as count
from EnrichedTelematicsStream
insert into RestQlUpdateIssueCount;

select
    City as city,
    1 as count
from EnrichedTelematicsStream
insert into RestQlUpdateAreaIssueCount;

select
    Asset as asset,
    1 as count,
    0 as total_cost
from EnrichedTelematicsStream
insert into RestQlUpdateVehicleIssueCount;
```