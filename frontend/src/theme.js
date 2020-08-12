import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Create a theme instance.
// eslint-disable-next-line import/no-mutable-exports
let theme = createMuiTheme({
  palette: {
    primary: { main: "#F9A826" },
    secondary: { main: "#F44336" },
    background: { default: "#fff" },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
