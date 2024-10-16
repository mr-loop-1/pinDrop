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
import { deleteFile, downloadFile, uploadFile } from "api/file";

function Home() {
  const { toast } = useToast();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const [refetch, toggleRefetch] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const showToast = (toast, msg) => {
    toast({
      className:
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      variant: "destructive",
      title: "Some Error Occured",
      description: msg,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  const showGoodToast = (toast, msg) => {
    toast({
      className:
        "bg-lime-400 top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      variant: "outline",
      description: msg,
      action: (
        <ToastAction className="bg-white" altText="Close">
          Close
        </ToastAction>
      ),
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
        showToast(toast, error?.response?.data?.error || error.message);
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
      showGoodToast(toast, "Folder created success");
      toggleRefetch(() => (refetch ? false : true));
    } catch (error) {
      showToast(toast, error?.response?.data?.error || error.message);
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
      if (response.status != 200) {
        return showToast(toast, response.data.error || response.data.message);
      }
      showGoodToast(toast, "Upload File Success");
      toggleRefetch(() => (refetch ? false : true));
    } catch (error) {
      showToast(toast, error?.response?.data?.error || error.message);
    }
  };

  const handleDownloadFile = async (inputs) => {
    try {
      const response = await downloadFile({
        fileCid: inputs.cid,
      });
      if (response.status != 200) {
        return showToast(toast, response.data.error || response.data.message);
      }
      // console.log(response);

      window.open(response.data.signedUrl, "_blank");
      // if (!(response.data instanceof Blob)) {
      //   return showToast(toast, "Corrupted file");
      // }

      // const blob = new Blob([response.data], { type: "application/pdf" });
      // const url = window.URL.createObjectURL(blob);
      // const url = window.URL.createObjectURL(response.data);
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", inputs.name);
      // document.body.appendChild(link);
      // link.click();

      // link.parentNode.removeChild(link);
      // window.URL.revokeObjectURL(url);
    } catch (error) {
      showToast(toast, error?.response?.data?.error || error.message);
    }
  };

  const handleDeleteFile = async (inputs) => {
    try {
      const response = await deleteFile({
        fileId: inputs.id,
      });
      if (response.status != 200) {
        return showToast(toast, response.data.error || response.data.message);
      }
      showGoodToast(toast, "Delete File success");
      toggleRefetch(() => (refetch ? false : true));
    } catch (error) {
      showToast(toast, error?.response?.data?.error || error.message);
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
      showGoodToast(toast, "Delete Folder success");
      toggleRefetch(() => (refetch ? false : true));
    } catch (error) {
      showToast(toast, error?.response?.data?.error || error.message);
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
        handleDownloadFile={handleDownloadFile}
        handleDeleteFile={handleDeleteFile}
        handleDeleteFolder={handleDeleteFolder}
      />
    </Card>
  );
}

export default Home;
