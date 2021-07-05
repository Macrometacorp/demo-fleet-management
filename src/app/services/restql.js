import jsC8 from "jsc8";
import config from "../services/config";
import { TRUNCATE_DATASETS, LOAD_DATASETS, ON_READY, IS_DEMO_READY } from "../util/constants";
import { startStopStream  } from "./streams";

const jsc8Client = new jsC8({
  url: config.gdnURL,
  apiKey: `${config.apiKey}`,
});

export const intialize = async (callback) => {
  try {
    await onReady(false);
    await startStopStream();
    await truncateCollections();
    await loadDataCollections();
    await onReady(true);
    callback(false);
  } catch (error) {
    console.error("Failed to intialize", error.message);
    callback(false);
  }
};

const truncateCollections = async () => {
  try {
    const promises = TRUNCATE_DATASETS.map((collection) =>
      jsc8Client.collection(collection).truncate()
    );
    await Promise.all(promises);
  } catch (error) {
    console.error("Failed to truncate", error.message);
  }
};

const loadDataCollections = async () => {
  try {
    const promises = LOAD_DATASETS.slice(0,2).map(
      (collection) => jsc8Client.executeRestql(collection)
    );
    await Promise.all(promises);
    await jsc8Client.executeRestql(LOAD_DATASETS[2]);
    const tpromises = LOAD_DATASETS.slice(3).map(
      (collection) => jsc8Client.executeRestql(collection)
    );
    await Promise.all(tpromises);
  } catch (error) {
    console.error("Failed to load", error.message);
  }
};

export const onReady = async (status) => {
  try {
    await jsc8Client.executeRestql(ON_READY, { status });
  } catch (error) {
    console.error("Failed to onReady", error.message);
  }
};

export const isDemoReady = async () => {
  try {
    const response = await jsc8Client.executeRestql(IS_DEMO_READY);
    const { result } = response;
    const [ demo ] = result;
    return (demo && demo.ready) || false;
  } catch (error) {
    console.error("Failed to onReady", error.message);
    return false;
  }
};
