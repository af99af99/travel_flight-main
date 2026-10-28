import React, { useContext, useEffect, useState } from "react";
import DownArrow from "src/assets/downarrow.svg?react";
import FlightDetailsOverlay from "./FlightDetailsOverlay";
// import useFlightData from "src/hooks/useFlightData";
// import flightData from "src/data/flightData.json";
import { useNavigate } from "react-router-dom";
import useApiService from "src/services/useApiService";
import { getTime } from "src/utils/utilsDTFormet";
import { flightDataContext } from "../../context/context";

const FlightDetails = () => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(null);
    const { data, setData } = useContext(flightDataContext);
    
    const route = "/flightsdetails";
    const { data: flightData, loading, setLoading, error, fetchData: fetchFlightData } = useApiService();
    
    // Data Fatching area
    useEffect(() => {
        const fetchGetData = async () => {
            try {
                await fetchFlightData(route);
            } catch (err) {
                console.error("Error fetching flight data:", err);
            }
        };
        fetchGetData();
    }, [route]);

    const toggleDropDown = (key) => {
        setDropdown((prev) => (prev === key ? null : key));
    };

    const handelClickBookNow = (id) => {
        navigate(`/travelerentery/${id}`)
        setData((prev)=>({
            ...prev,
            flightID: id,
        }))
    }

    return (
        <>
            {Array.isArray(flightData) && flightData.length > 0 ? (
                flightData.map((f_data, key) => (
                    <div
                        key={key}
                        className="card bg-base-100 shadow-xl px-4 pb-6 pt-4 mb-8"
                    >
                        <div className="flight-details text-start">
                            <div className="grid grid-flow-row-dense grid-cols-6 grid-rows-subgrid gap-5">
                                <div className="text-start">
                                    <figure>
                                        <img
                                            className="w-[80px] rounded-full"
                                            src="https://img.favpng.com/9/17/22/airplane-aircraft-aviation-logo-poster-png-favpng-J9PdkddGmnqazCTzCA1RjDaLP.jpg"
                                            alt="Movie"
                                        />
                                    </figure>
                                    <p className="text-xs">
                                        {f_data.airline_name}
                                    </p>
                                </div>

                                <div className="depart">
                                    <p className="text-xs text-gray-600">
                                        Depart
                                    </p>
                                    <p className="text-base font-bold">
                                        {getTime(f_data.departure_time, "time")}
                                    </p>
                                    <p className="text-xs font-medium">
                                        {getTime(f_data.departure_time, "date")}
                                    </p>
                                    <p className="text-sm font-medium">
                                        {`${f_data.departure_city} (${f_data.departure_airport_code})`}
                                    </p>
                                </div>
                                <div className="duration">
                                    <p className="text-sm">
                                        17 hours 55 minutes
                                    </p>
                                    <div className="arrow-line">
                                        <div className="line1"></div>
                                        <div className="line2"></div>
                                    </div>
                                    <p className="text-sm">1 Stop via Dhaka</p>
                                </div>

                                <div className="arive">
                                    <p className="text-xs text-gray-600">
                                        Arive
                                    </p>
                                    <p className="text-base font-bold">
                                        {getTime(f_data.arrival_time, "time")}
                                    </p>
                                    <p className="text-xs font-medium">
                                        {getTime(f_data.arrival_time, "date")}
                                    </p>
                                    <p className="text-sm font-medium">
                                        {`${f_data.arrival_city} (${f_data.arrival_airport_code})`}
                                    </p>
                                </div>

                                <div className="price">
                                    <p className="text-xs text-gray-600">
                                        Depart
                                    </p>
                                    <p className="text-base font-bold">{`BDT ${f_data.price}`}</p>
                                </div>

                                <div className="text-end">
                                    <button
                                        className="btn bg-primary w-[110px] text-white text-sm hover:border-teal-700 hover:bg-white hover:text-teal-700"
                                        type="button"
                                        onClick={() => handelClickBookNow(f_data.id)} 
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                {/* {f_data.parref && ( */}
                                <span className="text-xs text-green-600 font-bold">
                                    Partially Refundable
                                </span>
                                {/* )} */}

                                <button
                                    className="flex text-primary font-bold"
                                    type="button"
                                    onClick={() => toggleDropDown(key)}
                                >
                                    Flight Details
                                    <DownArrow
                                        className={`fill-current w-5 ml-2 ${
                                            dropdown && "rotate-180"
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                        {dropdown === key && (
                            <div className="flight-details-overlay">
                                <FlightDetailsOverlay data={f_data} />
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default FlightDetails;
