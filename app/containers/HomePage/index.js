import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectValues,
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';
import { loadValues } from '../App/actions';
import { changeSearchKey } from './actions';
import { makeSelectSearchKey } from './selectors';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onChangeSearchKey: (evt) => dispatch(changeSearchKey(evt.target.value)),
  onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadValues());
  }
});

const mapStateToProps = createStructuredSelector({
  values: makeSelectValues(),
  searchKey: makeSelectSearchKey(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
