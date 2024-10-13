import { useNavigate } from "react-router-dom";

export default function Menu({ data, createFolder, uploadFile }) {
  const navigate = useNavigate();

  const paths = data.path.split("/");

  const isRoot = paths[paths.length - 1] == "root" ? true : false;
  const isPinDrop = paths[paths.length - 1] == "pinDrop" ? true : false;

  return (
    <div>
      <div>
        {isRoot && (
          <button
            onClick={() => {
              navigate(`${paths[paths.length - 2]}`);
            }}
          >
            Back
          </button>
        )}

        {isPinDrop && <button onClick={createFolder}>Create Folder</button>}

        <button onClick={uploadFile}>{isPinDrop ? "Drop" : "Add File"}</button>
      </div>
    </div>
  );
}
