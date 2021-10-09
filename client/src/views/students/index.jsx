// import logo from './logo.svg';
import './index.scss';
import '../../services/http-service';
import { fetchStudents } from '../../services/http-service';
import { useEffect, useState, React, useMemo } from 'react';
import { useForm } from 'react-hook-form';
// import { TextField, Button } from '@mui/material';
import AddStudents from './add-students';
import GridStudents from './grid-students';
import { StudentsContext } from './studentsContext';

function StudentsView() {
  const [students, setStudents] = useState(null);
  const value = useMemo(() => ({students, setStudents}), [students, setStudents]);

  useEffect(() => {
    console.log('test from Main');
    fetchStudents('param123').then(res => {
      console.log('fetchStudents', res);
      setStudents(res.data);
    });
  },[]);

  function test() {
    console.log('testing function props');
  }

  // const { register, handleSubmit, formState: { errors }} = useForm();
  // const onSubmit = (data) => console.log(data);

  console.log('we have data', students);

    return (
      <>
      {students !== null ? (
                <StudentsContext.Provider value={value}>
                <AddStudents callbackAdd={setStudents} test={test} />
                {<GridStudents students={students} />}
              </StudentsContext.Provider>) : (<div></div>)}
      </>
    );
}

export default StudentsView;
