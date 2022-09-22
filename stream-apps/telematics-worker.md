```
@App:name("telematics-worker")
@App:description("telematics-worker")

/* 
1. Check if the vehicle is in "planned maintenance" collection with a future date and set "Maintenance_Planned" field to Yes/No accordingly.
2. Check the Fault Severity in Faults collection using "Alert Description" in the alert. Set accordingly the status level to "Critical/Attention"
3. Populate Telematics Collection.
*/

@source(
    type = "c8streams", 
    stream.list = "telematics", 
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

@sink(
    type = "restql-call",
    restql.name = "is_asset_maintenance_planned",
    sink.id = "IsAssetMaintenancePlanned"
)
define stream RestQlIsAssetMaintenancePlanned(asset string);

@source(
    type = "restql-call-response",
    sink.id = "IsAssetMaintenancePlanned",
    @map(type = "json")
)
define stream IsAssetMaintenancePlanned(
    Asset string,
    Booked_In string,
    Maintenance_Planned string
);

@sink(
    type = "c8streams",
    stream = "intermediate-telematics",
    replication.type = "local",
    @map(type = "json")
)
define stream IntermediateTelematicsStream(
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

@store(
    type = "c8db",
    collection = "telematics",
    @map(type = "json")
)
define table TelematicsCollection(
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
    type = "c8streams", 
    stream = "enriched-telematics",
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

select Asset as asset
from TelematicsStream
insert into RestQlIsAssetMaintenancePlanned;

select 
    TS.Address,
    TS.Asset,
    MP.Booked_In,
    TS.City,
    TS.Country,
    TS.Fault,
    MP.Maintenance_Planned,
    TS.Postcode,
    ifThenElse(str:equalsIgnoreCase(TS.Fault, "No Start"), "Critical", "Attention") as Status_Level,
    TS.Timestamp
from TelematicsStream#window.length(1) as TS
join IsAssetMaintenancePlanned#window.length(1) as MP
on TS.Asset == MP.Asset
insert into IntermediateTelematicsStream;

select *
from IntermediateTelematicsStream
insert into TelematicsCollection;

select *
from IntermediateTelematicsStream
insert into EnrichedTelematicsStream;
```