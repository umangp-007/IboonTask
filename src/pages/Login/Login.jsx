import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { LoginSevices } from "../../services/login";

// username : arpit
// password :  Welcome@2024

const Login = () => {
  const navigate = useNavigate();

  const handlelogin = async (username, password) => {
    try {
      const data = await LoginSevices({ username, password });
      if (data) {
        navigate("/dashboard");
        localStorage.setItem("token", data.data.data.access);
        localStorage.setItem("user", JSON.stringify(data?.data?.data?.first_name + " " + data?.data?.data?.last_name));
      }
      console.log("🚀 ~ handlelogin ~ data:", data)
    } catch (error) {
      alert(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handlelogin(values.username, values.password);
    },
  });

  return (
    <div className="login-container">
      <h1>Doctor Management Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
