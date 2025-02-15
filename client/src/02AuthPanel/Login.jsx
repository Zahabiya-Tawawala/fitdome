import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../App.css";
import axios from "axios";
// import { login } from "../../../server/controller/authController";

const { Title, Text } = Typography;

const LOGIN_API_URL = "http://localhost:5001/auth/login";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = (values) => {
    // accessing the form values here
    const { identifier, password } = values;

    // calling the login function with form values
    loginUser(identifier, password);

    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // this will login the user 
  const loginUser = async (identifier, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(LOGIN_API_URL, {
        identifier,
        password,
      });

      const { token, role } = response.data;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      if (role === "center_admin") {
        localStorage.setItem("centerId", response.data.centerId);
      }

      // redirect to the dashboard page based on role

      switch (role) {
        case 'center_admin':
          navigate("/center");
          break;
        case 'gym_admins':
          navigate("/gymadmin");
          break;
        case 'users':
          navigate("/user");
          break;
        default:
          navigate("/");
          break;
      }

      console.log("login successfully", response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div style={styles.container}>
      <Title level={2} style={{ color: "#1E1E2A", textAlign: "left" }}>
        Hello Sign in!
      </Title>

      {/*FORM START*/}
      <Form
        style={styles.form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={<Text style={styles.label}>Email</Text>}
          name="identifier"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined style={styles.icon} />}
            placeholder="abcxyz@gmail.com"
            style={styles.input}
          />
        </Form.Item>

        <Form.Item
          label={<Text style={styles.label}>Password</Text>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined style={styles.icon} />}
            placeholder="Password"
            style={styles.input}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={styles.button}
            loading={loading}
          >
            Sign In
          </Button>
        </Form.Item>

        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <a style={styles.linkColor} onClick={handleRegister}>
            {/* this will handle the navigation to regiester page*/}
            Sign up
          </a>
        </Text>
      </Form>
      {/*FORM END*/}
    </div>
  );
};

const styles = {
  container: {
    // height: '100vh',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // padding: '20px',
  },
  form: {
    backgroundColor: "var( --cool-gray)",
    padding: "40px 20px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  label: {
    color: "var(--very-dark-blue-gray)",
    fontWeight: "bold",
  },
  input: {
    borderRadius: "8px",
  },
  icon: {
    color: "var(--very-dark-blue-gray)",
  },
  button: {
    width: "100%",
    borderRadius: "8px",
    background: "var(--dark-grayish-purple)",
    borderColor: "var(--dark-grayish-purple)",
    color: "var(--white)",
  },
  footerText: {
    color: "var(--very-dark-blue-gray)",
    marginTop: "20px",
  },
  linkColor: {
    color: "var(--white)",
  },
};

export default Login;

// const onFinish = (values) => {
//   console.log("Success:", values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

// // FETCHING API
// const API_URL = "http://localhost:5001/auth/login";

// async function loginUser(role, identifier, password) {
//   try {
//     const response = await axios.post(API_URL, {
//       role,
//       identifier,
//       password,
//     });
//     console.log("login successfully", response.data);
//     localStorage.setItem("token", response.data.token);
//   } catch (error) {
//     console.error("login failed", error.response.data.message);
//   }
// }
