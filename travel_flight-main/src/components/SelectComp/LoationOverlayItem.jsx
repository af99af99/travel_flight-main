import React from "react";
import PlainIcon from "src/assets/plane.svg?react";

const LoationOverlayItem = ({ item, onSelect }) => {
    return (
        <div
            className="item px-3 py-2 flex cursor-pointer justify-between align-middle items-center hover:bg-slate-100"
            onClick={onSelect}
        >
            <div className="flex items-center">
                <div className="icon w-5 text-sm text-red-500 mr-3">
                    <PlainIcon className="fill-current" />
                </div>
                <div className="ms-1 p-0 text-left">
                    <p className="font-bold">
                        {item.city}, {item.countries_name}
                    </p>
                    <p className="text-xs">{item.name}</p>
                </div>
            </div>
            <p>{item.airport_code}</p>
        </div>
    );
};

export default LoationOverlayItem;
