import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [btnDisabled, setDisabled] = useState(true);

  useEffect(() => {
    const validateLogin = () => {
      const minLength = 6;
      const defaultEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
      if (defaultEmail.test(email) && password.length > minLength) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    validateLogin();
  }, [password, email]);

  const handleChange = (value, setValue) => {
    setValue(value);
  };

  const handleClick = () => {
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <form>
      <h2>Login</h2>
      <input
        type="email"
        data-testid="email-input"
        placeholder="Email"
        onChange={ ({ target }) => handleChange(target.value, setEmail) }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Password"
        onChange={ ({ target }) => handleChange(target.value, setPassword) }
      />
      <Link to="/meals">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ btnDisabled }
          onClick={ handleClick }
        >
          Enter
        </button>
      </Link>
    </form>
  );
}

export default Login;
