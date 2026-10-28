import React, { useContext } from "react";
import { flightDataContext } from './../../context/context';
import { getTime } from "src/utils/utilsDTFormet";

const FlightDetailsOverlay = ({data}) => {
    return (
        <div className="border-primary text-start">
            <h1 className="border-b border-gray-200 px-4 py-2 font-bold text-base">{`${data.departure_city} to ${data.arrival_city}, ${getTime(data.departure_time, 'date')}`}</h1>
            <div className="p-4">
                {/* Overlay company details */}
                <div className="flex gap-5">
                    <figure>
                        <img
                            className="w-[50px] rounded-full"
                            src="https://img.favpng.com/9/17/22/airplane-aircraft-aviation-logo-poster-png-favpng-J9PdkddGmnqazCTzCA1RjDaLP.jpg"
                            alt=""
                        />
                    </figure>
                    <div className="font-bold">
                        <h1 className="text-base">
                            {`${data.airline_name}`}{" "}
                            <span className="font-normal">{`${data.c_short_name} | ${data.airline_code}`}</span>
                        </h1>
                        <p className="text-sm">Aircraft: {data.flight_num}</p>
                        <p className="text-xs">
                            Operated by: {data.c_short_name}
                        </p>
                        <p className="text-xs">{`data.flight_class`}</p>
                        <p className="text-xs">
                            Available Seats: {`data.available_seat`}
                        </p>
                    </div>
                </div>
                
                <hr className="my-4" />

                <div className="grid grid-flow-row-dense grid-cols-6 grid-rows-subgrid gap-5">
                    <div className="depart">
                        <p className="text-base font-bold">
                            {getTime(data.departure_time, 'time')}
                        </p>
                        <p className="font-medium text-xs text-secondary">
                            {getTime(data.departure_time, 'date')}
                        </p>
                        <p className="font-medium text-sm">{`${data.departure_airport_code}`}</p>
                        <p className="text-xs text-secondary">
                            Terminal: {data.departure_city}
                        </p>
                        <p className="text-xs text-secondary">
                            {data.departure_city}
                        </p>
                        <p className="text-xs text-secondary">{`${data.departure_city}, ${data.departure_c_name}`}</p>
                    </div>

                    <div className="duration text-center">
                        <p className="text-xs">17 hours 55 minutes</p>
                        <div className="arrow-line flex justify-center">
                            <div className="line1 w-24"></div>
                        </div>
                        <p className="text-xs">1 Stop via Dhaka</p>
                    </div>

                    <div className="arive">
                        <p className="text-base font-bold">
                            {getTime(data.departure_time, 'time')}
                        </p>
                        <p className="font-medium text-xs text-secondary">
                            {getTime(data.departure_time, 'date')}
                        </p>
                        <p className="font-medium text-sm">{`${data.arrival_airport_code}`}</p>
                        <p className="text-xs text-secondary">
                            Terminal: {data.arrival_city}
                        </p>
                        <p className="text-xs text-secondary">
                            {data.arrival_city}
                        </p>
                        <p className="text-xs text-secondary">{`${data.arrival_city}, ${data.arrival_c_name}`}</p>
                    </div>

                    <div className="baggage">
                        <p className="text-base font-bold">Baggage</p>
                        <p className="text-xs text-secondary">Adult</p>
                        <p className="text-xs text-secondary">Children</p>
                        <p className="text-xs text-secondary">Infant</p>
                    </div>

                    <div className="chackin">
                        <p className="text-bash font-bold">Check In</p>
                        <p className="text-xs text-secondary">{`20 Kg(s)`}</p>
                        <p className="text-xs text-secondary">{`20 Kg(s)`}</p>
                        <p className="text-xs text-secondary">{`20 Kg(s)`}</p>
                    </div>

                    <div className="cabin">
                        <p className="text-bash font-bold">Cabin</p>
                        <p className="text-xs text-secondary">{`7 Kg(s)`}</p>
                        <p className="text-xs text-secondary">{`7 Kg(s)`}</p>
                        <p className="text-xs text-secondary">{`7 Kg(s)`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightDetailsOverlay;
