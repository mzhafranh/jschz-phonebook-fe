import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store'
import { fetchPhonebookData } from './actions';

// const mockStore = configureMockStore([thunk]);

jest.mock('./actions', () => ({
  fetchPhonebookData: jest.fn(),
}));

describe('PhonebookBox Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders learn react link', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/PhonebookTopBar/i)).toBeInTheDocument();
    expect(screen.getByText(/PhonebookList/i)).toBeInTheDocument();
  });

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