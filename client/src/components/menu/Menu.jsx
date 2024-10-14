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

export default function Menu({ data, handleCreateFolder, handleUploadFile }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { register: registerFile, handleSubmit: handleSubmitFile } = useForm();
  const [open, setOpen] = useState(false);
  const [openFile, setOpenFile] = useState(false);

  //   const paths = data.path.split("/");

  const isRoot = data.folder.title == "root" ? true : false;
  //   const isPinDrop = paths[paths.length - 1] == "pinDrop" ? true : false;
  //   const isRoot = false;
  const isPinDrop = false;

  const onSubmit = async (inputs) => {
    await handleCreateFolder(inputs);
    setOpen(() => false);
  };

  const onSubmitFile = async (inputs) => {
    await handleUploadFile(inputs.file[0]);
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
                  <label for="title">Folder Name</label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="title"
                    minLength={5}
                    maxLength={20}
                    {...register("title")}
                    required
                  ></Input>
                  <DialogFooter>
                    <Button type="submit">Add folder</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
          <Dialog open={openFile} onOpenChange={setOpenFile}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-sky-400">
                {isPinDrop ? "Drop" : "Add File"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form method="POST" onSubmit={handleSubmitFile(onSubmitFile)}>
                <label for="title">Select a file</label>
                <Input
                  id="file"
                  type="file"
                  name="file"
                  {...registerFile("file")}
                  required
                ></Input>
                <DialogFooter>
                  <Button type="submit">Add selected file</Button>
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
