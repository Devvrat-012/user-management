import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SkeletonLoaderTable from "../components/SkeletonLoaderTable";
import SkeletonLoaderCard from "../components/SkeletonLoaderCard";

// Define the structure of a user object
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of users when the component mounts
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data); // Update state with the fetched data
        setLoading(false);
      })
      .catch((_error) => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  // Function to handle user deletion
  const handleDelete = (id: number) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((_response) => {
        setUsers(users.filter((user) => user.id !== id)); // Remove deleted user from state
      })
      .catch((_error) => {
        console.error("Failed to delete user"); // Log error if deletion fails
      });
  };

  // Function to navigate to user detail or edit page
  const handleRowClick = (id: number) => {
    navigate(`/user/details/${id}`);
  };

  // Show loading skeletons while data is being fetched
  if (loading) {
    return (
      <div className="py-4 md:px-4 px-1">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        {/* Display table skeleton for larger screens */}
        <div className="hidden md:block">
          <SkeletonLoaderTable />
        </div>
        {/* Display card skeleton for smaller screens */}
        <div className="block md:hidden">
          <SkeletonLoaderCard />
        </div>
      </div>
    );
  }

  // Display error message if there was a problem fetching data
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-4 md:px-4 px-1">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {/* Table view for larger screens */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user.id)} // Navigate to user detail on row click
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/user/${user.id}`}
                    onClick={(e)=> e.stopPropagation()}
                    className="mr-2 hover:bg-slate-200 rounded p-1 text-blue-500"
                  >
                    Update
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click event from propagating to table click
                      handleDelete(user.id)} // Handle user deletion
                    }
                    className="text-red-500 hover:bg-slate-200 rounded p-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for smaller screens */}
      <div className="block md:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm cursor-pointer hover:bg-gray-50"
            onClick={() => handleRowClick(user.id)} // Navigate to user detail on card click
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">{user.name}</h2>
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {user.email}
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              {user.phone}
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/user/${user.id}`}
                onClick={(e)=> e.stopPropagation()}
                className="text-blue-500 hover:bg-slate-200 rounded p-1"
              >
                Edit
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from propagating to card click
                  handleDelete(user.id); // Handle user deletion
                }}
                className="text-red-500 hover:bg-slate-200 rounded p-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
