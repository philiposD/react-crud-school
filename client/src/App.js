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
      main: () => buildWrapper(<Main/>)
    },
    {
      path: "/students",
      sidebar: () => <Sidebar/>,
      main: () => buildWrapper(<Students/>)
    },
    {
      path: "/professors",
      sidebar: () => <Sidebar/>,
      main: () => buildWrapper(<Students/>)
    }
  ];

  const buildWrapper = (ele) => {
    return <div className='container-wrapper'>{ele}</div>
  }


  return (
    <div className="App">
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.sidebar />}
          />
        ))}
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
    </div>
  );
}

export default App;
