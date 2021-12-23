import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert, Modal, ModalHeader, NavLink, ModalBody
} from 'reactstrap';
import { GoogleLogin } from 'react-google-login';
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from '../../redux/types';

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState('');
  const [form, setValues] = useState({
    num: ''
  });
  const dispatch = useDispatch();
  const { errorMsg } = useSelector((state) => state.auth);

  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST
    });
    setModal(!modal);
  };

  const responseGoogle = async (response) => {
    setValues({ ...form, num: response.googleId });
    onSubmit();
  };

  const onSubmit = () => {
    const { num } = form;
    const user = { num };
    dispatch({
      type: LOGIN_REQUEST,
      payload: user
    });
  };

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Login</ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color="danger">{localMsg}</Alert> : null }
          <GoogleLogin
            clientId="940522265963-gqbtd1jmbqtsueje1hhfqved273412i7.apps.googleusercontent.com"
            buttonText="Google"
            onSuccess={(result) => responseGoogle(result)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
