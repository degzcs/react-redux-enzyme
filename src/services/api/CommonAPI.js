import ErrorTypes from '../../utils/Error/ErrorTypes';
import Auth from '../Auth';

const success = resp => resp.status >= 200 && resp.status < 300;
const unauthorized = resp => resp.status === 401;

const cleanState = (resp) => {
  try {
    Auth.logout();
  } catch (err) {
    console.log(err);
  }
  return Promise.reject(resp);
};

const errors = (resp, dispatch) => {
  resp
    .json()
    .then((err) => {
      dispatch({ type: ErrorTypes.BUSINESS_ERROR, data: err.message });
      dispatch({ fieldUpdate: 'loadButton', data: false });
    }).catch((e) => {
      console.log(e);
    });
  return Promise.reject(resp);
};

export default {
  status: (resp, dispatch) => {
    if (success(resp)) {
      return Promise.resolve(resp);
    }
    if (unauthorized(resp)) {
      cleanState(resp);
    }
    return errors(resp, dispatch);
  },
  json: response => response.json(),
};
