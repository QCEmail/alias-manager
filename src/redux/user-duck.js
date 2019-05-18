import { Map } from 'immutable';
import Promise from 'bluebird';

import { TEST_ADMIN, TEST_ALIASES, testUser } from "./test-data";
//
// INITIAL_STATE
//

const INITIAL_STATE = Map({
  loading: true,
  user: null,
  aliases: [],
});

//
// ACTIONS
//
const RECEIVE_USER = 'RECEIVE_USER';
const LOADING_USER = 'LOADING_USER';
const RECEIVE_ALIASES = 'RECEIVE_ALIASES';

export function isLoadingUser() {
  return {
    type: LOADING_USER,
  };
}

export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user,
  }
}

export function receiveAliases(aliases) {
  return {
    type: RECEIVE_ALIASES,
    aliases,
  }
}

export function whoAmI() {
}

export function authenticateUser(username, password) {
  return dispatch => {
    if (!username && !password) {
      return Promise.reject('Enter a username and password');
    }
    if (username === 'duh') {
      return Promise.reject('The username and password you provided is not valid');
    }
    const isAdmin = username === 'admin';
    const user = isAdmin ? TEST_ADMIN : testUser(username);
    dispatch(receiveUser(user));
    dispatch(receiveAliases(TEST_ALIASES));
    return Promise.resolve();
  };
}

export function logoutUser() {
  return dispatch => {
    return dispatch(receiveUser(null));
  }
}

//
// REDUCER
//
export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING_USER:
      return state.withMutations(map => {
        map.set('loading', true);
      });
    case RECEIVE_USER:
      return state.withMutations(map => {
        map.set('loading', false)
          .set('user', action.user);
      });
    case RECEIVE_ALIASES:
      return state.withMutations(map => {
        map.set('aliases', action.aliases);
      });
    default:
      return Map(state);
  }
}
