import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Form, FormGroup, Input, Label, Progress
} from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { editorConfiguration } from '../../components/editor/EditorConfig';
import axios from 'axios';
import { POST_UPLOADING_REQUEST } from '../../redux/types';

const PostWrite = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [selector, setSelector] = useState([]);

  const [form, setValue] = useState({ title: '', category_id: 0, subject: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    const config = async () => {
      const res = await axios.get('/unitshosting');
      return res.data;
    };

    config().then((r) => setSelector(r));
  }, []);

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
    // eslint-disable-next-line prefer-const
    let { title, category_id, subject } = form;
    const token = localStorage.getItem('token');
    category_id = Number(category_id);
    const body = {
      title, category_id, subject, token
    };
    dispatch({
      type: POST_UPLOADING_REQUEST,
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
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
            <Label for="category_id">Category</Label>
            <Input
              type="select"
              name="category_id"
              id="category_id"
              className="form-control"
              onChange={onChange}
            >
              <option>
                Nil
              </option>
              {selector.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </Input>
            <Label for="title">Subject</Label>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              // onInit={Myinit}
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

export default PostWrite;
