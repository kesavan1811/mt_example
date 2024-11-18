import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Space } from "antd";
import InputField from "../Input/InputField";

const ModalUI = ({ modalTitle, openModal, closeModal, onSubmit, userData }) => {
  const [form] = Form.useForm();

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      url: "${label} is not a valid URL",
      number: "${label} is not a valid number!"
    },
    number: {
      range: "${label} must be between ${min} and ${max}"
    }
  };

  useEffect(
    () => {
      if (openModal) {
        form.resetFields();
        if (userData) {
          form.setFieldsValue(userData);
        }
      }
    },
    [openModal, userData, form]
  );

  const onFinish = values => {
    onSubmit(values);
  };

  return (
    <Modal title={modalTitle} open={openModal} footer={null} closeIcon={null}>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        validateMessages={validateMessages}
        size="large"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        initialValues={userData || {}}
      >
        <InputField
          name="first_name"
          label="First Name"
          placeholder="Please enter first name"
          rules={{ type: "text", required: "true" }}
        />
        <InputField
          name="last_name"
          label="Last Name"
          placeholder="Please enter last name"
          rules={{ type: "text", required: "true" }}
        />

        <InputField
          name="email"
          label="Email"
          placeholder="Please enter email"
          rules={{ type: "email", required: "true" }}
        />

        <InputField
          name="avatar"
          label="Profile Image"
          placeholder="Please enter profile image link"
          rules={{ type: "url", required: "true" }}
        />
        <Form.Item>
          <Space style={{ display: "flex", justifyContent: "end" }}>
            <Button htmlType="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {userData ? "Update" : "Submit"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUI;
