import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CATEGORY_FIND_REQUEST } from '../../redux/types';
import { useParams } from 'react-router-dom';
import { Row } from 'reactstrap';
import PostCardOne from '../../components/post/PostCardOne';

const CategoryResult = ({ location }) => {
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const { categoryFindResult } = useSelector((state) => state.post);

  const catgoryNum = location.state.id;

  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: catgoryNum
    });
  }, [dispatch, catgoryNum]);

  return (
    <div>
      <h1>
        Category: {categoryName}
      </h1>
      <Row>
        <PostCardOne posts={categoryFindResult} />
      </Row>
    </div>
  );
};

export default CategoryResult;
