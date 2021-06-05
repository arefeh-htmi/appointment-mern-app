import React, { Component } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import AppointmentApp from "./components/AppointmentApp.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f4c7ab",
    },
    secondary: {
      main: "#b2b8a3",
    },
  },
});
export default class App extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <AppointmentApp />
        </MuiThemeProvider>
      </div>
    );
  }
}
