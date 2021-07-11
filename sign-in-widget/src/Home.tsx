import React from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from './OktaSignInWidget';

function Home() {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = function(res: any) {
    if (res.status === 'SUCCESS') {
      return oktaAuth.signInWithRedirect({
        sessionToken: res.session.token
      });
    }
  }

  const onError = function(err: any) {
    console.log('error logging in', err);
  }

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/private' }}/> :
    <div className="page">
      <h1>Login with React</h1>
      <OktaSignInWidget
      baseUrl='https://derek.okta.com'
      onSuccess={onSuccess}
      onError={onError}
      authClient={oktaAuth}/>
    </div>;
}

export default Home;