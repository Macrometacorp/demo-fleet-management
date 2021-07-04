**get_asset_details:**
```
FOR asset IN assets
    FILTER asset.Asset == @Asset
    RETURN asset
```

**get_telematics_30_days:**
```
FOR event IN telematics
    FILTER event.Timestamp > DATE_SUBTRACT(DATE_NOW(), 31, "day")
    SORT event.Timestamp DESC
    RETURN event
```

**get_top5_maintenance_centers_for_city:**
```
FOR maintenance_center IN maintenance_centers
    FILTER maintenance_center.City == @City
    SORT maintenance_center.Rating DESC
    LIMIT 5
    RETURN maintenance_center
```

**on_ready:**
```
UPDATE { _key: "hitachi" }
    WITH { ready: @status }
    IN demo_status
```

**load_maintenance_centers:**
```
FOR maintenance_center IN maintenance_centers_seed_data
    INSERT { 
        "City": maintenance_center.City,
        "Country": maintenance_center.Country,
        "Name": maintenance_center.Name,
        "Rating": maintenance_center.Rating,
        "Estimated_Cost": FLOOR(RAND()*51) + 50,
        "Estimated_Time": FLOOR(RAND()*5) + 1
    }
    INTO maintenance_centers
```

**load_vehicle_issue_counts:**
```
LET Vehicle_Issue_Count = (
    FOR event IN telematics
        COLLECT Asset = event.Asset
        WITH COUNT INTO fault_count
        RETURN {
            Asset,
            "Count": fault_count
        }
)

LET Vehicle_Issue_Count_With_Model = (
    FOR vehicle IN Vehicle_Issue_Count
        FOR asset IN assets
        FILTER asset.Asset == vehicle.Asset
        RETURN {
            "Asset": vehicle.Asset,
            "Model": asset.Vehicle_Model,
            "Count": vehicle.Count,
            "Total_Cost": 0
        }
)

FOR vehicle IN Vehicle_Issue_Count_With_Model
INSERT vehicle INTO vehicle_issue_counts
```

**load_telematics:**
```
FOR telematic_event IN telematics_seed_data
    LET maintenance_planned = (
        FOR maintenance_planned IN planned_maintenance
        FILTER telematic_event.Asset == maintenance_planned.Asset
        RETURN maintenance_planned
    )
    INSERT {
        "Maintenance_Planned": LENGTH(maintenance_planned) == 0 ? "No" : "Yes",
        "Booked_In": LENGTH(maintenance_planned) == 0 ? "" : maintenance_planned[0].Booked_In,
        "Status_Level": telematic_event.Fault != "No Start" ? "Attention" : "Critical",
        "Timestamp": DATE_SUBTRACT(DATE_NOW(), FLOOR(RAND()*365) + 1, "day"),
        "Fault": telematic_event.Fault,
        "Address": telematic_event.Address,
        "Asset": telematic_event.Asset,
        "City": telematic_event.City,
        "Country": telematic_event.Country,
        "Postcode": telematic_event.Postcode
    } INTO telematics
```

**load_planned_maintenance:**
```
LET planned_maintenance_data  = (
    FOR maintenance_planned IN planned_maintenance_seed_data
        FOR asset IN assets
            FILTER maintenance_planned.Asset == asset.Asset
            RETURN {
                "Asset": maintenance_planned.Asset,
                "Booked_In": DATE_ADD(DATE_NOW(), FLOOR(RAND()*7) + 1, "day"),
                "Invoice_Number": maintenance_planned.Invoice_Number,
                "Cost_Centre": maintenance_planned.Cost_Centre,
                "Work_Description": maintenance_planned.Work,
                "Work_Cost": maintenance_planned.Work_Cost,
                "Driver": asset.Driver,
                "Vehicle_Description": asset.Vehicle_Model
            }
)

FOR maintenance IN planned_maintenance_data
INSERT maintenance INTO planned_maintenance
```

**is_demo_ready:**
```
FOR status in demo_status
    FILTER status._key == "hitachi"
    RETURN status
```

**is_asset_maintenance_planned:**
```
LET Maintenance_Planned = (
    FOR asset_maintenance IN planned_maintenance
    FILTER 
        asset_maintenance.Asset == @asset AND 
        asset_maintenance.Booked_In > DATE_ISO8601(DATE_NOW())
    LIMIT 1
    RETURN {
        "Asset": @asset,
        "Booked_In": asset_maintenance.Booked_In,
        "Maintenance_Planned": "Yes"
    }
)

RETURN (
    IS_NULL(Maintenance_Planned[0])
        ? {
            "Asset": @asset,
            "Booked_In": "",
            "Maintenance_Planned": "No"
        } : Maintenance_Planned[0]
)
```

