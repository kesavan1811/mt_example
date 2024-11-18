import React from "react";
import { Button, Form, Input, Space } from "antd";

const InputField = ({ name, label, placeholer, rules }) => {
  const { required, type, min, max } = rules;
  return (
    <Form.Item
      name={name}
      label={label}
      size="large"
      placeholer={placeholer}
      rules={[
        {
          required: { required }
        },
        {
          type: `${type}`
        },
        {
          min: min,
          max: max
        }
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default InputField;
