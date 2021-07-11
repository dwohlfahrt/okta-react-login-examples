import React, { Component } from 'react';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

type Props = {
  onSuccess: Function,
  onError: Function,
  baseUrl: string,
  authClient: OktaAuth
};

export default class OktaSignInWidget extends Component<Props> {
  wrapper: React.RefObject<HTMLDivElement>;
  widget: typeof OktaSignIn;

  constructor(props: Props) {
    super(props);
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      authClient: this.props.authClient
    });
    this.widget.renderEl({el: this.wrapper.current}, this.props.onSuccess, this.props.onError);
  }

  render() {
    return <div ref={this.wrapper} />;
  }
};