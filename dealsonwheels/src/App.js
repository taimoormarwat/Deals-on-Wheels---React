import logo from "./logo.svg";
import "./App.css";

import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NewAd from "./components/NewAd";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/newad" exact element={<NewAd/>} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
