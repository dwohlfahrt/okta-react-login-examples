import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Private from './Private';
import { LoginCallback, Security, SecureRoute } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Route, useHistory } from 'react-router-dom';
import configData from './config.json';

const oktaAuth = new OktaAuth({
  issuer: `${configData.tenantUrl}/oauth2/default`,
  clientId: configData.clientId,
  redirectUri: window.location.origin + '/callback'
});

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
  const onAuthRequired = function() {
    history.push('/');
  }

  return (
    <div className="App">
      <div className="page">
        <div className="content">
        <Security oktaAuth={oktaAuth} onAuthRequired={onAuthRequired} restoreOriginalUri={restoreOriginalUri}>
          <Header/>
          <Route path='/' exact={true} component={Home}/>
          <SecureRoute path='/private' exact={true} component={Private}/>
          <Route path='/callback' component={LoginCallback}/>
        </Security>
        </div>
      </div>
    </div>
  );
}

export default App;