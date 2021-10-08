// import logo from './logo.svg';
import './index.scss';
import '../../services/http-service';
import { fetchStudents } from '../../services/http-service';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { TextField, Button } from '@mui/material';
import AddStudents from './add-students';
import GridStudents from './grid-students';

function StudentsView() {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log('test from Main');
    fetchStudents('param123').then(res => {
      console.log(res)
      setData(res);
    });
  },[]);

  // const { register, handleSubmit, formState: { errors }} = useForm();
  // const onSubmit = (data) => console.log(data);

  return (
    <>
      <AddStudents />
      <GridStudents students={data} />
    </>
  );
}

export default StudentsView;
