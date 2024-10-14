export const mapIcon = (ext) => {
  switch (ext) {
    case "txt":
      return "txt";
    case "jpeg":
    case "png":
    case "jpg":
      return "img";
    case "csv":
      return "csv";
    case "doc":
    case "docx":
      return "doc";
    case "gif":
    case "mp4":
      return "mp4";
    case "pdf":
      return "pdf";
    case "js":
    case "jsx":
      return "js";
    default:
      return "txt";
  }
};
