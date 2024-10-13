import { fillUser } from "@/app/reducers/auth";
import Loading from "@/pages/loading";
import { pingUser } from "api/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser } from "../../api/user";

const RouteGuard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [validUser, setValidUser] = useState(false);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        if (localStorage.getItem("token")) {
          const localUser = JSON.parse(localStorage.getItem("user"));
          if (localUser) {
            setValidUser(() => true);
            setLoading(() => false);

            const user = await getUser();
            if (!user) {
              setValidUser(false);
            }
            if (user !== localUser) {
              dispatch(fillUser(user));
            }
          } else {
            const user = await getUser();
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(fillUser(user));
            setValidUser(() => true);
            setLoading(() => false);
          }
        } else {
          setLoading(() => false);
        }
      } catch (err) {
        setValidUser(() => false);
        setLoading(() => false);
      }
    })();
  }, [location.pathname]);

  return loading ? (
    <ServerLoad />
  ) : validUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default RouteGuard;
