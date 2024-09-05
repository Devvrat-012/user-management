import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SkeletonLoader from "../components/SkeletonLoader";

// Define the structure of a user object with detailed fields
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const UserDetail: React.FC = () => {
  // Extract 'id' from the URL parameters
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data based on 'id' when the component mounts or 'id' changes
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data); // Update state with user data
        setLoading(false);
      })
      .catch((_error) => {
        setError("Failed to fetch user details");
        setLoading(false);
      });
  }, [id]);

  // Display loading skeleton while data is being fetched
  if (loading) return <SkeletonLoader />;

  // Display error message if there was a problem fetching data
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      {/* Render user details if user data is available */}
      {user && (
        <div>
          <h1 className="text-2xl font-bold mb-4">User Details</h1>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Website:</strong> {user.website}
          </p>
          <p>
            <strong>Company:</strong> {user.company.name}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
          </p>
          {/* Link to go back to the home view */}
          <Link to="/" className="text-blue-500 mt-4 inline-block">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
