import React from "react";

const FilterAirlines = ({ short_name, com_name, ticket_price }) => {
    return (
        <div className="text-start">
            <div className="flex justify-between align-middle">
                <label className="cursor-pointer label">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-success mr-2"
                        name={short_name}
                    />
                    <span className="label-text">{com_name}</span>
                </label>
                <p>BDT {ticket_price}</p>
            </div>
        </div>
    );
};

export default FilterAirlines;
