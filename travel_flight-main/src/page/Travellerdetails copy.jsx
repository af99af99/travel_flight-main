import React, { useContext, useState } from "react";
import {
    FaShieldAlt,
    FaCheckCircle,
    FaRegClock,
    FaSuitcase,
    FaRegTimesCircle,
    FaRegCheckCircle,
} from "react-icons/fa";
import PassengerInfo from "./layouts/PassengerInfo";
import { useNavigate, useParams } from "react-router-dom";
import SeatsChoose from "../components/SeatsChoose";
import { flightDataContext } from "src/context/context";

const TravellerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, setData } = useContext(flightDataContext);
    
    const [selectedBagProtection, setSelectedBagProtection] = useState("bagpc2");
    const [selectedBagProtectServ, setSelectedBagProtectServ] = useState("bagpcp1");
console.log(data);
    const [passengerDetails, setPessengerDetails] = useState([
        {
            name_title: "Mr",
            age_type: "Adult",
            pass_name: "Robin Hood",
            gender: "Male",
            dob: "17 October, 2000",
            country: "Bangladesh",
            email: "contact@example.com",
            phone: "8801555555557",
        },
        {
            name_title: "Mstr",
            age_type: "Child",
            pass_name: "Babu Lal",
            gender: "Male",
            dob: "17 October, 2020",
            country: "Bangladesh",
            email: "contact@example.com",
            phone: "56525646",
        },
    ]);


    const handelBagProtect = (e) => {
        setSelectedBagProtection(e.target.id);
    };
    const handleBagProtectServ = (e) => {
        setSelectedBagProtectServ(e.target.id);
    };

    const baggageServeice = ({index, serviceName, servicePrice, totalPrice, defaultChecked = false}) => {
        return (
            <label
                htmlFor={`bagpcp${index}`}
                className={`p-4 border rounded-lg cursor-pointer ${
                    selectedBagProtectServ === `bagpcp${index}`
                        ? "border-teal-700"
                        : "border-gray-300 hover:border-blue-500"
                }`}
            >
                <p className="text-base font-medium mb-2">
                    Bornze Service
                </p>

                <div className="flex gap-1 text-sm">
                    <FaRegCheckCircle className="text-gray-500 text-2xl mr-2" />
                    <div>
                        <p className="mb-1">{serviceName}</p>
                        <p className="text-slate-600">BDT <span className="text-black">
                            {`${parseInt(servicePrice).toLocaleString()}`}
                        </span></p>
                    </div>
                </div>
                <hr className="my-1" />

                <div className="label">
                    <input
                        type="radio"
                        id={`bagpcp${index}`}
                        name="bag_protect_serv"
                        value={""}
                        className="radio checked:bg-teal-700"
                        onChange={handleBagProtectServ}
                        defaultChecked={defaultChecked}
                    />
                    <p className="text-slate-600">BDT <span className="font-medium text-black">
                        {`${parseInt(totalPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </span></p>
                </div>
            </label>
        );
    };
console.log(data)
    return (
        <PassengerInfo>
            <div className="flex flex-col items-center text-start">
                <h1 className="text-center text-2xl font-bold my-3 text-primary">
                    Traveller Details
                </h1>

                {/* Traveler Details Section */}
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="max-w-2xl w-full mx-auto my-4 p-4 border border-gray-300 rounded-lg shadow-lg"
                    >
                        <h2 className="text-lg font-semibold text-white bg-primary px-4 py-2 rounded-t-lg">
                            Traveler {index + 1} ({item.age_type})
                        </h2>
                        <div className="p-4 bg-gray-50 rounded-b-lg">
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                                <p>
                                    <span className="font-medium">Name : </span>
                                    {`${item.passengers.title} ${item.passengers.first_name} ${item.passengers.last_name}`}
                                </p>
                                {/* <p>
                                    <span className="font-medium">
                                        Gender :{" "}
                                    </span>
                                    {item.gender}
                                </p> */}
                                <p>
                                    <span className="font-medium">
                                        Date of Birth :{" "}
                                    </span>
                                    {item.passengers.date_of_birth}
                                </p>
                                {/* <p>
                                    <span className="font-medium">
                                        Country :{" "}
                                    </span>
                                    {item.country}
                                </p> */}
                                {/* {item.age_type !== "Child" &&
                                    item.age_type !== "Kid" && (
                                        <>
                                            <p>
                                                <span className="font-medium">
                                                    Email :
                                                </span>{" "}
                                                {item.email}
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Phone Number :{" "}
                                                </span>
                                                {item.phone}
                                            </p>
                                        </>
                                    )} */}
                            </div>
                        </div>
                    </div>
                ))}

            <div className="choose-seats ">
                {/* Select Seats Section */}
                <h1 className="text-center text-2xl font-bold text-primary">
                    Select Seats
                </h1>
                <SeatsChoose />
            </div>

                {/* Add Ons Section */}
                <h1 className="text-center text-2xl font-bold text-primary">
                    Add Ons
                </h1>

                <div className="w-full mx-auto my-6 p-4 border border-gray-200 rounded-lg shadow-lg bg-white">
                    {/* <h2 className="text-red-500 text-sm font-semibold mb-2">
                        Add Ons
                    </h2> */}
                    <h3 className="text-lg font-semibold">
                        Baggage Protection
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Get Covered for Baggage Loss or Delay
                    </p>

                    {/* Icons and Description */}
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                        <div>
                            <FaRegClock className="mx-auto text-gray-500 text-2xl" />
                            <p className="font-medium text-sm mt-2">
                                Live Tracking
                            </p>
                            <p className="text-gray-500 text-xs">
                                Track your baggage up to 4 days after arrival
                            </p>
                        </div>
                        <div>
                            <FaCheckCircle className="mx-auto text-gray-500 text-2xl" />
                            <p className="font-medium text-sm mt-2">
                                No Proof Required
                            </p>
                            <p className="text-gray-500 text-xs">
                                No bills needed to claim compensation
                            </p>
                        </div>
                        <div>
                            <FaShieldAlt className="mx-auto text-gray-500 text-2xl" />
                            <p className="font-medium text-sm mt-2">
                                Guaranteed Payment
                            </p>
                            <p className="text-gray-500 text-xs">
                                Get your dues via insurance compensation
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-6">
                        Travel worry-free with our Baggage Coverage plans.
                        Select your preferred plan below and ensure your
                        belongings are protected
                        <span className="text-blue-500 cursor-pointer ml-1">
                            Learn More
                        </span>
                    </p>

                    {/* Plan Options with Equal Width */}
                    <div className="grid grid-flow-row grid-cols-3 gap-4 mb-6">
                        <label
                            htmlFor={`bagpc1`}
                            className={`p-4 border rounded-lg cursor-pointer ${
                                selectedBagProtection === "bagpc1"
                                    ? "border-teal-700 bg-teal-50"
                                    : "border-gray-300 hover:border-blue-500"
                            }`}
                        >
                            <div className="label">
                                <FaSuitcase className="text-gray-500 text-2xl mr-2" />

                                <input
                                    type="radio"
                                    id={`bagpc1`}
                                    name="bag_protection"
                                    value={""}
                                    className="radio checked:bg-teal-700"
                                    onChange={handelBagProtect}
                                />
                            </div>

                            <span
                                className={`font-medium text-sm ${
                                    selectedBagProtection === "bagpc1"
                                        ? "text-teal-700"
                                        : ""
                                }`}
                            >
                                Insure My Baggage With
                            </span>
                            <p className="text-gray-600 text-base font-medium">
                                Blue Ribbon Bags
                            </p>
                        </label>

                        <label
                            htmlFor={`bagpc2`}
                            className={`p-4 border rounded-lg cursor-pointer ${
                                selectedBagProtection === "bagpc2"
                                    ? "border-teal-700 bg-teal-50"
                                    : "border-gray-300 hover:border-blue-500"
                            }`}
                        >
                            <div className="label">
                                <FaRegTimesCircle className="text-gray-500 text-2xl mr-2" />
                                <input
                                    type="radio"
                                    id={`bagpc2`}
                                    name="bag_protection"
                                    value={""}
                                    className="radio checked:bg-teal-700"
                                    onChange={handelBagProtect}
                                    defaultChecked
                                />
                            </div>
                            <span
                                className={`font-medium text-sm ${
                                    selectedBagProtection === "bagpc2"
                                        ? "text-teal-700"
                                        : ""
                                }`}
                            >
                                I Do Not Require
                            </span>
                            {/* </div> */}
                            <p className="text-gray-600 text-base font-medium">
                                Baggage Protection
                            </p>
                        </label>
                    </div>

                    {/* Overaly Service section only active 'Blue Ribbon Bags'  */}
                    {selectedBagProtection === 'bagpc1' && 
                    <div className="mb-6">
                        <div className="label mt-6">
                            <h1 className="text-lg font-medium">
                                Select Plane
                            </h1>
                            <a className="link text-primary">
                                Terms & Conditions
                            </a>
                        </div>
                        <div className="grid grid-flow-row grid-cols-3 gap-4">
                            {baggageServeice({
                                index: 1,
                                defaultChecked: true,
                                serviceName: "Baggage Coverage",
                                servicePrice: 19000,
                                totalPrice: 95.00,
                            })}
                        </div>
                    </div>
                    }

                    {/* Footer with Buttons */}
                    <p className="text-xs text-gray-500 text-center mb-4">
                        By clicking book now or pay now options, I agree with
                        Flight Expert{" "}
                        <span className="text-blue-500 cursor-pointer">
                            Privacy Policy
                        </span>{" "}
                        and
                        <span className="text-blue-500 cursor-pointer ml-1">
                            Terms & Conditions.
                        </span>
                    </p>

                    <div className="flex gap-4 justify-center">
                        <button
                            className="px-4 py-2 border border-gray-400 rounded-md text-gray-600 text-sm hover:bg-gray-100"
                            onClick={() => navigate("/bookingsuccess")}
                        >
                            Book Now (Pay Later)
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-teal-500">
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </PassengerInfo>
    );
};

export default TravellerDetails;
