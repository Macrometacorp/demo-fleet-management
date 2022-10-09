import moment from "moment";

import { colors } from "../styles/colors";

export const activeButtonClass = {
  backgroundColor: colors.purple[500],
  border: `1px solid ${colors.purple[200]}`,
  borderRadius: "4px",
  boxShadow: "none",
  color: "white",
  width: "9rem",
  "&:hover": {
    backgroundColor: colors.purple[600],
    color: "white",
  },
};

export const slicer = (arr, size) => {
  var i,
    j,
    temparr = [],
    chunk = size;
  for (i = 0, j = arr.length; i < j; i += chunk) {
    temparr.push(arr.slice(i, i + chunk));
  }
  return temparr;
};

export const formatDate = (date) => {
  var a = moment(date);
  var b = moment();
  return a.from(b); // "a day ago"
};

export const printDate = (date) => {
  if (date) return moment(date).format("D MMM YYYY");
  return;
};

export const getRand = () => Math.floor(1000000 + Math.random() * 900000);

export const parseMessage = (msg) => {
  const encodedMessage = JSON.parse(msg).payload;
  const messageId = JSON.parse(msg).messageId;
  const decodedMessage = atob(encodedMessage);

  if (decodedMessage.length === 0) {
    return { newData: {}, messageId };
  }
  const newData = JSON.parse(decodedMessage);
  return { newData, messageId };
};
