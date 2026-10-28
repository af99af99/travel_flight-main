import React, { useContext, useState, useEffect } from "react";
import PassengerFrom from "src/components/traveller_details/PassengerFrom";
import PassengerInfo from "./layouts/PassengerInfo";
import { useNavigate, useParams } from "react-router-dom";
import { flightDataContext } from "src/context/context";

const EnterTraverlDetails = () => {
    const { id } = useParams();
    const navigator = useNavigate();
    const { data, setData } = useContext(flightDataContext);

    const [passengers, setPassengers] = useState({});

    // Function to update passenger data
    const updatePassenger = (index, updatedData) => {
        setPassengers((prev) => ({
            ...prev,
            [index]: updatedData
        }));
    };

   
    const renderPassengers = () => {
        // Access the travelers data from `data.travelers`
        const travelers = data?.travelers || {
            adults: 0,
            children: 0,
            infants: 0,
            kids: 0,
            total_value: 0
        };

        const passengerTypes = [
            { type: 'adult', count: travelers.adults },
            { type: 'child', count: travelers.children },
            { type: 'infant', count: travelers.infants },
            { type: 'kid', count: travelers.kids },
        ];

        let passengerIndex = 0; // to ensure unique keys

        return passengerTypes.flatMap((passengerType) => {
            return Array.from({ length: passengerType.count }, (_, index) => (
                <PassengerFrom
                    key={passengerIndex++}
                    index={passengerIndex}
                    passengerData={passengers}
                    onUpdatePassenger={updatePassenger}
                    passengerType={passengerType.type} 
                />
            ));
        });
    };

    const handleSubmit = () => {
        console.log("Final Passenger Data:", passengers);
        // Handle form submission logic here
        setData((prev)=>({
            ...prev,
            passengers: passengers
        }));
        console.log("Final Context Data:", data);
        navigator(`/travelerdetails/${id}`)
    };

    return (
        <PassengerInfo flightID={id}>
            {renderPassengers()} {/* Dynamically render PassengerFrom components */}
            <button
                className="btn bg-primary text-white"
                onClick={handleSubmit}
            >
                Next
            </button>
        </PassengerInfo>
    );
};

export default EnterTraverlDetails;
