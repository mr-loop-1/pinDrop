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

export default function Menu({ data, createFolder, uploadFile }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  //   const paths = data.path.split("/");

  //   const isRoot = paths[paths.length - 1] == "root" ? true : false;
  //   const isPinDrop = paths[paths.length - 1] == "pinDrop" ? true : false;
  const isRoot = false;
  const isPinDrop = false;

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
                <Button
                  variant="outline"
                  className="bg-amber-300"
                  onClick={createFolder}
                >
                  Create Folder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <label>Folder Name</label>
                <input
                  id="folderName"
                  type="text"
                  name="folderName"
                  minLength={5}
                  maxLength={20}
                  required
                ></input>
                <DialogFooter>
                  <button type="submit" onSubmit={createFolder}>
                    Add folder
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          <Button variant="outline" className="bg-sky-400" onClick={uploadFile}>
            {isPinDrop ? "Drop" : "Add File"}
          </Button>
        </div>
      </div>

      <Label>mount: ~/</Label>
    </div>
  );
}
