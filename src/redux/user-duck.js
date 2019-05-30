import { Map } from 'immutable';
import Promise from 'bluebird';
import _ from 'lodash';

import { TEST_ADMIN, TEST_ALIASES, testUser } from "./test-data";
import { extractDomains, validateDomain, validateEmail } from './alias-helpers';
//
// INITIAL_STATE
//

const INITIAL_STATE = Map({
  loading: true,
  user: null,
  aliases: [],
  allDomains: [],
  currentDomain: null,
  otherDomains: [],
});

//
// ACTIONS
//
const RECEIVE_USER = 'RECEIVE_USER';
const LOADING_USER = 'LOADING_USER';
const RECEIVE_ALIASES = 'RECEIVE_ALIASES';
const SET_CURRENT_DOMAIN = 'SET_CURRENT_DOMAIN';
const ADD_DOMAIN = 'ADD_DOMAIN';
const ADD_ALIAS = 'ADD_ALIAS';

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

export function setCurrentDomain(currentDomain) {
  return {
    type: SET_CURRENT_DOMAIN,
    currentDomain,
  }
}

export function addDomain(newDomain) {
  return {
    type: ADD_DOMAIN,
    newDomain,
  }
}

export function addAlias(newAlias) {
  return {
    type: ADD_ALIAS,
    newAlias,
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

export function addNewDomain(newDomain) {
  return dispatch => {
    if (validateDomain(newDomain)) {
      return dispatch(addDomain(newDomain));
    }
    throw new Error(`${newDomain} is not valid`);
  };
}

export function createNewAlias(newAlias, notes) {
  return dispatch => {
    if (validateEmail(newAlias)) {
      // TODO call API instead of adding directly
      return dispatch(addAlias({
        address: newAlias, status: 'active', notes
      }));
    }
    throw new Error(`${newAlias} is not valid`);
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
        const { aliases } = action;
        const allDomains = extractDomains(aliases);
        const [currentDomain, ...otherDomains] = allDomains;

        map.set('aliases', aliases)
          .set('allDomains', allDomains)
          .set('currentDomain', currentDomain || '')
          .set('otherDomains', otherDomains);
      });
    case SET_CURRENT_DOMAIN:
      return state.withMutations(map => {
        const { currentDomain } = action;
        const otherDomains = _.filter(map.get('allDomains'), domain => domain !== currentDomain);
        map.set('currentDomain', currentDomain)
          .set('otherDomains', otherDomains);
      });
    case ADD_DOMAIN:
      return state.withMutations(map => {
        const { newDomain } = action;
        const otherDomains = map.get('allDomains');
        map.set('currentDomain', newDomain)
          .set('otherDomains', otherDomains)
          .set('allDomains', otherDomains.concat(newDomain));
      });
    case ADD_ALIAS:
      return state.withMutations(map => {
        const aliases = map.get('aliases').concat(action.newAlias);
        map.set('aliases', aliases);
      });
    default:
      return Map(state);
  }
}
