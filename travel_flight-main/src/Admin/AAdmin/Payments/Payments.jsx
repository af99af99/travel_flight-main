import React, { useState } from "react";

const Payments = () => {
  const [formData, setFormData] = useState({
    payment_id: "",
    reservation_id: "",
    user_id: "",
    amount: "",
    payment_date: "",
    payment_method: "",
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
    console.log("Payment Data Submitted:", formData);
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
          Payment Details
        </h3>

        {["payment_id", "reservation_id", "user_id"].map((field) => (
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
          <label style={{ display: "block", marginBottom: "5px" }}>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
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
          <label style={{ display: "block", marginBottom: "5px" }}>Payment Date:</label>
          <input
            type="datetime-local"
            name="payment_date"
            value={formData.payment_date}
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
          <label style={{ display: "block", marginBottom: "5px" }}>Payment Method:</label>
          <select
            name="payment_method"
            value={formData.payment_method}
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
              Select Method
            </option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="paypal">PayPal</option>
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

export default Payments;
