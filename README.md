# Fleet Management :truck:
[:link: Here](https://x9q3k9k5.stackpathcdn.com) is the link for the live demo!

## Overview
A simple, secure and scalable real-time fleet management.

## Edge Database Resources
### :small_blue_diamond: Document Collections

In Cox Edge Portal, go to **Edge Database/COLLECTIONS** section and create the following list of global document collections.
```
- maintenance_centers_seed_data
- planned_maintenance_seed_data
- telematics_seed_data
- demo_status
- telematics
- assets
- faults
- maintenance_centers
- planned_maintenance
- unplanned_maintenance
- fleet_stats
- issue_counts
- area_issue_counts
- vehicle_issue_counts
```

Then, create **persistent** indexes on `planned_maintenance` and `telematics` collections for the attributes:
| **Collection** | **Attribute** |
| ---------------- | ------------------------------- |
| `planned_maintenance` | `Asset` |
| `telematics` | `Asset` |
| `telematics` | `City` |
| `telematics` | `Fault` |
| `telematics` | `Timestamp` |

### :small_blue_diamond: Query Workers
In **Edge Database/QUERIES** section, create the following list of query workers.
```
- load_maintenance_centers
- load_vehicle_issue_counts
- load_telematics
- load_planned_maintenance
- load_area_issue_counts
- load_issue_counts
- load_fleet_stats_counts
- on_ready
- is_demo_ready
- get_asset_details
- get_telematics_30_days
- get_top5_maintenance_centers_for_city
- is_asset_maintenance_planned
- insert_unplanned_maintenance
- get_telematic_simulator_input_alert
- get_telematic_insights
- get_fleet_stats
- get_fleet_stats_chart_data
- update_issue_counts
- update_area_issue_counts
- update_vehicle_issue_counts
- update_fleet_stats
```
Refer to this [:link: link ](./edge-database/query-workers/query-workers.md) to get the code for each query worker.

### :small_blue_diamond: Stream Workers
Create and publish following Stream Workers in your federation:
- [`insights-worker`](./edge-database/stream-workers/insights-worker.md)
- [`fleet-stats-worker`](./edge-database/stream-workers/fleet-stats-worker.md)
- [`telematics-worker`](./edge-database/stream-workers/telematics-worker.md)
- [`telematics-simulator`](./edge-database/stream-workers/telematics-simulator.md)

🔍 You can check each query worker code by clicking on it.  

:pencil: If you already ran this tutorial before, you may want to truncate the collections.

## Run It Locally

On your development machine, run the following commands in a terminal console:

```
git clone git@github.com:CoxEdge-Tools/demos.git

cd demos/fleet-management

npm install

npm start
```

:pencil: You can run `npm run build` command to generate your `build` directory.

:small_red_triangle: Don't forget to setup your environment variables in `.env.development.local` or `.env.production.local`.
