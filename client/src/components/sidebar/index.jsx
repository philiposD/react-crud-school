// import logo from './logo.svg';
import './index.scss';
import { Link } from "react-router-dom";

function Sidebar() {
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
