import apiUrl from '../const.js';

import { setToken } from "../redux/auth";
import {setDropDownLinks} from '../redux/navbar.js'
import {store} from '../redux/store.js';
import {roleAccess} from './access.js';
import { useSelector,dispatch } from 'react-redux';




export const getUserFromToken=async()=>{


    const token=localStorage.getItem('token');

    try {
        const headers = {
            'Content-Type': 'application/json',
            "Authorization":"Bearer "+token
        };
      
        const url=apiUrl+"auth.php";
    
          // Send the data to the API using fetch with the headers
          const response = await fetch(
            url,
            {
              method: 'GET',
              headers: headers,
            }
          );
  
        // Handle the response from the API
        const data = await response.json();
        store.dispatch(setToken(data));
        DropDownLinks();
        return true;
      } catch (error) {
        console.error("Error occurred:", error);
        return false;
      }
}

 const DropDownLinks=()=>{
    // store.dispatch(dropDownLinks(roleAccess[store.getState().authReducer.role]));
    const role=store.getState().authReducer.role;
  store.dispatch(setDropDownLinks(roleAccess[role]));

}