export default function Menu({ data, downloadFile, deleteFile, deleteFolder }) {
  return (
    <div>
      <ul>
        {data.folders.map((folder) => {
          <li key={folder.id}>
            <div>
              <span>{folder.title}</span>
              <button onClick={deleteFolder} className="hidden hover:inline">
                Delete
              </button>
            </div>
          </li>;
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
