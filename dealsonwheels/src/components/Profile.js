import React, { useEffect, useState } from "react";
import { sendRequest } from "../utils/request";
import apiUrl from "../const";
import logo from '../logo.png';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Function to fetch data from the PHP API
    const fetchData = async () => {
      const url = apiUrl + "auth.php";

      const response = await sendRequest(url, 'GET');
      console.log(response);

      if (response.status) {
        setProfileData(response.data);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (event) => {
    setProfileData({
      ...profileData,
      name: event.target.value,
    });
  };

  const handleContactChange = (event) => {
    setProfileData({
      ...profileData,
      contact: event.target.value,
    });
  };

  return (
    <div className="container mt-5">
      {profileData && (
        <div className="row justify-content-center align-items-center h-100">
          <div className="card w-75 mb-3">
            <div className="card-body text-center">
              <br />
              <h5 className="card-title">Profile</h5>
              <br />
              <form className="form-floating" id="profileForm">
                <img
                  id="profileImage"
                  src={profileData.img && profileData.img.length > 0 ? profileData.img : logo}
                  className="round-image"
                  alt="Profile Picture"
                />
                <br />
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  // onChange={(event) => previewProfileImage(event)}
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
                          value={profileData.name}
                          onChange={handleNameChange}
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
                          value={profileData.contact}
                          onChange={handleContactChange}
                        />
                        <label htmlFor="tel">Contact</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add other form elements and fields here */}
                {/* ... */}

                <br />
                <input
                  type="submit"
                  className="btn btn-primary"
                  name="signup"
                  id="signup"
                  value="Save"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
