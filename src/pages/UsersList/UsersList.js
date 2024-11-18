import React, { useEffect, useState } from "react";
import { Space, Table, Input, Button, Radio, Spin } from "antd";
import {
  TableOutlined,
  UnorderedListOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import "./userslist.css";
import CardLsit from "../../components/Card/CardList";
import ModalUI from "../../components/Modal/ModalUI";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser
} from "../../actions/userAction.js";
import { useAuth } from "../../Auth/AuthContext.js";

const UsersList = () => {
  const [data, setData] = useState(null);
  const [isTableView, setIsTableView] = useState("table");
  const [filteredData, setFilteredData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [userData, setUserData] = useState(null);

  const dispatch = useDispatch();
  const { loading, users, error } = useSelector(state => state);

  const { Search } = Input;

  const { user, logout } = useAuth();

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: imageUrl =>
        <img
          src={imageUrl}
          alt="image"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center"
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      align: "center"
    },
    {
      title: "Last Name",
      key: "last_name",
      dataIndex: "last_name",
      align: "center"
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: id =>
        <Space>
          <Button
            color="primary"
            variant="solid"
            onClick={() => editUserModal(id)}
          >
            Edit
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() => handleDeleteUser(id)}
          >
            Delete
          </Button>
        </Space>
    }
  ];

  useEffect(
    () => {
      dispatch(fetchUsers());
    },
    [dispatch]
  );

  useEffect(
    () => {
      setData(users.data);
      setFilteredData(users.data);
    },
    [users, isTableView]
  );

  // Handle search/filtering
  const onSearch = value => {
    const query = value.toLowerCase();
    const filtered = data.filter(
      item =>
        item.first_name.toLowerCase().includes(query) ||
        item.last_name.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
  };

  const toggleView = e => {
    setIsTableView(e.target.value);
  };

  // Modal show
  const showModal = () => {
    setUserData(null);
    setModalTitle("Create New User");
    setOpenModal(true);
  };

  // Modal close
  const closeModal = () => {
    setOpenModal(false);
  };

  // Handle form data after submission
  const handleFormSubmit = updatedData => {
    if (userData) {
      dispatch(updateUser(userData.id, updatedData));
    } else {
      dispatch(addUser(updatedData));
    }
    setOpenModal(false);
  };

  //Delete a user
  const handleDeleteUser = userId => {
    dispatch(deleteUser(userId));
  };

  const editUserModal = userId => {
    const user = users.data.find(user => user.id === userId);
    setUserData(user);
    setModalTitle("Edit User");
    setOpenModal(true);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <section className="filter-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Users</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <Search
              placeholder="Search"
              allowClear
              onSearch={onSearch}
              style={{
                width: 250
              }}
            />
            <Button type="primary" onClick={showModal}>
              Create User
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Radio.Group
            onChange={toggleView}
            value={isTableView}
            style={{
              marginBottom: 8
            }}
          >
            <Radio.Button value="table">
              <TableOutlined /> Table
            </Radio.Button>
            <Radio.Button value="card">
              <UnorderedListOutlined /> Card
            </Radio.Button>
          </Radio.Group>
        </div>
      </section>
      {isTableView === "table"
        ? <Table columns={columns} dataSource={filteredData} />
        : <div className="cards-container">
            {filteredData &&
              filteredData.map(item =>
                <CardLsit
                  key={item.id}
                  item={item}
                  editUserModal={() => editUserModal(item.id)}
                  handleDeleteUser={() => handleDeleteUser(item.id)}
                />
              )}
          </div>}
      <ModalUI
        modalTitle={modalTitle}
        openModal={openModal}
        closeModal={closeModal}
        onSubmit={handleFormSubmit}
        userData={userData}
      />
    </div>
  );
};

export default UsersList;
