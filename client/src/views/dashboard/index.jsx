// import logo from './logo.svg';
import "./index.scss";
import "../../services/http-service";
import { fetchStudents } from "../../services/http-service";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../AppContext";

function Dashboard() {
  const [data, setData] = useState({});
  const { setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle("Dashboard");
    fetchStudents("param123").then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div id="dashboard">
      <p>Dashboard</p>
    </div>
  );
}

export default Dashboard;
