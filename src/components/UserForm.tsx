import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Define the structure of a user object
interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Get the 'id' parameter from the URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data if 'id' is present
    if (id) {
      setLoading(true); // Set loading to true before fetching data
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          setUser(response.data); // Set user data from response
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch(() => {
          setError("Failed to fetch user");
          setLoading(false);
        });
    }
  }, [id]);

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    setLoading(true);

    if (id) {
      // Update user if 'id' is present
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
        .then(() => {
          navigate("/");
          setLoading(false); // Set loading to false after successful request
        })
        .catch(() => {
          setError("Failed to update user");
          setLoading(false);
        });
    } else {
      // Create user if 'id' is not present
      axios
        .post("https://jsonplaceholder.typicode.com/users", user)
        .then(() => {
          navigate("/");
          setLoading(false); // Set loading to false after successful request
        })
        .catch(() => {
          setError("Failed to create user");
          setLoading(false);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-md rounded"
    >
      {/* Form title: conditionally display 'Edit User' or 'Create User' */}
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit User" : "Create User"}
      </h1>

      {/* Display error message if any */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Input field for user's name */}
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={loading} // Disable input while loading
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Phone</label>
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
      </div>

      {/* Submit button: conditionally display 'Update' or 'Create' */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading} // Disable button while loading
      >
          {id ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default UserForm;
