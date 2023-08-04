import React from "react";
import { store } from "../redux/store";
import apiUrl from "../const";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import { sendRequest } from "../utils/request";

export default function AdminDash() {
  const [data, setData] = useState(null);

  const [modalMsg,setModalMsg]=useState('...');

  const [modalId,setModalId]=useState(null);

  const [modalButton,setModalButtton]=useState('Confirm');

  const fetchDataFromApi = async () => {
    const url = apiUrl + "ads.php?status=all";
    const token = store.getState().authReducer.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const jsonData = await response.json();
      if (jsonData.status) {
        setData(jsonData.ads);
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

  const changeStatus = (id) => {
    setModalId({'id':id.id,'status':id.status});
    const status=id.status;
    if(status==0){
        setModalMsg("Do you want to Approve this ad?");
    }else if(status==1){
        setModalMsg("Do you want to disapprove this ad?");
    }

    setShowModal(true);
  };

  // modal implementation

  const [showModal, setShowModal] = useState(false);

  const handleConfirm = async() => {

    setModalButtton('Saving...');

    const id=modalId['id'];
    let status=modalId['status'];
    if(status==0){
        status=1;
    }else if(status==1){
        status=0;
    }
    const url = apiUrl + "ads.php?id="+id+"&status="+status;


    const response=await sendRequest(url,'PATCH');

    if(response.status==200){
        fetchDataFromApi();
        setShowModal(false);
    }

    console.log(response);

    setModalButtton('Confirm');

  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="container my-3">
      {data && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Make</th>
              <th>Uploader</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.make}</td>
                <td>{item.uploader}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => changeStatus(item)}
                  >
                    {item.status === 1 ? "Approved" : "Pending"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="container my-3">
        {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
        <Modal
          show={showModal}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title="Confirm"
          message={modalMsg}
          buttonMsg={modalButton}
        />
      </div>
    </div>
  );
}
