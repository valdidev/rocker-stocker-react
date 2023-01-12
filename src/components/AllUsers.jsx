import { useEffect, useState } from "react";
import { axiosGet, axiosPatch } from "../api/axios";
import { Spinner } from "../common/Spinner";
import { TbLock } from "react-icons/tb";
import "../index.css";
import axios from "axios";

export const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const modifyUserActiveStatus = (userId) => {
    setIsLoading(true);
    axiosPatch("user/active", userId)
      .then((data) => console.log(data))
      .finally(() => setFlag(!flag));
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      axiosGet("user/all", "").then((data) => {
        setUsers(data.data);
        setIsLoading(false);
      });
    } catch (error) {
      setUsers(null);
      setIsLoading(false);
      console.log(error);
    }
  }, [flag]);

  if (!users || isLoading) {
    return <Spinner />;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {/* <th>Id #</th> */}
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Position</th>
          <th>Active</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => {
          return (
            <tr key={user.id}>
              {/* <td data-label="id">{user.id}</td> */}
              <td data-label="name">{user.name}</td>
              <td data-label="email">{user.email}</td>
              <td data-label="phone">{user.phone}</td>
              <td data-label="position">
                {user.rolId === 1 ? "Manager" : "Employee"}
              </td>
              <td data-label="active">{user.isActive ? "Active" : "Block"}</td>
              <td data-label="action">
                <div
                  className="btn btn-info"
                  onClick={() => modifyUserActiveStatus(user.id)}
                >
                  <TbLock />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
