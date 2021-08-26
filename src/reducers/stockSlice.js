import { createSlice } from "@reduxjs/toolkit";

export const Stocks = createSlice({
  name: "StockData",
  initialState: {
    stockDetail: {},
    currentPrice: {},
    stocks: [],
    previousStock: [],
    previousPrice: [],
    refreshRate: 0,
  },
  reducers: {
    getStockData: (state, actions) => {
      state.stockDetail = {...actions.payload};
    },

    savePrevious: (state, actions) => {
        state.previousStock = [...state.previousStock, {...actions.payload}];
    },
    savePreviousPrice: (state, actions) => {
        state.previousPrice = [...state.previousPrice, {...actions.payload}];
    },
    getStocks: (state, actions) => {
        state.stocks = [...actions.payload];
    },

    getStockPrice: (state, actions) => {
        state.currentPrice = {...actions.payload};
    },
    
    updateRefreshRate: (state, actions) => {
        state.refreshRate = actions.payload.value;
    }
  },
});

export const { getStockData, getStocks, getStockPrice, savePrevious, updateRefreshRate, savePreviousPrice } = Stocks.actions;
export default Stocks.reducer;
