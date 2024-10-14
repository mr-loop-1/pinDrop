import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import clsx from "clsx";
import { mapIcon } from "@/lib/mapIcons";

export default function List({
  data,
  handleDownloadFile,
  handleDeleteFile,
  handleDeleteFolder,
}) {
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
                    <img className="w-6 mr-5" src="/folder.png" alt="asdew" />
                  </TableCell>
                  <TableCell className="w-full">{folder.title}</TableCell>
                </Link>
                <span>
                  {/* <TableCell className="w-fit text-right"></TableCell> */}
                  <TableCell
                    onClick={() => handleDeleteFolder({ id: folder.id })}
                    className={clsx(
                      folder.title == "pinDrop" && "hidden",
                      "w-fit text-right hover:underline cursor-pointer"
                    )}
                  >
                    <img src="/delete.svg" className="w-5" />
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
                      )}.png`}
                    />
                  </TableCell>
                  <TableCell className="w-full">{file.name}</TableCell>
                </span>
                <span>
                  <TableCell className="w-fit text-right">
                    <img src="/download.svg" className="w-5" />
                  </TableCell>
                  <TableCell
                    onClick={() => handleDeleteFile({ id: file.id })}
                    className="w-fit text-right hover:underline cursor-pointer"
                  >
                    <img src="/delete.svg" className="w-5" />
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
