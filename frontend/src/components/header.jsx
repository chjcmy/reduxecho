import React from 'react';
import { Row, Col } from 'reactstrap';

const Header = () => (
  <div id="page-header" className="mb-3">
    <Row>
      <Col md="6" sm="auto" className="text-center m-auto">
        <h1>Sung.Blog</h1>
        <p>성현이의 기술 공방</p>
      </Col>
    </Row>
  </div>
);

export default Header;
