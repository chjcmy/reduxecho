import React from 'react';
import {
  Button,
  Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

const PicPick = (contentPic) => {
  switch (contentPic) {
    case 1:
      return 'golang';
    case 2:
      return 'js';
    case 3:
      return 'db';
    case 4:
      return 'server';
    case 5:
      return 'CS';
    case 6:
      return 'life';
    default:
      return null;
  }
};

const PostCardOne = ({ posts }) => (
  <>
    {
          Array.isArray(posts) ? posts.map(({
            id, title, category_id, created_at, updated_at, Category
          }) => (
            <div key={id} className="col-md-4">
              <Link to={`/post/${id}`} className="text-dark text-decoration-none">
                <Card>
                  <CardImg top className={PicPick(category_id)} />
                  <CardBody>
                    <CardTitle className="text-truncate d-flex justify-content-between">
                      <span className="text-truncate fw-bold">{title}</span>
                    </CardTitle>
                    {Category
                      ? <CardSubtitle tag="h6" className="mb-2 text-muted ">{Category.categoryName}</CardSubtitle>
                      : null}
                    <CardText className="fs-6 fw-light lh-1">
                      make:
                      {' '}
                      {dateFormat(created_at, 'fullDate')}
                    </CardText>
                    <CardText className="fs-6 fw-light lh-1">
                      update:
                      {' '}
                      {dateFormat(updated_at, 'fullDate')}
                    </CardText>
                    <Row>
                      <Button color="primary" className="p-2">
                        More
                      </Button>
                    </Row>
                  </CardBody>
                </Card>
              </Link>
            </div>
          )) : null
        }
  </>
);

export default PostCardOne;