**insert_unplanned_maintenance:**
```
INSERT {
    "Asset": @Asset,
    "Booked_In": @Booked_In,
    "Invoice_Number": @Invoice_Number,
    "Cost_Center": @Cost_Center,
    "Vehicle_Model": @Vehicle_Model,
    "Driver": @Driver,
    "Work_Description": @Work_Description,
    "Work_Cost": @Work_Cost
}  INTO unplanned_maintenance
```

**get_telematic_simulator_input_alert:**
```
LET faults = ["Air Con","Battery","Brake Light","Brake Pads","Fuel Pump","Glow Plugs","Head Lamp","Injectors","No Start","Radiator","Radio","Steering","Suspension","Tyre Pressure","Water Pump"]

FOR telematic_event IN telematics
    FILTER telematic_event.Maintenance_Planned == @is_planned_maintenance
    SORT telematic_event.Timestamp ASC
    LIMIT @batch_offset, @event_limit
    RETURN {
        "Address": telematic_event.Address,
        "Asset": telematic_event.Asset,
        "City": telematic_event.City,
        "Country": telematic_event.Country,
        "Fault": faults[FLOOR(RAND()*15)],
        "Maintenance_Planned": "",
        "Postcode": telematic_event.Postcode,
        "Status_Level": "",
        "Timestamp": DATE_ISO8601(DATE_NOW())
    }
```

**get_telematic_insights:**
```
LET Vehicle_With_Most_Frequent_Issues = (
    FOR vehicle IN vehicle_issue_counts
        SORT vehicle.Count DESC
        LIMIT 1
        RETURN vehicle.Asset
)

LET Most_Common_Alert = (
    FOR issue in issue_counts
        SORT issue.Count DESC
        LIMIT 1
        RETURN issue.Fault
)

LET Total_Cost_Of_Unplanned_Maintenance = SUM(
    FOR asset_maintenance IN unplanned_maintenance
    RETURN asset_maintenance.Work_Cost    
)

LET Area_With_Most_Alerts = (
    FOR area IN area_issue_counts
        SORT area.Count DESC
        LIMIT 1
        RETURN area.City
)

LET Least_Cost_Effective_Vehicle = (
    FOR vehicle IN vehicle_issue_counts
        SORT vehicle.Total_Cost DESC
        LIMIT 1
        RETURN vehicle.Model
)

RETURN {
    "Vehicle_With_Most_Frequent_Issues": Vehicle_With_Most_Frequent_Issues[0],
    "Most_Common_Alert": Most_Common_Alert[0],
    "Total_Cost_Of_Unplanned_Maintenance": Total_Cost_Of_Unplanned_Maintenance,
    "Area_With_Most_Alerts": Area_With_Most_Alerts[0],
    "Least_Cost_Effective_Vehicle": Least_Cost_Effective_Vehicle[0]
}
```

**load_area_issue_counts:**
```
LET City_Wise_Faults_Count = (
    FOR event IN telematics
        COLLECT 
            City = event.City
            WITH COUNT INTO City_Wise_Issue_Count
        RETURN {
            "City": City,
            "Count": City_Wise_Issue_Count
        }
)

FOR city_wise_count IN City_Wise_Faults_Count
INSERT city_wise_count INTO area_issue_counts
```

**load_issue_counts:**
```
LET Fault_Wise_Count = (
    FOR event IN telematics
        COLLECT 
            Fault = event.Fault
            WITH COUNT INTO Fault_Count
        RETURN {
            "Fault": Fault,
            "Count": Fault_Count
        }
)

FOR fault_count IN Fault_Wise_Count
INSERT fault_count INTO issue_counts
```

