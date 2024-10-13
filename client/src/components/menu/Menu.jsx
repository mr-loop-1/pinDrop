import { useNavigate } from "react-router-dom";

export default function Menu({ data, folderId }) {
  const navigate = useNavigate();
  const isRoot = data.path[data.path.length - 1] == "root" ? true : false;
  const isPinDrop = data.path[data.path.length - 1] == "pinDrop" ? true : false;

  return (
    <div>
      <div>
        {isRoot && (
          <button
            onClick={() => {
              navigate(`${data.path[data.path.length - 2]}`);
            }}
          >
            Back
          </button>
        )}

        {isPinDrop && <button>Create Folder</button>}

        <button>{isPinDrop ? "Drop" : "Add File"}</button>
      </div>
    </div>
  );
}
