import React, { useState } from "react";
import SunIcon from "src/assets/sunicon.svg?react";
import NightIcon from "src/assets/nighticon.svg?react";
import MorningIcon from "src/assets/morningicon.svg?react";

const FilterDepartTime = ({ departure_location }) => {
    const [data, setData] = useState({
        morning: { value: "", isChecked: false },
        noon: { value: "", isChecked: false },
        evening: { value: "", isChecked: false },
    });

    const btnData = {
        morning: {
            idName: "morning",
            value: "afterMorn",
            label: "Morning",
            start_time: "06:00",
            end_time: "11:59",
            total_hour: "6",
            icon: <MorningIcon className="fill-current w-[30px] h-[20px]" />,
        },
        noon: {
            idName: "noon",
            value: "afterNoon",
            label: "After Noon",
            start_time: "12:00",
            end_time: "17:59",
            total_hour: "6",
            icon: <SunIcon className="fill-current w-[30px] h-[20px]" />,
        },
        evening: {
            idName: "evening",
            value: "afterDusk",
            label: "Evening",
            start_time: "18:00",
            end_time: "23:59",
            total_hour: "6",
            icon: <NightIcon className="fill-current w-[30px] h-[20px]" />,
        },
    };

    const handleChange = (e) => {
        const { id, checked, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: {
                value: checked ? value : "",
                isChecked: checked,
            },
        }));
    };

    return (
        <div>
            <h1 className="text-start text-xl mb-4 font-medium">
                Departure time in {departure_location && departure_location}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Object.keys(btnData).map((key) => {
                    const {
                        idName,
                        value,
                        label,
                        start_time,
                        end_time,
                        total_hour,
                        icon,
                    } = btnData[key];
                    const isChecked = data[key]?.isChecked;

                    return (
                        <div
                            key={idName}
                            className={`time-option border-2 border-black w-[138px] p-[8px] mb-2 rounded-md cursor-pointer ${
                                isChecked ? "bg-teal-400" : ""
                            }`}
                        >
                            <label htmlFor={idName} className="cursor-pointer">
                                <input
                                    className="hidden"
                                    type="checkbox"
                                    id={idName}
                                    onChange={handleChange}
                                    value={value}
                                    checked={isChecked}
                                />
                                <div className="time-option-wrapper flex flex-col justify-center items-center text-center">
                                    {icon}
                                    <p className="mb-0 mt-2 font-bold text-xs">
                                        {label}
                                    </p>
                                    <p className="text-xs font-semibold mb-0">
                                        {`${start_time} - ${end_time} (${total_hour}h)`}
                                    </p>
                                </div>
                            </label>
                        </div>
                    );
                })}
            </div>
            <hr className="my-4" />
        </div>
    );
};

export default FilterDepartTime;
