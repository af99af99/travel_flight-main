import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApiService from "src/services/useApiService";
import Notification from 'src/hooks/Notification';

const initialState = {
    airport_code: "",
    name: "",
    city: "",
    country_id: "",
    facilites: "",
};

const Airports = (props) => {
    const { id } = useParams();
    const numericId = id ? parseInt(id, 10) : null;
    const [formData, setFormData] = useState(initialState);
    const [notificationMessage, setNotificationMessage] = useState("");

    const route = {
        airports: "/airports",
        airline: "/airlines",
        country: "/countries",
    };

    const {
        data: airportsData,
        loading: airportsLoading,
        setLoading: setAirportsLoading,
        error: airportsError,
        fetchData: fetchAirportsData,
        createData: createAirportsData,
        updateData: updateAirportsData,
    } = useApiService();
    const { data: countryData, fetchData: fetchCountryData } = useApiService();

    props.page === "Edit" && (initialState.id = 0);

    useEffect(() => {
        // Fetch data when the component loads, only in Edit mode
        if (props.page === "Edit" && numericId) {
            initialState.id = "";
            const fetchGetData = async () => {
                try {
                    await fetchAirportsData(route.airports, numericId);
                } catch (err) {
                    console.error("Error fetching airline data:", err);
                }
            };
            fetchGetData();
        }

        fetchCountryData(route.country);
    }, [props.page, numericId, route.airports, route.country]);

       // Sync formData with data when data is available
        useEffect(() => {
            if (props.page === "Edit" && airportsData) {
                setFormData((prev) => ({
                    ...prev,
                    ...airportsData,
                }));
            }
        }, [airportsData, props.page]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setAirportsLoading(true);
        try {
            if (props.page === "Edit") {
                const updateItem = await updateAirportsData(
                    `${route.airports}/${numericId}`,
                    formData
                );
                setNotificationMessage("Update Successful");
            } else {
                const createdItem = await createAirportsData(
                    route.airports,
                    formData
                );
                setNotificationMessage("Create Successful");
                setFormData(initialState);
            }
        } catch (err) {
            console.error("Error creating item:", err);
        }
        setAirportsLoading(false);
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
                    Airport Details
                </h3>
                {airportsError && <p>{airportsError}</p>}

                {props.page === "Edit" && (
                    <div style={{ marginBottom: "15px" }}>
                        <label
                            style={{ display: "block", marginBottom: "5px" }}
                        >
                            Airport ID:
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
                        Airport Code:
                    </label>

                    <input
                        type="text"
                        name="airport_code"
                        value={formData.airport_code || ""}
                        onChange={handleChange}
                        maxLength={3}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    />
                </div>

                {["name", "city"].map((field) => (
                    <div key={field} style={{ marginBottom: "15px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "5px",
                            }}
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
                        name="country_id"
                        value={formData.country_id || ""}
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

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        Facilites:
                    </label>
                    <textarea
                        name="facilites"
                        value={formData.facilites}
                        onChange={handleChange}
                        rows="3"
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            resize: "none",
                        }}
                    ></textarea>
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
                    disabled={airportsLoading}
                >
                    {airportsLoading
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

export default Airports;
