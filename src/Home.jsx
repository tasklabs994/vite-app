import React, { useState } from "react";
import { Link } from "react-router-dom";
import blogsData from "./blogs.json";
import "./hello.css";

// Helper: chunk an array by custom row sizes [3,3,2]
function customChunk(arr, sizes) {
  const chunks = [];
  let start = 0;
  sizes.forEach((size) => {
    chunks.push(arr.slice(start, start + size));
    start += size;
  });
  return chunks;
}

// Helper: add a blog to an array if not present
function addBlogToArray(arr, blog) {
  if (!arr.some((b) => b.slug === blog.slug)) {
    arr.push(blog);
  }
}

// Recursively find the first blog route in an array or nested object
function findFirstBlogRoute(val) {
  if (Array.isArray(val) && val.length > 0) {
    return val[0].route; // the first blog
  }
  if (val && typeof val === "object") {
    // check each key
    for (const key of Object.keys(val)) {
      const route = findFirstBlogRoute(val[key]);
      if (route) return route;
    }
  }
  return null;
}

// Build a 2- or 3-level nested object
function buildHierarchy(blogs) {
  const nested = {};
  blogs.forEach((blog) => {
    const { hierarchy } = blog;
    if (!hierarchy || hierarchy.length < 2) return;

    const top = hierarchy[0];
    const sub = hierarchy[1];
    const third = hierarchy[2];

    if (!nested[top]) {
      nested[top] = {};
    }

    if (!third) {
      // 2-level
      if (!Array.isArray(nested[top][sub])) {
        nested[top][sub] = [];
      }
      addBlogToArray(nested[top][sub], blog);
    } else {
      // 3-level
      if (!nested[top][sub]) {
        nested[top][sub] = {};
      }
      if (!nested[top][sub][third]) {
        nested[top][sub][third] = [];
      }
      addBlogToArray(nested[top][sub][third], blog);
    }
  });
  return nested;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("revu21");
  // For toggling only the 3rd-level expansions
  const [openSub, setOpenSub] = useState({});

  const versions = ["revu21", "revu20"];

  // Filter by version + search
  const filteredBlogs = (() => {
    let blogs = blogsData.filter((b) => b.version === selectedVersion);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      blogs = blogs.filter((blog) => {
        const inTitle = blog.name.toLowerCase().includes(q);
        const inSnippet = blog.snippet.toLowerCase().includes(q);
        const inPath = blog.fullPath.toLowerCase().includes(q);
        const fullText = blog.fullData.html.toLowerCase();
        return inTitle || inSnippet || inPath || fullText.includes(q);
      });
    }
    return blogs;
  })();

  // Build hierarchy if no search
  const nestedData = searchQuery ? {} : buildHierarchy(filteredBlogs);

  // Toggle subcategory open only if it has third-level
  function toggleSub(topCat, subCat) {
    const key = `${topCat}||${subCat}`;
    setOpenSub((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  // top-level cats
  const topCats = Object.keys(nestedData);

  // 3,3,2 layout
  const rowSizes = [3, 3, 2];
  let rows = [];
  if (topCats.length >= 8) {
    rows = customChunk(topCats, rowSizes);
  } else {
    rows = [topCats];
  }

  // Styles
  const tableStyle = {
    borderSpacing: "16px",
    margin: "40px auto",
    marginTop: "10px",
    width: "65%",
    fontFamily: "Lucida Sans Unicode, Lucida Grande, Arial, sans-serif",
    color: "#0083DB",
  };
  const cellStyle = {
    verticalAlign: "top",
    padding: "0",
    fontSize: "0.9rem",
  };
  const boxStyle = {
    border: "2.2px solid #0083DB",
    padding: "15px",
    borderRadius: "0px",
    minHeight: "315px",
  };
  const headingStyle = {
    marginTop: 0,
    marginBottom: "10px",
    color: "#0083DB",
    fontFamily: "inherit",
    fontSize: "1.1rem",
    fontWeight: "bold",
  };
  const linkStyle = {
    color: "#0083DB",
    textDecoration: "none",
  };

  return (
    <div className="container" style={{ fontFamily: "inherit" }}>
      {/* Version Toggle */}
      <div className="version-toggle">
        {versions.map((version) => (
          <button
            key={version}
            className={`version-button ${
              selectedVersion === version ? "active" : ""
            }`}
            onClick={() => {
              setSelectedVersion(version);
              setSearchQuery("");
            }}
          >
            {version.toLowerCase() === "revu21" ? "Revu21" : "Revu20"}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search pages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery ? (
        // Show blog cards
        <div className="blog-cards">
          {filteredBlogs.map((blog, idx) => (
            <a
              key={idx}
              href={blog.route}
              className="blog-card"
              style={{ color: "#0083DB", textDecoration: "none" }}
            >
              <span className="breadcrumb">{blog.fullPath}</span>
              <h2 style={{ color: "#000" }}>{blog.name}</h2>
              <p>{blog.snippet}...</p>
            </a>
          ))}
          {filteredBlogs.length === 0 && <p>No pages found.</p>}
        </div>
      ) : (
        // 3,3,2 table
        <table style={tableStyle}>
          <colgroup>
            <col style={{ width: "33.33%" }} />
            <col style={{ width: "33.33%" }} />
            <col style={{ width: "33.33%" }} />
          </colgroup>
          <tbody>
            {rows.map((row, rowIndex) => {
              const expectedCols = rowSizes[rowIndex] || row.length;

              // Last row colSpan if fewer items
              // Replace this entire 'if' block with the snippet below:
              if (row.length < expectedCols && rowIndex === rows.length - 1) {
                return (
                  <tr key={rowIndex}>
                    {/* Use colSpan so these boxes share one cell */}
                    <td colSpan={expectedCols} style={{cellStyle}}>
                      {/* Center them horizontally with justifyContent */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "20px"
                        }}
                      >
                        {row.map((topCat) => {
                          const subCats = Object.keys(nestedData[topCat] || {});
                          return (
                            <div key={topCat} style={{...boxStyle, width: "33%", maxWidth: "350px"}}>
                              <h3 style={headingStyle}>{topCat}</h3>
                              <div
                                style={{ marginLeft: "10px", color: "#0083DB" }}
                              >
                                {subCats.map((subCat) => {
                                  const subVal = nestedData[topCat][subCat];
                                  const subKey = `${topCat}||${subCat}`;
                                  const hasThirdLevel =
                                    !Array.isArray(subVal) &&
                                    Object.keys(subVal).length > 0;

                                  let route = null;
                                  if (!hasThirdLevel) {
                                    // subVal is array => link to first child
                                    route = subVal.length
                                      ? subVal[0].route
                                      : "#";
                                  }

                                  const isSubOpen = !!openSub[subKey];

                                  return (
                                    <div
                                      key={subCat}
                                      style={{ marginBottom: "5px" }}
                                    >
                                      {hasThirdLevel ? (
                                        <div
                                          style={{
                                            cursor: "pointer",
                                            color: "#0083DB",
                                          }}
                                          onClick={() =>
                                            setOpenSub((prev) => ({
                                              ...prev,
                                              [subKey]: !prev[subKey],
                                            }))
                                          }
                                        >
                                          {isSubOpen ? "[-]" : "[+]"} {subCat}
                                        </div>
                                      ) : (
                                        <a
                                          href={route || "#"}
                                          style={{
                                            ...linkStyle,
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {subCat}
                                        </a>
                                      )}

                                      {/* 3rd-level => expand => each thirdKey is a link */}
                                      {hasThirdLevel && isSubOpen && (
                                        <div
                                          style={{
                                            marginLeft: "20px",
                                            marginTop: "5px",
                                          }}
                                        >
                                          {Object.keys(subVal).map(
                                            (thirdKey) => {
                                              const thirdVal = subVal[thirdKey];
                                              const thirdRoute =
                                                findFirstBlogRoute(thirdVal) ||
                                                "#";
                                              return (
                                                <div
                                                  key={thirdKey}
                                                  style={{
                                                    marginBottom: "5px",
                                                  }}
                                                >
                                                  <a
                                                    href={thirdRoute}
                                                    style={linkStyle}
                                                  >
                                                    {thirdKey}
                                                  </a>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              } else {
                // normal row
                return (
                  <tr key={rowIndex}>
                    {row.map((topCat) => {
                      const subCats = Object.keys(nestedData[topCat] || {});
                      return (
                        <td key={topCat} style={cellStyle}>
                          <div style={boxStyle}>
                            <h3 style={headingStyle}>{topCat}</h3>
                            <div
                              style={{ marginLeft: "10px", color: "#0083DB" }}
                            >
                              {subCats.map((subCat) => {
                                const subVal = nestedData[topCat][subCat];
                                const subKey = `${topCat}||${subCat}`;
                                const hasThirdLevel =
                                  !Array.isArray(subVal) &&
                                  Object.keys(subVal).length > 0;

                                let route = null;
                                if (!hasThirdLevel) {
                                  // subVal is array => link to first child
                                  route = subVal.length ? subVal[0].route : "#";
                                }

                                const isSubOpen = !!openSub[subKey];

                                return (
                                  <div
                                    key={subCat}
                                    style={{ marginBottom: "5px" }}
                                  >
                                    {hasThirdLevel ? (
                                      // toggling parent
                                      <div
                                        style={{
                                          cursor: "pointer",
                                          color: "#0083DB",
                                        }}
                                        onClick={() =>
                                          setOpenSub((prev) => ({
                                            ...prev,
                                            [subKey]: !prev[subKey],
                                          }))
                                        }
                                      >
                                        {isSubOpen ? "[-]" : "[+]"} {subCat}
                                      </div>
                                    ) : (
                                      // 2-level => single link
                                      <a
                                        href={route || "#"}
                                        style={{
                                          ...linkStyle,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {subCat}
                                      </a>
                                    )}

                                    {/* 3rd-level => expand => each thirdKey is a link */}
                                    {hasThirdLevel && isSubOpen && (
                                      <div
                                        style={{
                                          marginLeft: "20px",
                                          marginTop: "5px",
                                        }}
                                      >
                                        {Object.keys(subVal).map((thirdKey) => {
                                          const thirdVal = subVal[thirdKey];
                                          const thirdRoute =
                                            findFirstBlogRoute(thirdVal) || "#";
                                          return (
                                            <div
                                              key={thirdKey}
                                              style={{ marginBottom: "5px" }}
                                            >
                                              <a
                                                href={thirdRoute}
                                                style={linkStyle}
                                              >
                                                {thirdKey}
                                              </a>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      );
                    })}
                    {/* fill empty columns if row not full */}
                    {row.length < expectedCols &&
                      Array.from({ length: expectedCols - row.length }).map(
                        (_, idx) => (
                          <td key={`empty-${idx}`} style={cellStyle}></td>
                        )
                      )}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
