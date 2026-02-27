const getGoogleDriveUrl = (url) => {
  if (!url) return "";
  const regExp = /[-\w]{25,}/;
  const match = url.match(regExp);
  const fileId = match ? match[0] : null;

  if (fileId) {
    // Попробуйте этот формат, он часто стабильнее для <img>
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
  return url;
};
export default getGoogleDriveUrl;
