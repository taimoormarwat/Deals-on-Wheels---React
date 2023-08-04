import React from "react";
import { store } from "../redux/store";
import apiUrl from "../const";
import { useEffect } from "react";
import { useState } from "react";
import { sendRequest } from "../utils/request";

export default function UserDash() {
  const [data, setData] = useState(null);
  const [savingItemId, setSavingItemId] = useState(null);

  const fetchDataFromApi = async () => {

    const url =apiUrl + "ads.php?uploader=" + store.getState().authReducer.email;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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

  const deactivate=async(ad)=>{

    setSavingItemId(ad.id);

    const id=ad.id;
    let status=ad.status;
    if(status==0){
        status=1;
    }else if(status==1){
        status=0;
    }
    const url = apiUrl + "ads.php?id="+id+"&status="+status;


    const response=await sendRequest(url,'PATCH');

    if(response.status==200){
        fetchDataFromApi();
    }

    console.log(response);
    setSavingItemId(null);

  }

  const getButtonText=(item)=>{
    if(savingItemId==item.id){
      return 'Saving...';
    }else{
        return 'Deactivate';
    }
  }

  // Call the fetchDataFromApi function when the component is loaded
  useEffect(() => {
    fetchDataFromApi();
  }, []);
  return(
    <div className="container my-3">
      {data && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Make</th>
              <th>Status</th>
              <th>Deactivate</th>            
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.make}</td>
                <td>{item.status === 1 ? "Approved" : "Pending"}</td>
                <td>{item.status === 1 ? <button className="btn btn-primary" onClick={()=>deactivate(item)}>{getButtonText(item)}</button> : "Not Available"}</td>

              </tr>
            ))}
          </tbody>

        </table>
      
      )}
    </div>
  );
}
