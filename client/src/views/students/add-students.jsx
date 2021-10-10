
import './index.scss';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React, { useContext, useState } from 'react';
import { fetchStudents } from '../../services/http-service';
import { StudentContext } from './studentContext';

export default function AddStudents(props) {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [dateValue, setDateValue] = React.useState(new Date('2000-08-18T21:11:54'));

  const {setStudents } = useContext(StudentContext);

  console.log('AddStudents', props);

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const onSubmit = (data) => {
    console.log(data)
    axios.post('/students/add', data)
    .then(function (response) {
      console.log('Post response:', response);
      fetchStudents('param123').then(res => {
        console.log('Get students response:', res);
        setStudents(res.data);
      });
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
            {...register('firstName')}
          />

        <TextField
            id="outlined-last-name"
            className='form-text-field'
            label="Last name"
            type="text"
            required
            {...register('lastName')}
          />

        <TextField
            id="outlined-last-uid"
            className='form-text-field'
            label="UID-CNP"
            type="text"
            required
            {...register('UID')}
          />

        <TextField
            id="outlined-email-student"
            className='form-text-field'
            label="Email student"
            type="email"
            required
            {...register('emailStudent')}
          />

        <TextField
            id="outlined-email-parent"
            className='form-text-field'
            label="Email parent"
            type="email"
            required
            {...register('emailParent')}
          />

        <TextField
            id="outlined-phone-student"
            className='form-text-field'
            label="Phone student"
            type="tel"
            {...register('phoneStudent')}
          />

        <TextField
            id="outlined-phone-parent"
            className='form-text-field'
            label="Phone parent"
            type="tel"
            {...register('phoneParent')}
          />

        <TextField
            id="outlined-parent-name"
            className='form-text-field'
            label="Parent name"
            type="text"
            {...register('parentName')}
          />

        <TextField
            id="outlined-school"
            className='form-text-field'
            label="School"
            type="text"
            defaultValue="Default school"
            {...register('school')}
          />

        <TextField
            id="outlined-class"
            className='form-text-field'
            label="Class"
            type="text"
            {...register('class')}
          />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div id='dob-desktop'>
            <DesktopDatePicker
              label="Date of birth"
              inputFormat="yyyy-MM-dd"
              value={dateValue}
              onChange={handleDateChange}
              required
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          <div id='dob-mobile'>
            <MobileDatePicker
              label="Date of birth"
              inputFormat="yyyy-MM-dd"
              value={dateValue}
              onChange={handleDateChange}
              required
              renderInput={(params) => <TextField {...params} />}
              {...register('dateOfBirth')}
            />
          </div>
        </LocalizationProvider>

        <Button className='form-button-submit' variant="outlined" type='submit'>Submit</Button>
      </form>
    </div>
  );
}
