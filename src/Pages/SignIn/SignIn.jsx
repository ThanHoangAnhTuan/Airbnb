import { Button, Form, Input, Alert, Typography } from "antd";
import React, { useState } from "react";
import { Result } from "antd";
import api from "../../utils/config";
// import { Link } from "react-router-dom";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form] = Form.useForm();
  const [message, setMessage] = useState({ text: "", type: "success" });
  const [showAlert, setShowAlert] = useState(false);

  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    try {
      const response = await api.post("/auth/signin", values);
      // console.log(response);

      if (response.status === 200) {
        setMessage({
          text: "Đăng nhập thành công!",
          type: "success",
        });
        setShowAlert(true);
        setIsLoggedIn(true);
        setTimeout(() => {
          window.location.href = "/"; // Chuyển hướng đến trang đăng nhập
        }, 5000);
      } else if (response.status === 404) {
        throw new Error(response.data.message);
        // setMessage({ text: response.message, type: 'error' });
        // setShowAlert(true);
      }
    } catch (error) {
      console.log("Failed:", error);
      setMessage({
        text: "Đăng nhập thất bại!",
        type: "error",
      });
      setShowAlert(true);
    }

    form.resetFields();
  };

  if (isLoggedIn) {
    return (
      <Result
        status="success"
        title="Đăng nhập thành công!"
        subTitle="Chuyển hướng đến trang chủ trong giây lát..."

      />
    );
  }
  return (
    <div className="container">
      {showAlert && (
        <Alert
          message={message.text}
          type={message.type}
          showIcon
          closable
          onClose={() => setShowAlert(false)}
        />
      )}
      <Typography.Title
        style={{ textAlign: "center", paddingTop: "20px" }}
        level={2}
      >
        Đăng nhập
      </Typography.Title>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          margin: "auto",
          marginTop: 50,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email!",
            },
            {
              type: "email",
              message: "Email không hợp lệ!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <a className="ml-24" href="/register">
            Bạn chưa có tài khoản? Đăng ký ngay!
          </a>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