**load_fleet_stats_counts:**
```
LET Attention_Required_Stats_By_Date = (
    FOR event IN telematics
        FILTER event.Status_Level == "Attention"
        COLLECT 
            Timestamp = DATE_FORMAT(event.Timestamp, "%yyyy-%mm-%dd"),
            Status_Level = event.Status_Level
            WITH COUNT INTO Status_Level_Attention_Count
        RETURN {
            "Date": Timestamp,
            "Attention_Required": Status_Level_Attention_Count
        }
)

LET Critical_Status_Stats_By_Date = (
    FOR event IN telematics
        FILTER event.Status_Level == "Critical"
        COLLECT 
            Timestamp = DATE_FORMAT(event.Timestamp, "%yyyy-%mm-%dd"),
            Status_Level = event.Status_Level
            WITH COUNT INTO Status_Level_Critical_Count
        RETURN {
            "Date": Timestamp,
            "Critical_Status": Status_Level_Critical_Count
        }
)

LET Planned_Maintenance_Stats_By_Date = (
    FOR event IN telematics
        FILTER event.Maintenance_Planned == "Yes"
        COLLECT 
            Timestamp = DATE_FORMAT(event.Timestamp, "%yyyy-%mm-%dd"),
            Maintenance_Planned = event.Maintenance_Planned
            WITH COUNT INTO Maintenance_Planned_Count
        RETURN {
            "Date": Timestamp,
            "Planned_Maintenance": Maintenance_Planned_Count
        }
)

FOR attention_required_stats IN Attention_Required_Stats_By_Date
    LET  critical_status_stats = (
        FOR critical_status_stats IN Critical_Status_Stats_By_Date
        FILTER attention_required_stats.Date == critical_status_stats.Date
        RETURN critical_status_stats
    )
    LET planned_maintenance_stats = (
        for planned_maintenance_stats in Planned_Maintenance_Stats_By_Date
        filter attention_required_stats.Date == planned_maintenance_stats.Date
        RETURN planned_maintenance_stats
    )
    INSERT {
        "_key": attention_required_stats.Date,
        "Date": attention_required_stats.Date,
        "Planned_Maintenance": Length(planned_maintenance_stats) == 0 ? 0 : planned_maintenance_stats[0].Planned_Maintenance,
        "Critical_Status": Length(critical_status_stats) == 0 ? 0 : critical_status_stats[0].Critical_Status,
        "Attention_Required": attention_required_stats.Attention_Required,
        "Unplanned_Maintenance": 0 
    } INTO fleet_stats
```

**get_fleet_stats:**
```
LET last_7_days  = (
    FOR stat IN fleet_stats
        FILTER 
            DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 14, "day"), stat.Date, "day") <= 14 AND 
            DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 14, "day"), stat.Date, "day") > 7
        RETURN stat
)

LET last_7_14_days = (
    FOR stat IN fleet_stats
    FILTER 
        DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 14, "day"), stat.Date, "day") <= 7 AND 
        DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 14, "day"), stat.Date, "day") > 0
    RETURN stat
)

LET last_7_days_critical_assets = (
    FOR telematic IN telematics
        FILTER
            telematic.Status_Level == "Critical"
            AND DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 7, "day"), DATE_TIMESTAMP(telematic.Timestamp), "day") <= 7
            AND DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 7, "day"), DATE_TIMESTAMP(telematic.Timestamp), "day") > 0
        RETURN DISTINCT telematic.Asset
)

LET last_7_14_days_critical_assets = (
    FOR telematic IN telematics
        FILTER
            telematic.Status_Level == "Critical"
            AND DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 14, "day"), DATE_TIMESTAMP(telematic.Timestamp), "day") <= 7
            AND DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 14, "day"), DATE_TIMESTAMP(telematic.Timestamp), "day") > 0
        RETURN DISTINCT telematic.Timestamp
)

LET status_for_last_7_14_days = {
    "Attention_Required": SUM(TO_ARRAY(last_7_14_days[*].Attention_Required)),
    "Critical_Status": SUM(TO_ARRAY(last_7_14_days[*].Critical_Status)),
    "Planned_Maintenance": SUM(TO_ARRAY(last_7_14_days[*].Planned_Maintenance)),
    "Unplanned_Maintenance": SUM(TO_ARRAY(last_7_14_days[*].Unplanned_Maintenance))
}

LET status_for_last_7_days =  {
    "Attention_Required": SUM(TO_ARRAY(last_7_days[*].Attention_Required)),
    "Critical_Status": SUM(TO_ARRAY(last_7_days[*].Critical_Status)),
    "Planned_Maintenance": SUM(TO_ARRAY(last_7_days[*].Planned_Maintenance)),
    "Unplanned_Maintenance": SUM(TO_ARRAY(last_7_days[*].Unplanned_Maintenance))
}

RETURN {
    "Attention_Required": {
        "Attention_Required": status_for_last_7_days.Attention_Required,
        "arrow": (status_for_last_7_days.Attention_Required - status_for_last_7_14_days.Attention_Required) >= 0  ? "Up" : "Down"
    },
    "Critical_Status": {
        "Critical_Status": status_for_last_7_days.Critical_Status,
        "arrow": (status_for_last_7_days.Critical_Status - status_for_last_7_14_days.Critical_Status) >= 0  ? "Up" : "Down"
    },
    "Planned_Maintenance": {
        "Planned_Maintenance": status_for_last_7_days.Planned_Maintenance,
        "arrow": (status_for_last_7_days.Planned_Maintenance - status_for_last_7_14_days.Planned_Maintenance) >= 0  ? "Up" : "Down"
    },
    "Unplanned_Maintenance": {
        "Unplanned_Maintenance": status_for_last_7_days.Unplanned_Maintenance,
        "arrow": (status_for_last_7_days.Unplanned_Maintenance - status_for_last_7_14_days.Unplanned_Maintenance) >= 0  ? "Up" : "Down"
    },
    "Fleet_Health": {
        "Fleet_Health": (1000 - COUNT(last_7_days_critical_assets))/10,
        "arrow": (((1000 - COUNT(last_7_days_critical_assets))/10) - ((1000 - COUNT(last_7_14_days_critical_assets))/10)) >= 0  ? "Up" : "Down"
    }
}
```

