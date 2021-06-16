export const activeButtonClass = {
    backgroundColor: "#4b81c3",
    width: "9rem",
    boxShadow: "none",
    border: "1px solid rgb(169,169,169)",
    color: "#ffffff",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#4b81c3",
      color: "#ffffff",
    },
  }

  export const slicer = (arr, size) => {
    var i,j,temparr = [],chunk = size;
    for (i=0,j=arr.length; i<j; i+=chunk) {
        temparr.push(arr.slice(i,i+chunk));
    }
    return temparr;
  }