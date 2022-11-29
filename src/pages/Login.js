import React from 'react';

function Login() {
  return (
    <form>
      <h2>Login</h2>
      <input
        type="email"
        data-testid="email-input"
        placeholder="Email"
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Password"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
