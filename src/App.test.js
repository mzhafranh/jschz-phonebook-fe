import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
// import store from './store';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import phonebooks from './reducers/phonebooks';



// const mockStore = configureMockStore([thunk]);

jest.mock('./actions', () => ({
  fetchPhonebookData: (phonebooks) => ({ 
    type: 'FETCH_PHONEBOOKS', 
    payload: phonebooks}),
  refreshPhonebooks: (phonebooks) => ({
    type: 'REFRESH_PHONEBOOKS',
    payload: phonebooks}),
}));

describe('PhonebookBox Component', () => {
  let store

  beforeEach(() => {
    // Create mock store with initial state
    // store = mockStore({
    //   phonebooks: {
    //     phonebooks: [{
    //       "id": 81,
    //       "name": "Aa",
    //       "phone": "081122334455",
    //       "avatar": null,
    //       "createdAt": "2024-10-31T06:24:29.191Z",
    //       "updatedAt": "2024-10-31T06:24:29.191Z"
    //   },
    //   {
    //       "id": 16,
    //       "name": "Aaron Does",
    //       "phone": "081235475636",
    //       "avatar": "Aaron Doe1729582033116.jpeg",
    //       "createdAt": "2024-10-22T03:29:32.012Z",
    //       "updatedAt": "2024-10-23T06:04:13.420Z"
    //   },
    //   {
    //       "id": 80,
    //       "name": "Aas",
    //       "phone": "081256732312",
    //       "avatar": "Aas1730355830803.png",
    //       "createdAt": "2024-10-25T06:14:16.176Z",
    //       "updatedAt": "2024-10-31T06:23:50.803Z"
    //   }],
    //     page: 1,
    //     loading: false,
    //     totalPage: 1,
    //     keyword: '',
    //     sort: 'asc',
    //     error: null,
    //   },
    store = createStore(
      rootReducer,
      applyMiddleware(thunk) // Middleware for async actions
    );

    jest.clearAllMocks();
  });

  test('render PhonebookBox', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Total Page/i)).toBeInTheDocument();
    // expect(screen.getByText(/PhonebookList/i)).toBeInTheDocument();
  })



  // test('dispatches fetchPhonebookData action on initial render', async () => {
  //   render(
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   );

  //   await waitFor(() => {
  //     expect(fetchPhonebookData).toHaveBeenCalledWith('', 'asc', 1);
  //   });
  // });

  // test('fetches more data on scroll event', async () => {
  //   render(
  //     <Provider store={store}>
  //       <PhonebookBox />
  //     </Provider>
  //   );

  //   // Mock scroll event to simulate reaching the bottom of the page
  //   window.innerHeight = 800;
  //   document.documentElement.scrollTop = 1000;
  //   document.documentElement.offsetHeight = 1600;

  //   window.dispatchEvent(new Event('scroll'));

  //   await waitFor(() => {
  //     expect(fetchPhonebookData).toHaveBeenCalled();
  //   });
  // });

});