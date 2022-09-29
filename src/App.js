import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import { colors } from "./app/styles/colors";
import Dashboard from "./app/components/Dashboard";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
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
        backgroundColor: "#E1E1FA",
        boxShadow: "none",
        color: "#4D4DAD",
        "&:hover, &:focus, &:active": {
          backgroundColor: "#C2C2F5",
          boxShadow: "0 2px 5px rgba(133, 133, 235, .35)",
          color: "#343473",
        },
        "&:disabled": {
          backgroundColor: "#E2E4E8",
          color: "#535968",
        },
      },
      containedPrimary: {
        backgroundColor: "#6767E6",
        color: "#FFF",
        "&:hover, &:focus, &:active": {
          backgroundColor: "#4D4DAD",
          color: "#FFF",
        },
      },
      label: {
        textTransform: "capitalize",
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
        borderRadius: "4px",
      },
      page: {
        padding: "23px",
        "&$selected": {
          backgroundColor: colors.purple[500],
          color: "white",

          "&:hover": {
            backgroundColor: colors.purple[600],
          },
        },
        "&:hover": {
          backgroundColor: colors.gray[50],
        },
      },
    },
    MuiToggleButton: {
      root: {
        borderRadius: "4px",
        color: colors.gray[600],
        "&$selected": {
          backgroundColor: colors.purple[500],
          color: "white",

          "&:hover": {
            backgroundColor: colors.purple[600],
          },
        },
        "&:hover": {
          backgroundColor: colors.gray[50],
        },
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: colors.purple[400],
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
