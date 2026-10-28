import React from "react";
import HomeHero from "src/page/HomeSections/HomeHero";
import FlightDetails from "src/components/flight_details/FlightDetails";
import FlightFilter from "src/components/flight_details/FlightFilter";

const FlightChoose = () => {
    return (
        <div>
            <HomeHero />
            <div id="flight-choose-root">
                <div className="flex gap-10">
                    <div className="w-[360px]">
                        <FlightFilter />
                    </div>
                    <div className="grow w-[844px]">
                        <FlightDetails />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightChoose;
