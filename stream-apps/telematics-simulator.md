```
@App:name("telematics-simulator")
@App:description("telematics-simulator")

/* 
• Generate 3 telematics alerts every 3 seconds
• Telematic alert composition every 3 seconds:
    - 2 Planned Maintenance
    - 1 Unplanned Maintenance
• Read from Telematics collection 3 random alerts maintaining above alert composition and change the timestamps to current time before publishing these alerts.
*/

define trigger TelematicsSimulatorTrigger at every 3 sec;

@sink(type="restql-call", restql.name="get_telematic_simulator_input_alert", sink.id="TelematicsAlerts")
define stream RestQlGetPlannedAlerts(is_planned_maintenance string, batch_offset long, event_limit int);

@source(type="restql-call-response", sink.id="TelematicsAlerts", @map(type='json'))
define stream TelematicsAlerts(Address string, Asset string, City string, Country string, Fault string, Maintenance_Planned string, Postcode string, Status_Level string, Timestamp string);

@sink(type="c8streams", stream="telematics", replication.type="global", @map(type='json'))
define stream TelematicsStream(Address string, Asset string, City string, Country string, Fault string, Maintenance_Planned string, Postcode string, Status_Level string, Timestamp string);

SELECT
    ifThenElse(count() % 2 == 0, "Yes", "No") AS is_planned_maintenance,
    count() - 1 AS batch_offset,
    1 AS event_limit
FROM TelematicsSimulatorTrigger
INSERT INTO RestQlGetPlannedAlerts;

SELECT
    Address,
    Asset,
    City,
    Country,
    Fault,
    Maintenance_Planned,
    Postcode,
    Status_Level,
    Timestamp
FROM TelematicsAlerts
INSERT INTO TelematicsStream;
```