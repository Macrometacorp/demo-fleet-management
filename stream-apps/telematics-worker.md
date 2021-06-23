```
@App:name("telematics-worker")
@App:description("telematics-worker")

/* 
1. Check if the vehicle is in "planned maintenance" collection with a future date and set "Maintenance_Planned" field to Yes/No accordingly.
2. Check the Fault Severity in Faults collection using "Alert Description" in the alert. Set accordingly the status level to "Critical/Attention"
3. Populate Telematics Collection.
*/

@source(type="c8streams", stream.list="telematics", replication.type="global", @map(type='json'))
define stream TelematicsStream(Address string, Asset string, City string, Country string, Fault string, Maintenance_Planned string, Postcode string, Status_Level string, Timestamp string);

@sink(type="restql-call", restql.name="is_asset_maintenance_planned", sink.id="IsAssetMaintenancePlanned")
define stream RestQlIsAssetMaintenancePlanned(asset string);

@source(type="restql-call-response", sink.id="IsAssetMaintenancePlanned", @map(type='json'))
define stream IsAssetMaintenancePlanned(Asset string, Booked_In string, Maintenance_Planned string);

@sink(type="c8streams", stream="intermediate-telematics", replication.type="local", @map(type='json'))
define stream IntermediateTelematicsStream(Address string, Asset string, Booked_In string, City string, Country string, Fault string, Maintenance_Planned string, Postcode string, Status_Level string, Timestamp string);

@store(type="c8db", collection="telematics", @map(type='json'))
define table TelematicsCollection(Address string, Asset string, Booked_In string, City string, Country string, Fault string, Maintenance_Planned string, Postcode string, Status_Level string, Timestamp string);

@sink(type="c8streams", stream="enriched-telematics", replication.type="global", @map(type='json'))
define stream EnrichedTelematicsStream(Address string, Asset string, Booked_In string, City string, Country string, Fault string, Maintenance_Planned string, Postcode string, Status_Level string, Timestamp string);

SELECT Asset as asset
FROM TelematicsStream
INSERT INTO RestQlIsAssetMaintenancePlanned;

SELECT 
    TS.Address,
    TS.Asset,
    MP.Booked_In,
    TS.City,
    TS.Country,
    TS.Fault,
    MP.Maintenance_Planned,
    TS.Postcode,
    ifThenElse(str:equalsIgnoreCase(TS.Fault, "No Start"), "Critical", "Attention") AS Status_Level,
    TS.Timestamp
FROM TelematicsStream#window.length(1) AS TS
    JOIN IsAssetMaintenancePlanned#window.length(1) AS MP
    ON TS.Asset == MP.Asset
INSERT INTO IntermediateTelematicsStream;

SELECT *
FROM IntermediateTelematicsStream
INSERT INTO TelematicsCollection;

SELECT *
FROM IntermediateTelematicsStream
INSERT INTO EnrichedTelematicsStream;
```