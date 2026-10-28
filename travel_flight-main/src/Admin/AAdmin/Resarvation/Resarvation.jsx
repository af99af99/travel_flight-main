import React, { useState } from "react";

const Resarvation = () => {
  const [formData, setFormData] = useState({
    reservation_id: "",
    user_id: "",
    flight_id: "",
    seat_id: "",
    reservation_date: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation Data Submitted:", formData);
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
          Reservation Details
        </h3>

        {["reservation_id", "user_id", "flight_id", "seat_id"].map((field) => (
          <div key={field} style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              {field.replace("_", " ").toUpperCase()}:
            </label>
            <input
              type="number"
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
          <label style={{ display: "block", marginBottom: "5px" }}>Reservation Date:</label>
          <input
            type="datetime-local"
            name="reservation_date"
            value={formData.reservation_date}
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
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
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

export default Resarvation;
