import React, { useState } from 'react';

export default function NewAd() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      const promise = new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
      promises.push(promise);
      reader.readAsDataURL(file);
    }

    Promise.all(promises).then((fileArray) => {
      setSelectedFiles(fileArray);
    });
  };

  const postAd = async (event) => {
    event.preventDefault();
    try {
      const title = document.getElementById('title').value;
      const price = document.getElementById('price').value;
      const make = document.getElementById('make').value;
      const description = document.getElementById('description').value;

      const user = {
        title,
        price,
        make,
        description,
        images:selectedFiles
      };

      const headers = {
        'Content-Type': 'application/json',
        "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA4NzUwMzksImV4cCI6MTY5MDk2MTQzOSwiZGF0YSI6eyJuYW1lIjoiVGFpbW9vciIsImVtYWlsIjoidGFpbW9vckB4eXouY29tIiwiaW1nIjoiL1VzZXJzL211aGFtbWFkLnRhaW1vb3IvRGV2ZWxvcGVyL0FwaS9kZWFsc29ud2hlZWxzL21vZGVsLy4uL2ltYWdlcy82NGM3ODhkNTdmMzQ2LnBuZyIsInJvbGUiOiJ1c2VyIn19.rVPc3L-S9jo0Fea-Vzv8XURD6kIVK3tyQxv0Eza07J0"
    };
  
      // Send the data to the API using fetch with the headers
      const response = await fetch(
        'http://localhost:8888/Api/dealsonwheels/endpoints/ads.php/',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(user),
        }
      );


      const jsonData = await response.json();

      console.log(jsonData);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>New Ad</h2>
      <form encType="multipart/form-data" id="form" onSubmit={postAd}>
        <div className="row align-items-start">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="make" className="form-label">
                Make
              </label>
              <input
                type="text"
                className="form-control"
                id="make"
                name="make"
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="pictures" className="form-label">
            Select Pictures:
          </label>
          <input
            type="file"
            className="form-control"
            id="pictures"
            name="pictures[]"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div id="preview-container" className="preview-container">
          {selectedFiles.map((file, index) => (
            <img
              key={index}
              src={file}
              alt={`Preview ${index + 1}`}
              style={{ width: '100px', height: '100px', marginRight: '10px' }}
            />
          ))}
        </div>


        <button type="submit" className="btn btn-primary">
          Post Ad
        </button>
      </form>
    </div>
  );
}
