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
import DataTableSort from '../../components/data-table-sort';


export default function Modules() {
  const [modules, setModules] = useState(null);
  const value = useMemo(() => ({modules, setModules}), [modules]);

  useEffect(() => {
    console.log('test from Main');
    fetchModules('param123').then(res => {
      console.log('fetchStudents', res);
      setModules(res.data);
    });
  },[]);

  return(
    <>
    {modules !== null
    ? (<ModuleContext.Provider value={value}>
          <AddModule />
          <GridModules />
          <DataTableSort context={ModuleContext}/>
          {/* <GridStudentsSorting students={students} />
          <GridStudents students={students} /> */}
        </ModuleContext.Provider>
      )
    : (<div></div>)}
    </>
  );
}
