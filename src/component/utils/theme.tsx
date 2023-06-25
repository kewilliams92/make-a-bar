import { purple } from "@suid/material/colors";
import { createTheme } from "@suid/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#E9CCA4",
    },
  },
});


export default theme;
