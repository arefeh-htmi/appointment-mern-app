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
const renderAppointmentConfirmation = (props) => {
  const spanStyle = {
    color: "#00C853",
  };
  const { firstName, lastName, email, appointmentDate, appointmentSlot } =
    props;
  const ConfirimitionElement = (
    <>
      <section>
        <p>
          Name:{" "}
          <span style={spanStyle}>
            {" "}
            {firstName} {lastName}{" "}
          </span>{" "}
        </p>{" "}
        <p>
          Email: <span style={spanStyle}> {email} </span>{" "}
        </p>{" "}
        <p>
          Appointment:{" "}
          <span style={spanStyle}>
            {" "}
            {moment(appointmentDate).format("dddd[,] MMMM Do[,] YYYY")}{" "}
          </span>{" "}
          at{" "}
          <span style={spanStyle}>
            {" "}
            {moment()
              .hour(9)
              .minute(0)
              .add(appointmentSlot, "hours")
              .format("h:mm a")}{" "}
          </span>{" "}
        </p>{" "}
      </section>
    </>
  );
  return <ConfirimitionElement />;
};
function DialogElement(props) {
  //display a modal with the user’s inputted information and asks th user to confirm

  return (
    <>
      <Dialog
        modal={true}
        open={props.state.confirmationModalOpen}
        actions={props.modalActions}
        title="Confirm your appointment"
      >
        {renderAppointmentConfirmation(props)}
      </Dialog>
    </>
  );
}
export default DialogElement
