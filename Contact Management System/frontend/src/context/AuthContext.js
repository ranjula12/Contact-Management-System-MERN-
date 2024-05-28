import { createContext, useContext, useEffect, useState } from "react";
import TostContext from "./TostContext";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigator = useNavigate();
  const { toast } = useContext(TostContext);
  const location = useLocation();
  useEffect(() => {
    chectUserLogedIn();
  }, []);
  const [user, setUser] = useState(null);

  //check if user is logged in
  const chectUserLogedIn = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      // console.log(!result.error);

      if (!result.error) {
        // console.log("set user is called");
        setUser(result);
        console.log(result);
        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          setTimeout(() => {
            navigator("/", { replace: true });
          }, 500);
          navigator("/", { replace: true });
        } else {
          navigator(location.pathname ? location.pathname : "/");
        }
      } else {
        console.log(result.error);
        navigator("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //login request
  const loginUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        localStorage.setItem("token", result.authToken);
        setUser(result.user);
        console.log(result.user);
        toast.success(`logged in ${result.user.name}`);
        navigator("/", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //register request
  const registerUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        // console.log(result);
        toast.success("user register successfuly... longin to your account!");
        navigator("/login", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
