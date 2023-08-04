import React from 'react';
import logo from '../logo.png';

export default function HomeLoading() {
  return (
    <div className="container my-3 mt-5">
      <div className="row">
        {/* Repeat the main div nine times */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-3 " style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div style={{ position: "relative", width: "40%" }}>
                  <div style={{ paddingBottom: "100%", height: 0 }}>
                    <img
                      src={logo}
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
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-6"></span>
                      <span className="placeholder col-8"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
