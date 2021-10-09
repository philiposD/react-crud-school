
import './index.scss';
import '../../services/http-service';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React, { useContext, useState } from 'react';
import { fetchStudents } from '../../services/http-service';
import { StudentsContext } from './studentsContext';

export default function AddStudents(props) {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [value, setValue] = React.useState(new Date('2000-08-18T21:11:54'));

  const {setStudents } = useContext(StudentsContext);

  console.log('AddStudents', props);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onSubmit = (data) => {
    axios.post('/students/add', data)
    .then(function (response) {
      console.log(response);
      // console.log('bili bala');
      fetchStudents('param123').then(res => {
        console.log(res);
        // props.callbackAdd(res.data);
        setStudents(res.data);
      //   props.test();
      //   props.callbackAdd([{
      //     "id": 1,
      //     "firstName": "DRONTZAS",
      //     "lastName": "PHILIPOS",
      //     "dateOfBirth": "2000-08-18",
      //     "email": "raziel_1cs@yahoo.com",
      //     "phone": "652529020",
      //     "school": "Default school",
      //     "createdAt": "2021-10-08T22:17:46.000Z",
      //     "updatedAt": "2021-10-08T22:17:46.000Z",
      //     "groupId": null
      // }]);
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
            defaultValue="Default school"
            {...register('school')}
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
              inputFormat="yyyy-MM-dd"
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
