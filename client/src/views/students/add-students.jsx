import "./index.scss";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React, { useContext, useState, useEffect } from "react";
import { fetchStudents } from "../../services/http-service";
import { StudentContext } from "./studentContext";

export default function AddStudents(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [dateValue, setDateValue] = React.useState(
    new Date("2000-08-18T21:11:54")
  );

  const formValuesAdd = props.formValues;

  const {
    setStudents,
    mode,
    formValues,
    // setFormValues,
  } = useContext(StudentContext);

  useEffect(() => {
    Object.entries(props.formValues).forEach((ele) => {
      if (ele[0] !== undefined) {
        setValue(ele[0], ele[1], { shouldValidate: true });
      }
    });
  }, [props.formValues, setValue]);

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const onSubmit = (data) => {
    axios
      .post(mode === "insert" ? "/students/add" : "/student/edit", data)
      .then(function (response) {
        fetchStudents().then((res) => {
          setStudents(res.data);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div id="students-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-first-name"
          className="form-text-field"
          label="First name"
          type="text"
          required
          InputLabelProps={{ shrink: true }}
          {...register("firstName")}
        />

        <TextField
          id="outlined-last-name"
          className="form-text-field"
          label="Last name"
          type="text"
          required
          InputLabelProps={{ shrink: true }}
          {...register("lastName")}
        />

        <TextField
          id="outlined-last-uid"
          className="form-text-field"
          label="UID-CNP"
          type="text"
          required
          InputLabelProps={{ shrink: true }}
          {...register("UID")}
        />

        <TextField
          id="outlined-email-student"
          className="form-text-field"
          label="Email"
          type="email"
          required
          InputLabelProps={{ shrink: true }}
          {...register("email")}
        />
        <TextField
          id="outlined-phone-student"
          className="form-text-field"
          label="Phone student"
          type="tel"
          InputLabelProps={{ shrink: true }}
          {...register("phone")}
        />

        <TextField
          id="outlined-school"
          className="form-text-field"
          label="School"
          type="text"
          InputLabelProps={{ shrink: true }}
          // defaultValue="Default school"
          {...register("school")}
        />

        <TextField
          id="outlined-class"
          className="form-text-field"
          label="Class"
          type="text"
          InputLabelProps={{ shrink: true }}
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
          {mode == "insert" ? <>Submit</> : <>Edit</>}
        </Button>
      </form>
    </div>
  );
}
