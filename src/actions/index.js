import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios'

const API_URL = 'http://localhost:3001/api/'

const request = axios.create({
  baseURL: API_URL,
  timeout: 1000
});

export const fetchPhonebooks = (phonebooks) => ({
  type: 'FETCH_PHONEBOOKS',
  payload: phonebooks
});

export const refreshPhonebooks = (phonebooks) => ({
  type: 'REFRESH_PHONEBOOKS',
  payload: phonebooks
});

export const setPage = (page) => ({
  type: 'SET_PAGE',
  payload: page
});

export const setLoading = (loading) => ({
  type: 'SET_LOADING',
  payload: loading
});

export const setSort = (sort) => ({
  type: 'SET_SORT',
  payload: sort
});

export const setKeyword = (keyword) => ({
  type: 'SET_KEYWORD',
  payload: keyword
});

export const setTotalPage = (totalPage) => ({
  type: 'SET_TOTALPAGE',
  payload: totalPage
})

export const fetchPhonebookData = (keyword, sort, page) => {
  return async (dispatch) => {
    dispatch(setKeyword(keyword))
    const params = {
      keyword,
      sort,
      page,
    };

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await fetch(`http://localhost:3001/api/phonebooks?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const result = await response.json();
      dispatch(fetchPhonebooks(result.phonebooks))
      dispatch(setSort(sort))
      dispatch(setTotalPage(result.pages))
      dispatch(setLoading(false))

    } catch (error) {
      console.error('Error fetching data:', error);
      dispatch(setLoading(false))
    }
  };
};

export const refreshPhonebookData = (keyword, sort, page) => {
  return async (dispatch) => {
    dispatch(setKeyword(keyword))
    const params = {
      keyword,
      sort,
      page
    }

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await fetch(`http://localhost:3001/api/phonebooks?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const result = await response.json();
      dispatch(refreshPhonebooks(result.phonebooks))
      dispatch(setPage(1))
      dispatch(setSort(sort))
      dispatch(setLoading(false))
    } catch (error) {
      console.error('Error fetching data:', error);
      dispatch(setLoading(false));
    }
  }
};

export const addPhonebook = (name, phone) => {
  return async (dispatch) => {
    const newData = {
      name,
      phone
    };
    const keyword = dispatch({ type: 'GET_KEYWORD' })
    try {
      const response = await fetch(`http://localhost:3001/api/phonebooks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      const result = await response.json();
      console.log("Data posted successfully:", result);
      dispatch(refreshPhonebookData(keyword, 'asc', 1))
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }
}

export const removePhonebook = (id) => {
  return async (dispatch) => {
    const keyword = dispatch({ type: 'GET_KEYWORD' })
    try {
      const response = await fetch(`http://localhost:3001/api/phonebooks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      const result = await response.json();
      console.log("Data removed successfully:", result);
      dispatch(refreshPhonebookData(keyword, 'asc', 1))
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }
}


export const updatePhonebook = (id, name, phone) => {
  return async (dispatch) => {
    const updateData = {
      name,
      phone
    };

    try {
      const response = await fetch(`http://localhost:3001/api/phonebooks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      const result = await response.json();
      console.log("Data posted successfully:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }
};

export const handleFileUpload = (file, id) => {
  return async (dispatch) => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const keyword = dispatch({ type: 'GET_KEYWORD' })

    // Create FormData object and append the file
    const formData = new FormData();
    formData.append('avatar', file); // 'file' is the key used in the server

    try {
      const response = await fetch(`http://localhost:3001/api/phonebooks/${id}/avatar`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();

      dispatch(fetchPhonebookData(keyword, 'asc', 1))
      console.log('File uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
};

