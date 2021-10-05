// import logo from './logo.svg';
import './index.scss';
import '../../services/http-service';
import { fetchStudents } from '../../services/http-service';
import { useEffect, useState } from 'react';

function Main() {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log('test from Main');
    fetchStudents('param123').then(res => {
      console.log(res)
      setData(res);
    });
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <br/>{data.message}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Main;
