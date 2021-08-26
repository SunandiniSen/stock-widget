import { React, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentPrice } from '../../service';
import { getStockPrice } from "../../reducers/stockSlice"
import "./StockDetails.css";

export const StockDetails = () => {
    const stockDetail = useSelector(state => state.stocks.stockDetail);
    const currentPrice = useSelector(state => state.stocks.currentPrice);
    const refreshRate = useSelector(state => state.stocks.refreshRate);

    const [error, setError] = useState(false);

    const price = currentPrice && currentPrice["Global Quote"] ? currentPrice["Global Quote"]["05. price"] : '';

    const dispatch = useDispatch();

    const updatePriceValue = useCallback(async () => {
        const res = await getCurrentPrice(stockDetail["Symbol"]);
        if(res.data["NOTE"] || !res.data["Global Quote"]) {
            setError(true);
        } else {
            dispatch(getStockPrice(res.data))
            setError(false);
        }
    },[dispatch, stockDetail]);
    
    useEffect(() => {
        let timerId = null;
        if(refreshRate) {
            timerId = window.setInterval(() => {
                console.log("hello");
                updatePriceValue();
            }, refreshRate);
        }
        return () => window.clearInterval(timerId);
    }, [refreshRate, updatePriceValue])

    if (Object.keys(stockDetail).length > 0) {
        return (
            <div>
                <div className="stockDetail-title">
                    {stockDetail.Name}
                </div>
                <div className="stockDetail-detail">
                    <div className="stockDetail-data"> <b>Symbol: </b> {stockDetail.Symbol}</div>
                    <div className="stockDetail-data"> <b>Name: </b> {stockDetail.Name}</div>
                    <div className="stockDetail-data"> <b>Description: </b>{ stockDetail.Description}</div>
                    <div className="stockDetail-data"> <b>Current Price: </b> {error ? "Error Fetching updated price": price}</div>
                    <div className="stockDetail-data"> <b>Industry: </b> {stockDetail.Industry}</div>
                    <div className="stockDetail-data"> <b>PE Ratio: </b> {stockDetail.PERatio}</div>
                    <div className="stockDetail-data"> <b>Market Cap: </b> {stockDetail.MarketCapitalization} </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}
