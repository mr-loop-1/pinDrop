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
  const { toast } = useToast();
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);

  //   const paths = data.path.split("/");

  //   const isRoot = paths[paths.length - 1] == "root" ? true : false;
  //   const isPinDrop = paths[paths.length - 1] == "pinDrop" ? true : false;
  const isRoot = false;
  const isPinDrop = false;

  const onSubmit = async (inputs) => {
    await handleCreateFolder(inputs);
    setOpen(() => false);
  };

  return (
    <div className="my-4">
      <div className="my-4 flex justify-between">
        <div>
          {!isRoot && (
            <button
              disabled={isRoot}
              onClick={() => {
                navigate(`/${data.folder.parentId}`);
              }}
            >
              icon+ back
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
                    <button type="submit">Add folder</button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}

          <Button
            variant="outline"
            className="bg-sky-400"
            onClick={handleUploadFile}
          >
            {isPinDrop ? "Drop" : "Add File"}
          </Button>
        </div>
      </div>

      <Label>mount: ~/</Label>
    </div>
  );
}
