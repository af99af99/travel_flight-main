import React, { useState } from "react";
import { flightDataContext } from "./../../context/context";
import FlightData from "src/data/flightData.json";
import { useParams } from "react-router-dom";
import Location from 'src/data/location.json';


const DataContextMaster = ({ children }) => {
    const { id } = useParams();
    // const [data, setData] = useState({
    //     // flightData: id !== undefined ? FlightData[parseInt(id)] : FlightData[0],
    //     from: {
    //         value: Location[0]?.city || "",
    //         smvalue: Location[0]?.airport_name || "",
    //     },
    //     to: {
    //         value: "",
    //         smvalue: "",
    //     },
    //     departure_date: "",
    //     return_date: "",
    //     travelers: {},
    // });

    // const [data, setData] = useState({
    //     from: {
    //         value: "Chittagong",
    //         smvalue: "Cox's Bazar"
    //     },
    //     to: {
    //         value: "Saidpur",
    //         smvalue: "Saidpur"
    //     },
    //     departure_date: [
    //         "2024-12-23",
    //         "Monday"
    //     ],
    //     return_date: [
    //         "2024-12-23",
    //         "Monday"
    //     ],
    //     travelers: {
    //         total_value: 4,
    //         class_value: "Economy",
    //         adults: 1,
    //         kids: 1,
    //         children: 1,
    //         infants: 1
    //     }
    // });


    const [data, setData] = useState({
        from: {
            value: "Chittagong",
            smvalue: "Cox's Bazar"
        },
        to: {
            value: "Saidpur",
            smvalue: "Saidpur"
        },
        departure_date: [
            "2024-12-23",
            "Monday"
        ],
        return_date: [
            "2024-12-23",
            "Monday"
        ],
        travelers: {}
    });

    return (
        <flightDataContext.Provider
            value={{ data, setData }}
            children={children}
        />
    );
};

export default DataContextMaster;
