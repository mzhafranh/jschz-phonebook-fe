const initialState = {
    phonebooks: [],
    page: 1,
    loading: false,
    totalPage: 1,
    error: null
  };
  
  function phonebooks(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_PHONEBOOKS':
        return {
          ...state,
          phonebooks: [...state.phonebooks, ...action.payload],
        };
      case 'SET_PAGE':
        return {
          ...state,
          page: action.payload,
        };
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload,
        };
      default:
        return state;
    }
  }
  
  export default phonebooks;
  