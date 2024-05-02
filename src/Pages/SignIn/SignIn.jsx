import { Button, Form, Input, Alert, Typography } from "antd";
import { useState } from "react";
import { Result } from "antd";
import api from "../../utils/config";
import { NavLink, useNavigate } from "react-router-dom";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form] = Form.useForm();
  const [message, setMessage] = useState({ text: "", type: "success" });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await api.post("/auth/signin", values);
      if (response.status === 200) {
        setMessage({
          text: "Đăng nhập thành công!",
          type: "success",
        });
        console.log(response);
        setShowAlert(true);
        setIsLoggedIn(true);
        localStorage.setItem("user_id", response.data.content.token);
        setTimeout(() => {
          navigate("/")
        }, 2000);
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
      <header>
        <nav className="flex items-center justify-between pt-5 px-10 pb-10">
          <div className="flex">
            <NavLink
              to="/"
              className="text-4xl text-pink-500">
              <i className="fa-brands fa-airbnb"></i>
              <span> airbnb</span>
            </NavLink>
          </div>
        </nav>
      </header>
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
        level={2}>
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
        autoComplete="off">
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
          ]}>
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
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <NavLink
            className="ml-24"
            href="/register">
            Bạn chưa có tài khoản? Đăng ký ngay!
          </NavLink>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}>
          <Button
            type="primary"
            htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
