import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApiService from "src/services/useApiService";
import Notification from "src/hooks/Notification";

const initialState = {
    reservation_id: "",
    first_name: "",
    last_name: "",
    passport_number: "",
    nationality: "",
};

const Passengers = (props) => {
    const { id } = useParams();
    const numericId = id ? parseInt(id, 10) : null;
    const [formData, setFormData] = useState(initialState);
    const [notificationMessage, setNotificationMessage] = useState("");

    const route = {
        passenger: "/passengers",
        country: "/countries",
    };

    const {
        data: passengerData,
        loading: passengerLoading,
        setLoading: setPassengerLoading,
        error: passengerError,
        fetchData: fetchPassengerData,
        createData: createPassengerData,
        updateData: updatePassengerData,
    } = useApiService();
    const { data: countryData, fetchData: fetchCountryData } = useApiService();

    props.page === "Edit" && (initialState.id = 0);

    useEffect(() => {
        // Fetch data when the component loads, only in Edit mode
        if (props.page === "Edit" && numericId) {
            initialState.id = "";
            const fetchGetData = async () => {
                try {
                    await fetchPassengerData(route.passenger, numericId);
                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            };
            fetchGetData();
        }
        const fetchCountries = async () => {
            try {
                console.log("Fetching countries from:", route.country);
                await fetchCountryData(route.country);
            } catch (err) {
                console.error("Error fetching country data:", err);
            }
        };
        fetchCountries();
    }, [props.page, numericId, route.passenger, route.country]);

    // Sync formData with data when data is available
    useEffect(() => {
        if (props.page === "Edit" && passengerData) {
            setFormData((prev) => ({
                ...prev,
                ...passengerData,
            }));
        }
    }, [passengerData, props.page]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPassengerLoading(true);
        try {
            if (props.page === "Edit") {
                const updateItem = await updatePassengerData(
                    `${route.passenger}/${numericId}`,
                    formData
                );
                setNotificationMessage("Update Successful");
            } else {
                const createdItem = await createPassengerData(
                    route.passenger,
                    formData
                );
                setNotificationMessage("Create Successful");
                setFormData(initialState);
            }
        } catch (err) {
            console.error("Error creating item:", err);
        }
        setPassengerLoading(false);
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                background: "linear-gradient(90deg, #f7f7f7, #e9f7f9)",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    width: "400px",
                }}
            >
                <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
                    Passenger Details
                </h3>

                {props.page === "Edit" &&
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Passenger ID:
                    </label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                        disabled
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    />
                </div>}
                

                {[
                    "reservation_id",
                    "first_name",
                    "last_name",
                    "passport_number",
                ].map((field) => (
                    <div key={field} style={{ marginBottom: "15px" }}>
                        <label
                            style={{ display: "block", marginBottom: "5px" }}
                        >
                            {field.replace("_", " ").toUpperCase()}:
                        </label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        />
                    </div>
                ))}

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Country:
                    </label>
                    <select
                        name="nationality"
                        value={formData.nationality || ""}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    >
                        <option value="" disabled>
                            --- Select Country ---
                        </option>
                        {Array.isArray(countryData) &&
                        countryData.length > 0 ? (
                            countryData.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.country_name}
                                </option>
                            ))
                        ) : (
                            <option disabled>Loading countries...</option>
                        )}
                    </select>
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Submit
                </button>
            </form>

            {notificationMessage && (
                <Notification message={notificationMessage} />
            )}
        </div>
    );
};

export default Passengers;
