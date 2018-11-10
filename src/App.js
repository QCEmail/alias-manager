import React, { Component } from 'react';

import LoginForm from './LoginForm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      user: null,
    };
  }

  authenticateUser = (username, password) => {
    if (!username && !password) {
      return Promise.reject('Enter a username and password');
    }
    if (username === 'duh') {
      return Promise.reject('The username and password you provided is not valid');
    }
    this.setState({
      authenticated: true,
      user: {
        type: 'admin', displayname: 'Admin', mailbox: 'admin@test.com', userid: 1,
      }
    });
    return Promise.resolve();
  };

  render() {
    const { authenticated } = this.state;

    if (!authenticated) {
      return (
        <LoginForm authenticateUser={this.authenticateUser}/>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          Stuff
        </header>
      </div>
    );
  }
}

export default App;
