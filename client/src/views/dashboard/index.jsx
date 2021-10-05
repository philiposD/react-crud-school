// import logo from './logo.svg';
import './index.scss';
import '../../services/http-service';
import { fetchStudents } from '../../services/http-service';
import { useEffect, useState } from 'react';

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log('test from Main');
    fetchStudents('param123').then(res => {
      console.log(res)
      setData(res);
    });
  },[]);

  return (
    <div id="dashboard">
      <p>Dashboard</p>
    </div>
  );
}

export default Dashboard;
