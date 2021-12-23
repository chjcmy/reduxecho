import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Row } from 'reactstrap';
import { POST_LOADING_REQUEST } from '../../redux/types';
import { BorderSpinner } from '../../components/spinner/Spinner';
import PostCardOne from '../../components/post/PostCardOne';
import Category from '../../components/post/Category';

const PostCardList = () => {
  const {
    posts, categoryFindResult
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: POST_LOADING_REQUEST });
  }, [dispatch]);

  return (
    <>
      <Helmet title="Home" />
      <Row className="border-bottom border-top border-primary py-2 mb-3">
        <Category posts={categoryFindResult} />
      </Row>
      <Row>
        {posts ? <PostCardOne posts={posts} /> : <BorderSpinner />}
      </Row>
    </>
  );
};

export default PostCardList;
