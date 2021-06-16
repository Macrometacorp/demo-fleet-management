import jsC8 from "jsc8";
import config from "../services/config";
import {
  GET_TOP5_MAINTENANCE_CENTERS_FOR_CITY,
  GET_TELEMATICS_30_DAYS,
  GET_TELEMATIC_INSIGHTS,
  GET_ASSET_DETAILS,
  INSERT_UNPLANNED_MAINTENANCE,
} from "../util/constants";

const jsc8Client = new jsC8({
  url: config.gdnURL,
  apiKey: `${config.apiKey}`,
});

export const maintenanceCenterList = async (city = "London") => {
  try {
    const { result } = await jsc8Client.executeRestql(
      GET_TOP5_MAINTENANCE_CENTERS_FOR_CITY,
      { City: city }
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const telematicList = async () => {
  try {
    const { result } = await jsc8Client.executeRestql(GET_TELEMATICS_30_DAYS);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const assetDetails = async (Asset) => {
  try {
    const { result } = await jsc8Client.executeRestql(GET_ASSET_DETAILS,{Asset});
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const processBooking = async (payload) => {
  try {
    const { result } = await jsc8Client.executeRestql(INSERT_UNPLANNED_MAINTENANCE, payload);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const insightList = async () => {
  try {
    const { result } = await jsc8Client.executeRestql(GET_TELEMATIC_INSIGHTS);
    const [idata] = result;
    const data = [
      {
        col1: "Vechicle with most frequent issue",
        col2:  idata.Area_With_Most_Alerts,
      },
      {
        col1: "Most Common Alert",
        col2: idata.Most_Common_Alert,
      },
      {
        col1: "Total Cost of Unplanned Maintenance",
        col2: idata.Total_Cost_Of_Unplanned_Maintenance,
      },
      {
        col1: "Area with most Alerts",
        col2: idata.Vehicle_With_Most_Frequent_Issues,
      },
      {
        col1: "Least Cost Effective Vehicle",
        col2: idata.Least_Cost_Effective_Vehicle,
      },
    ];
    return data;
  } catch (error) {
    console.error(error);
  }
};
