import React, { useEffect, useContext } from 'react';
import {
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import LoadButton from 'reactstrap-button-loader';
import ReactNotification from 'react-notifications-component';
import Services from './LoginServices';
import { StoreContext } from '../../store';
import Auth from '../../services/Auth';
import ErrorActions from '../../utils/Error/ErrorActions';
import 'react-notifications-component/dist/theme.css';
import Notifications from '../../utils/Builders/Notifications';

const propTypes = {
  history: PropTypes.shape(
    {
      push: PropTypes.func.isRequired,
    },
  ).isRequired,
};

const Login = ({ history }) => {
  const { state, dispatch } = useContext(StoreContext);
  const notificationDOMRef = React.createRef();
  useEffect(() => {
    Auth.login(() => {
      history.push('/');
    }, () => {
    });
  });


  const submitEventHandler = (e) => {
    e.preventDefault();
    const { current } = notificationDOMRef;
    dispatch({ fieldUpdate: 'loadButton', data: true });
    const formUse = e.currentTarget.elements;
    const login = { login: formUse.first.value, password: formUse.second.value };
    Services.createSession(login,
      (session) => {
        localStorage.setItem('session', JSON.stringify(session));
        dispatch({ fieldUpdate: 'loadButton', data: false });
        Auth.login(() => {
          console.log('redirect...');
          ErrorActions.clearMessageError(dispatch);
          history.push('/');
        }, () => {
          current.addNotification(
            Notifications.danger('No load session', 'Email or Password invalid'),
          );
          console.log('No load session');
        });
      },
      (error) => {
        dispatch({ fieldUpdate: 'loadButton', data: false });
        current.addNotification(
          Notifications.danger('No load session', 'Email or Password invalid'),
        );
        console.log(error);
      }, dispatch);
  };
  return (
    <div className="app flex-row align-items-center">
      <ReactNotification ref={notificationDOMRef} />
      <Container>
        <Row className="justify-content-center">
          <Col md="5">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={e => submitEventHandler(e)}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="first"
                        placeholder="Username"
                        autoComplete="username"
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="second"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <LoadButton type="submit" color="primary" loading={state.get('loadButton')} className="px-4">Login</LoadButton>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Login.propTypes = propTypes;

export default Login;
