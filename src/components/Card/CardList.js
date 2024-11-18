import React from "react";
import "./cardList.css";
import { Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const CardLsit = ({ item, editUserModal, handleDeleteUser }) => {
  return (
    <div className="card">
      <div className="img-container">
        <img src={`${item.avatar}`} alt={item.first_name} class="card-img" />
      </div>

      <div className="card-content">
        <h2 className="card-title">
          {item.first_name}
        </h2>
        <p class="card-email">
          {item.email}
        </p>
      </div>
      <div className="action-container">
        <Button
          type="primary"
          shape="circle"
          icon={<EditFilled />}
          size="large"
          onClick={() => editUserModal(item.id)}
        />
        <Button
          color="danger"
          variant="solid"
          shape="circle"
          size="large"
          icon={<DeleteFilled />}
          onClick={() => handleDeleteUser(item.id)}
        />
      </div>
    </div>
  );
};

export default CardLsit;
