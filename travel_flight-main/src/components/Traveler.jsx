import React, { useContext, useEffect, useRef, useState } from "react";
import { flightDataContext } from "src/context/context";

const SelectInput = ({style, label, onDataChange}) => {
    const { data } = useContext(flightDataContext);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isActive, setActive] = useState(false);
    const overlayRef = useRef(null);
    const buttonRef = useRef(null);

    const [counters, setCounters] = useState({
        adults: data.travelers?.adults || 0,
        kids: data.travelers?.kids || 0,
        children: data.travelers?.children || 0,
        infants: data.travelers?.infants || 0,
    });

    
    const [selectData, setSelectData] = useState({
        total_value: data.travelers?.total_value || 0,
        class_value: data.travelers?.class_value || "Economy",
    });

    const classOptions = [
        { id: "econ", label: "Economy", value: "Economy" },
        { id: "premecon", label: "Premium Economy", value: "Premium Economy" },
        { id: "business", label: "Business", value: "Business" },
        { id: "fclass", label: "First Class", value: "First Class" },
    ];


    // Function to toggle overlay visibility
    const toggleOverlay = () => {
        setOverlayVisible((prevState) => !prevState);
        setActive((prevState) => !prevState);
    };

    const handleClickOutside = (event) => {
        if (
            overlayRef.current &&
            !overlayRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setOverlayVisible(false);
            setActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const total =
            counters.adults +
            counters.kids +
            counters.children +
            counters.infants;
        setSelectData((prevData) => ({
            ...prevData,
            ...counters,
            total_value: total,
        }));
    }, [counters]);

    useEffect(()=>{
        onDataChange(selectData);
    },[selectData]);

    const handleClassTypeChange = (e) => {
        setSelectData((prev) => ({
          ...prev,
          class_value: e.target.value,
        }));
    };
    
    const handleMouseDown = (e) => {
        e.preventDefault();
    };

    // Increment and decrement handlers for each category
    const handleIncrement = (counterType) => {
        setCounters((prev) => ({
            ...prev,
            [counterType]: prev[counterType] + 1,
        }));
    };

    const handleDecrement = (counterType) => {
        setCounters((prev) => ({
            ...prev,
            [counterType]: prev[counterType] > 0 ? prev[counterType] - 1 : 0,
        }));
    };


    const passengerCounter = ({
        label,
        agelimit,
        pass_count,
        counter_value,
    }) => {
        return (
            <div className="flex items-center justify-between px-5 py-2 gap-4">
                <div className="border-b-gray-400 text-black">
                    <h6 className="font-bold text-gray-400">{label}</h6>
                    <h6 className="text-black font-thin">{agelimit}</h6>
                </div>

                <div className="text-left">
                    <button
                        type="button"
                        className="btn btn-square text-primary"
                        onClick={() => handleIncrement(pass_count)}
                    >
                        {/* Increment Button Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </button>
                    <span className="text-primary -mt-4 font-bold text-xl ml-4 mr-4">
                        {counter_value}
                    </span>
                    <button
                        type="button"
                        className="btn btn-square text-primary"
                        onClick={() => handleDecrement(pass_count)}
                    >
                        {/* Decrement Button Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 12h14"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="relative">
            <div
                ref={buttonRef}
                className={`search-input-button text-gray-600 border-2 rounded-xl w-fit pl-5 pr-5 py-3 cursor-pointer border-teal-700 bg-white ${
                    isActive ? "bg-gray-100" : ""
                } ${style && style}`}
                onClick={toggleOverlay}
                onMouseDown={handleMouseDown}
            >
                <div className="p-0 m-0 text-start ">
                    <p>{label}</p>
                    <input
                        type="text"
                        className="focus:outline-none font-bold cursor-pointer bg-transparent"
                        value={`${selectData.total_value} Travelers`}
                        readOnly
                    />
                    <div>
                        <small>
                            <span>{selectData.class_value}</span>
                        </small>
                    </div>
                </div>
            </div>

            {isOverlayVisible && (
                <div ref={overlayRef} className="absolute z-[999999] left-0 xl:left-[-145px]">
                    <div className="bg-white drop-shadow-2xl py-2 w-[400px] rounded-xl">
                        <h6 className="font-bold text-start text-primary mb-3 px-5 py-4 border-b-2 border-b-gray-400">
                            Travelers
                        </h6>

                        <div className="search-input-container text-gray-600 h-80 overflow-y-auto">
                            {/* Adult Section */}
                            {passengerCounter({
                                label: "Adults",
                                agelimit: "12 years and above",
                                pass_count: "adults",
                                counter_value: counters.adults,
                            })}

                            {/* Children Section */}
                            {passengerCounter({
                                label: "Children",
                                agelimit: "5 years - under 12 years",
                                pass_count: "children",
                                counter_value: counters.children,
                            })}

                            {/* Kids Section */}
                            {passengerCounter({
                                label: "Kids",
                                agelimit: "2 years - under 5 years",
                                pass_count: "kids",
                                counter_value: counters.kids,
                            })}

                            {/* Infant Section */}
                            {passengerCounter({
                                label: "Infant",
                                agelimit: "Below 2 years",
                                pass_count: "infants",
                                counter_value: counters.infants,
                            })}

                            {/* boooooooking class step code */}
                            <h6 className="font-bold text-start text-primary mb-3 px-5 py-4 border-b-2 border-b-gray-400">
                                Booking class
                            </h6>

                            <div className="grid grid-flow-row grid-cols-2 gap-4 ml-4 pr-2 pb-4">
                                {classOptions.map((option, key) => (
                                    <label
                                        key={option.id}
                                        htmlFor={option.id}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            id={option.id}
                                            name="classType"
                                            type="radio"
                                            value={option.value}
                                            className="radio radio-success"
                                            onChange={handleClassTypeChange}
                                            defaultChecked={key === 0}
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectInput;
