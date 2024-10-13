import { fillUser } from "@/store";
import Loading from "@/pages/Loading";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser } from "../../api/user";

const AuthGuard = () => {
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
            dispatch(fillUser(localUser));
            setValidUser(() => true);
            setLoading(() => false);

            // const user = await getUser();
            // console.log("🚀 ~ user:", user);
            // if (!user || !user.id) {
            //   setValidUser(false);
            // }
            // if (user !== localUser) {
            //   localStorage.setItem("user", JSON.stringify(user));
            //   dispatch(fillUser(user));
            // }
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
    <Loading />
  ) : validUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthGuard;
