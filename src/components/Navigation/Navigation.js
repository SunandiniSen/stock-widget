import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStockData, getStockPrice } from "../../reducers/stockSlice";
import "./Navigation.css";

export const Navigation = () => {
    const previousSearch = useSelector(state => state.stocks.previousStock);
    const previousPrice = useSelector(state => state.stocks.previousPrice);
    const [current, setCurrent] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStockData(previousSearch[current]));
        dispatch(getStockPrice(previousPrice[current]));
    }, [current]);

    useEffect(() => {
        if(previousSearch.length) {
            setCurrent(previousSearch.length-1);
        } 
    }, [previousSearch.length]);


    if (previousSearch.length) {
        return (
            <div className="navigation-component">
                <button className={`button ${current === 0 && 'disable' }`} onClick={() => current> 0 && setCurrent(current - 1)}> {" < Prev "} </button>
                <button className={`button ${current === previousSearch.length -1 && 'disable' }`} onClick={() => current < previousSearch.length &&  setCurrent(current + 1)}> {" Next > "} </button>
            </div>
        );
    } else {
        return null;
    }
}
