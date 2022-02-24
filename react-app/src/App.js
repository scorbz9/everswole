// React imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Component imports
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import SplashPage from "./components/SplashPage"
import SplitDashboard from './components/SplitDashboard';
import Footer from './components/SplashPage/Footer';

// Store imports
import { authenticate } from './store/session';

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
        <Footer />
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
          <Route>
            <h1 className="bad-url-catch-header">There's nothing here! <Link className="bad-url-home-link" to="/">Return to safety.</Link></h1>
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
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <Route>
            <NavBar user={user} />
            <h1 className="bad-url-catch-header">There's nothing here! <Link className="bad-url-home-link" to="/">Return to safety.</Link></h1>
            <Footer />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
