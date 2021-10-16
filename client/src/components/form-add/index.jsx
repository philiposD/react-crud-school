import "./index.scss";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React, { useContext, useState, useEffect } from "react";

export default function FormAdd(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { mode, formValues } = useContext(props.context);

  const [dateValue, setDateValue] = React.useState(
    new Date("2000-08-18T21:11:54")
  );

  useEffect(() => {
    Object.entries(formValues).forEach((ele) => {
      if (ele[0] !== undefined) {
        setValue(ele[0], ele[1], { shouldDirty: false });
      }
    });
  }, [formValues, setValue]);

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  console.log(props.fields, mode);
  window.props = props;

  const onSubmit = (data) => {
    axios
      .post(props.path, data)
      .then(function (response) {
        props.fetchData().then((res) => {
          props.setData(res.data);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div id="form-add">
      <form onSubmit={handleSubmit(onSubmit)}>
        {props.fields.map((item, index) => {
          if (item.type === "date") {
            return (
              <div id="dob-fields" key={item.id}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div id="dob-desktop">
                    <DesktopDatePicker
                      label={item.label}
                      inputFormat="yyyy-MM-dd"
                      className={item.className}
                      value={dateValue}
                      onChange={handleDateChange}
                      required
                      renderInput={(params) => <TextField {...params} />}
                      {...register(item.id)}
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
                    />
                  </div>
                </LocalizationProvider>
              </div>
            );
          } else {
            return (
              <TextField
                id="outlined-first-name"
                className={item.className}
                key={item.id}
                label={item.label}
                type={item.type}
                required
                InputLabelProps={{ shrink: true }}
                {...register(item.id)}
              />
            );
          }
        })}
        <Button className="form-button-submit" variant="outlined" type="submit">
          {mode == "insert" ? <>Submit</> : <>Edit</>}
        </Button>
      </form>
    </div>
  );
}
