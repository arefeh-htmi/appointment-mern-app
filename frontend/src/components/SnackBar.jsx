import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SnackBar from "material-ui/Snackbar";
import Card from "material-ui/Card";
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import axios from "axios";
function SnackBarElement(props) {
    console.log(props);
  return (
    <>
      <SnackBar
        open={props.confirmationSnackbarOpen || props.isLoading}
        message={
          props.isLoading
            ? "Loading... "
            : props.confirmationSnackbarMessage || ""
        }
        autoHideDuration={10000}
        onRequestClose={props.onRequestClose()}
      />
    </>
  );
}
export default SnackBarElement
