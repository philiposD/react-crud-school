// import logo from './logo.svg';
import './index.scss';
import '../../services/http-service';
import { fetchStudents, deleteStudent } from '../../services/http-service';
import { useEffect, useState, React, useMemo } from 'react';
import AddStudents from './add-students';
import GridStudents from './grid-students';
import GridStudentsSorting from './grid-students-sorting';
import { StudentContext } from './studentContext';
import DataTableSort from '../../components/data-table-sort';

function StudentsView() {
  const [students, setStudents] = useState(null);
  const value = useMemo(() => ({students, setStudents}), [students]);

  useEffect(() => {
    fetchStudents('param123').then(res => {
      console.log('fetchStudents', res);
      setStudents(res.data);
    });
  },[]);

  let headCells = [
    {},
    {
      id: 'firstName',
      numeric: false,
      disablePadding: true,
      label: 'First name',
    },
    {
      id: 'lastName',
      numeric: true,
      disablePadding: false,
      label: 'Last name',
    },
    {
      id: 'dateOfBirth',
      numeric: true,
      disablePadding: false,
      label: 'Date of birth',
    },
    {
      id: 'UID',
      numeric: true,
      disablePadding: false,
      label: 'UID - CNP',
    },
    {
      id: 'email',
      numeric: true,
      disablePadding: false,
      label: 'Email student',
    },
    {
      id: 'phone',
      numeric: true,
      disablePadding: false,
      label: 'Phone student',
    },
    {
      id: 'school',
      numeric: true,
      disablePadding: false,
      label: 'School',
    },
    {
      id: 'class',
      numeric: true,
      disablePadding: false,
      label: 'Class',
    },
    {
      id: 'parentName',
      numeric: true,
      disablePadding: false,
      label: 'Parent',
    },
    {
      id: 'phoneParent',
      numeric: true,
      disablePadding: false,
      label: 'Phone parent',
    },
    {
      id: 'emailParent',
      numeric: true,
      disablePadding: false,
      label: 'Email parent',
    },
  ];

  const arrOrder = headCells.slice(1, headCells.length).map(ele => ele.id);

    return (
      <>
      {students !== null
      ? (<StudentContext.Provider value={value}>
            <AddStudents />
            {/* <GridStudentsSorting students={students} />
            <GridStudents students={students} /> */}
            <DataTableSort
              context={StudentContext}
              headCells={headCells}
              order={arrOrder}
              name={'Students'}
              deleteCallback={deleteStudent}
              fetchData={fetchStudents}
              setData={setStudents}
            />
          </StudentContext.Provider>
        )
      : (<div></div>)}
      </>
    );
}

export default StudentsView;
