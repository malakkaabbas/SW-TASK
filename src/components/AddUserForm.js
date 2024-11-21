import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "Customer", // Default value for userType
    status: "Inactive", // Optional
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/users", formData);
      toast.success("User added successfully!");
      console.log("User created:", response.data); // Debugging

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        userType: "Customer",
        status: "Inactive",
      });
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to add user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Add User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userType" className="form-label">
            User Type
          </label>
          <select
            className="form-control"
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
