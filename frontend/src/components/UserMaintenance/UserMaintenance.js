"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./UserMaintenance.module.css";

function UserMaintenance() {
  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
  const userUrl = process.env.NEXT_PUBLIC_USERLIST_ROUTE;
  const [data, setData] = useState([]);

  // get all users from the database
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}${userUrl}`);
      const newData = response.data;

      if (!newData.error) {
        setData(newData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
    console.log("useEffect1 executed");
  }, []);

  // Filter the data into two arrays: one for admin users, and one for non-admin users
  const adminUsers = data.filter((user) => user.accessPermissions === "ADMIN");
  const nonAdminUsers = data.filter(
    (user) => user.accessPermissions !== "ADMIN"
  );

  const [currentPage, setCurrentPage] = useState(1); // default page number is 1
  const [usersPerPage] = useState(5); // default number of users per page is 5
  const [showPaginationButtons, setShowPaginationButtons] = useState(false);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = nonAdminUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalUsers = nonAdminUsers.length;
  const totalPageCount = Math.ceil(totalUsers / usersPerPage);

  useEffect(() => {
    const totalPageCount = Math.ceil(nonAdminUsers.length / usersPerPage);
    setShowPaginationButtons(totalPageCount > 1);
    console.log("useEffect2 executed");
  }, [nonAdminUsers]);

  // Create an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPageCount; i++) {
    pageNumbers.push(i);
  }

  // Search for users
  const [searchText, setSearchText] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchedUsers([]);
    } else {
      const filteredUsers = nonAdminUsers.filter((user) =>
        user.email.toLowerCase().includes(searchText.toLowerCase())
      );

      // 仅当过滤结果发生变化时才更新 searchedUsers
      if (JSON.stringify(filteredUsers) !== JSON.stringify(searchedUsers)) {
        setSearchedUsers(filteredUsers);
      }
    }
    console.log("useEffect3 executed");
  }, [searchText, nonAdminUsers, searchedUsers]);

  // Delete a user
  const handleDeleteUser = async (userId, userEmail) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete " + userEmail + "?"
    );

    if (!shouldDelete) {
      return;
    }
    try {
      const response = await axios.delete(`${apiUrl}${userUrl}/${userId}`);
      if (response.status === 204) {
        // Update the UI to reflect the deletion (remove the user from the 'data' state)
        toast.success("Success to delete !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        const updatedData = data.filter((user) => user._id !== userId);
        setData(updatedData);
      } else {
        toast.error("Error deleting user", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Error deleting user", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.error("Error deleting user:", error);
    }
  };

  const [adminCheckboxes, setAdminCheckboxes] = useState({});

  const handleSaveChanges = async () => {
    // admin table checkboxes
    const uncheckedAdmins = adminUsers.filter(
      (user) => adminCheckboxes[user._id]
    );

    const unAdmin = uncheckedAdmins.map((user) => ({
      _id: user._id,
      email: user.email,
      accessPermissions: "VIEW_CHART_ONLY",
    }));

    // non-admin table checkboxes
    const updatedNonAdminUsers = [];

    nonAdminUsers.forEach((user) => {
      const checkbox = document.getElementById(`nonAdminCheckbox_${user._id}`);
      const viewProfileCheckbox = document.getElementById(
        `nonAdminviewProfileCheckbox_${user._id}`
      );

      if (checkbox && viewProfileCheckbox) {
        if (
          checkbox.checked !== (user.accessPermissions === "ADMIN") ||
          viewProfileCheckbox.checked !==
            (user.accessPermissions === "VIEW_CHART_AND_BIO")
        ) {
          updatedNonAdminUsers.push({
            _id: user._id,
            email: user.email,
            accessPermissions: checkbox.checked
              ? "ADMIN"
              : viewProfileCheckbox.checked
              ? "VIEW_CHART_AND_BIO"
              : "VIEW_CHART_ONLY",
          });
        }
      }
    });

    // patch request
    const patchdata = [];
    patchdata.push(...unAdmin, ...updatedNonAdminUsers);

    try {
      const response = await axios.patch(`${apiUrl}${userUrl}`, patchdata);

      if (response.status === 200) {
        // Update the UI to reflect the changes
        toast.success("Success to change !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        // const updatedData = data.map((user) => {
        //   const updatedUser = patchdata.find(
        //     (patchdata) => patchdata._id === user._id
        //   );
        //   if (updatedUser) {
        //     return updatedUser;
        //   } else {
        //     return user;
        //   }
        // });
        // setData(updatedData);
        setData((prevData) => {
          // 计算新的数据
          const updatedData = prevData.map((user) => {
            const updatedUser = patchdata.find(
              (patchdata) => patchdata._id === user._id
            );
            if (updatedUser) {
              return updatedUser;
            } else {
              return user;
            }
          });

          return updatedData;
        });
      } else {
        toast.error("Failed to update admin status.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Failed to update admin status.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.error("Error updating admin status:", error);
    }
  };

  return (
    <>
      <div className={styles.singleline}>
        <div className={styles.title}>
          <h1>User Maintenance</h1>
          <h3>Manage user access and privileges</h3>
        </div>
        <div className={styles.titlebuttons}>
          <button
            type="button"
            className={styles.gobackbutton}
            onClick={() => handleSaveChanges()}
          >
            Save Changes
          </button>
          <button type="button" className={styles.gobackbutton}>
            <Link href="/family-tree">Go Back</Link>
          </button>
        </div>
      </div>

      <div className={styles.tablepart}>
        <h4>Administrators</h4>
        <table className={styles.table}>
          {/* Table headers */}
          <thead>
            <tr>
              <th>User</th>
              <th>Administrators</th>
              <th>Delete user</th>
            </tr>
          </thead>
          {/* Table body with dynamic data */}
          <tbody>
            {adminUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    onChange={() =>
                      setAdminCheckboxes((prevState) => ({
                        ...prevState,
                        [user._id]: !prevState[user._id],
                      }))
                    }
                  />
                </td>
                <td>
                  <button
                    className={styles.deletebutton}
                    onClick={() => handleDeleteUser(user._id, user.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Other users</h4>
        <input
          type="text"
          placeholder="Search users..."
          value={searchText}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue !== searchText) {
              setSearchText(newValue);
            }
          }}
          className={styles.searchInput}
        />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Administrators</th>
              <th>View Profile</th>
              <th>Delete user</th>
            </tr>
          </thead>
          {/* Table body with dynamic data */}
          <tbody>
            {searchedUsers.length > 0
              ? searchedUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>
                      <input
                        type="checkbox"
                        id={`nonAdminCheckbox_${user._id}`}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id={"nonAdminviewProfileCheckbox_" + user._id}
                        defaultChecked={
                          user.accessPermissions === "VIEW_CHART_AND_BIO"
                        }
                      />
                    </td>

                    <td>
                      <button
                        className={styles.deletebutton}
                        onClick={() => handleDeleteUser(user._id, user.email)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : currentUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>
                      <input
                        type="checkbox"
                        id={`nonAdminCheckbox_${user._id}`}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id={"nonAdminviewProfileCheckbox_" + user._id}
                        defaultChecked={
                          user.accessPermissions === "VIEW_CHART_AND_BIO"
                        }
                      />
                    </td>

                    <td>
                      <button
                        className={styles.deletebutton}
                        onClick={() => handleDeleteUser(user._id, user.email)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          {showPaginationButtons && (
            <>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.paginationButton}
              >
                Previous
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  className={number === currentPage ? styles.activePage : null}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPageCount}
                className={styles.paginationButton}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UserMaintenance;
