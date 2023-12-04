import React, { useState } from "react";

export const CheckLink = () => {
  const [link, setLink] = useState("");
  const [lastModified, setLastModified] = useState(null);
  const [error, setError] = useState(null);

  const checkLink = async (url) => {
    try {
      const response = await fetch("http://localhost:4000/check-link", {
        params: {
          url,
        },
      });

      const lastModifiedHeader = response.data.lastModified;

      if (!lastModifiedHeader) {
        setError(
          "last-modified header not present, might be older than 365 days"
        );
      }

      setLastModified(lastModifiedHeader);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(`Error checking link: ${error.message}`);
      setLastModified(null);
    }
  };

  const calculateTimeDifference = (date) => {
    const currentDate = new Date();
    const lastModifiedDate = new Date(date);
    const timeDifference = currentDate - lastModifiedDate;

    // Convert milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return daysDifference;
  };

  return (
    <>
      <p className="mb-4 text-light text-center fw-bold">
        Check external link updated content
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <input
            type="text"
            placeholder="Enter external link URL"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            style={{ minWidth: "75%", height: "40px", marginRight: "10px" }}
          />
          <button onClick={() => checkLink(link)} style={{ height: "40px" }}>
            Check Link
          </button>
        </div>
        {error && <p className="text-danger mt-2">{error}</p>}
        {lastModified && (
          <div className="mt-2 text-white">
            <p>Last Modified: {new Date(lastModified).toLocaleDateString()}</p>
            {calculateTimeDifference(lastModified) > 365 && (
              <p>More than 365 days ago</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
