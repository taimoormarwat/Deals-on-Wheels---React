import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";

import { redirect } from "react-router-dom";

import { paths } from "./utils/paths";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NewAd from "./components/NewAd";
import { getUserFromToken } from "./utils/auth.js";
import ViewAd from "./components/ViewAd";
import UserDash from "./components/UserDash";
import AdminDash from "./components/AdminDash";
import Modal from "./components/Modal";
import Logout from "./components/Logout";


function App() {
  const [isUserFetched, setIsUserFetched] = useState(false);
  

  const allow=(path)=>{
    const role=store.getState().authReducer.role;
    const allowedpaths=paths[role];


    return (allowedpaths.includes(path));    
  }

  useEffect(() => {
    const fetchData = async () => {
      await getUserFromToken();
      setIsUserFetched(true);
    };
    fetchData();
  }, []);

  if (!isUserFetched) {
    // Return a loading screen or null while waiting for getUserFromToken to complete
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            {allow('/login') &&  <Route path="/login" exact element={<Login />} />}
            {allow('/signup') && <Route path="/signup" exact element={<Signup />} />}
            {allow('/newad') && <Route path="/newad" exact element={<NewAd />} />}
            {allow('/viewad') && <Route path="/viewad" exact element={<ViewAd />} />}
            {allow('/userdash') && <Route path="/userdash" exact element={<UserDash />} />}
            {allow('/admindash') && <Route path="/admindash" exact element={<AdminDash />} />}
            {allow('/logout') && <Route path="/logout" exact element={<Logout />} />}

            // Redirects
            {!allow('/newad') && <Route path="/newad" exact element={<Signup />} />}


          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
