import { useEffect, useState } from "react";
import { axiosDelete, axiosGet, axiosPatch } from "../api/axios";
import { Spinner } from "../common/Spinner";
import { TbLock, TbLockOpen } from "react-icons/tb";
import { FaUserAltSlash } from "react-icons/fa";

import "../index.css";
import Swal from "sweetalert2";

export const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const modifyUserActiveStatus = (userId) => {
    setIsLoading(true);
    axiosPatch("user/active", userId).then((data) => console.log(data));
    setIsLoading(false);
  };

  const deleteUser = (userId) => {
    setIsLoading(true);
    axiosDelete("user/delete", userId).then((data) => console.log(data));
    setIsLoading(false);
  };

  const confirmToDeleteUser = (user) => {
    Swal.fire({
      title: user.email,
      text: "Do you want to delete the user?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#c1121f",
      denyButtonText: "No",
      denyButtonColor: "#edede9",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user.id);
      }
    });
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
  }, []);

  if (!users || isLoading) {
    return <Spinner />;
  }

  return (
    <table className="table">
      <thead>
        <tr>
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
              <td data-label="name">{user.name}</td>
              <td data-label="email">{user.email}</td>
              <td data-label="phone">{user.phone}</td>
              <td data-label="position">
                {user.rolId === 1 ? "Manager" : "Employee"}
              </td>
              <td data-label="active">{user.isActive ? "Active" : "Block"}</td>
              <td data-label="action">
                <div
                  className={`btn ${
                    user.isActive ? "btn-success" : "btn-warning"
                  }`}
                  onClick={() => modifyUserActiveStatus(user.id)}
                >
                  {user.isActive ? <TbLockOpen /> : <TbLock />}
                </div>
              </td>
              <td>
                <div
                  className="btn btn-danger"
                  onClick={() => confirmToDeleteUser(user)}
                >
                  <FaUserAltSlash />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
