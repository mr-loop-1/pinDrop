import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Menubar, MenubarMenu } from "../ui/menubar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useToast } from "../hooks/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { LoadingSpinner } from "../ui/Spinner";

export default function Menu({ data, handleCreateFolder, handleUploadFile }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { register: registerFile, handleSubmit: handleSubmitFile } = useForm();
  const [open, setOpen] = useState(false);
  const [openFile, setOpenFile] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [adding, setAdding] = useState(false);

  //   const paths = data.path.split("/");

  const isRoot = data.folder.title == "root" ? true : false;
  //   const isPinDrop = paths[paths.length - 1] == "pinDrop" ? true : false;
  //   const isRoot = false;
  const isPinDrop = data.folder.title == "pinDrop" ? true : false;

  const onSubmit = async (inputs) => {
    setAdding(() => true);
    await handleCreateFolder(inputs);
    setAdding(() => false);
    setOpen(() => false);
  };

  const onSubmitFile = async (inputs) => {
    setUploading(() => true);
    await handleUploadFile(inputs.file[0]);
    setUploading(() => false);
    setOpenFile(() => false);
  };

  return (
    <div className="my-4">
      <div className="my-4 flex justify-between">
        <div>
          {!isRoot && (
            <button
              onClick={() => {
                navigate(`/${data.folder.parentId}`);
              }}
              className="hover:bg-slate-200 flex align-middle px-2 rounded-md py-1"
            >
              <img src="/back.svg" className="w-6 inline mr-2" />
              back
            </button>
          )}
        </div>
        <div>
          {!isPinDrop && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-amber-300">
                  Create Folder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                  <label for="title">
                    Folder Name
                    {adding && <LoadingSpinner className="ml-2 inline" />}
                  </label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="title"
                    minLength={1}
                    maxLength={30}
                    {...register("title")}
                    required
                    className="my-3"
                    disabled={adding}
                  ></Input>

                  <DialogFooter>
                    <Button disabled={adding} type="submit">
                      Add folder
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
          <Dialog open={openFile} onOpenChange={setOpenFile}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-sky-400">
                {isPinDrop ? "Push File" : "Add File"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form method="POST" onSubmit={handleSubmitFile(onSubmitFile)}>
                <label for="file">
                  Select a file
                  {uploading && <LoadingSpinner className="ml-2 inline" />}
                </label>
                <Input
                  id="file"
                  type="file"
                  name="file"
                  {...registerFile("file")}
                  required
                  className="my-3"
                  disabled={uploading}
                ></Input>
                <Label className="inlin">
                  jpeg, jpg, png, svg, webp, gif, mp4, pdf, doc, docx, txt,
                  text, md, zip, js, jsx, csv
                </Label>
                <DialogFooter>
                  <Button type="submit" disabled={uploading}>
                    Add selected file
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Label>mount: ~{data.folder.path}</Label>
    </div>
  );
}
