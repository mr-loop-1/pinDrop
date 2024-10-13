import Loading from "@/pages/Loading";
import { pingServer } from "api/auth";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Ping = () => {
  const [loading, setLoading] = useState(true);
  let serverDown = false;

  useEffect(() => {
    (async () => {
      try {
        const status = await pingServer();
        if (status == 200) {
          setLoading(false);
        } else {
          serverDown = true;
        }
      } catch (err) {
        serverDown = true;
        setLoading(false);
      }
    })();
  }, []);

  return loading ? <Loading /> : <Outlet />;

  // return loading ? (
  //   <ServerLoad />
  // ) : validUser ? (
  //   <Outlet context={validUser} />
  // ) : (
  //   <Navigate to="/login" />
  // );
};

export default Ping;
