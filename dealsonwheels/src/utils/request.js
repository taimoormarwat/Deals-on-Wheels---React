import { store } from "../redux/store";

export const sendRequest = async (url, type, data) => {
  const token = store.getState().authReducer.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  try {
    let response;
    if ((type == "POST" || type == "PUT")) {
      response = await fetch(url, {
        method: type,
        headers: headers,
        body: JSON.stringify(data),
      });
    } else {
      response = await fetch(url, {
        method: type,
        headers: headers,
      });
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    // Handle error if any
    console.error("Error fetching data:", error);
  }
};
