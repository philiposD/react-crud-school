import logo from './logo.svg';
import './App.scss';
import Main from './views/dashboard';
import Students from './views/students';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <Sidebar/>,
      main: () => <Main/>
    },
    {
      path: "/students",
      sidebar: () => <Sidebar/>,
      main: () => <Students/>
    },
    {
      path: "/professors",
      sidebar: () => <Sidebar/>,
      main: () => <Students/>
    }
  ];


  return (
    <div className="App">
    <Router>
          <Switch>
        {routes.map((route, index) => (
        <Route key={index} path={route.path} exact={route.exact} children={<route.sidebar />} /> ))}
    </Switch>

    <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
    </Router>


      {/* <Sidebar />
      <Main /> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
