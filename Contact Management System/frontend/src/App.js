import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { TostContextProvider } from "./context/TostContext";
import CreateContact from "./pages/CreateContact";
import AllContact from "./pages/AllContact";
import EditeContact from "./pages/EditeContact";

const App = () => {
  return (
    <Router>
      <TostContextProvider>
        <AuthContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create" element={<CreateContact />} />
              <Route path="/mycontacts" element={<AllContact />} />
              <Route path="/edite/:id" element={<EditeContact />} />
            </Routes>
          </Layout>
        </AuthContextProvider>
      </TostContextProvider>
    </Router>
  );
};

export default App;
