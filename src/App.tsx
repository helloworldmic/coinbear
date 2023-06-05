import { Provider } from "react-redux";
import { ConnectedRouter } from 'connected-react-router';
// import { Line, Radar, Bar, Polar, Pie, Doughnut } from "react-chartjs-2";

import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import { history } from './redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.scss';

import Header from './components/Header'
import Footer from './components/Footer'
import Register from './components/Register';
import Portfolio from './components/Portfolio';
import Transaction from './components/Transaction';
import Login from './components/Login';
import store from "./redux/store"

import Dashboard from './components/Dashboard';
import AllCoinPrice from './components/AllCoinPrice';
import { PrivateRoute } from './components/PrivateRoute';
import Trade from './components/Trade';
import Logout from './components/Logout';
import AllCoin100 from "./components/AllCoin100";
import Home from "./components/Home";
import HomeToDash from './components/HomeToDash'

function App() {

  return (
    <div>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              {/* <Route path="/" component={Home} exact/> */}
              <PrivateRoute path="/portfolio" component={Portfolio} />
              <PrivateRoute path="/transaction" component={Transaction} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/logout" component={Logout} />
              <Route path="/allcoinprice" component={AllCoinPrice} />
              <Route path="/allcoin100" component={AllCoin100} />
              <PrivateRoute path="/trade" component={Trade} />
              <Route path="/hometodash" exact={true} component={HomeToDash} />
            </Switch>
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>
    </div>
  );
}

export default App;
