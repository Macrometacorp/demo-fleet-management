```js
@App:name("fleet-stats-worker")
@App:description("fleet-stats-worker")

/* 
1. Create a document for the current day if not present.
2. For each alert, update Fleet Stats document for the current day i.e., increment applicable counts
    1. Attention_Required
    2. Critical_Status
    3. Planned_Maintenance
    4. Unplanned_Maintenance
    5. Predicted_Maintenance
*/

@source(type="c8streams", stream.list="enriched-telematics", replication.type="global", @map(type='json'))
define stream EnrichedTelematicsStream(Address string, Asset string, Booked_In string, City string, Country string, Fault string, Maintenance_Planned string, Postcode string, Status_Level string, Timestamp string);

@sink(type="restql-call", restql.name="update_fleet_stats")
define stream RestQlUpdateFleetStats(key string, Attention_Required int, Critical_Status int, Planned_Maintenance int);

SELECT
    Timestamp as key,
    ifThenElse(str:equalsIgnoreCase(Status_Level, "Attention"), 1, 0)  as Attention_Required,
    ifThenElse(str:equalsIgnoreCase(Status_Level, "Critical"), 1, 0) as Critical_Status,
    ifThenElse(str:equalsIgnoreCase(Maintenance_Planned, "Yes"), 1, 0) as Planned_Maintenance
FROM EnrichedTelematicsStream
INSERT INTO RestQlUpdateFleetStats;
```