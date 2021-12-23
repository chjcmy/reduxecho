import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_EDIT_UPLOADING_REQUEST } from '../../redux/types';
import {
  Button, Col, Form, FormGroup, Input, Label, Progress
} from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { editorConfiguration } from '../../components/editor/EditorConfig';

const PostEdit = (req) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [form, setValue] = useState({ title: '', subject: '' });
  const postDetail = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    setValue({
      title: postDetail.title,
      subject: postDetail.subject
    });
  }, [postDetail.title, postDetail.subject]);

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();
    setValue({
      ...form,
      subject: data
    });
  };

  const onSubmit = async () => {
    const { title, subject } = form;
    const id = Number(req.match.params.id);
    const body = {
      title, subject, id
    };
    dispatch({
      type: POST_EDIT_UPLOADING_REQUEST,
      payload: body
    });
  };
  return (
    <>
      {isAuthenticated ? (
        <Form onSubmit={onSubmit}>
          <FormGroup className="mb-3">
            <Label for="title">Title</Label>
            <Input
              defaultValue={postDetail.title}
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
            <Label className="edit-margin-top" for="Subject">Subject</Label>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              data={postDetail.subject}
              onBlur={getDataFromCKEditor}
            />
            <Button
              color="success"
              block
              className="mt-3 col-md-2 offset-md-10 mb-3"
            >
              저장하기
            </Button>
          </FormGroup>
        </Form>
      ) : (
        <Col width={50} className="p-5 m-5">
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </>
  );
};

export default PostEdit;
