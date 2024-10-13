import react, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/hooks/use-toast";
import Menu from "@/components/menu/Menu";

function Home() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.userInfo);
  const folderId = location.pathname.slice(1);
  const [refetch, toggleRefetch] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const showToast = (toast, msg) => {
    toast({
      title: "Some Error Occured",
      description: msg,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  useEffect(async () => {
    try {
      const response = await getFolder(folderId);
      if (response.status != 200) {
        return showToast(toast, response.data.error || response.data.message);
      }
      setData(() => response.data);
      setLoading(() => false);
    } catch (error) {
      showToast(toast, error.message);
    }
  }, [refetch]);

  const addFolder = async (inputs) => {
    try {
      const response = await createFolder(folderId, inputs);
      if (response.status != 200) {
        return showToast(toast, response.data.error || response.data.message);
      }
      setLoading(() => true);
      toggleRefetch(() => (refetch ? false : true));
    } catch (error) {
      showToast(toast, error.message);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Header user />
      <Menu folderId data />
      <List data />
    </div>
  );
}

export default Home;
