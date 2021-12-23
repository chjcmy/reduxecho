import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_DELETE_REQUEST, POST_DETAIL_LOADING_REQUEST, USER_LOADING_REQUEST } from '../../redux/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BorderSpinner } from '../../components/spinner/Spinner';
import dateFormat from 'dateformat';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import { editorConfiguration } from '../../components/editor/EditorConfig';

const PostDetail = (req) => {
  const dispatch = useDispatch();

  const {
    postDetail, title, loading
  } = useSelector((state) => state.post);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const id = Number(req.match.params.id);
  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem('token')
    });
  }, [dispatch, req.match.params.id]);

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: id
    });
  };

  const EditButton = (
    <>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3 d-grid gap-2">
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3 d-grid gap-2">
          <Link
            to={`/postedit/${req.match.params.id}`}
            className="btn btn-success "
          >
            Edit Post
          </Link>
        </Col>
        <Col className="col-md-3 d-grid gap-2">
          <Button className="btn-danger" onClick={onDeleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );

  const HomeButton = (
    <>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3 d-grid gap-2">
          <Link to="/" className="btn btn-primary btn-lg">
            Home
          </Link>
        </Col>
      </Row>
    </>
  );

  const Body = (
    <>
      {isAuthenticated ? EditButton : HomeButton}
      <Row className="border-bottom border-top border-primary p-3 mb-3 justify-content-between">
        {(() => {
          if (postDetail && postDetail.User.name) {
            return (
              <>
                <div className="fw-bold fs-3">
                  <span className="mr-3">
                    <Button color="info text-light">
                      {postDetail.Category.categoryName}
                    </Button>
                  </span>
                  {postDetail.title}
                </div>
                <div className="fs-6 text-end">{postDetail.User.name}</div>
              </>
            );
          }
        })()}
      </Row>
      {postDetail && postDetail.created_at ? (
        <>
          <div className="d-flex justify-content-end align-items-lg-baseline fs-6">
            <FontAwesomeIcon icon={faPen} />
            &nbsp;
            <span className="font-text-center">{dateFormat(postDetail.created_at, 'fullDate')}</span>
            &nbsp;
            <FontAwesomeIcon icon={faPenAlt} />
            &nbsp;
            <span className="font-text-center">{dateFormat(postDetail.updated_at, 'fullDate')}</span>
            &nbsp;
          </div>
          <CKEditor
            editor={BalloonEditor}
            data={postDetail.subject}
            config={editorConfiguration}
            disabled="true"
          />
        </>
      ) : null}
    </>
  );

  return (
    <h1>
      <Helmet title={`Post | ${title}`} />
      {loading === true ? BorderSpinner : Body }
    </h1>
  );
};

export default PostDetail;
