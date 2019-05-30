import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import * as UserActions from './redux/user-duck';
import LoginForm from './LoginForm';
import Header from './Header';
import AliasList from './AliasList';
import AddAlias from './AddAlias';
import Admin from './Admin';
import './App.css';

class App extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      authenticateUser: PropTypes.func.isRequired,
      logoutUser: PropTypes.func.isRequired,
      whoAmI: PropTypes.func.isRequired,
    }),
    userData: PropTypes.instanceOf(Map).isRequired,
  };

  static mapStateToProps(state) {
    return {
      userData: state.user,
    };
  };

  static mapDispatchToProps(dispatch) {
    const actions =_.assign({}, UserActions);
    return {
      actions: bindActionCreators(actions, dispatch),
    }
  }

  componentDidMount() {
    const { actions } = this.props;
//    actions.whoAmI();
  }

  render() {
    const { userData, actions } = this.props;
    const user = userData.get('user');
    const aliases = userData.get('aliases');
    const currentDomain = userData.get('currentDomain');
    const otherDomains = userData.get('otherDomains');

    if (!user) {
      return (
        <LoginForm authenticateUser={actions.authenticateUser} />
      );
    }

    return (
      <div className="App">
        <Header user={user} onLogout={actions.logoutUser} />
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <AliasList {...props} aliases={aliases} />
            )}
          />
          <Route
            path="/admin"
            render={props => (
              <Admin {...props} user={user} />
            )}
          />
          <Route
            path="/addAlias"
            render={props => (
              <AddAlias {...props} currentDomain={currentDomain} otherDomains={otherDomains} actions={actions} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default connect(App.mapStateToProps, App.mapDispatchToProps)(App);
