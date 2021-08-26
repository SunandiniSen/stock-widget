import { configureStore } from '@reduxjs/toolkit';
import StockReducer from '../reducers/stockSlice';

export default configureStore({
    reducer: {
        stocks: StockReducer,
    }
});