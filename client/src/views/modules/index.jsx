import './index.scss';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { fetchModules, deleteModule } from '../../services/http-service';
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

  const headCells = [
    {
      id: '',
      numeric: false,
      disablePadding: true,
      label: '',
    },
    {
      id: 'name',
      numeric: true,
      disablePadding: false,
      label: 'Name',
    },
    {
      id: 'type',
      numeric: true,
      disablePadding: false,
      label: 'Type',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Price',
    },
    {
      id: 'notes',
      numeric: false,
      disablePadding: false,
      label: 'Notes',
    }
  ];

  const arrOrder = headCells.slice(1, headCells.length).map(ele => ele.id);
  // const arrOrder = headCells.slice(1, headCells.length).map(ele => ele.id);

  return(
    <>
    {modules !== null
    ? (<ModuleContext.Provider value={value}>
          <AddModule />
          <GridModules />
          <DataTableSort
            context={ModuleContext}
            headCells={headCells}
            order={arrOrder}
            name={'Modules'}
            deleteCallback={deleteModule}
            fetchData={fetchModules}
            setData={setModules}
          />
        </ModuleContext.Provider>
      )
    : (<div></div>)}
    </>
  );
}
