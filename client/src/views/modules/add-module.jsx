import "./index.scss";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  TextArea,
  dialogActionsClasses,
} from "@mui/material";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React, { useContext, useState } from "react";
import { fetchModules, fetchStudents } from "../../services/http-service";
import { ModuleContext } from "./moduleContext";

export default function AddModule(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [dateValue, setDateValue] = React.useState(
    new Date("2000-08-18T21:11:54")
  );

  const { setModules } = useContext(ModuleContext);

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const onSubmit = (data) => {
    data.price = parseFloat(data.price);
    axios
      .post("/modules/add", data)
      .then(function (response) {
        fetchModules("param123").then((res) => {
          setModules(res.data);
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
          id="outlined-name"
          className="form-text-field"
          label="Name"
          type="text"
          required
          {...register("name")}
        />
        <TextField
          id="outlined-type"
          className="form-text-field"
          label="Type"
          type="text"
          required
          {...register("type")}
        />
        <TextField
          id="outlined-price"
          className="form-text-field"
          label="Price"
          type="numeric"
          required
          {...register("price")}
        />
        <TextField
          id="outlined-note"
          className="form-text-field"
          label="Notes"
          type="text"
          multiline
          {...register("note")}
        />

        <Button className="form-button-submit" variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
