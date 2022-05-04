import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Dashboard from "./app/components/Dashboard";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Lato",
  },
  overrides: {
    MuiTableCell: {
      root: {
        padding: "0.8rem",
      },
      stickyHeader: {
        backgroundColor: "#d0e0f3",
      },
      head: {
        color: "#ffffff",
        fontWeight: 900,
      },
    },
    MuiTypography: {
      root: {
        fontWeight: "600 !important",
      },
    },
    MuiButton: {
      contained: {
        boxShadow: "none",
        "&:hover, &:focus, &:active": {
          boxShadow: "0 2px 5px rgba(133, 133, 235, .35)",
        },
      },
      containedPrimary: {
        backgroundColor: "#002F87",
        color: "#FFF",
        "&:hover, &:focus, &:active": {
          backgroundColor: "#029AE0",
          color: "#FFF",
        },
      },
      label: {
        fontWeight: "700",
      },
    },
    MuiFormControl: {
      root: {
        height: "56px",
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: "translate(14px, 0.7rem) scale(1)",
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: "0.65rem 14px",
      },
    },
    MuiPaginationItem: {
      root: {
        borderRadius: "0px",
      },
      page: {
        padding: "23px",
        "&$selected": {
          backgroundColor: "#4b81c3",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#4b81c3",
            color: "#ffffff",
          },
        },
        "&:hover": {
          backgroundColor: "#4b81c3",
          color: "#ffffff",
        },
      },
    },
    MuiToggleButton: {
      root: {
        "&$selected": {
          backgroundColor: "#4b81c3",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#4b81c3",
            color: "#ffffff",
          },
        },
        "&:hover": {
          backgroundColor: "#4b81c3",
          color: "#ffffff",
        },
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: "#4b81c3",
      },
    },
    MuiTableContainer: {
      root: {
        overflowX: "inherit",
      },
    },
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    </>
  );
};
export default App;
