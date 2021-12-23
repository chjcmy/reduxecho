import React from 'react';
import { Col, Row } from 'reactstrap';

import '../assets/custom.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <div id="main-footer" className="text-center m-auto">
    <Row>
      <Col>
        <FontAwesomeIcon
          icon={faGitlab}
          size="lg"
          onClick={() => {
            const win = window.open('https://gitlab.com/chjcmy', '_blank');
            win.focus();
          }}
          className="gitFont"
        />
        <FontAwesomeIcon
          icon={faGithub}
          size="lg"
          onClick={() => {
            const win = window.open('https://github.com/chjcmy', '_blank');
            win.focus();
          }}
          className="gitFont"
        />
      </Col>
    </Row>
  </div>
);

export default Footer;
