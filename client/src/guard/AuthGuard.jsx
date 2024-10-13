import { fillUser } from "@/app/reducers/auth";
import Sidebar from "@/components/sidebar";
import ServerLoad from "@/pages/server-load";
import { ReloadIcon } from "@radix-ui/react-icons";
import { pingUser } from "api/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";

const RouteGuard = () => {
  // const hasValidJwt = useOutletContext();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [validUser, setValidUser] = useState(false);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      console.log("here");
      try {
        if (localStorage.getItem("token")) {
          const localUser = JSON.parse(localStorage.getItem("user"));
          if (localUser && localUser.hasOwnProperty("email")) {
            const pingStatus = await pingUser({ email: localUser.email });
            if (pingStatus == 200) {
              dispatch(fillUser(JSON.parse(localStorage.getItem("user"))));
              setValidUser(() => true);
              setLoading(() => false);
            } else {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              setValidUser(() => false);
              setLoading(() => false);
            }
          } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setValidUser(() => false);
            setLoading(() => false);
          }
        } else {
          localStorage.removeItem("user");
          setValidUser(() => false);
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
