import common from './CommonAPI';
import ErrorTypes from '../../utils/Error/ErrorTypes';
import Auth from '../Auth';

const rest = {};
const errorFunc = (error, dispatch) => {
  dispatch({ type: ErrorTypes.BUSINESS_ERROR, data: error.message });
  dispatch({ fieldUpdate: 'loadButton', data: false });
  return Promise.reject(error);
};

rest.post = (url, data, dispatch) => fetch(url,
  {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      token: Auth.getToken(),
    },
  })
  .then(r => common.status(r, dispatch))
  .then(r => r.json())
  .catch(r => errorFunc(r, dispatch));

rest.get = (url, dispatch) => (
  fetch(url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      token: Auth.getToken(),
    },
    mode: 'cors',
  })
    .then(r => common.status(r, dispatch))
    .then(r => r.json())
    .catch(r => errorFunc(r, dispatch))
);

export default rest;
