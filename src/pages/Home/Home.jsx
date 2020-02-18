import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactNotification from 'react-notifications-component';
import Auth from '../../services/Auth';
import 'react-notifications-component/dist/theme.css';

const propTypes = {
  history: PropTypes.shape(
    {
      push: PropTypes.func.isRequired,
    },
  ).isRequired,
};

const Home = ({ history }) => {
  const notificationDOMRef = React.createRef();
  useEffect(() => {
    Auth.login(() => {
    }, () => {
      history.push('/login');
    });
  });

  return (
    <div className="app flex-row align-items-center">
      <ReactNotification ref={notificationDOMRef} />
      Home
    </div>
  );
};

Home.propTypes = propTypes;

export default Home;
