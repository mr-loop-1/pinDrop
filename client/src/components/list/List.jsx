import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import clsx from "clsx";
import { mapIcon } from "@/lib/mapIcons";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { LoadingSpinner } from "../ui/Spinner";

export default function List({
  data,
  handleDownloadFile,
  handleDeleteFile,
  handleDeleteFolder,
}) {
  const [openFolder, setOpenFolder] = useState(false);
  const [openFile, setOpenFile] = useState(false);

  const [deletingFolder, setDeletingFolder] = useState(false);
  const [deletingFile, setDeletingFile] = useState(false);

  const onDeleteFolder = async (inputs) => {
    setDeletingFolder(() => true);
    await handleDeleteFolder(inputs);
    setDeletingFolder(() => false);
  };
  const onDeleteFile = async (inputs) => {
    setDeletingFile(() => true);
    await handleDeleteFile(inputs);
    setDeletingFile(() => false);
  };

  return (
    <div>
      <Table>
        <TableBody>
          {data.folders.map((folder) => {
            return (
              <TableRow
                key={folder.id}
                className={clsx(
                  folder.title == "pinDrop" && "bg-lime-200",
                  "flex justify-between w-full"
                )}
              >
                <Link to={`/${folder.id}`} className="flex-grow">
                  <TableCell className="w-16">
                    <img className="w-6 mr-5" src="/folder.svg" alt="asdew" />
                  </TableCell>
                  <TableCell className="w-full">{folder.title}</TableCell>
                </Link>
                <span>
                  <TableCell
                    className={clsx(
                      folder.title == "pinDrop" && "hidden",
                      "w-fit text-right hover:underline cursor-pointer"
                    )}
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <img src="/delete.svg" className="w-5" />
                      </DialogTrigger>
                      <DialogContent>
                        <label>
                          Are you sure you want to delete this folder?
                          {deletingFolder && (
                            <LoadingSpinner className="inline ml-2" />
                          )}
                        </label>
                        <Button
                          variant="destructive"
                          onClick={() => onDeleteFolder({ id: folder.id })}
                          disabled={deletingFolder}
                        >
                          Delete
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </span>
              </TableRow>
            );
          })}
          {data.files.map((file) => {
            return (
              <TableRow key={file.id} className="flex justify-between w-full">
                <span>
                  <TableCell className="w-10">
                    <img
                      className="w-6 mr-5"
                      src={`/${mapIcon(
                        file.name.split(".")[file.name.split(".").length - 1]
                      )}.svg`}
                    />
                  </TableCell>
                  <TableCell className="w-full">{file.name}</TableCell>
                </span>
                <span>
                  <TableCell className="w-fit text-right">
                    <img src="/download.svg" className="w-5" />
                  </TableCell>
                  <TableCell className="w-fit text-right hover:underline cursor-pointer">
                    <Dialog>
                      <DialogTrigger asChild>
                        <img src="/delete.svg" className="w-5" />
                      </DialogTrigger>
                      <DialogContent>
                        <label>
                          Are you sure you want to delete this file?
                          {deletingFile && (
                            <LoadingSpinner className="inline ml-2" />
                          )}
                        </label>
                        <Button
                          variant="destructive"
                          onClick={() => onDeleteFile({ id: file.id })}
                          disabled={deletingFile}
                        >
                          Delete
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </span>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
