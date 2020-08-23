import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const lightThemeConfig = {
  palette: {
    type: "light",
    primary: { main: "#F9A826" },
    secondary: { main: "#F44336" },
    background: { main: "#fff" },
  },
};

const darkThemeConfig = {
  palette: {
    type: "dark",
  },
};

const getThemeByType = (themeType) => {
  if (themeType === "dark") {
    const theme = createMuiTheme(darkThemeConfig);
    return responsiveFontSizes(theme);
  }
  const theme = createMuiTheme(lightThemeConfig);
  return responsiveFontSizes(theme);
};

export default getThemeByType;
