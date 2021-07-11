import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

function Header() {
  const { oktaAuth, authState } = useOktaAuth();

  const logout = async () => { await oktaAuth.signOut(); }

  const userText = authState.isAuthenticated
    ? <button onClick={ logout }>Logout</button>
    : null;

  return (
    <header>
      <div className="left">React Login</div>
      <ul className="menu"></ul>
      <div className="right">{userText}</div>
    </header>
  );
}

export default Header;