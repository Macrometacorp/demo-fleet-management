import jsC8 from "jsc8";
import config from "../services/config";
import {
  GET_TOP5_MAINTENANCE_CENTERS_FOR_CITY,
  GET_TELEMATICS_30_DAYS,
  GET_TELEMATIC_INSIGHTS,
  GET_ASSET_DETAILS,
  INSERT_UNPLANNED_MAINTENANCE,
  STREAMS,
  GET_FLEET_STATS,
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
    throw error
  }
};

export const telematicList = async () => {
  try {
    const { result } = await jsc8Client.executeRestql(GET_TELEMATICS_30_DAYS);
    return result;
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const assetDetails = async (Asset) => {
  try {
    const { result } = await jsc8Client.executeRestql(GET_ASSET_DETAILS,{Asset});
    return result;
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const processBooking = async (payload) => {
  try {
    const { result } = await jsc8Client.executeRestql(INSERT_UNPLANNED_MAINTENANCE, payload);
    return result;
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const insightList = async () => {
  try {
    const { result } = await jsc8Client.executeRestql(GET_TELEMATIC_INSIGHTS);
    const [data] = result;
    return data;
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const fleetStats = async () => {
  try {
    const { result } = await jsc8Client.executeRestql(GET_FLEET_STATS);
    const [data] = result;
    return data;
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const fleetChartData = async (filter = 'week') => {
  try {
    const data = {
      week: {
        dataset1: [5, 10, 20, 10, 20, 30],
        dataset2: [-5, -10, -20, -10, -20, -30],
      },
      month: {
        dataset1: [15, 15, 25, 15, 25, 35],
        dataset2: [-15, -15, -25, -15, -25, -35],
      },
      year: {
        dataset1: [50, 100, 200, 100, 200, 300],
        dataset2: [-50, -100, -200, -100, -200, -300],
      },
      all: {
        dataset1: [15, 15, 25, 15, 25, 35],
        dataset2: [-15, -15, -25, -15, -25, -35],
      },
    };
    return data[filter]
  } catch (error) {
    console.error(error);
    throw error
  }
};


export const startStopStream = async (start = false) => {
  try {
  let steamsArr = STREAMS;
  if(start === false){
    steamsArr.reverse()
  }
  for (const element of steamsArr) {
      await jsc8Client.activateStreamApp(element, start);
    }
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
          `${streamName}-${Math.round(Math.random() * 1000)}`,
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