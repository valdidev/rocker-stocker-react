import { useContext, useEffect, useState } from "react";
import { axiosDelete, axiosGet, axiosPatch } from "../../api/axios";
import { Spinner } from "../../common/Spinner/Spinner";
import { TbLock, TbLockOpen } from "react-icons/tb";
import { FaUserAltSlash, FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import usePagination from "../../hook/usePagination";
import { Pagination } from "../../common/Pagination/Pagination";
import { AuthContext } from "../../contexts/AuthContext2";
import "../../index.css";
import "./allUsers.css";

export const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const usersPerTable = 5;

  const { currentData, currentPage, maxPage, next, prev } = usePagination(
    users,
    usersPerTable
  );

  const paginatedUsers = currentData();

  const { user } = useContext(AuthContext);

  const modifyUserActiveStatus = (userId) => {
    setIsLoading(true);
    axiosPatch("user/active", userId, "", user?.jwt).then((data) =>
      console.log(data)
    );
    setIsLoading(false);
    setFlag(!flag);
  };

  const deleteUser = (userId) => {
    setIsLoading(true);
    axiosDelete("user/delete", userId, user?.jwt)
      .then((data) => console.log(data))
      .then(setFlag(!flag));
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

  const confirmToModifyActiveStatus = (user) => {
    let activityStatus = !user.isActive ? "ACTIVE" : "INACTIVE";
    let colorStatus = user.isActive ? "#FFC107" : "#198754";

    Swal.fire({
      title: user.email,
      text: `Do you want to change to ${activityStatus}?`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Change",
      confirmButtonColor: `${colorStatus}`,
      denyButtonText: "No",
      denyButtonColor: "#edede9",
    }).then((result) => {
      if (result.isConfirmed) {
        modifyUserActiveStatus(user.id);
      }
    });
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      axiosGet("user/all", "", user?.jwt).then((data) => {
        setUsers(data.data);
        setIsLoading(false);
      });
    } catch (error) {
      setUsers(null);
      setIsLoading(false);
    }
  }, [flag]);

  if (!users || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="tableContainer">
      <div className="containerTable">
        <table className="table box-shadow-rs">
          <thead>
            <tr className="bg-black-rs">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers?.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.rolId === 1 ? "Manager" : "Employee"}</td>
                  <td>{user.isActive ? "Active" : "Block"}</td>
                  <td>
                    <div className="btn btn-info mx-1">
                      <Link
                        to="/private/myprofile/edit"
                        state={{
                          editableProfile: {
                            name: user.name,
                            surname: user.surname,
                            phone: user.phone,
                            email: user.email,
                          },
                        }}
                      >
                        <FaUserEdit className="text-white" />
                      </Link>
                    </div>
                    <div
                      className={`btn ${
                        user.isActive ? "btn-success" : "btn-warning"
                      }`}
                      onClick={() => confirmToModifyActiveStatus(user)}
                    >
                      {user.isActive ? <TbLockOpen /> : <TbLock />}
                    </div>
                    <div
                      className="btn btn-danger mx-1"
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
      </div>
      {users.length > usersPerTable && (
        <Pagination
          currentPage={currentPage}
          maxPage={maxPage}
          next={next}
          prev={prev}
        />
      )}
    </div>
  );
};
