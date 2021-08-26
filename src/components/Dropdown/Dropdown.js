import { React } from 'react';
import { useSelector } from "react-redux";
import "./Dropdown.css";

export const Dropdown = ({ onSelect }) => {
    const stockData = useSelector(state => state.stocks.stocks);

    const selectItem = (code) => {
        onSelect(code);
    }

    if (stockData.length) {
        return (
            <div className="dropdown">
                {
                    stockData.map((item, idx) => (
                        <div 
                            key={`${item["1. symbol"]}_${idx}`}
                            className="stock-item"
                            onClick={() => selectItem(item["1. symbol"])}
                        >
                            <div className="symbol"> 
                                {item["1. symbol"]}
                            </div>
                            <div>
                                {item["2. name"]}
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    } else return null;
}
