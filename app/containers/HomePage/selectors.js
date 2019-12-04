import { createSelector } from 'reselect';

const selectHome = (state) => state.home;

const makeSelectUsername = () => createSelector(
    selectHome,
    (homeState) => homeState.username,
);

const makeSelectSearchKey = () => createSelector(
    selectHome,
    (homeState) => homeState.searchKey,
);


export {
    selectHome,
    makeSelectUsername,
    makeSelectSearchKey,
};
