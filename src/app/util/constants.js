const MAINTENANCE_CENTER = "maintenance_centers"
const UNPLANNED_MAINTENANCE = "unplanned_maintenance"
const PLANNED_MAINTENANCE = "planned_maintenance"
const TELEMATICS = "telematics"
const ISSUE_COUNTS = "issue_counts"
const AREA_ISSUE_COUNTS = "area_issue_counts"
const FLEET_STATS = "fleet_stats"
const VEHICLE_ISSSUE_COUNTS = "vehicle_issue_counts"

const LOAD_MAINTENANCE_CENTER = "load_maintenance_centers"
const LOAD_PLANNED_MAINTENANCE = "load_planned_maintenance"
const LOAD_TELEMATICS = "load_telematics"
const LOAD_AREA_ISSIE_COUNTS = "load_area_issue_counts"
const LOAD_ISSSUE_COUNTS = "load_issue_counts"
const LOAD_VEHICLE_ISSSUE_COUNTS = "load_vehicle_issue_counts"
const LOAD_FLEET_STATS_COUNTS = "load_fleet_stats_counts"

export const ON_READY = "on_ready"

export const GET_TELEMATICS_30_DAYS = "get_telematics_30_days"
export const GET_TOP5_MAINTENANCE_CENTERS_FOR_CITY = "get_top5_maintenance_centers_for_city"
export const GET_ASSET_DETAILS = "get_asset_details"
export const GET_TELEMATIC_INSIGHTS = "get_telematic_insights"
export const GET_FLEET_STATS = "get_fleet_stats"
export const GET_FLEET_STATS_CHART_DATA = "get_fleet_stats_chart_data"
export const INSERT_UNPLANNED_MAINTENANCE = "insert_unplanned_maintenance"
export const ENRICHTED_TELEMATICS =  "enriched-telematics"

export const COLLECTIONS = {
  MAINTENANCE_CENTER,
  PLANNED_MAINTENANCE,
  TELEMATICS,
};

export const LOAD_DATASETS = [
  LOAD_MAINTENANCE_CENTER,
  LOAD_PLANNED_MAINTENANCE,
  LOAD_TELEMATICS,
  LOAD_AREA_ISSIE_COUNTS,
  LOAD_ISSSUE_COUNTS,
  LOAD_VEHICLE_ISSSUE_COUNTS,
  LOAD_FLEET_STATS_COUNTS
]

export const TRUNCATE_DATASETS = [
  MAINTENANCE_CENTER,
  PLANNED_MAINTENANCE,
  TELEMATICS,
  UNPLANNED_MAINTENANCE,
  ISSUE_COUNTS,
  AREA_ISSUE_COUNTS,
  FLEET_STATS,
  VEHICLE_ISSSUE_COUNTS
]

export const RESTQL = {
  GET_TELEMATICS_30_DAYS,
  GET_TOP5_MAINTENANCE_CENTERS_FOR_CITY,
  GET_ASSET_DETAILS
}

export const STREAMS =  [
  "insights-worker",
  "fleet-stats-worker",
  "telematics-worker",
  "telematics-simulator",
]
