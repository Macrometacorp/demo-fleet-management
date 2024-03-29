```
@App:name("telematics-simulator")
@App:description("telematics-simulator")

/* 
• Generate 1 telematic alert every 3 seconds
• Telematic alert composition every 3 seconds:
    - 1 Planned Maintenance or 1 Unplanned Maintenance
• Read from Telematics collection random alerts maintaining above alert composition and change the timestamps to current time before publishing these alerts.
*/

define trigger TelematicsSimulatorTrigger at every 3 sec;

@sink(
    type = "restql-call",
    restql.name = "get_telematic_simulator_input_alert",
    sink.id = "TelematicsAlerts"
)
define stream RestQlGetPlannedAlerts(
    is_planned_maintenance string, 
    batch_offset long, 
    event_limit int
);

@source(
    type = "restql-call-response",
    sink.id = "TelematicsAlerts",
    @map(type = "json")
)
define stream TelematicsAlerts(
    Address string,
    Asset string,
    City string,
    Country string,
    Fault string,
    Maintenance_Planned string,
    Postcode string,
    Status_Level string,
    Timestamp string
);

@sink(
    type = "c8streams",
    stream = "telematics",
    replication.type = "global",
    @map(type = "json")
)
define stream TelematicsStream(
    Address string,
    Asset string,
    City string,
    Country string,
    Fault string,
    Maintenance_Planned string,
    Postcode string,
    Status_Level string,
    Timestamp string
);

select
    ifThenElse(count() % 2 == 0, "Yes", "No") AS is_planned_maintenance,
    count() - 1 AS batch_offset,
    1 AS event_limit
from TelematicsSimulatorTrigger
insert into RestQlGetPlannedAlerts;

select
    Address,
    Asset,
    City,
    Country,
    Fault,
    Maintenance_Planned,
    Postcode,
    Status_Level,
    Timestamp
from TelematicsAlerts
insert into TelematicsStream;
```