export default function List({ data, downloadFile, deleteFile, deleteFolder }) {
  console.log("🚀 ~ List ~ data:", data);
  return (
    <div>
      <ul>
        {data.folders.map((folder) => {
          return (
            <li key={folder.id}>
              <div>
                <span>{folder.title}</span>
                <button onClick={deleteFolder} className="hidden hover:inline">
                  Delete
                </button>
              </div>
            </li>
          );
        })}
        {data.files.map((folder) => {
          <li key={folder.id}>
            <div>
              <span>{folder.title}</span>
              <button onClick={deleteFile} className="hidden hover:inline">
                Delete
              </button>
              <button onClick={downloadFile}>Download</button>
            </div>
          </li>;
        })}
      </ul>
    </div>
  );
}
