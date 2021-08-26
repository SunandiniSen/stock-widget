import { React, useState } from 'react';
import { useDispatch } from "react-redux";
import { getStockList, getStockDetail, getCurrentPrice } from "../service";
import { getStocks, getStockData, getStockPrice, savePrevious, savePreviousPrice } from "../reducers/stockSlice";
import { debounce } from "../Utils";
import { Search } from "./Search/Search";
import { Dropdown } from "./Dropdown/Dropdown";
import "./AutoSuggest.css";

export const AutoSuggest = () => {
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showError, setShowError] = useState(false);

    const onSearch = async (searchTerm) => {
        if (searchTerm.trim().length > 0) {
            const stockData = await getStockList(searchTerm);
            if (stockData.data["Note"] || !stockData.data.bestMatches.length) {
                setShowError(true);
            } else {
                dispatch(getStocks(stockData.data.bestMatches));
                setShowDropdown(true);
                setShowError(false);
            }
        } else {
            setShowDropdown(false);
        }       
    }

    const onSubmit = async (symbol) => {
        const stockDetail = await getStockDetail(symbol);
        const stockPrice = await getCurrentPrice(symbol);
        if (stockDetail.data["Note"]
            || !Object.keys(stockDetail.data).length
            || stockPrice.data["Note"]
            || !Object.keys(stockPrice.data).length) {
            setShowDropdown(false);
            setShowError(true);
        }
        else {
            dispatch(getStockData(stockDetail.data));
            dispatch(getStockPrice(stockPrice.data));
            dispatch(savePreviousPrice(stockPrice.data));
            dispatch(savePrevious(stockDetail.data));
            setShowDropdown(false);
            setShowError(false);
        }
    }

    return(
        <>
            <Search search={debounce((val) => onSearch(val), 1000)} submit={(val) => onSubmit(val)}/>
            {showDropdown && <Dropdown onSelect={(val) => onSubmit(val)} />}
            {showError && <div className="error"> *** Stock Not Found *** </div>}
        </>
    )
}
