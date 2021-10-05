// import logo from './logo.svg';
import './index.scss';
import '../../services/http-service';
import { fetchStudents } from '../../services/http-service';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Sidebar() {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log('test from Main');
    fetchStudents('param123').then(res => {
      console.log(res)
      setData(res);
    });
  },[]);

  return (
    <div id="sidebar">
      <ul>
      <li className="dashboard">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="students">
          <Link to="/students">Students</Link>
        </li>
        <li className="professors">
          <Link to="/professors">Professors</Link>
        </li>
        <li className="groups">
          <p>groups</p>
        </li>
        <li className="settings">
          <p>settings</p>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
