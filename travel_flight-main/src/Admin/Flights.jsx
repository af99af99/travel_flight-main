import React, { useState } from "react";

const Flights = () => {
  const [formData, setFormData] = useState({
    flight_id: "",
    airline_id: "",
    flight_number: "",
    departure_airport_code: "",
    arrival_airport_code: "",
    departure_time: "",
    arrival_time: "",
    price: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
console.log(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
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

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Flight ID:</label>
          <input
            type="number"
            name="flight_id"
            value={formData.flight_id}
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
          <label style={{ display: "block", marginBottom: "5px" }}>Airline ID:</label>
          <input
            type="number"
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
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Flight Number:</label>
          <input
            type="text"
            name="flight_number"
            value={formData.flight_number}
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
          <label style={{ display: "block", marginBottom: "5px" }}>Departure Time:</label>
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
          <label style={{ display: "block", marginBottom: "5px" }}>Arrival Time:</label>
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
          <label style={{ display: "block", marginBottom: "5px" }}>Price:</label>
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
          <label style={{ display: "block", marginBottom: "5px" }}>Status:</label>
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
            <option value="scheduled">Scheduled</option>
            <option value="delayed">Delayed</option>
            <option value="canceled">Canceled</option>
            <option value="completed">Completed</option>
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
    </div>
  );
};

export default Flights;
