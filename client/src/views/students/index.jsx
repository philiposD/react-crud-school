// import logo from './logo.svg';
import './index.scss';
import '../../services/http-service';
import { fetchStudents } from '../../services/http-service';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';

function Main() {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log('test from Main');
    fetchStudents('param123').then(res => {
      console.log(res)
      setData(res);
    });
  },[]);

  const { register, handleSubmit, formState: { errors }} = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      {/* <label htmlFor='first-name'>First name</label>
      <input id='first-name' {...register('firstName', {required: true})} placeholder='First name' /> */}

      <TextField
          id="outlined-first-name"
          label="First name"
          type="text"
          required
          {...register('firstName', {required: true})}
        />

      {/* <input {...register('lastName', { required: true })} />
      {errors.lastName && <p>Last name is required.</p>}
      <input {...register('age', { pattern: /\d+/ })} />
      {errors.age && <p>Please enter number for age.</p>} */}
      <input type="submit" />
    </form>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       {/* <img src={logo} className="App-logo" alt="logo" /> */}
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //         <br/>{data.message}
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default Main;
