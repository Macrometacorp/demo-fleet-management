import jsC8 from "jsc8";
import config from "../services/config";
import { TRUNCATE_DATASETS, LOAD_DATASETS, ON_READY } from "../util/constants";

const jsc8Client = new jsC8({
  url: config.gdnURL,
  apiKey: `${config.apiKey}`,
});

export const intialize = async (callback) => {
  try {
    await truncateCollections();
    await loadDataCollections();
    await onReady();
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
    const tpromises = LOAD_DATASETS.slice(2).map(
      (collection) => jsc8Client.executeRestql(collection)
    );
    await Promise.all(tpromises);
  } catch (error) {
    console.error("Failed to load", error.message);
  }
};

const onReady = async () => {
  try {
    await jsc8Client.executeRestql(ON_READY);
  } catch (error) {
    console.error("Failed to onReady", error.message);
  }
};
