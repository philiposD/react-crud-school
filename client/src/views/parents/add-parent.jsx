import "./index.scss";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React, { useContext, useState } from "react";
import { fetchParents } from "../../services/http-service";
import { ParentContext } from "./parentContext";

export default function AddParents(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dateValue, setDateValue] = React.useState(
    new Date("2000-08-18T21:11:54")
  );

  const { setParents } = useContext(ParentContext);

  console.log("AddParents", props);

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("/parents/add", data)
      .then(function (response) {
        console.log("Post response:", response);
        fetchParents("param123").then((res) => {
          console.log("Get parents response:", res);
          setParents(res.data);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div id="parents-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-first-name"
          className="form-text-field"
          label="First name"
          type="text"
          required
          {...register("firstName")}
        />

        <TextField
          id="outlined-last-name"
          className="form-text-field"
          label="Last name"
          type="text"
          required
          {...register("lastName")}
        />

        <TextField
          id="outlined-last-uid"
          className="form-text-field"
          label="UID-CNP"
          type="text"
          required
          {...register("UID")}
        />

        <TextField
          id="outlined-email-parent"
          className="form-text-field"
          label="Email"
          type="email"
          required
          {...register("email")}
        />
        <TextField
          id="outlined-phone-parent"
          className="form-text-field"
          label="Phone parent"
          type="tel"
          {...register("phone")}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div id="dob-desktop">
            <DesktopDatePicker
              label="Date of birth"
              inputFormat="yyyy-MM-dd"
              value={dateValue}
              onChange={handleDateChange}
              required
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          <div id="dob-mobile">
            <MobileDatePicker
              label="Date of birth"
              inputFormat="yyyy-MM-dd"
              value={dateValue}
              onChange={handleDateChange}
              required
              renderInput={(params) => <TextField {...params} />}
              {...register("dateOfBirth")}
            />
          </div>
        </LocalizationProvider>

        <Button className="form-button-submit" variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
