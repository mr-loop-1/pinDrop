import react, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.userInfo);

  return <></>;
}

export default Home;
