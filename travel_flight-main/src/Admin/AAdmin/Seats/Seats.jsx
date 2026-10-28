import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useApiService from "src/services/useApiService";
import Notification from "src/hooks/Notification";

const initialState = {
    flight_id: "",
    seat_number: "",
    class: "",
    availability: "",
};

const Seats = (props) => {
    const { id } = useParams();
    const numericId = id ? parseInt(id, 10) : null;

    const [formData, setFormData] = useState(initialState);
    const [notificationMessage, setNotificationMessage] = useState("");

    const route = {
        seats: "/seats",
        class: "/flight/class",
        flight: "/flights",
        airline: "/airlines",
    };

    const {
        data: seatsData,
        fetchData: fetchSeatsData,
        createData: createSeatsData,
        updateData: updateSeatsData,
    } = useApiService();

    const { data: classData, fetchData: fetchClassData } = useApiService();

    const { data: flightData, fetchData: fetchFlightData } = useApiService();
    const { data: airlineData, fetchData: fetchAirlineData } = useApiService();

    props.page === "Edit" && (initialState.id = 0);

    // Fetch data if editing
    useEffect(() => {
        // Fetch data when the component loads, only in Edit mode
        if (props.page === "Edit" && numericId) {
            initialState.id = "";
            const fetchGetData = async () => {
                try {
                    await fetchSeatsData(route.seats, numericId);
                } catch (err) {
                    console.error("Error fetching airline data:", err);
                }
            };
            fetchGetData();
        }

        fetchFlightData(route.flight);
        fetchClassData(route.class);
        fetchAirlineData(route.airline);
    }, [props.page, numericId, route.seats]);

    // Sync formData with data when data is available
    useEffect(() => {
        if (props.page === "Edit" && seatsData) {
            setFormData((prev) => ({
                ...prev,
                ...seatsData,
            }));
        }
    }, [seatsData, props.page]);

    // Input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value, // Cast availability to a number
        }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (numericId) {
                await updateSeatsData(`${route.seats}/${numericId}`, formData);
                setNotificationMessage("Seat updated successfully!");
            } else {
                await createSeatsData(route.seats, formData);
                setNotificationMessage("Seat created successfully!");
                setFormData(initialState);
            }
        } catch (err) {
            setNotificationMessage("Error saving seat data.");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Seat Details
                </h3>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Flight Name:
                    </label>
                    <select
                        name="flight_id"
                        value={formData.flight_id || ""}
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
                            --- Select Flight ---
                        </option>

                        {Array.isArray(flightData) && flightData.length > 0 ? (
                            flightData.map((item) => {
                                // Find the matching airline name
                                const airline =
                                    airlineData &&
                                    airlineData.find(
                                        (airline) =>
                                            airline.id === item.airline_id
                                    );

                                return (
                                    <option key={item.id} value={item.id}>
                                        {`${
                                            airline ? airline.code : "Unknown"
                                        } - ${item.flight_num}`}
                                    </option>
                                );
                            })
                        ) : (
                            <option disabled>Loading Flight...</option>
                        )}
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Seat Number:
                    </label>
                    <input
                        type="text"
                        name="seat_number"
                        value={formData.seat_number || ""}
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

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Class:
                    </label>
                    <select
                        name="class"
                        value={formData.class || ""}
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
                            --- Select Class ---
                        </option>

                        {Array.isArray(classData) && classData.length > 0 ? (
                            classData.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.cl_name}
                                </option>
                            ))
                        ) : (
                            <option disabled>Loading Class Name...</option>
                        )}
                    </select>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Availability:
                    </label>
                    <select
                        name="availability"
                        value={formData.availability || ""}
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
                            --- Select Availability ---
                        </option>
                        <option value='1'>Available</option>
                        <option value='0'>Unavailable</option>
                    </select>
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Submit
                </button>

                {notificationMessage && (
                    <Notification message={notificationMessage} />
                )}
            </form>
        </div>
    );
};

export default Seats;
