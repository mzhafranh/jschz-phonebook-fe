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

export const setPage = (page) => ({
    type: 'SET_PAGE',
    payload: page
});

export const setLoading = (loading) => ({
    type: 'SET_LOADING',
    payload: loading
});

export const setTotalPage = (totalPage) => ({
    type: 'SET_TOTALPAGE',
    payload: totalPage
})
