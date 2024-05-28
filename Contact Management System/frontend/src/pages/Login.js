import { Form, Link } from "react-router-dom";
import { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import TostContext from "../context/TostContext";

const Login = () => {
  const { toast } = useContext(TostContext);
  const { loginUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Please enter the all required fields");
      return;
    }
    loginUser(credentials);
  };
  return (
    <div
      className="card mt-5 p-4 w-50 mx-auto"
      style={{ borderRadius: "15px" }}
    >
      <h3 className="card-title text-center">Login</h3>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            aria-describedby="passwordHelp"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="text-center">
          <input type="submit" value="Login" className="btn btn-primary mt-4" />
        </div>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
