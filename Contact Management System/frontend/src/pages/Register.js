import { Form, Link } from "react-router-dom";
import { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import TostContext from "../context/TostContext";

const Register = () => {
  const { toast } = useContext(TostContext);
  const { registerUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("Please enter the all required fields");
      return;
    }
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };
  return (
    <div style={{ height: "700px" }}>
      <div
        className="card mt-5 p-4 w-50 mx-auto "
        style={{ borderRadius: "15px" }}
      >
        <h3 className="card-title text-center">Create Your Account</h3>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label mt-4">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              name="name"
              value={credentials.name}
              onChange={handleInputChange}
              required
              placeholder="Enter Name"
            />
          </div>
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
              required
              aria-describedby="emailHelp"
              placeholder="Enter email"
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
              required
              aria-describedby="passwordHelp"
              placeholder="Enter password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label mt-4">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleInputChange}
              required
              aria-describedby="passwordHelp"
              placeholder="Enter password"
            />
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="Register"
              className="btn btn-primary mt-4"
            />
          </div>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
