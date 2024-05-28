import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <div className="jumbotron">
        <h3 className="display-4">
          Welcome {user ? user.name : "to the Contact Management System"}
        </h3>
        <p className="lead">
          Manage your contacts efficiently and keep your information up to date.
        </p>
        <hr className="my-4" />
        <p>
          This application allows you to add, view, and manage all your contacts
          in one place.
        </p>
        <p className="lead d-flex">
          <button
            className="btn btn-info btn-lg me-3"
            onClick={() => navigate("/mycontacts")}
          >
            View Contacts
          </button>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/create")}
          >
            Add New Contact
          </button>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Home;
