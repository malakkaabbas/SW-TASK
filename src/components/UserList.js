import React, { useEffect, useState } from "react";
import api from "../api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.userType}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
