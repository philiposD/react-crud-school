import './index.scss';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { fetchModules } from '../../services/http-service';
import { ModuleContext } from './moduleContext';
import { useEffect, useState, React, useMemo } from 'react';
import AddModule from './add-module';
import GridModules from './grid-modules';


export default function Modules() {
  const [students, setStudents] = useState(null);
  const value = useMemo(() => ({students, setStudents}), [students]);

  useEffect(() => {
    console.log('test from Main');
    fetchModules('param123').then(res => {
      console.log('fetchStudents', res);
      setStudents(res.data);
    });
  },[]);

  return(
    <>
    {students !== null
    ? (<ModuleContext.Provider value={value}>
          <AddModule />
          <GridModules />
          {/* <GridStudentsSorting students={students} />
          <GridStudents students={students} /> */}
        </ModuleContext.Provider>
      )
    : (<div></div>)}
    </>
  );
}
