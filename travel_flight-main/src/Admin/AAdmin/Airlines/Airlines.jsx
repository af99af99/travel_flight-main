import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApiService from "src/services/useApiService";
import Notification from "src/hooks/Notification";

const initialState = {
    name: "",
    country_id: "",
    code: "",
};
const Airlines = (props) => {
    const { id } = useParams();
    const numericId = id ? parseInt(id, 10) : null;
    const [formData, setFormData] = useState(initialState);
    const [notificationMessage, setNotificationMessage] = useState("");

    const route = {
        airline: "/airlines",
        country: "/countries",
    };
    
    const {
        data: airlinesData,
        loading: airlinesLoading,
        setLoading: setAirlinesLoading,
        error: airlinesError,
        fetchData: fetchAirlinesData,
        createData: createAirlinesData,
        updateData: updateAirlinesData,
    } = useApiService();
    const {
        data: countryData,
        fetchData: fetchCountryData,
    } = useApiService();

    useEffect(() => {
        // Fetch data when the component loads, only in Edit mode
        if (props.page === "Edit" && numericId) {
            initialState.id = "";
            const fetchGetData = async () => {
                try {
                    await fetchAirlinesData(route.airline, numericId);
                } catch (err) {
                    console.error("Error fetching airline data:", err);
                }
            };
            fetchGetData();
        }
        fetchCountryData(route.country);
    }, [props.page, numericId, route.airline, route.country]);

    // Sync formData with data when data is available
    useEffect(() => {
        if (props.page === "Edit" && airlinesData) {
            setFormData((prev) => ({
                ...prev,
                ...airlinesData,
            }));
        }
    }, [airlinesData, props.page]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAirlinesLoading(true);
        try {
            if (props.page === "Edit") {
                const updateItem = await updateAirlinesData(
                    `${route.airline}/${numericId}`,
                    formData
                );
                setNotificationMessage("Update Successful");
            } else {
                const createdItem = await createAirlinesData(
                    route.airline,
                    formData
                );
                setNotificationMessage("Create Successful");
                setFormData(initialState);
            }
        } catch (err) {
            console.error("Error creating item:", err);
        }
        setAirlinesLoading(false);
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
          {airlinesError && <p>{airlinesError}</p>}
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
                    Airline Details
                </h3>

                {props.page === "Edit" && (
                    <div style={{ marginBottom: "15px" }}>
                        <label
                            style={{ display: "block", marginBottom: "5px" }}
                        >
                            Airlines ID:
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
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
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
                        Code:
                    </label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
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
                    disabled={airlinesLoading}
                >
                    {airlinesLoading
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

export default Airlines;
// Airlines.defaultProps = {
//   page: "Edit",
// };
