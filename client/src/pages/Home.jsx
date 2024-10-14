import react, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/hooks/use-toast";
// import Menu from "@/components/menu/Menu";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { createFolder, deleteFolder, getFolder } from "api/folder";
import List from "@/components/list/List";
import Menu from "@/components/menu/Menu";
import { deleteFile, uploadFile } from "api/file";

function Home() {
  const { toast } = useToast();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const [refetch, toggleRefetch] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const showToast = (toast, msg) => {
    toast({
      variant: "destructive",
      title: "Some Error Occured",
      description: msg,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(() => true);
        const folderId = location.pathname.slice(1);
        const response = await getFolder({ folderId });
        if (response.status != 200) {
          return showToast(toast, response.data.error || response.data.message);
        }
        setData(() => response.data);
        setLoading(() => false);
      } catch (error) {
        showToast(toast, error.message);
      }
    })();
  }, [refetch, location.pathname]);

  const handleCreateFolder = async (inputs) => {
    try {
      const folderId = location.pathname.slice(1);
      const response = await createFolder({
        folderId,
        folderPath: data.folder.path,
        title: inputs.title,
      });
      if (response.status != 200) {
        return showToast(toast, response.data.error || response.data.message);
      }
      toggleRefetch(() => (refetch ? false : true));
    } catch (error) {
      showToast(toast, error.message);
    }
  };
  const handleUploadFile = async (input) => {
    try {
      if (input.size > 10 * 1024 * 1024) {
        throw Error("File exceeds 10 mb limit");
      }
      const folderId = location.pathname.slice(1);
      const response = await uploadFile({
        file: input,
        folderId,
      });
      console.log("🚀 ~ handleUploadFile ~ response:", response);
      if (response.status != 200) {
        return showToast(toast, response.data.error || response.data.message);
      }
      toggleRefetch(() => (refetch ? false : true));
    } catch (error) {
      showToast(toast, error.message);
    }
  };

  const downloadFile = (inputs) => {};

  const handleDeleteFile = async (inputs) => {
    try {
      const response = await deleteFile({
        fileId: inputs.id,
      });
      if (response.status != 200) {
        return showToast(toast, response.data.error || response.data.message);
      }
      toggleRefetch(() => (refetch ? false : true));
    } catch (error) {
      showToast(toast, error.message);
    }
  };
  const handleDeleteFolder = async (inputs) => {
    try {
      const response = await deleteFolder({
        folderId: inputs.id,
      });
      if (response.status != 200) {
        return showToast(toast, response.data.error || response.data.message);
      }
      toggleRefetch(() => (refetch ? false : true));
    } catch (error) {
      showToast(toast, error.message);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Card className="mx-6 mt-6 pt-6 px-6 h-screen md:mx-14 lg:mx-auto max-auto lg:max-w-2xl">
      <Header user={user} />
      <Menu
        data={data}
        handleCreateFolder={handleCreateFolder}
        handleUploadFile={handleUploadFile}
      />
      <List
        data={data}
        downloadFile={downloadFile}
        handleDeleteFile={handleDeleteFile}
        handleDeleteFolder={handleDeleteFolder}
      />
    </Card>
  );
}

export default Home;
