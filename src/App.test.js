import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import phonebooks from './reducers/phonebooks';
import PhonebookTopBar from './containers/PhonebookTopbar';
import PhonebookList from './components/PhonebookList';


const mockStore = configureMockStore([thunk]);

jest.mock('./actions', () => ({
  fetchPhonebookData: (phonebooks) => ({
    type: 'FETCH_PHONEBOOKS',
    payload: phonebooks
  }),
  refreshPhonebooks: (phonebooks) => ({
    type: 'REFRESH_PHONEBOOKS',
    payload: phonebooks
  }),
  updatePhonebook: (phonebooks) => ({
    type: 'UPDATE_PHONEBOOKS',
    payload: phonebooks
  }),
}));

describe('PhonebookBox Component', () => {
  let store

  beforeEach(() => {
    // Create mock store with initial state
    store = mockStore({
      phonebooks: {
        phonebooks: [{
          "id": 81,
          "name": "Aa",
          "phone": "081122334455",
          "avatar": null,
          "createdAt": "2024-10-31T06:24:29.191Z",
          "updatedAt": "2024-10-31T06:24:29.191Z"
        },
        {
          "id": 16,
          "name": "Aaron Does",
          "phone": "081235475636",
          "avatar": "Aaron Doe1729582033116.jpeg",
          "createdAt": "2024-10-22T03:29:32.012Z",
          "updatedAt": "2024-10-23T06:04:13.420Z"
        },
        {
          "id": 80,
          "name": "Aas",
          "phone": "081256732312",
          "avatar": "Aas1730355830803.png",
          "createdAt": "2024-10-25T06:14:16.176Z",
          "updatedAt": "2024-10-31T06:23:50.803Z"
        },
        {
          "id": 76,
          "name": "Abc",
          "phone": "08123321123",
          "avatar": null,
          "createdAt": "2024-10-25T06:12:32.205Z",
          "updatedAt": "2024-10-25T06:12:32.205Z"
        },
        {
          "id": 77,
          "name": "abd",
          "phone": "081245232463",
          "avatar": null,
          "createdAt": "2024-10-25T06:13:04.996Z",
          "updatedAt": "2024-10-25T06:13:04.996Z"
        },
        {
          "id": 79,
          "name": "Abz",
          "phone": "081265372543",
          "avatar": null,
          "createdAt": "2024-10-25T06:13:56.240Z",
          "updatedAt": "2024-10-31T03:15:43.466Z"
        },
        {
          "id": 51,
          "name": "Alice Soe",
          "phone": "081234801234",
          "avatar": null,
          "createdAt": "2024-10-22T03:29:32.012Z",
          "updatedAt": "2024-10-22T03:29:32.012Z"
        },
        {
          "id": 83,
          "name": "Aloe Maloe",
          "phone": "082211334455",
          "avatar": null,
          "createdAt": "2024-11-01T06:44:44.478Z",
          "updatedAt": "2024-11-01T06:44:44.478Z"
        },
        {
          "id": 78,
          "name": "Az",
          "phone": "081256327362",
          "avatar": null,
          "createdAt": "2024-10-25T06:13:27.617Z",
          "updatedAt": "2024-10-25T06:13:27.617Z"
        },
        {
          "id": 52,
          "name": "Bob Toes",
          "phone": "081234812345",
          "avatar": null,
          "createdAt": "2024-10-22T03:29:32.012Z",
          "updatedAt": "2024-10-25T03:27:08.588Z"
        }],
        page: 1,
        loading: false,
        totalPage: 1,
        keyword: '',
        sort: 'asc',
        error: null,
      },
    })
    // store = createStore(
    //   rootReducer,
    //   applyMiddleware(thunk) // Middleware for async actions
    // );

    jest.clearAllMocks();
  });

  test('render PhonebookBox', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // screen.debug();
    // await waitFor(() => {
    //   const divElement = screen.getByClassName('.container');
    //   expect(divElement).toBeInTheDocument();
    // });
    const phonebookTopbar = screen.getByLabelText('PhonebookTopBar');
    const phonebookList = screen.getByLabelText('PhonebookList');
    expect(phonebookTopbar).toBeInTheDocument();
    expect(phonebookList).toBeInTheDocument();
  })

  test('render PhonebookTopBar', async () => {
    render(
      <Provider store={store}>
        <PhonebookTopBar />
      </Provider>
    );

    const sortIcon = screen.getByLabelText('sort');
    const searchIcon = screen.getByLabelText('search');
    const phonebookForm = screen.getByLabelText('PhonebookForm');
    expect(sortIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(phonebookForm).toBeInTheDocument();
  })

  test('render PhonebookForm', async () => {
    render(
      <Provider store={store}>
        <PhonebookTopBar />
      </Provider>
    );

    const formButton = screen.getByTestId('form-button');
    fireEvent.click(formButton)
    const inputName = screen.getByLabelText('input-name');
    const inputPhone = screen.getByLabelText('input-phone');
    const saveButton = screen.getByText('save');
    const cancelButton = screen.getByText('cancel');
    expect(inputName).toBeInTheDocument();
    expect(inputPhone).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  })

  test('render PhonebookList', async () => {
    render(
      <Provider store={store}>
        <PhonebookList />
      </Provider>
    );

    const phonebookItem = screen.getAllByLabelText('PhonebookItem');
    expect(phonebookItem).toHaveLength(10);
  })

  test('render PhonebookDeleteConfirmation', async () => {
    render(
      <Provider store={store}>
        <PhonebookList />
      </Provider>
    );

    const deleteButton = screen.getAllByLabelText('delete-item');
    fireEvent.click(deleteButton[0])
    const yesButton = screen.getByText('ya');
    const noButton = screen.getByText('tidak');
    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();
  })

  test('render edit PhonebookItem', async () => {
    render(
      <Provider store={store}>
        <PhonebookList />
      </Provider>
    );

    const editItem = screen.getAllByLabelText('edit-item');
    fireEvent.click(editItem[0])
    const editName = screen.getByLabelText('edit-name');
    const editPhone = screen.getByLabelText('edit-phone');
    expect(editName).toBeInTheDocument();
    expect(editPhone).toBeInTheDocument();
    fireEvent.change(editName, { target: { value: 'Bb' } });
    fireEvent.change(editPhone, { target: { value: '082211554433' } });
    const saveItem = screen.getByLabelText('save-item');
    fireEvent.click(saveItem)
    const itemName = screen.getByText('Bb')
    const itemPhone = screen.getByText('082211554433')
    expect(itemName).toBeInTheDocument();
    expect(itemPhone).toBeInTheDocument();
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