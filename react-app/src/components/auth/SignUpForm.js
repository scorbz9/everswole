import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import './SignUpForm.css'


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      } else {
        history.push('/')
      }
    } else {
      if (errors.includes("Your password and confirm password do not match.")) {
        setErrors(["Your password and confirm password do not match."])
      } else {

        setErrors([...errors, "Your password and confirm password do not match."])
      }
    }
  };

  const onDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data)
    }
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    history.push('/')
  }


  return (
    <div className="sign-up-form-container">
      <form onSubmit={onSignUp} className="sign-up-form">
        <div className="sign-up-form-header">
          <h4>Sign up for Everswole</h4>
          <h6 className="form-element">By creating an account for Everswole, you hereby agree to not skip leg day.</h6>
        </div>
        <div className="error-container">
          {errors.map((error, ind) => (
            <div key={ind} className="error">{error}</div>
          ))}
        </div>
        <div className="sign-up-input form-element">
          <input

            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder="Username"
            autoComplete='off'
          ></input>
        </div>
        <div className="sign-up-input form-element">
          <input
            className="form-element"
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder="Email"
            autoComplete='off'
          ></input>
        </div>
        <div className="sign-up-input form-element">
          <input
            className="form-element"
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder="Password"
          ></input>
        </div>
        <div className="sign-up-input form-element">
          <input
            className="form-element"
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder="Confirm Password"
          ></input>
        </div>
        <button type='submit' className="sign-up-submit form-element">Sign Up</button>
        <div className="sign-up-form-sign-up-container form-element">
              <p className="sign-up-form-sign-up">Already have an account? <Link to="/login" className="sign-up-form-sign-up-link">Log in</Link></p>
        </div>
        <div className="login-form-demo-user-container form-element">
            <button onClick={onDemo} className="sign-up-form-demo-user form-element" type='button'>Demo User</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
