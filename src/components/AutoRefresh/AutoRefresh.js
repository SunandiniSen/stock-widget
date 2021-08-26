import React from 'react';
import { useDispatch } from 'react-redux';
import { updateRefreshRate } from '../../reducers/stockSlice';
import "./AutoRefresh.css";

export const AutoRefresh = () => {
    const dispatch = useDispatch();
    const changeRefreshRate = (value) => {
        dispatch(updateRefreshRate({value: Number(value)}));
    }

    return <div className="refresh-container">
        <label htmlFor="timer">Select Refresh Rate</label>
        <select name="timer" onChange={(e) => changeRefreshRate(e.target.value)}>
            <option value={0}>None</option>
            <option value={2000}>2s</option>
            <option value={5000}>5s</option>
            <option value={10000}>10s</option> 
        </select>
    </div>
}