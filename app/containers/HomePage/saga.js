/**
 * Gets the repositories of the user from Github
 */

import {
    call, put, select, takeLatest
} from 'redux-saga/effects';
import { LOAD_REPOS, LOAD_API_VALUES } from 'containers/App/constants';
import { valuesLoaded, valuesLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername, makeSelectSearchKey } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getValues() {
    // Select username from store
    const searchKey = yield select(makeSelectSearchKey());
    const requestURL = `http://localhost:59604/api/values?${searchKey}`;

    try {
        // Call our request helper (see 'utils/request')
        const values = yield call(request, requestURL);
        yield put(valuesLoaded(values, searchKey));
    } catch (err) {
        yield put(valuesLoadingError(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* valuesData() {
    // Watches for LOAD_API_VALUES actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(LOAD_API_VALUES, getValues);
}
// export function* getRepos() {
//   // Select username from store
//   const searchKey = yield select(makeSelectSearchKey());
//   const requestURL = `https://api.github.com/users/${searchKey}/repos?type=all&sort=updated`;

//   try {
//     // Call our request helper (see 'utils/request')
//     const repos = yield call(request, requestURL);
//     yield put(reposLoaded(repos, searchKey));
//   } catch (err) {
//     yield put(repoLoadingError(err));
//   }
// }

// /**
//  * Root saga manages watcher lifecycle
//  */
// export default function* githubData() {
//   // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//   // By using `takeLatest` only the result of the latest API call is applied.
//   // It returns task descriptor (just like fork) so we can continue execution
//   // It will be cancelled automatically on component unmount
//   yield takeLatest(LOAD_REPOS, getRepos);
// }
