import React, { useState } from "react";

const FilterPrice = () => {
    const [filterPriceValue, setFilterPriceValue] = useState({
        start_price: 4118,
        end_price: 4386,
        set_current_price: 4386,
    });

    const handleChange = (e) => {
        const { value } = e.target;
        setFilterPriceValue((prevData) => ({
            ...prevData,
            set_current_price: Number(value),
        }));
    };
    return (
        <div className="text-start">
            <h1 className="text-xl mb-4 font-medium">Price Range</h1>
            <input
                type="range"
                min={filterPriceValue.start_price}
                max={filterPriceValue.end_price}
                value={filterPriceValue.set_current_price}
                onChange={handleChange}
                className="range range-accent"
            />
            <h2 className="text-base mb-4 font-medium">{`${filterPriceValue.start_price} tk - ${filterPriceValue.set_current_price} tk`}</h2>
            <hr className="my-4" />
        </div>
    );
};

export default FilterPrice;
