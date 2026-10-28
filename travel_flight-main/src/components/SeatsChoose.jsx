import React, { useState } from "react";

// Initial seats data
const initialSeats = {
    economy: [
        [
            { seat: "A1", available: true },
            { seat: "A2", available: true },
            { seat: "A3", available: true },
            { seat: "A4", available: true },
            { seat: "A5", available: true },
            { seat: "A6", available: true },
        ],
        [
            { seat: "B1", available: true },
            { seat: "B2", available: true },
            { seat: "B3", available: true },
            { seat: "B4", available: false },
            { seat: "B5", available: true },
            { seat: "B6", available: true },
        ],
        [
            { seat: "C1", available: true },
            { seat: "C2", available: true },
            { seat: "C3", available: true },
            { seat: "C4", available: false },
            { seat: "C5", available: true },
            { seat: "C6", available: true },
        ],
        [
            { seat: "D1", available: true },
            { seat: "D2", available: true },
            { seat: "D3", available: false },
            { seat: "D4", available: false },
            { seat: "D5", available: true },
            { seat: "D6", available: true },
        ],
        [
            { seat: "E1", available: true },
            { seat: "E2", available: true },
            { seat: "E3", available: false },
            { seat: "E4", available: true },
            { seat: "E5", available: false },
            { seat: "E6", available: true },
        ],
    ],
};

const SeatsChoose = () => {
    // Initialize seats state with a copy of initialSeats
    const [seats, setSeats] = useState(JSON.parse(JSON.stringify(initialSeats)));
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleCheckBox = (e) => {
        const seat = e.target.parentElement.querySelector(".seatsIcon");
        const text = seat.querySelector("p");
        const seatValue = e.target.value;
        
        // Create a copy of seats state to update
        const updatedSeats = { ...seats };

        // Loop through the rows and columns to find the seat to update
        for (let row of updatedSeats.economy) {
            const seatToUpdate = row.find((s) => s.seat === seatValue);
            if (seatToUpdate) {
                seatToUpdate.available = e.target.checked;
                break;
            }
        }

        // Update the seats state with the modified availability
        setSeats(updatedSeats);

        if (e.target.checked) {
            seat.querySelectorAll("div").forEach((div) => {
                div.classList.remove("bg-teal-700");
                div.classList.add("bg-teal-300");
            });
            text.classList.remove("text-white");
            text.classList.add("text-black");

            setSelectedSeats((prev) => [...prev, seatValue]);
        } else {
            seat.querySelectorAll("div").forEach((div) => {
                div.classList.remove("bg-teal-300");
                div.classList.add("bg-teal-700");
            });
            text.classList.remove("text-black");
            text.classList.add("text-white");

            setSelectedSeats((prev) =>
                prev.filter((seat) => seat !== seatValue)
            );
        }
    };

    return (
        <div className="bg-white shadow-2xl rounded-2xl px-2 py-4 w-full">
            {initialSeats.economy.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center mb-2">
                    {row.map((seatObj, colIndex) => {
                        const { seat, available } = seatObj;
                        let marginClass = "";
                        if (colIndex === 3) {
                            marginClass = "ml-8"; 
                        }

                        return (
                            <label
                                htmlFor={`seat-${rowIndex}-${colIndex}`}
                                key={`${seat}-${rowIndex}-${colIndex}`} // Ensure a unique key using seat and indices
                                className={`cursor-pointer ${marginClass} mr-2`}
                            >
                                <input
                                    type="checkbox"
                                    id={`seat-${rowIndex}-${colIndex}`}
                                    name="seats_selected"
                                    className="hidden"
                                    value={seat}
                                    onChange={handleCheckBox}
                                    disabled={!available} // Disable checkbox if not available
                                />

                                <div className="seatsIcon relative">
                                    <div
                                        className={`bg-teal-700 w-[30px] h-[15px] rounded-t-md ml-[5px] ${!available ? 'bg-gray-500' : ''}`}
                                    ></div>
                                    <div
                                        className={`bg-teal-700 w-[40px] h-[20px] rounded-md ${!available ? 'bg-gray-500' : ''}`}
                                    ></div>
                                    <p className={`text-white font-medium absolute top-[6px] left-[11px] ${!available ? 'text-gray-400' : ''}`}>
                                        {seat}
                                    </p>
                                </div>
                            </label>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default SeatsChoose;
