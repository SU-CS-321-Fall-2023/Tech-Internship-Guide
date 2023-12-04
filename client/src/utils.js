export const downloadFile = (fileBlob, filename) => {
  // Create a download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(fileBlob);
  link.download = filename;

  // Append the link to the document and trigger a click
  document.body.appendChild(link);
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};
