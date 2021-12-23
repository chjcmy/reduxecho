import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

const Category = ({ posts }) => (
  <Row xs="3" className="d-flex">
    {Array.isArray(posts)
      ? posts.map(({ id, categoryName }) => (
        <Col key={id} sm={{ size: 'auto', offset: 1 }}>
          <Link
            to={{ pathname: `/post/category/${categoryName}`, state: { id } }}
            className="badge text-decoration-none"
          >
            <span className="ml-1">
              <Button color="info text-white">
                {categoryName}
              </Button>
            </span>
          </Link>
        </Col>
      )) : ''}
  </Row>
);

export default Category;
