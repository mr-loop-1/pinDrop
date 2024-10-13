import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import clsx from "clsx";

export default function List({ data, downloadFile, deleteFile, deleteFolder }) {
  console.log("🚀 ~ List ~ data:", data);
  return (
    <div>
      <Table>
        <TableBody>
          {data.folders.map((folder) => {
            return (
              <TableRow
                key={folder.id}
                className={clsx(
                  folder.title == "pinDrop" && "bg-sky-100",
                  "flex justify-between w-full"
                )}
              >
                <Link to={`/${folder.id}`} className="flex-grow">
                  <TableCell className="w-10 mx-5">ico</TableCell>
                  <TableCell className="w-full">{folder.title}</TableCell>
                </Link>
                <span>
                  <TableCell className="w-fit text-right"></TableCell>
                  <TableCell
                    onClick={() => deleteFolder(folder.id)}
                    className="w-fit text-right"
                  >
                    Del
                  </TableCell>
                </span>
              </TableRow>
            );
          })}
          {data.files.map((file) => {
            return (
              <TableRow key={file.id} className="flex justify-between w-full">
                <span>
                  <TableCell className="w-10 mx-5">ico</TableCell>
                  <TableCell className="w-full">{file.name}</TableCell>
                </span>
                <span>
                  <TableCell className="w-fit text-right">Down</TableCell>
                  <TableCell
                    onClick={() => deleteFolder(folder.id)}
                    className="w-fit text-right"
                  >
                    Del
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
