import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { StoreContainer } from './store';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

const Login = React.lazy(() => import('./pages/Login/Login'));
const Page404 = React.lazy(() => import('./pages/Page404/Page404'));
const Home = React.lazy(() => import('./pages/Home/Home'));

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
export default () => (
  <BrowserRouter>
    <StoreContainer>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
          <Route exact path="/" name="Home" render={props => <Home {...props} />} />
          <Redirect from="*" to="/404" />
        </Switch>
      </React.Suspense>
    </StoreContainer>
  </BrowserRouter>
);
