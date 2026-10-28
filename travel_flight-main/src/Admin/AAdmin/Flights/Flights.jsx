import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApiService from "src/services/useApiService";
import Notification from "src/hooks/Notification";

const initialState = {
    airline_id: "",
    flight_num: "",
    departure_airport_code: "",
    arrival_airport_code: "",
    departure_time: "",
    arrival_time: "",
    price: "",
    status: "",
};
const Flights = (props) => {
    const { id } = useParams();
    const numericId = id ? parseInt(id, 10) : null;
    const [formData, setFormData] = useState(initialState);
    const [notificationMessage, setNotificationMessage] = useState("");

    const route = {
        flight: "/flights",
        airline: "/airlines",
    };
    const {
        data,
        loading,
        setLoading,
        error,
        fetchData,
        createData,
        updateData,
    } = useApiService();
    const { data: airlineData, fetchData: fetchAirlineData } = useApiService();

    useEffect(() => {
        // Fetch data when the component loads, only in Edit mode
        if (props.page === "Edit" && numericId) {
            initialState.id = "";
            const fetchGetData = async () => {
                try {
                    await fetchData(route.flight, numericId);
                } catch (err) {
                    console.error("Error fetching flight data:", err);
                }
            };
            fetchGetData();
        }
    }, [props.page, numericId, route.flight]);
    useEffect(() => {
        fetchAirlineData(route.airline);
    }, []);
    // Sync formData with data when data is available
    useEffect(() => {
        if (props.page === "Edit" && data) {
            setFormData((prev) => ({
                ...prev,
                ...data,
            }));
        }
    }, [data, props.page]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (props.page === "Edit") {
                const updateItem = await updateData(
                    `${route.flight}/${numericId}`,
                    formData
                );
                setNotificationMessage("Update Successful");
            } else {
                const createdItem = await createData(route.flight, formData);
                setNotificationMessage("Create Successful");
                setFormData(initialState);
            }
        } catch (err) {
            console.error("Error creating item:", err);
        }
        setLoading(false);
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
                    width: "350px",
                }}
            >
                {error && <p>{error}</p>}
                <h3
                    style={{
                        textAlign: "center",
                        marginBottom: "15px",
                        fontSize: "18px",
                        fontWeight: "600",
                    }}
                >
                    Flight Information
                </h3>
                {props.page === "Edit" && (
                    <div style={{ marginBottom: "15px" }}>
                        <label
                            style={{ display: "block", marginBottom: "5px" }}
                        >
                            Flight ID:
                        </label>
                        <input
                            type="number"
                            name="id"
                            value={formData.id || ""}
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
                    </div>
                )}

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Airline Name:
                    </label>
                    <select
                        name="airline_id"
                        value={formData.airline_id}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    >
                        <option value="" disabled>--- Select Airlines ---</option>
                        {Array.isArray(airlineData) && airlineData.length > 0 ? (
                            airlineData.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {`${item.code} - ${item.name}`}
                                </option>
                            ))
                        ) : (
                            <option disabled>Loading countries...</option>
                        )}
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Flight Number:
                    </label>
                    <input
                        type="text"
                        name="flight_num"
                        value={formData.flight_num}
                        onChange={handleChange}
                        maxLength="20"
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Departure Airport Code:
                    </label>
                    <input
                        type="text"
                        name="departure_airport_code"
                        value={formData.departure_airport_code}
                        onChange={handleChange}
                        maxLength="3"
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Arrival Airport Code:
                    </label>
                    <input
                        type="text"
                        name="arrival_airport_code"
                        value={formData.arrival_airport_code}
                        onChange={handleChange}
                        maxLength="3"
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Departure Time:
                    </label>
                    <input
                        type="datetime-local"
                        name="departure_time"
                        value={formData.departure_time}
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

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Arrival Time:
                    </label>
                    <input
                        type="datetime-local"
                        name="arrival_time"
                        value={formData.arrival_time}
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

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Price:
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Status:
                    </label>
                    <select
                        name="status"
                        value={formData.status}
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
                            Select Status
                        </option>
                        <option value="1">Scheduled</option>
                        <option value="2">Delayed</option>
                        <option value="3">Canceled</option>
                        <option value="4">Completed</option>
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
                    disabled={loading}
                >
                    {loading
                        ? "Submitting..."
                        : props.page === "Edit"
                        ? "Edit"
                        : "Submit"}
                </button>
            </form>

            {notificationMessage && (
                <Notification message={notificationMessage} />
            )}
        </div>
    );
};

export default Flights;
