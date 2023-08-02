import React, { useState } from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    // Perform validation: Check if email and password fields are not empty
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const user = {
        email,
        password,
      };

      // Send the data to the API using fetch
      const response = await fetch(
        "http://localhost:8888/Api/dealsonwheels/endpoints/auth.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      // Handle the response from the API
      const data = await response.json();
      if (data.status==200) {
        console.log("Login successful!");
        console.log(data.jwt);

      } else {
        console.log("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <>
      <div style={{ height: "90vh" }}>
        <div className="row justify-content-center align-items-center h-100">
          <div className="card w-25 mb-3">
            <div className="card-body text-center">
              <img src={logo} style={{ maxWidth: "200px" }} alt="..." />
              <h5 className="card-title">Welcome back!</h5>
              <form className="form-floating" id="loginForm">
                <br />
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <br />

                <input
                  type="submit"
                  onClick={handleLogin}
                  className="btn btn-primary"
                  name="loginButton"
                  id="loginButton"
                  value="Log In"
                />
              </form>
              <br />

              <p className="card-text">
                Don't have an account?<Link to="/signup">Sign Up</Link>
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
