import {
  Button,
  Form,
  Input,
  Select,
  Checkbox,
  Alert,
  Typography,
  DatePicker,
} from "antd";
import { useState } from "react";
import { Result } from "antd";
import api from "../../utils/config";
import { NavLink } from "react-router-dom";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const MobileRegister = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState({ text: "", type: "success" });
  const [showAlert, setShowAlert] = useState(false);

  const onFinish = async (values) => {
    try {
      const response = await api.post("/auth/signup", values);
      if (response.status === 200) {
        setMessage({
          text: "Đăng ký thành công! Hãy đăng nhập để tiếp tục.",
          type: "success",
        });
        setShowAlert(true);
        setTimeout(() => {
          window.location.href = "/signin"; // Chuyển hướng đến trang đăng nhập
        }, 5000);
      } else {
        setMessage({ text: "Có lỗi xảy ra.", type: "error" });
        setShowAlert(true);
        setTimeout(() => {
          window.location.href = "/register"; // Chuyển hướng đến trang đăng nhập
        }, 5000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage({ text: "Email đã tồn tại.", type: "error" });
        setShowAlert(true);
        setTimeout(() => {
          window.location.href = "/register"; // Chuyển hướng đến trang đăng nhập
        }, 5000);
      } else {
        setMessage({ text: "Có lỗi xảy ra.", type: "error" });
        setShowAlert(true);
        setTimeout(() => {
          window.location.href = "/register"; // Chuyển hướng đến trang đăng nhập
        }, 5000);
      }
    }

    form.resetFields();
  };

  if (showAlert) {
    return (
      showAlert && (
        <Result
          status={message.type}
          title={message.text}
          subTitle={
            message.type === "success"
              ? "Sẽ chuyển tới trang Sign in trong giây lát!"
              : "Vui lòng thử lại!"
          }
        />
      )
    );
  }
  return (
    <div className="container">
      <header>
        <nav className="flex items-center justify-between pt-5 px-10 pb-10">
          <div className="flex">
            <NavLink
              to="/"
              className="text-3xl text-pink-500">
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
        level={3}>
        Đăng kí tài khoản
      </Typography.Title>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          maxWidth: 400,
          margin: "20px",
          marginTop: 30,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          label="Username"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đăng nhập của bạn!",
            },
          ]}>
          <Input />
        </Form.Item>
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
          name="gender"
          label="Giới tính">
          <Select>
            <Select.Option value={true}>Nam</Select.Option>
            <Select.Option value={false}>Nữ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="birthday"
          label="Ngày sinh"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày sinh!",
            },
          ]}>
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
            {
              pattern: /^(0|\+84)\d{9}$/,
              message: "Số điện thoại không hợp lệ!",
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
              message: "Vui lòng nhập mật khẩu!",
            },
            {
              min: 6,
              message: "Mật khẩu phải chứa ít nhất 6 ký tự!",
            },
            {
              pattern: /^\S*$/,
              message: "Mật khẩu không được chứa khoảng trắng",
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm-password"
          label="Xác nhận"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Mật khẩu xác nhận không khớp!");
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="role"
          label="Vai trò"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn vai trò!",
            },
          ]}>
          <Select>
            <Select.Option value="user">Người dùng</Select.Option>
            <Select.Option value="admin">Quản trị viên</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Vui lòng đồng ý với điều khoản!")
                    ),
            },
          ]}>
          <Checkbox>
            I have read the <a href="/">agreement</a>
          </Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 17,
            span: 16,
          }}>
          <Button
            type="primary"
            htmlType="submit">
            Đăng kí
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MobileRegister;
