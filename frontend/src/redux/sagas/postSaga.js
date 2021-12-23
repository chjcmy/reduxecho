import axios from 'axios';
import {
  put, call, takeEvery, fork, all
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  CATEGORY_FIND_FAILURE, CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS, SEARCH_FAILURE, SEARCH_REQUEST, SEARCH_SUCCESS
} from '../types';

const loadPostAPI = () => axios.get('/bookshow');

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    yield put({
      type: POST_LOADING_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: e
    });
    yield push('/');
  }
}

function* watchLoadPosts() {
  yield takeEvery(POST_LOADING_REQUEST, loadPosts);
}

const uploadPostAPI = (payload) => {
  const token = payload.token;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  axios.post('/re/bookcreate', payload, config);
};

function* uploadPosts(action) {
  try {
    const result = yield call(uploadPostAPI, action.payload);
    console(result);
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data
    });
    yield put(push(`/post/${result}`));
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e
    });
    yield put(push('/'));
  }
}

function* watchupLoadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

const loadPostDetailAPI = (payload) => axios.get(`/bookread/${payload}`);

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data
    });
    yield put(push(`/post/${result.data.id}`));
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e
    });
    yield put(push('/'));
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

const loadPostDeleteAPI = (payload) => axios.delete(`/bookdelete/${payload}`);

function* loadPostDelete(action) {
  try {
    const result = yield call(loadPostDeleteAPI, action.payload);
    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data
    });
    yield put(push('/'));
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e
    });
  }
}

function* watchloadPostDelete() {
  yield takeEvery(POST_DELETE_REQUEST, loadPostDelete);
}

const PostEditLoadAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios.put(`/bookupdate/${payload.id}`, payload, config);
};

function* PostEditLoad(action) {
  try {
    const result = yield call(PostEditLoadAPI, action.payload);
    console(result);
    yield put({
      type: POST_EDIT_UPLOADING_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: POST_EDIT_UPLOADING_FAILURE,
      payload: e
    });
    yield put(push('/'));
  }
}

function* watchPostEditLoad() {
  yield takeEvery(POST_EDIT_UPLOADING_REQUEST, PostEditLoad);
}

const CategoryFindAPI = (payload) => axios.get(`/pickunitbooks/${payload}`);

function* CategoryFind(action) {
  try {
    const result = yield call(CategoryFindAPI, action.payload);
    yield put({
      type: CATEGORY_FIND_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: CATEGORY_FIND_FAILURE,
      payload: e
    });
    yield put(push('/'));
  }
}

function* watchCategoryFind() {
  yield takeEvery(CATEGORY_FIND_REQUEST, CategoryFind);
}

const SeachResultAPI = (payload) => axios.get(`/search/${encodeURIComponent(payload)}`);

function* SeachResult(action) {
  try {
    const result = yield call(SeachResultAPI, action.payload);
    yield put({
      type: SEARCH_SUCCESS,
      payload: result.data
    });
    yield put(push(`/search/${encodeURIComponent(action.payload)}`));
  } catch (e) {
    yield put({
      type: SEARCH_FAILURE,
      payload: e
    });
    yield put(push('/'));
  }
}

function* watchSeachResult() {
  yield takeEvery(SEARCH_REQUEST, SeachResult);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchupLoadPosts),
    fork(watchloadPostDetail),
    fork(watchloadPostDelete),
    fork(watchPostEditLoad),
    fork(watchCategoryFind),
    fork(watchSeachResult)
  ]);
}
