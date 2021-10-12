import "./index.scss";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React, { useContext, useState } from "react";
import { fetchProfessors } from "../../services/http-service";
import { ProfessorContext } from "./professorContext";

export default function AddProfessor(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dateValue, setDateValue] = React.useState(
    new Date("2000-08-18T21:11:54")
  );

  const { setProfessors } = useContext(ProfessorContext);

  console.log("AddProfessors", props);

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("/professors/add", data)
      .then(function (response) {
        console.log("Post response:", response);
        fetchProfessors("param123").then((res) => {
          console.log("Get professors response:", res);
          setProfessors(res.data);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div id="professors-container">
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
          id="outlined-email-professor"
          className="form-text-field"
          label="Email"
          type="email"
          required
          {...register("email")}
        />
        <TextField
          id="outlined-phone-professor"
          className="form-text-field"
          label="Phone professor"
          type="tel"
          {...register("phone")}
        />

        <TextField
          id="outlined-school"
          className="form-text-field"
          label="School"
          type="text"
          defaultValue="Default school"
          {...register("school")}
        />

        <TextField
          id="outlined-class"
          className="form-text-field"
          label="Class"
          type="text"
          {...register("class")}
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
