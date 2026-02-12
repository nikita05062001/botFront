const getGoogleDriveUrl = (url) => {
  if (!url || typeof url !== "string") return "";

  if (url.includes("drive.google.com")) {
    // Извлекаем ID файла более надежным способом через регулярное выражение
    const match =
      url.match(/\/d\/(.+?)\/(?:view|edit|usp=sharing)/) ||
      url.match(/id=(.+?)(?:&|$)/);
    const fileId = match ? match[1] : null;

    if (fileId) {
      // Используем thumbnail. sz=w1000 задает ширину (можно менять)
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
  }

  return url;
};
export default getGoogleDriveUrl;
