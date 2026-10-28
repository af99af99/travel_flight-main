import React, { useState } from "react";

const Posts = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    body: "",
    user_id: "",
    status: "",
    created_at: "",
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
    console.log("Post Data Submitted:", formData);
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
        <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Post Details</h3>
        {["id", "title", "body", "user_id"].map((field) => (
          <div key={field} style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>{field.replace("_", " ").toUpperCase()}:</label>
            <input
              type={field === "body" ? "textarea" : "text"}
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Created At:</label>
          <input
            type="datetime-local"
            name="created_at"
            value={formData.created_at}
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
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Posts;
