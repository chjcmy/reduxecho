import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_REQUEST } from '../../redux/types';
import { Row } from 'reactstrap';
import PostCardOne from '../../components/post/PostCardOne';

const Search = () => {
  const dispatch = useDispatch();

  const { searchBy, searchResult } = useSelector((state) => state.post);

  useEffect(() => {
    if (searchBy) {
      dispatch({
        type: SEARCH_REQUEST,
        payload: searchBy
      });
    }
  }, [dispatch, searchBy]);

  return (
    <div>
      <h1>검색결과: {searchBy}</h1>
      <Row>
        <PostCardOne posts={searchResult} />
      </Row>
    </div>
  );
};

export default Search;
