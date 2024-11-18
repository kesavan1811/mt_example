// src/components/LoginPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import "./login.css";
import { useAuth } from "../../Auth/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);

  const { login } = useAuth();

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = values => {
    const { username, password } = values;
    if (username === "eve.holt@reqres.in" && password === "cityslicka") {
      const userInfo = { name: username };
      login(userInfo);
      navigate("/dashboard");
    } else {
      setError("Invalid credentials, please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    if (username === "eve.holt@reqres.in" && password === "cityslicka") {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="login-container">
      <Form
        name="login"
        initialValues={{
          remember: true
        }}
        style={{
          maxWidth: 360
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!"
            }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!"
            }
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
