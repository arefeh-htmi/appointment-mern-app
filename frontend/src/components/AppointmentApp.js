import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import Card from "material-ui/Card";
import { RadioButton } from "material-ui/RadioButton";
import axios from "axios";
import StepperElement from "./Stepper";
import DialogElement from "./Dialog.jsx";
import SnackBarElement from "./SnackBar";
//express api
const API_BASE = "http://localhost:5000/";
// confirmationSnackbarOpen
class AppointmentApp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
    //   confirmationSnackbarMessage: null,
      schedule: [],
      confirmationModalOpen: false,
      appointmentDateSelected: false,
      appointmentMeridiem: 0,
      finished: false,
      smallScreen: window.innerWidth < 768,
      stepIndex: 0,
    };
  }
  //previous scheduled appointments slots are retrieved
  componentWillMount() {
    //        axios.get(API_BASE + "slot").then(response => {
    //            console.log("response via db: ", response.data);
    //            this.handleDBReponse(response.data);
    //        });
  }
  //set state
  handleSetAppointmentDate=(date)=> {
    this.setState({
      appointmentDate: date,
      confirmationTextVisible: true,
    });
  }

  handleSetAppointmentSlot=(slot) =>{
    this.setState({
      appointmentSlot: slot,
    });
  }
  handleSetAppointmentMeridiem=(meridiem) =>{
    this.setState({
      appointmentMeridiem: meridiem,
    });
  }
  //pass user data to the database via the express app
  handleSubmit=()=> {
    this.setState({
      confirmationModalOpen: false,
    });
    const newAppointment = {
      name: this.state.firstName + " " + this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      slot_date: moment(this.state.appointmentDate).format("YYYY-DD-MM"),
      slot_time: this.state.appointmentSlot,
    };
    axios
      .post(API_BASE + "appointment", newAppointment)
      .then((response) =>
        this.setState({
          confirmationSnackbarMessage: "Appointment succesfully added!",
          confirmationSnackbarOpen: true,
          processed: true,
        })
      )
      .catch((err) => {
        console.log(err);
        return this.setState({
          confirmationSnackbarMessage: "Appointment failed to save.",
          confirmationSnackbarOpen: true,
        });
      });
  }
  //moves the stepper to the next postion using the stepIndex field
  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };
  //moves the stepper to the previous postion using the stepIndex field
  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
      });
    }
  };
  //passes disabled dates to the date picker component
  checkDisableDate=(day)=> {
    const dateString = moment(day).format("YYYY-DD-MM");
    return (
      this.state.schedule[dateString] === true ||
      moment(day).startOf("day").diff(moment().startOf("day")) < 0
    );
  }

  //handle the appointment slot data from the database
  //    handleDBReponse(response) {
  //        const appointments = response;
  //        const today = moment().startOf("day"); //start of today 12 am
  //        const initialSchedule = {};
  //        initialSchedule[today.format("YYYY-DD-MM")] = true;
  //        const schedule = !appointments.length
  //            ? initialSchedule
  //            : appointments.reduce((currentSchedule, appointment) => {
  //                  const { slot_date, slot_time } = appointment;
  //                  const dateString = moment(slot_date, "YYYY-DD-MM").format(
  //                      "YYYY-DD-MM"
  //                  );
  //                  !currentSchedule[slot_date]
  //                      ? (currentSchedule[dateString] = Array(8).fill(false))
  //                      : null;
  //                  Array.isArray(currentSchedule[dateString])
  //                      ? (currentSchedule[dateString][slot_time] = true)
  //                      : null;
  //                  return currentSchedule;
  //              }, initialSchedule);
  //
  //        for (let day in schedule) {
  //            let slots = schedule[day];
  //            slots.length
  //                ? slots.every(slot => slot === true)
  //                    ? (schedule[day] = true)
  //                    : null
  //                : null;
  //        }
  //
  //        this.setState({
  //            schedule: schedule
  //        });
  //    }

  //renders available time slots to user and disables the rest if any
  renderAppointmentTimes = () => {
    if (!this.state.isLoading) {
      const slots = [...Array(8).keys()];
      return slots.map((slot) => {
        const appointmentDateString = moment(this.state.appointmentDate).format(
          "YYYY-DD-MM"
        );
        const time1 = moment().hour(9).minute(0).add(slot, "hours");
        const time2 = moment()
          .hour(9)
          .minute(0)
          .add(slot + 1, "hours");
        const scheduleDisabled = this.state.schedule[appointmentDateString]
          ? this.state.schedule[
              moment(this.state.appointmentDate).format("YYYY-DD-MM")
            ][slot]
          : false;
        const meridiemDisabled = this.state.appointmentMeridiem
          ? time1.format("a") === "am"
          : time1.format("a") === "pm";
        return (
          <RadioButton
            label={time1.format("h:mm a") + " - " + time2.format("h:mm a")}
            key={slot}
            value={slot}
            style={{
              marginBottom: 15,
              display: meridiemDisabled ? "none" : "inherit",
            }}
            disabled={scheduleDisabled || meridiemDisabled}
          />
        );
      });
    } else {
      return null;
    }
  };

  renderStepActions = (step) => {
    console.log(this.state);
    const { stepIndex } = this.state;

    return (
      <div
        style={{
          margin: "12px 0",
        }}
      >
        <RaisedButton
          label={stepIndex === 2 ? "Finish" : "Next"}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          backgroundColor="#00C853 !important"
          style={{
            marginRight: 12,
            backgroundColor: "#00C853",
          }}
        />{" "}
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}{" "}
      </div>
    );
  };
  onRequestClose = (e) => {
    this.setState({
      confirmationSnackbarOpen: false,
    });
  };

  render() {
    const {
      finished,
      isLoading,
      smallScreen,
      stepIndex,
      confirmationModalOpen,
      confirmationSnackbarOpen,
      ...data
    } = this.state;
    const contactFormFilled = data.firstName && data.lastName && data.email;
    const DatePickerExampleSimple = () => (
      <div>
        <DatePicker
          hintText="Select Date"
          mode={smallScreen ? "portrait" : "landscape"}
          onChange={(n, date) => this.handleSetAppointmentDate(date)}
          shouldDisableDate={(day) => this.checkDisableDate(day)}
        />{" "}
      </div>
    );
    const modalActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={() =>
          this.setState({
            confirmationModalOpen: false,
          })
        }
      />,
      <FlatButton
        label="Confirm"
        style={{
          backgroundColor: "#00C853 !important",
        }}
        primary={true}
        onClick={() => this.handleSubmit()}
      />,
    ];

    return (
      <div>
        <AppBar
          title="Appointment Scheduler"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <section
          style={{
            maxWidth: !smallScreen ? "80%" : "100%",
            margin: "auto",
            marginTop: !smallScreen ? 20 : 0,
          }}
        >
          <Card
            style={{
              padding: "12px 12px 25px 12px",
              height: smallScreen ? "100vh" : null,
            }}
          >
            {/* <StepperElement
              state={this.state}
              stepIndex={stepIndex}
              data={data}
              handleSetAppointmentMeridiem={this.handleSetAppointmentMeridiem}
              handleSetAppointmentSlot={this.handleSetAppointmentSlot}
              renderAppointmentTimes={this.renderAppointmentTimes}
              renderStepActions={this.renderStepActions}
              contactFormFilled={contactFormFilled}
              DatePickerExampleSimple={DatePickerExampleSimple}
              handelconfirmationModalOpen={() =>
                this.setState({
                  confirmationModalOpen: !this.state.confirmationModalOpen,
                })
              }
            /> */}
          </Card>{" "}
          {/* <DialogElement
            state={this.state}
            modalActions={modalActions}
            isLoading={isLoading}
          /> */}
          {/* <SnackBarElement
            onRequestClose={this.onRequestClose}
            confirmationSnackbarMessage={this.state.confirmationSnackbarMessage}
            confirmationSnackbarOpen={this.confirmationSnackbarOpen}
          /> */}
        </section>{" "}
      </div>
    );
  }
}
export default AppointmentApp;
