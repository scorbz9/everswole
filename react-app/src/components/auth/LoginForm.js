import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (

    <div className="login-form-container">
      <form onSubmit={onLogin} className="login-form">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="login-form-header">
          <h4>Please log in to Everswole</h4>
          <h6>By loggin in to Everswole, you hereby agree to not skip leg day.</h6>
        </div>
        <div className="login-input form-element">
          <input
            className="form-element"
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            autoComplete="off"
          />
        </div>
        <div className="login-input form-element">
          <input
            className="form-element"
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            autoComplete="off"
          />
        </div>
        <button type='submit' className="login-submit form-element">Login</button>
        <div className="login-form-sign-up-container form-element">
              <p className="login-form-sign-up">New to Everswole? <Link to="/sign-up" className="login-form-sign-up-link">Sign up</Link></p>
        </div>
        <div className="login-form-demo-user-container form-element">
            <button className="login-form-demo-user form-element" type='button'>Demo User</button>
        </div>
      </form>

    </div>

  );
};

export default LoginForm;
