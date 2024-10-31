import React from "react";
import { Button, Input, Form, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Register = () => {
  return (
    <div style={styles.container}>
      <Title level={2} style={{ color: "#fff", textAlign: "left" }}>
        Hello <br /> Sign in!
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
          Don’t have an account? <a href="#">Sign up</a>
        </Text>
      </Form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'linear-gradient(45deg, #320033, #700020)',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  form: {
    backgroundColor: '#f5f5f5',
    padding: '40px 20px',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  label: {
    color: '#8b0000',
    fontWeight: 'bold',
  },
  input: {
    borderRadius: '8px',
  },
  icon: {
    color: '#8b0000',
  },
  button: {
    width: '100%',
    borderRadius: '8px',
    background: 'linear-gradient(45deg, #800020, #a00040)',
    borderColor: '#800020',
    color: '#fff',
  },
  footerText: {
    color: '#8b0000',
    marginTop: '20px',
  },
};

export default Register;
