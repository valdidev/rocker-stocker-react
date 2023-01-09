import { useEffect, useState } from "react";
import { axiosGet } from "../api/axios";
import { Spinner } from "../common/Spinner";
import "../index.css";

export const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userLogged = JSON.parse(localStorage.getItem("RS_USER"));

  const userJwt = userLogged.jwt;

  useEffect(() => {
    try {
      setIsLoading(true);
      axiosGet("user/all", "", userJwt).then((data) => {
        setUsers(data.data);
        setIsLoading(false);
      });
    } catch (error) {
      setUsers(null);
      setIsLoading(false);
      console.log(error);
    }
  }, []);

  if (!users && isLoading) {
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
              <td data-label="position">{(user.rolId === 1) ? ('Manager') : ('Employee')}</td>
              <td data-label="active">{(user.isActive) ? ('Active') : ('Block')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
