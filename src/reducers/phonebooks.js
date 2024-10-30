const initialState = {
  phonebooks: [],
  page: 1,
  loading: false,
  totalPage: 1,
  keyword: '',
  sort: 'asc',
  name: '',
  phone: '',
  formVisible: false,
  error: null
};

function phonebooks(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PHONEBOOKS':
      return {
        ...state,
        phonebooks: [...state.phonebooks, ...action.payload],
      };
    case 'REFRESH_PHONEBOOKS':
      return {
        ...state,
        phonebooks: [...action.payload],
      };
    case 'SET_KEYWORD':
      return {
        ...state,
        keyword: action.payload,
      };
    case 'SET_SORT':
      return {
        ...state,
        sort: action.payload,
      };
    case 'GET_SORT':
      return (state.sort)
        ;
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'SET_TOTALPAGE':
      return {
        ...state,
        totalPage: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'SET_PHONE':
      return {
        ...state,
        phone: action.payload,
      };
    case 'SET_FORM_VISIBILITY':
      return {
        ...state,
        formVisible: action.payload,
      };

    default:
      return state;
  }
}

export default phonebooks;
