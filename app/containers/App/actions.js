/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_API_VALUES,
  LOAD_API_VALUES_SUCCESS,
  LOAD_API_VALUES_ERROR,
} from './constants';

/**
   * Load the repositories, this action starts the request saga
   *
   * @return {object} An action object with a type of LOAD_API_VALUES
   */
export function loadValues() {
  return {
    type: LOAD_API_VALUES,
  };
}

/**
   * Dispatched when the Valuesitories are loaded by the request saga
   *
   * @param  {array} values The Valuesitory data
   * @param  {string} searchKey The current searchKey
   *
   * @return {object}      An action object with a type of LOAD_API_VALUES_SUCCESS passing the Values
   */
export function valuesLoaded(values, searchKey) {
  return {
    type: LOAD_API_VALUES_SUCCESS,
    values,
    searchKey,
  };
}

/**
   * Dispatched when loading the Valuesitories fails
   *
   * @param  {object} error The error
   *
   * @return {object}       An action object with a type of LOAD_API_VALUES_ERROR passing the error
   */
export function valuesLoadingError(error) {
  return {
    type: LOAD_API_VALUES_ERROR,
    error,
  };
}

// import {
//   LOAD_API_VALUES,
//   LOAD_API_VALUES_SUCCESS,
//   LOAD_API_VALUES_ERROR,
// } from './constants';

// /**
//  * Load the Valuesitories, this action starts the request saga
//  *
//  * @return {object} An action object with a type of LOAD_API_VALUES
//  */
// export function loadRepos() {
//   return {
//     type: LOAD_API_VALUES,
//   };
// }

// /**
//  * Dispatched when the repositories are loaded by the request saga
//  *
//  * @param  {array} repos The repository data
//  * @param  {string} username The current username
//  *
//  * @return {object}      An action object with a type of LOAD_API_VALUES_SUCCESS passing the repos
//  */
// export function reposLoaded(repos, username) {
//   return {
//     type: LOAD_API_VALUES_SUCCESS,
//     repos,
//     username,
//   };
// }

// /**
//  * Dispatched when loading the repositories fails
//  *
//  * @param  {object} error The error
//  *
//  * @return {object}       An action object with a type of LOAD_API_VALUES_ERROR passing the error
//  */
// export function repoLoadingError(error) {
//   return {
//     type: LOAD_API_VALUES_ERROR,
//     error,
//   };
// }
