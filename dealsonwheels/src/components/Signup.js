import React, { useState } from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import apiUrl from '../const.js';
import {getUserFromToken} from  '../utils/auth.js';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate=useNavigate();

  const [selectedImage, setSelectedImage] = useState('');

  const previewDp = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Update the state with the data URL of the selected image
      };
      reader.readAsDataURL(file);
    }
  };

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const name = document.getElementById("name").value;
      const contact = document.getElementById("tel").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const user = {
        name,
        contact,
        email,
        password,
        img: selectedImage,
        role: "user",
      };

      console.log(user);

      // Send the data to the API using fetch
      const url=apiUrl+"auth.php";
      const response = await fetch(
        url,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      // Handle the response from the API
      const data = await response.json();
      if (data.status) {
        // Registration was successful
        console.log("Registration successful!");
        localStorage.setItem("token",data.jwt);
        getUserFromToken();
        navigate('/');
        window.location.reload();

      } else {
        // Registration failed
        console.log("Registration failed:", data.message);
        // Do something here like showing an error message to the user.
      }
    } catch (error) {
      console.error("Error occurred during sign up:", error);
    }
  };

  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center h-100">
        <div className="card w-75 mb-3">
          <div className="card-body text-center">
            <br />
            <h5 className="card-title">Sign Up</h5>
            <br />
            <form className="form-floating" id="signupform">
              <img
                id="profileImage"
                src={selectedImage==''?logo:selectedImage}
                className="round-image"
                alt="Profile Picture"
              />
              <br />
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={previewDp}
              />
              <br />
              <br />

              <div className="col-md">
                <div className="row">
                  <div className="col">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                      />
                      <label htmlFor="name">Name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating">
                      <input
                        type="tel"
                        className="form-control"
                        id="tel"
                        required
                      />
                      <label htmlFor="tel">Contact</label>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <div className="col-md">
                <div className="row">
                  <div className="col-md">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                      />
                      <label htmlFor="email">Email address</label>
                    </div>
                  </div>

                  <div className="col-md">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <input
                type="submit"
                onClick={signUp}
                className="btn btn-primary"
                name="signup"
                id="signup"
                value="Sign Up"
              />
            </form>
            <br />
            <p className="card-text">
              Already have an account?
              <Link to="/login">Log In</Link>
            </p>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
