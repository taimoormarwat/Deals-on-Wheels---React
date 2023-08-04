import { useEffect } from "react";
import React from "react";
import "../App.css";
import apiUrl from '../const.js';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomeLoading from "./HomeLoading";

export default function Home() {
  const [data, setData] = React.useState(null);
  const navigate=useNavigate();
  const [loading,setLoading]=React.useState();

  // Define a function to fetch data from the API
  const fetchDataFromApi = async () => {
    setLoading(true);
    const url=apiUrl+"ads.php";
    try {
      const response = await fetch(
        url,
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
      }
    } catch (error) {
      // Handle error if any
      console.error("Error fetching data:", error);
    }
    setLoading(null);
  };

  // Call the fetchDataFromApi function when the component is loaded
  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const showAd=(id)=>{
    navigate('/viewAd', { state: { id } });
    
  }

  return (
    <>
            {loading && <HomeLoading/>}

    <div className="container my-3 mt-5">
      <div className="row">
        {data &&
          data.map((ad, index) => (
            <div key={index} className="col-md-4">
              {ad ? (
                // Iterate over ads
                <div className="card mb-3 cardScale"  style={{ maxWidth: "540px"}} onClick={()=>showAd(ad.id)}>
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
                      <div className="card-body" >
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
    </>
  );
}
