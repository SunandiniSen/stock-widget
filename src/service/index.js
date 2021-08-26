import axios from 'axios';
import { API_URL, API_KEY } from '../constants';

export const getStockDetail = (code) => {
  const params = {
    function: 'OVERVIEW',
    symbol: code,
    apikey: API_KEY,
  };

  return axios({
    method: 'GET',
    url: `${API_URL}`,
    params,
  });
};

export const getStockList = (symbol) => {
  const params = {
    function: 'SYMBOL_SEARCH',
    keywords: symbol,
    apikey: API_KEY,
  };

  return axios({
    method: 'GET',
    url: `${API_URL}`,
    params,
  })
};

export const getCurrentPrice = (symbol) => {
    const params = {
      function: 'GLOBAL_QUOTE',
      symbol: symbol,
      apikey: API_KEY,
    };
  
    return axios({
      method: 'GET',
      url: `${API_URL}`,
      params,
    });
  };
