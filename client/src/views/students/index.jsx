// import logo from './logo.svg';
import './index.scss';
import '../../services/http-service';
import { fetchStudents } from '../../services/http-service';
import { useEffect, useState, React, useMemo } from 'react';
import AddStudents from './add-students';
import GridStudents from './grid-students';
import GridStudentsSorting from './grid-students-sorting';
import { StudentsContext } from './studentsContext';

function StudentsView() {
  const [students, setStudents] = useState(null);
  const value = useMemo(() => ({students, setStudents}), [students]);

  useEffect(() => {
    console.log('test from Main');
    fetchStudents('param123').then(res => {
      console.log('fetchStudents', res);
      setStudents(res.data);
    });
  },[]);

    return (
      <>
      {students !== null
      ? (<StudentsContext.Provider value={value}>
            <AddStudents callbackAdd={setStudents} />
            <GridStudentsSorting students={students} />
            <GridStudents students={students} />
          </StudentsContext.Provider>
        )
      : (<div></div>)}
      </>
    );
}

export default StudentsView;
