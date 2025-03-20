import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const [authState, setAuthState] = useState({ isLoading: true, user: null });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthState({ isLoading: false, user: { token } });
    } else {
      setAuthState({ isLoading: false, user: null });
    }
  }, []);

  return authState;
};

function PrivateRoute() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <h1>Loading...</h1>;
  }

  return auth.user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
