import jsC8 from "jsc8";
import config from "../services/config";
import * as R from "ramda";
import moment from "moment";
import {
  GET_TOP5_MAINTENANCE_CENTERS_FOR_CITY,
  GET_TELEMATICS_30_DAYS,
  GET_TELEMATIC_INSIGHTS,
  GET_ASSET_DETAILS,
  INSERT_UNPLANNED_MAINTENANCE,
  STREAM_WORKERS,
  GET_FLEET_STATS,
  GET_FLEET_STATS_CHART_DATA,
} from "../util/constants";

const jsc8Client = new jsC8({
  url: config.gdnURL,
  apiKey: `${config.apiKey}`,
  fabricName: config.fabricName,
});

const getDataset1 = R.pluck("Critical_Status");
const getDataset2 = R.pluck("Attention_Required");

export const maintenanceCenterList = async (city = "London") => {
  try {
    const { result } = await jsc8Client.executeRestql(
      GET_TOP5_MAINTENANCE_CENTERS_FOR_CITY,
      { City: city }
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const telematicList = async () => {
  try {
    const { result } = await jsc8Client.executeRestql(GET_TELEMATICS_30_DAYS);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const assetDetails = async (Asset) => {
  try {
    const { result } = await jsc8Client.executeRestql(GET_ASSET_DETAILS, {
      Asset,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const processBooking = async (payload) => {
  try {
    const { result } = await jsc8Client.executeRestql(
      INSERT_UNPLANNED_MAINTENANCE,
      payload
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const insightList = async () => {
  try {
    const { result } = await jsc8Client.executeRestql(GET_TELEMATIC_INSIGHTS);
    const [data] = result;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fleetStats = async () => {
  try {
    const { result } = await jsc8Client.executeRestql(GET_FLEET_STATS);
    const [data] = result;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fleetChartData = async (filter = "week") => {
  try {
    const tdata = {
      week: {},
      year: {},
      month: {},
      all: {},
    };
    let { result } = await jsc8Client.executeRestql(GET_FLEET_STATS_CHART_DATA);
    if (result) {
      result = result.forEach((item) => {
        if (item && item["last_week"]) {
          tdata["week"]["dataset1"] = getDataset1(item["last_week"]);
          tdata["week"]["dataset2"] = getDataset2(item["last_week"]);
          tdata["week"]["label"] = R.pluck("Date")(item["last_week"]);
        }
        if (item && item["last_month"]) {
          item["last_month"].sort(
            (stat_1, stat_2) =>
              moment(stat_1.Month, "MMM-YYYY").valueOf() -
              moment(stat_2.Month, "MMM-YYYY").valueOf()
          );
          tdata["month"]["dataset1"] = getDataset1(item["last_month"]);
          tdata["month"]["dataset2"] = getDataset2(item["last_month"]);
          tdata["month"]["label"] = R.pluck("Month")(item["last_month"]);
        }
        if (item && item["last_year"]) {
          tdata["year"]["dataset1"] = getDataset1(item["last_year"]);
          tdata["year"]["dataset2"] = getDataset2(item["last_year"]);
          tdata["year"]["label"] = R.pluck("Year")(item["last_year"]);
        }
        // if(item && item['all']) {
        //   tdata['all']['dataset1'] = getDataset1([item['all']]);
        //   tdata['all']['dataset2'] = getDataset2([item['all']]);
        // }
      });
    }
    return tdata[filter];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const startStopStream = async (start = false) => {
  try {
    let steamsArr = STREAM_WORKERS;
    if (start === false) {
      steamsArr.reverse();
    }
    const streamPromises = [];
    steamsArr.forEach((element) => {
      streamPromises.push(jsc8Client.activateStreamApp(element, start));
    });
    await Promise.all(streamPromises);
    return true;
  } catch (error) {
    console.error("Failed start ot stop strams", error.message);
    return false;
  }
};

export const createStreamReader = async (streamName, filters) => {
  let response;
  try {
    response = await jsc8Client.createStreamReader(
      streamName,
      `${streamName}-consumer`,
      false,
      false,
      config.gdnURL.replace("https://", ""),
      { filters }
    );
  } catch (error) {
    console.error(error);
  }
  return response;
};
