import { useEffect } from "react";
import React from "react";
import "../App.css";

export default function Home() {
  const [data, setData] = React.useState(null);

  // Define a function to fetch data from the API
  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8888/Api/dealsonwheels/endpoints/ads.php/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(user),
        }
      );
      const jsonData = await response.json();
      if (jsonData.status) {
        setData(jsonData.ads);
        console.log(jsonData.ads);
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

  return (
    <div className="container my-3 mt-5">
      {/* <img src="http://localhost:8888/Api/dealsonwheels/images/64c90094d6132.png"/> */}
      <div className="row">
        {data &&
          data.map((ad, index) => (
            <div key={index} className="col-md-4">
              {ad ? (
                // Iterate over ads
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row g-0">
                    <div style={{ position: "relative", width: "40%" }}>
                      <div style={{ paddingBottom: "100%", height: 0 }}>
                        <img
                          src={
                            ad.images.includes("|")
                              ? ad.images.split("|")[0]
                              : ad.images
                          }
                          className="img-fluid rounded-start"
                          style={{
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                          }}
                          alt="Title"
                        />
                      </div>
                    </div>
                    <div style={{ width: "60%" }}>
                      <div className="card-body">
                        <h5 className="card-title">{ad.title}</h5>
                        <p className="card-text">Rs. {ad.price}</p>
                        <p
                          className="card-text"
                          style={{
                            overflow: "hidden",
                            display: "-webkit-flex",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {ad.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
