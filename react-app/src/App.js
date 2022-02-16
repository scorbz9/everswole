import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

// Component imports
import SplashPage from "./components/SplashPage"
import SplitDashboard from './components/SplitDashboard';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  if (!user) {

    return (
      <BrowserRouter>
        <NavBar user={user} />
        <Switch>
          <Route path="/" exact={true}>
            <SplashPage />
          </Route>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
        </Switch>
      </BrowserRouter>
    );

  } else if (user) {

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true}>
            <SplitDashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
