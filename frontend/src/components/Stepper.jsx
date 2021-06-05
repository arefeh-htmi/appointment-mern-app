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
function StepperElement(props) {
  const {
    stepIndex,
    data,
    handelconfirmationModalOpen,
    handleSetAppointmentMeridiem,
    handleSetAppointmentSlot,
    renderAppointmentTimes,
    renderStepActions,
    contactFormFilled,
    DatePickerExampleSimple,
  } = props;

  return (
    <Stepper activeStep={stepIndex} orientation="vertical" linear={false}>
      <Step>
        <StepLabel>Choose an available day for your appointment </StepLabel>{" "}
        <StepContent>
          {" "}
          {DatePickerExampleSimple()} {renderStepActions(0)}{" "}
        </StepContent>{" "}
      </Step>{" "}
      <Step disabled={!data.appointmentDate}>
        <StepLabel>Choose an available time for your appointment </StepLabel>{" "}
        <StepContent>
          <SelectField
            floatingLabelText="AM/PM"
            value={data.appointmentMeridiem}
            onChange={(evt, key, payload) =>
              handleSetAppointmentMeridiem(payload)
            }
            selectionRenderer={(value) => (value ? "PM" : "AM")}
          >
            <MenuItem value={0} primaryText="AM" />
            <MenuItem value={1} primaryText="PM" />
          </SelectField>{" "}
          <RadioButtonGroup
            style={{
              marginTop: 15,
              marginLeft: 15,
            }}
            name="appointmentTimes"
            defaultSelected={data.appointmentSlot}
            onChange={(evt, val) => handleSetAppointmentSlot(val)}
          >
            {renderAppointmentTimes()}{" "}
          </RadioButtonGroup>{" "}
          {renderStepActions(1)}{" "}
        </StepContent>{" "}
      </Step>{" "}
      <Step>
        <StepLabel>
          Share your contact information with us and we 'll send you a reminder{" "}
        </StepLabel>{" "}
        <StepContent>
          <p>
            <section>
              <TextField
                style={{
                  display: "block",
                }}
                name="first_name"
                hintText="First Name"
                floatingLabelText="First Name"
                onChange={(evt, newValue) =>
                  this.setState({
                    firstName: newValue,
                  })
                }
              />{" "}
              <TextField
                style={{
                  display: "block",
                }}
                name="last_name"
                hintText="Last Name"
                floatingLabelText="Last Name"
                onChange={(evt, newValue) =>
                  this.setState({
                    lastName: newValue,
                  })
                }
              />{" "}
              <TextField
                style={{
                  display: "block",
                }}
                name="email"
                hintText="youraddress@mail.com"
                floatingLabelText="Email"
                onChange={(evt, newValue) =>
                  this.setState({
                    email: newValue,
                  })
                }
              />{" "}
              <RaisedButton
                style={{
                  display: "block",
                  backgroundColor: "#00C853",
                  marginTop: 20,
                  maxWidth: 100,
                }}
                label={
                  contactFormFilled
                    ? "Schedule"
                    : "Fill out your information to schedule"
                }
                labelPosition="before"
                primary={true}
                fullWidth={true}
                onClick={() => handelconfirmationModalOpen}
                disabled={!contactFormFilled || data.processed}
              />{" "}
            </section>{" "}
          </p>{" "}
          {renderStepActions(2)}{" "}
        </StepContent>{" "}
      </Step>{" "}
    </Stepper>
  );
}
export default StepperElement
