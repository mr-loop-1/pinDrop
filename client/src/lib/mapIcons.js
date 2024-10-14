export const mapIcon = (ext) => {
  switch (ext) {
    case "txt":
    case "text":
    case "md":
      return "text";
    case "jpeg":
    case "png":
    case "jpg":
    case "webp":
    case "svg":
      return "img";
    case "csv":
      return "csv";
    case "doc":
    case "docx":
      return "doc";
    case "gif":
    case "mp4":
      return "vid";
    case "pdf":
      return "pdf";
    case "js":
    case "jsx":
      return "code";
    case "zip":
      return "zip";
    default:
      return "txt";
  }
};
