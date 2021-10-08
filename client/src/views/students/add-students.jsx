
import './index.scss';
import '../../services/http-service';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React, { useState } from 'react';

export default function AddStudents() {
  const { register, handleSubmit, formState: { errors }} = useForm();

  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onSubmit = (data) => {
    console.log('onSubmit', data);
    data.dateOfBirth = "1980-06-17";
    axios.post('/students/add', data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div id='students-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
            id="outlined-first-name"
            className='form-text-field'
            label="First name"
            type="text"
            required
            {...register('firstName', {required: true})}
          />

        <TextField
            id="outlined-last-name"
            className='form-text-field'
            label="Last name"
            type="text"
            required
            {...register('lastName', {required: true})}
          />

        <TextField
            id="outlined-email"
            className='form-text-field'
            label="Email"
            type="email"
            required
            {...register('email', {required: true})}
          />

        <TextField
            id="outlined-phone"
            className='form-text-field'
            label="Phone"
            type="tel"
            required
            {...register('phone', {required: true})}
          />

        <TextField
            id="outlined-school"
            className='form-text-field'
            label="School"
            type="text"
            required
            {...register('school', {required: true})}
          />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div id='dob-desktop'>
            <DesktopDatePicker
              label="Date of birth"
              inputFormat="yyyy-MM-dd"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          <div id='dob-mobile'>
            <MobileDatePicker
              label="Date of birth"
              inputFormat="dd/MM/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
              {...register('dateOfBirth', {required: true})}
            />
          </div>
        </LocalizationProvider>

        <Button className='form-button-submit' variant="outlined" type='submit'>Submit</Button>
      </form>
    </div>
  );
}
