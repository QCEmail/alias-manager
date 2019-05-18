import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

import './LoginForm.css';

export default class LoginForm extends Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.formRef = React.createRef();

    this.state = {
      authError: null,
      userError: false,
      pwdError: false,
      authenticating: false,
    };
  }

  componentDidMount() {
    this.formRef.current.addEventListener('keydown', this.handleKeydown, false);
  }

  componentWillUnmount() {
    this.formRef.current.removeEventListener('keydown', this.handleKeydown, false);
  }

  handleKeydown = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      e.preventDefault();
      this.attemptLogin();
    }
  };

  attemptLogin = () => {
    const { authenticateUser } = this.props;
    const username = this.usernameRef.current.value;
    const password = this.passwordRef.current.value;

    if (!username && !password) {
      this.setState({ userError: true, pwdError: true });
      return;
    } else if (!username) {
      this.setState({ userError: true, pwdError: false });
      return;
    } else if (!password) {
      this.setState({ userError: false, pwdError: true });
      return;
    }

    this.setState({ userError: false, pwdError: false, authenticating: true }, () => {
      authenticateUser(username, password)
        .catch(authError => {
          this.setState({ authenticating: false, authError });
        });
    });
  };

  render() {
    const { authenticating, authError, userError, pwdError } = this.state;

    return (
      <div className="login-form-container">
        <div className="login-form-dialog">
          <Form className="login-form" innerRef={this.formRef}>
            {authError && (
              <Alert color="danger">{authError}</Alert>
            )}
            <FormGroup>
              <Label for="username">User Name</Label>
              <Input
                name="username"
                id="username"
                placeholder="User name"
                invalid={userError}
                valid={!userError}
                innerRef={this.usernameRef}
              />
              <FormFeedback invalid="true">User Name is required</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                invalid={pwdError}
                valid={!pwdError}
                innerRef={this.passwordRef}
              />
              <FormFeedback invalid="true">Password is required</FormFeedback>
            </FormGroup>
            <Button
              onClick={this.attemptLogin}
              disabled={authenticating}
              color="primary"
              block
            >
              Log In
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
