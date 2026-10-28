import React, { useContext, useEffect, useRef, useState } from "react";
import ImportentIcon from "src/assets/importent.svg?react";
import { handleClickOutside } from "src/utils/utilsButtonInput";
import DownArrowIcon from "src/assets/downarrow.svg?react";
import useApiService from "src/services/useApiService";
import { flightDataContext } from "src/context/context";

const PassengerForm = ({index, passengerData, onUpdatePassenger, passengerType}) => {
    const overlayRef = useRef(null);
    const buttonRef = useRef(null);
    const { data, setData } = useContext(flightDataContext);

    const route = { countries: "/countries" };
    const {
        data: countryData,
        loading,
        error,
        fetchData: fetchCountriesData,
    } = useApiService();

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isActive, setActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState(passengerData || {
        title: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        passport_number: "",
        passport_expiry: "",
        nationality: "",
        email: "",
        contact: "",
        age_type: "",
    });

    // Fetch Country Data
    useEffect(() => {
        const fetchGetData = async () => {
            try {
                await fetchCountriesData(route.countries);
            } catch (err) {
                console.error("Error fetching country data:", err);
            }
        };
        fetchGetData();
    }, [route.countries]);

    // Set default selected country and phone number
    useEffect(() => {
        if (countryData && countryData.length > 0) {
            setSelectedCountry(countryData[0]);
            setPhoneNumber(countryData[0]?.phone_code || "");
        }
    }, [countryData]);

    // Handle clicks outside the overlay
    useEffect(() => {
        const handleOutsideClick = (event) =>
            handleClickOutside(
                event,
                overlayRef,
                buttonRef,
                setDropdownOpen,
                setActive
            );

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // Handle phone number input change
    const handlePhoneNumberChange = (e) => {
        const inputValue = e.target.value;
        setPhoneNumber(inputValue);
        updateFormData('contact', e.target.value);
    };

    // Handle generic input changes
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        updateFormData(name, value)
    };

    const updateFormData = (key, value) => {
        const updatedData = { ...formData, [key]: value };
        setFormData(updatedData);
        onUpdatePassenger(index, updatedData);
    };

    // Filter countries for search
    const filteredCountries = Array.isArray(countryData)
        ? countryData.filter((country) =>
            country?.short_name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];   

    return (
        <div className="text-start bg-white rounded-lg py-10 shadow-xl">
            <div className="passenger-type flex items-center gap-5 px-5 py-4">
                <h1 className="text-2xl font-semibold">Traveler {index + 1}</h1>
                <div className="bg-blue-300 px-4 py-1 rounded">
                    <p className="text-sm">{passengerType.charAt(0).toUpperCase() + passengerType.slice(1).toLowerCase()}</p>
                </div>
                <p className="text-lg">Primary</p>
            </div>

            <hr className="my-4" />

            <div className="px-4 py-1">
                <h1 className="text-2xl font-semibold">
                    Personal Details ({passengerType.charAt(0).toUpperCase() + passengerType.slice(1).toLowerCase()})
                </h1>

                <div className="flex gap-2 my-4">
                    <div>
                        <input
                            type="text"
                            name="age_type"
                            className="hidden peer"
                            value={passengerType}
                            onChange={handleFieldChange}
                            hidden
                        />
                    </div>

                    {["Mr", "Mrs", "Ms"].map((title) => (
                        <div key={title}>
                            <input
                                type="radio"
                                name="title"
                                id={`for${title}_${index}`}
                                className="hidden peer"
                                value={title}
                                onChange={handleFieldChange}
                                required
                            />
                            <label
                                htmlFor={`for${title}_${index}`}
                                className="bg-white border rounded-lg px-2 py-2 w-fit peer-checked:bg-teal-700 peer-checked:text-white cursor-pointer"
                            >
                                {title}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {["first_name", "last_name", "date_of_birth"].map((field) => (
                        <label key={field} className="form-control w-full">
                            <p className="font-medium capitalize">
                                {field.replace(/_/g, " ") 
                                .replace(/([A-Z])/g, " $1")
                                .trim()}{" "} 
                                <span className="text-red-600">*</span>
                            </p>
                            <input
                                type={field === "date_of_birth" ? "date" : "text"}
                                name={field}
                                value={formData[field] || ""}
                                onChange={handleFieldChange}
                                placeholder={field}
                                className="input input-bordered w-full"
                                required
                            />
                        </label>
                    ))}
                    {["passport_number", "passport_expiry",  "nationality"].map((field) => (
                        <label key={field} className="form-control w-full">
                            <p className="font-medium capitalize">
                            {field.replace(/_/g, " ") 
                                .replace(/([A-Z])/g, " $1")
                                .trim()}{" "} 
                            </p>
                            <input
                                type={field === "passport_expiry" ? "date" : "text"}
                                name={field}
                                value={formData[field] || ""}
                                onChange={handleFieldChange}
                                placeholder={field}
                                className="input input-bordered w-full"
                            />
                        </label>
                    ))}
                </div>

                <div className="grid grid-flow-row grid-cols-2 gap-4 mt-6">
                {["email"].map((field) => (
                        <label key={field} className="form-control w-full">
                            <p className="font-medium capitalize">
                                {field.replace(/([A-Z])/g, " $1")} <span className="text-red-600">*</span>
                            </p>
                            <input
                                type={"text"}
                                name={field}
                                value={formData[field] || ""}
                                onChange={handleFieldChange}
                                placeholder={field}
                                className="input input-bordered w-full"
                                required
                            />
                        </label>
                    ))}
                {/* Contact Start */}
                <div className="form-control w-full">
                    <div className="flex justify-start items-center gap-2 mb-2">
                        <p className="font-medium">
                            Contact: <span className="text-red-600">*</span>
                        </p>
                    </div>
                    <div className="flex items-center border">
                        {/* Dropdown Button */}
                        <div className="relative">
                            <button
                                ref={buttonRef}
                                onClick={() => {
                                    setDropdownOpen(!dropdownOpen);
                                    setActive(!isActive);
                                }}
                                className={`flex items-center gap-1 p-2 rounded-s-md ${
                                    isActive ? "bg-slate-300" : ""
                                }`}
                            >
                                <span>{selectedCountry?.short_name}</span>
                                <DownArrowIcon className="fill-current w-3 ml-2" />
                            </button>

                            {/* Dropdown Content */}
                            {dropdownOpen && (
                                <div 
                                    ref={overlayRef}
                                    className="absolute z-10 mt-1 w-56 bg-white border rounded-md shadow-lg p-3"
                                >
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md mb-2"
                                        placeholder="Search country"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                    <ul className="max-h-40 overflow-y-auto">
                                        {filteredCountries.map((country) => (
                                            <li
                                                key={country.value}
                                                onClick={() => {
                                                    setSelectedCountry(country);
                                                    setPhoneNumber(
                                                        country.phone_code
                                                    );
                                                    setDropdownOpen(false);
                                                    setActive(false);
                                                    setSearchTerm("");
                                                }}
                                                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                                            >
                                                <span>{country.short_name}</span>
                                                <span>{country.country_name}</span>
                                                <span className="ml-auto text-gray-500">
                                                    {country.phone_code}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <input
                            type="text"
                            className="flex-grow p-2 rounded-e-md input input-bordered"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default PassengerForm;
