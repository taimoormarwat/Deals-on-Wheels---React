import { useEffect } from "react";
import React, { useState } from "react";
import "../App.css";
import apiUrl from "../const.js";
import { useLocation } from "react-router-dom";

export default function ViewAd() {
  const location = useLocation();
  const [data, setData] = React.useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Define a function to fetch data from the API
  const fetchDataFromApi = async () => {
    if (location.state.id == undefined) {
      return null;
    }
    const url = apiUrl + "ads.php?id=" + location?.state.id;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      if (jsonData.status) {
        setData(jsonData.ads[0]);
      }
    } catch (error) {
      // Handle error if any
      console.error("Error fetching data:", error);
    }
  };

  // Call the fetchDataFromApi function when the component is loaded
  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const handleCarouselPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? data.images.split('|').length - 1 : prevIndex - 1));
  };

  const handleCarouselNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === data.images.split("|").length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      {data && (
        <React.Fragment>
          <center>
            <div className="container mt-5 w-50">
              <div id="images" className="carousel slide carousel-dark" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {data.images.split("|").map((imageUrl, index) => (
                    <div
                      className={`carousel-item ${index === activeIndex ? "active" : ""}`}
                      key={index}
                    >
                      <img
                        src={imageUrl}
                        className="d-block w-100"
                        alt={`Image ${index}`}
                        style={{ objectFit: "cover", height: "100%" }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#images"
                  data-bs-slide="prev"
                  onClick={handleCarouselPrev}
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                    style={{ filter: "invert(0%)" }}
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#images"
                  data-bs-slide="next"
                  onClick={handleCarouselNext}
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                    style={{ filter: "invert(0%)" }}
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </center>
          <div className="container mt-5">
            <div id="ad" className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <button
                  className="btn btn-primary"
                  style={{ float: "right" }}
                //   onClick={() => sendOffer(data)}
                >
                  Contact
                </button>
                <h6 className="card-text">Price: {data.price}</h6>
                <p className="card-text">{data.description}</p>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
