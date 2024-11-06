import {React, useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../App.css";
import axios from "axios";

const { Title, Text } = Typography;
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

// FETCHING API 
const API_URL = "http://localhost:5001/auth/login";

async function loginUser(role, identifier, password) {
  try {
    const response = await axios.post(API_URL, {
      role,
      identifier,
      password,
    });
    console.log("login successfully", response.data);
    localStorage.setItem("token", response.data.token);

}catch (error) {
  console.error("login failed", error.response.data.message);
}
}



const Login = () => {

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div style={styles.container}>
      <Title level={2} style={{ color: "#1E1E2A", textAlign: "left" }}>
        Hello Sign in!
      </Title>

      <Form style={styles.form} layout="vertical">
        <Form.Item
          label={<Text style={styles.label}>Gmail</Text>}
          name="email"
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
          <Button type="primary" htmlType="submit" style={styles.button}>
            Sign In
          </Button>
        </Form.Item>

        <Text style={styles.footerText}>
          Don’t have an account? <a style={styles.linkColor} onClick={handleRegister}>Sign up</a>
        </Text>
      </Form>
    </div>
  );
};

const styles = {
  container: {
    // height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: '20px',
  },
  form: {
    backgroundColor: 'var( --cool-gray)',
    padding: '40px 20px',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  label: {
    color: 'var(--very-dark-blue-gray)',
    fontWeight: 'bold',
  },
  input: {
    borderRadius: '8px',
  },
  icon: {
    color: 'var(--very-dark-blue-gray)',
  },
  button: {
    width: '100%',
    borderRadius: '8px',
    background: 'var(--dark-grayish-purple)',
    borderColor: 'var(--dark-grayish-purple)',
    color: 'var(--white)',
  },
  footerText: {
    color: 'var(--very-dark-blue-gray)',
    marginTop: '20px',
  },
  linkColor: {
    color: 'var(--white)'
  }
};


export default Login;
