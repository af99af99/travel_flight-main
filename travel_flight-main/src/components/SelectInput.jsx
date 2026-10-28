import React, { useEffect, useRef, useState } from "react";
import { toggleOverlay, handleClickOutside } from "src/utils/utilsButtonInput";
import Location from "src/data/location.json";
import SearchIcon from "src/assets/search.svg?react";
import OverlayItem from "src/components/SelectComp/LoationOverlayItem";
import useApiService from "src/services/useApiService";

const SelectInput = ({ label, style, onDataChange }) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isActive, setActive] = useState(false);
    const overlayRef = useRef(null);
    const buttonRef = useRef(null);

    const [selectData, setSelectData] = useState({
        value: Location[0].city,
        smvalue: Location[0].airport_name,
    });
    // const [location, setLocation] = useState(Location);

    const route = '/airportsindex'
    const {data, loading, setLoading, fetchData} = useApiService();

    useEffect(()=>{
        fetchData(route)
    },[route])

    const handleSelection = (item) => {
        const newSelection = {
            value: item.city,
            smvalue: item.name,
        };
        setSelectData(newSelection);
        setOverlayVisible(false);
        setActive(false);

        onDataChange(newSelection);
    };


    // Set up the event listener for clicks outside the overlay
    useEffect(() => {
        const handleOutsideClick = (event) =>
            handleClickOutside(
                event,
                overlayRef,
                buttonRef,
                setOverlayVisible,
                setActive
            );

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="field-wrapper">
            <div
                ref={buttonRef}
                className={`search-input-button w-fit h-fit text-gray-600 border-2 border-teal-700 rounded-xl pl-5 pr-5 py-3 cursor-pointer ${
                    isActive ? "bg-gray-100" : "bg-white"
                } ${style}`}
                onClick={() => toggleOverlay(setOverlayVisible, setActive)}
            >
                <div className="p-0 m-0 text-start">
                    <p>{label}</p>
                    <input
                        type="text"
                        className="focus:outline-none font-bold cursor-pointer bg-transparent"
                        value={selectData.value}
                        readOnly
                    />
                    <div>
                        <small>
                            <span>{selectData.smvalue}</span>
                        </small>
                    </div>
                </div>
            </div>

            {isOverlayVisible && (
                <div ref={overlayRef} className="overlay-styles w-80">
                    <div className="bg-white drop-shadow-2xl py-2 rounded-xl">
                        <div className="flex align-middle px-5 py-2 border-b-2 border-b-gray-400 text-black">
                            <div className="w-5 text-red-500 m-0 mr-3">
                                <SearchIcon className="fill-current" />
                            </div>
                            <input
                                type="text"
                                placeholder="Type for the airport name or airport code"
                                className="search-form w-full focus:outline-none placeholder:text-xs"
                            />
                        </div>
                        <div className="search-input-container text-gray-600 h-80 overflow-y-auto">
                            {data.map((item, index) => (
                                <OverlayItem
                                    key={index}
                                    item={item}
                                    onSelect={() => handleSelection(item)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SelectInput;
