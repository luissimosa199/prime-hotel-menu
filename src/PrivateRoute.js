import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  
  const auth = () => {
    if(localStorage.getItem("token")){
      return true
    }
    return false
  };

  return auth() ? children : <Navigate to="/login"/>;
}

export default PrivateRoute;