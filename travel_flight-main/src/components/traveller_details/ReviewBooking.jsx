import React, { useContext } from "react";
import useFlightData from "src/hooks/useFlightData";
import { flightDataContext } from "src/context/context";
import { useParams } from "react-router-dom";
import { getTime } from './../../utils/utilsDTFormet';

const ReviewBooking = () => {
    const { id } = useParams();
    const { data: contextData } = useContext(flightDataContext);
    const { flightData, loading } = useFlightData(id);

    if (loading) {
        return <div>Loading flight data...</div>;
    }

    if (!flightData) {
        return <div>Error: Flight data is not available.</div>;
    }

    return (
        <div className="card bg-white shadow-xl px-4 py-5 mb-5 rounded-xl">
            <div className="flex gap-5 px-7">
                <figure className="flex-none">
                    <img
                        className="w-[50px] rounded-full"
                        src="https://img.favpng.com/9/17/22/airplane-aircraft-aviation-logo-poster-png-favpng-J9PdkddGmnqazCTzCA1RjDaLP.jpg"
                        alt=""
                    />
                </figure>
                <div className="flex-grow font-bold">
                    <p className="font-normal text-start text-xs my-1">
                        {`${flightData.airline_name}`}
                    </p>
                    <p className="text-start">{`${flightData.c_short_name} | ${flightData.airline_code}`}</p>
                    <div className="flex items-center text-sm gap-5">
                        <p className="">Aircraft: {flightData.flight_num}</p>
                        <p className="">
                            Operated by: {flightData.c_short_name}
                        </p>
                    </div>
                </div>
                <p className="flex-none text-sm">{contextData.travelers.class_value || "Not found class"}</p>
            </div>

            <hr className="my-4" />
            <div className="flight-details text-start px-7">
                <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-subgrid gap-20">
                    <div className="depart">
                        <p className="text-xs text-gray-600">Depart</p>
                        <p className="text-base font-bold">
                            {getTime(flightData.departure_time, 'time')}
                        </p>
                        <p className="text-xs font-medium">
                            {getTime(flightData.departure_time, 'date')}
                        </p>
                        <p className="text-sm font-medium">
                            {flightData.departure_airport_code}
                        </p>
                        <p className="text-sm font-medium">
                            {flightData.departure_city}
                        </p>
                    </div>
                    <div className="duration">
                        <p className="text-sm">17 hours 55 minutes</p>
                        <div className="arrow-line">
                            <div className="line1"></div>
                            <div className="line2"></div>
                        </div>
                        <p className="text-sm">Non Stop</p>
                    </div>

                    <div className="arive">
                        <p className="text-xs text-gray-600">Arrive</p>
                        <p className="text-base font-bold">
                            {getTime(flightData.arrival_time, 'time')}
                        </p>
                        <p className="text-xs font-medium">
                            {getTime(flightData.arrival_time, 'date')}
                        </p>
                        <p className="text-sm font-medium">
                            {flightData.arrival_airport_code}
                        </p>
                        <p className="text-sm font-medium">
                            {flightData.arrival_city}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewBooking;
