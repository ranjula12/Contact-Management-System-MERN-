// import { useContext } from "react";
// import { Outlet, Link } from "react-router-dom";
// import AuthContext from "../context/AuthContext";

// const Navbar = ({ title = "CMS" }) => {
//   const { user, setUser } = useContext(AuthContext);
//   return (
//     <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
//       <div className="container-fluid">
//         <li>
//           <Link to="/">
//             <a className="navbar-brand">{title}</a>
//           </Link>
//         </li>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarColor01"
//           aria-controls="navbarColor01"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarColor01">
//           <ul className="navbar-nav ms-auto">
//             {user ? (
//               <>
//                 <li className="nav-item">
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => {
//                       setUser(null);
//                       localStorage.clear();
//                     }}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link to="/login">
//                     <a className="nav-link">Login</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/register">
//                     <a className="nav-link">Register</a>
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import TostContext from "../context/TostContext";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ title = "CMS" }) => {
  const { toast } = useContext(TostContext);
  const { user, setUser } = useContext(AuthContext);
  const navigator = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    toast.success("loged out!");
    navigator("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          {title}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/mycontacts" className="nav-link">
                    All Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/create" className="nav-link">
                    Create Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
