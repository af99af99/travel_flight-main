import React, { useRef, useState } from "react";
import { getTodayDate, getNextDay, getDayOfWeek } from "src/utils/formetDate";

const DatePickupInput = ({ label, style, onDataChange }) => {
    const [selectedDate, setSelectedDate] = useState(getTodayDate());
    const [dayOfWeek, setDayOfWeek] = useState(getDayOfWeek(getTodayDate()));
    const [isActive, setActive] = useState(false);
    const dateInputRef = useRef(null);

    const handleChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date); // Update the selected date state
        setDayOfWeek(getDayOfWeek(date)); // Update the day of the week
        onDataChange([selectedDate, dayOfWeek]);
    };

    // Focus on the date input when the container div is clicked
    const handleContainerClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker(); // Trigger a click on the input
        }
    };

    return (
        <div
            className={`search-input-button w-fit text-gray-600 border-2 border-teal-700 rounded-xl h-fit pl-5 pr-5 py-3 cursor-pointer ${
                isActive ? "bg-gray-100" : "bg-white"
            } ${style}`}
            onClick={handleContainerClick}
        >
            <div className="p-0 m-0 text-start">
                <p>{label}</p>
                <input
                    type="date"
                    className="focus:outline-none font-bold cursor-pointer bg-transparent"
                    id="date"
                value={selectedDate}
                    ref={dateInputRef}
                    onChange={(event) => handleChange(event, setSelectedDate)}
                    min={getTodayDate()} // Set min to the next day
                />
                <div>
                    <small>
                        <span>{dayOfWeek}</span>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default DatePickupInput;
