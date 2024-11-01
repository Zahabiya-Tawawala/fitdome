import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Register = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
    // Registration logic here
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <Title level={2} style={{ color: "#1E1E2A", textAlign: "left" }}>
        Create Your Account
      </Title>

      <Form
        style={styles.form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={<Text style={styles.label}>Username</Text>}
          name="gmail"
          rules={[
            { required: true, message: "Please input your Gmail address!" },
            { type: "email", message: "Please enter a valid Gmail!" },
          ]}
        >
          <Input
            prefix={<UserOutlined style={styles.icon} />}
            placeholder="abcxyz@gmail.com"
            style={styles.input}
          />
        </Form.Item>

        <Form.Item
          label={<Text style={styles.label}>Gmail</Text>}
          name="phoneOrGmail"
          rules={[
            { required: true, message: "Please input your phone or Gmail!" },
          ]}
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

        <Form.Item
          label={<Text style={styles.label}>Confirm Password</Text>}
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={styles.icon} />}
            placeholder="Confirm Password"
            style={styles.input}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={styles.button}>
            Sign Up
          </Button>
        </Form.Item>

        <Text style={styles.footerText}>
          Already have an account? <a style={styles.linkColor} onClick={handleLogin}>Sign in</a>
        </Text>
      </Form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    color: 'var(--very-dark-blue-gray)',
  },
  button: {
    width: "100%",
    borderRadius: "8px",
    background: "var(--dark-grayish-purple)",
    borderColor: "var(--dark-grayish-purple)",
    color: "#fff",
  },
  footerText: {
    color: 'var(--very-dark-blue-gray)',
    marginTop: "20px",
  },
  linkColor: {
    color: 'var(--white)'
  },
};

export default Register;

// import React from "react";
// import { Form, Input, Button } from "antd";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import "./AuthPanelCss/Registration.css"; // Assuming custom styling for the gradient background and input borders.

// const Register = () => {
//   const navigate = useNavigate();

//   const onFinish = (values) => {
//     console.log("Success:", values);
//     // Add registration logic here
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div className="registration-container">
//       <h1>Create Your Account</h1>
//       <Form
//         name="register"
//         layout="vertical"
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//         className="registration-form"
//       >
//         <Form.Item
//           label="Gmail"
//           name="gmail"
//           rules={[
//             {
//               required: true,
//               type: "email",
//               message: "Please enter a valid Gmail address!",
//             },
//           ]}
//         >
//           <Input placeholder="abcxyz@gmail.com" />
//         </Form.Item>

//         <Form.Item
//           label="Phone or Gmail"
//           name="phoneOrGmail"
//           rules={[
//             {
//               required: true,
//               message: "Please enter your phone or email!",
//             },
//           ]}
//         >
//           <Input placeholder="abcxyz@gmail.com" />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please enter your password!",
//             },
//             {
//               min: 6,
//               message: "Password must be at least 6 characters!",
//             },
//           ]}
//         >
//           <Input.Password
//             placeholder="Enter password"
//             iconRender={(visible) =>
//               visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//             }
//           />
//         </Form.Item>

//         <Form.Item
//           label="Confirm Password"
//           name="confirmPassword"
//           dependencies={["password"]}
//           rules={[
//             {
//               required: true,
//               message: "Please confirm your password!",
//             },
//             ({ getFieldValue }) => ({
//               validator(_, value) {
//                 if (!value || getFieldValue("password") === value) {
//                   return Promise.resolve();
//                 }
//                 return Promise.reject(
//                   new Error("Passwords do not match!")
//                 );
//               },
//             }),
//           ]}
//         >
//           <Input.Password
//             placeholder="Re-enter password"
//             iconRender={(visible) =>
//               visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//             }
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             Sign Up
//           </Button>
//         </Form.Item>
//         <div className="register-footer">
//           <span>Already have an account?</span>
//           <Button
//             type="link"
//             onClick={() => navigate("/login")} // Redirect to login page we can also write it like this onClick={handleLogin}
//             style={{ paddingLeft: 5 }}
//           >
//             Sign In
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default Register;
