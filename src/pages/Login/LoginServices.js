import fetchApi from '../../services/api/FetchApi';
import rest from '../../services/api/ConfigRestAPI';

export default {
  createSession:
  (login, onSuccess, onError, dispatch) => fetchApi.post(
    rest.endpoint.login, login, dispatch,
  ).then(onSuccess).catch(onError),
};
