import {
  CATEGORY_FIND_FAILURE,
  CATEGORY_FIND_REQUEST, CATEGORY_FIND_SUCCESS,
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

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: '',
  postCount: '',
  loading: false,
  error: '',
  creatorId: '',
  PostFindResult: '',
  categoryFindResult: '',
  title: '',
  subject: '',
  searchBy: '',
  searchResult: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true
      };
    case POST_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.PostFindResult],
        categoryFindResult: action.payload.CategoryFindResult,
        loading: false
      };
    case POST_LOADING_FAILURE:
      return {
        ...state,
        loading: false
      };
    case POST_UPLOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true
      };
    case POST_UPLOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false
      };
    case POST_UPLOADING_FAILURE:
      return {
        ...state,
        loading: false
      };
    case POST_DETAIL_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true
      };
    case POST_DETAIL_LOADING_SUCCESS:
      return {
        ...state,
        creatorId: action.payload.User.name,
        postDetail: action.payload,
        title: action.payload.title,
        subject: action.payload.subject,
        loading: false
      };
    case POST_DETAIL_LOADING_FAILURE:
      return {
        ...state,
        loading: false
      };
    case POST_EDIT_UPLOADING_REQUEST:
      return {
        ...state,
        loading: true
      };
    case POST_EDIT_UPLOADING_SUCCESS:
      return {
        ...state,
        creatorId: action.payload.User.name,
        postDetail: action.payload,
        title: action.payload.title,
        subject: action.payload.subject,
        loading: false
      };
    case POST_EDIT_UPLOADING_FAILURE:
      return {
        ...state,
        loading: false
      };
    case CATEGORY_FIND_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true
      };
    case CATEGORY_FIND_SUCCESS:
      return {
        ...state,
        categoryFindResult: action.payload,
        loading: false
      };
    case CATEGORY_FIND_FAILURE:
      return {
        ...state,
        categoryFindResult: action.payload,
        loading: false
      };
    case SEARCH_REQUEST:
      return {
        ...state,
        posts: [],
        searchBy: action.payload,
        loading: true
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchBy: state.searchBy,
        searchResult: action.payload,
        loading: false
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        searchResult: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
