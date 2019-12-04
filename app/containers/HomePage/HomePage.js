/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    const { searchKey, onSubmitForm } = this.props;
    if (searchKey && searchKey.trim().length > 0) {
      onSubmitForm();
    }
  }

  render() {
    const {
      loading, error, values, searchKey, onChangeSearchKey, onSubmitForm
    } = this.props;
    const reposListProps = {
      loading,
      error,
      repos: values,
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Main Page" />
        </Helmet>
        <div className="home-page">
          <section className="centered">
            <h2>Actions</h2>
          </section>
          <section>
            <h2>API List</h2>
            <form onSubmit={onSubmitForm}>
              <label htmlFor="searchKey">
                Search for item
                <input
                  id="searchKey"
                  type="text"
                  placeholder="search"
                  value={searchKey}
                  onChange={onChangeSearchKey}
                />
              </label>
            </form>
            <ReposList {...reposListProps} />
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  searchKey: PropTypes.string,
  onChangeSearchKey: PropTypes.func
};
/**
 *  <h2>Try me!</h2>
            <form onSubmit={onSubmitForm}>
              <label htmlFor="username">
                Show Github repositories by
                <span className="at-prefix">@</span>
                <input
                  id="username"
                  type="text"
                  placeholder="flexdinesh"
                  value={username}
                  onChange={onChangeUsername}
                />
              </label>
            </form>
            <ReposList {...reposListProps} />
 */