**get_fleet_stats_chart_data:**
```
LET last_week  = (
    FOR stat IN fleet_stats
        FILTER 
            DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 7, "day"), stat.Date, "day") <= 7 AND 
            DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 7, "day"), stat.Date, "day") > 0
        RETURN {
            "Date": stat.Date,
            "Attention_Required": stat.Attention_Required,
            "Critical_Status": stat.Critical_Status
        }
)

LET raw_last_month = (
    FOR stat IN fleet_stats
        FILTER 
            DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 30, "day"), stat.Date, "day") <= 30 AND 
            DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 30, "day"), stat.Date, "day") > 0
        Collect month = DATE_FORMAT(stat.Date, "%mmm-%yyyy") into Monthly_Stats = {
            "Attention_Required": stat.Attention_Required,
            "Critical_Status": stat.Critical_Status
        }
        RETURN {
            "Month": month,
            "Monthly_Stats": Monthly_Stats
        }
)

LET raw_last_year = (
    FOR stat IN fleet_stats
        FILTER 
            DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 365, "day"), stat.Date, "day") <= 365 AND 
            DATE_DIFF(DATE_SUBTRACT(DATE_NOW(), 365, "day"), stat.Date, "day") > 0
        Collect year = DATE_YEAR(stat.Date) into Yearly_Stats = {
            "Attention_Required": stat.Attention_Required,
            "Critical_Status": stat.Critical_Status
        }
        RETURN {
            "Year": year,
            "Yearly_Stats": Yearly_Stats
        }
)

LET raw_all = (
    FOR stat IN fleet_stats
    RETURN {
        "Attention_Required": stat.Attention_Required,
        "Critical_Status": stat.Critical_Status
    }
)

RETURN {
    "last_week": last_week,
    "last_month": (
        FOR i in raw_last_month
        RETURN {
            "Month": i.Month,
            "Attention_Required": SUM(i.Monthly_Stats[*].Attention_Required),
            "Critical_Status": SUM(i.Monthly_Stats[*].Critical_Status)
        }
    ),
    "last_year": (
        FOR i in raw_last_year
        RETURN {
            "Year": i.Year,
            "Attention_Required": SUM(i.Yearly_Stats[*].Attention_Required),
            "Critical_Status": SUM(i.Yearly_Stats[*].Critical_Status)
        }
    ),
    "all": [
        {
            "All": "All",
            "Attention_Required": SUM(raw_all[*].Attention_Required),
            "Critical_Status": SUM(raw_all[*].Critical_Status)
        }
    ]
}
```

**update_issue_counts:**
```
UPSERT { "Fault": @fault }
INSERT {
    "Fault": @fault,
    "Count": @count
}
UPDATE {
    "Count": OLD.Count + @count
}
IN issue_counts
```

**update_area_issue_counts:**
```
UPSERT { "City": @city }
INSERT {
    "City": @city,
    "Count": @count
}
UPDATE {
    "Count": OLD.Count + @count
}
IN area_issue_counts
```

**update_vehicle_issue_counts:**
```
UPSERT { "Asset": @asset }
INSERT {
    "Asset": @asset,
    "Count": @count,
    "Total_Cost": @total_cost
}
UPDATE {
    "Count": OLD.Count + @count,
    "Total_Cost": OLD.Total_Cost + @total_cost
}
IN vehicle_issue_counts
```

**update_fleet_stats:**
```
UPSERT { _key: DATE_FORMAT(@key, "%yyyy-%mm-%dd") }
INSERT {
    "_key": DATE_FORMAT(@key, "%yyyy-%mm-%dd"),
    "Attention_Required": @Attention_Required,
    "Critical_Status": @Critical_Status,
    "Date": DATE_FORMAT(@key, "%yyyy-%mm-%dd"),
    "Planned_Maintenance": @Planned_Maintenance,
    "Unplanned_Maintenance": 0
}
UPDATE {
    "Attention_Required": OLD.Attention_Required + @Attention_Required,
    "Critical_Status":  OLD.Critical_Status + @Critical_Status,
    "Planned_Maintenance": OLD.Planned_Maintenance + @Planned_Maintenance,
    "Unplanned_Maintenance": 0
}
IN fleet_stats
```