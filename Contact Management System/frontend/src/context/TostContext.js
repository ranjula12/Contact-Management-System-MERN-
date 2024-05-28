import { createContext } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TostContext = createContext();

export const TostContextProvider = ({ children }) => {
  return (
    <TostContext.Provider value={{ toast }}>
      <ToastContainer autoClose={2000}></ToastContainer>
      {children}
    </TostContext.Provider>
  );
};

export default TostContext;
