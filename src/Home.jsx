import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import blogsData from "./blogs.json"; // Your JSON array
import "./hello.css";

// Helper: chunk array given fixed row sizes
function customChunk(arr, sizes) {
  const chunks = [];
  let start = 0;
  sizes.forEach((size) => {
    chunks.push(arr.slice(start, start + size));
    start += size;
  });
  return chunks;
}

// Helper: add blog to an array if not already present (using blog.slug as unique key)
function addBlogToArray(arr, blog) {
  if (!arr.some((b) => b.slug === blog.slug)) {
    arr.push(blog);
  }
}

// Build a hierarchy with up to 3 levels:
// - If a blog’s hierarchy has only 2 levels, store its data as an array under the sub-level.
// - If 3 levels exist, nest further under a third-level key.
function buildHierarchy(blogs) {
  const nested = {};

  blogs.forEach((blog) => {
    const { hierarchy } = blog;
    if (!hierarchy || hierarchy.length < 2) return; // require at least 2 levels

    const top = hierarchy[0];
    const sub = hierarchy[1];
    const third = hierarchy[2]; // may be undefined

    if (!nested[top]) {
      nested[top] = {};
    }

    if (!third) {
      // Only 2-level data
      if (!Array.isArray(nested[top][sub])) {
        nested[top][sub] = [];
      }
      addBlogToArray(nested[top][sub], blog);
    } else {
      // 3-level data
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
  // States for version toggle and search functionality.
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("revu21");
  // For collapsible subcategories in the table.
  const [openSub, setOpenSub] = useState({});

  // List of available versions.
  const versions = ["revu21", "revu20"];

  // Filter blogs based on selected version and search query.
  const filteredBlogs = (() => {
    let blogs = blogsData.filter((blog) => blog.version === selectedVersion);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      blogs = blogs.filter((blog) => {
        const inTitle = blog.name.toLowerCase().includes(query);
        const inSnippet = blog.snippet.toLowerCase().includes(query);
        const inPath = blog.fullPath.toLowerCase().includes(query);
        const fullText = blog.fullData.html.toLowerCase();
        return inTitle || inSnippet || inPath || fullText.includes(query);
      });
    }
    return blogs;
  })();

  // Build the collapsible hierarchy table only if no search query is provided.
  const nestedData = searchQuery ? {} : buildHierarchy(filteredBlogs);

  // Toggle subcategory open state.
  function toggleSub(topCat, subCat) {
    const key = `${topCat}||${subCat}`;
    setOpenSub((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  // For the table layout, get the top-level categories from the nested data.
  const topCats = Object.keys(nestedData);
  // Desired layout: first row 3 columns, second row 3 columns, third row 2 columns.
  const rowSizes = [3, 3, 2];
  let rows = [];
  if (topCats.length >= 8) {
    rows = customChunk(topCats, rowSizes);
  } else {
    rows = [topCats];
  }

  // Table and cell inline styles (feel free to adjust as needed)
  const tableStyle = {
    borderSpacing: "15px 15px",
    marginTop: "5px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    color: "blue",
  };
  const cellStyle = {
    padding: "10px",
    border: "2px solid #0083db",
    verticalAlign: "top",
  };

  return (
    <div className="container">
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

      {/* If search query exists, display search results as blog cards */}
      {searchQuery ? (
        <div className="blog-cards">
          {filteredBlogs.map((blog, index) => (
            <a key={index} href={blog.route} className="blog-card">
              <span className="breadcrumb">{blog.fullPath}</span>
              <h2>{blog.name}</h2>
              <p>{blog.snippet}...</p>
            </a>
          ))}
          {filteredBlogs.length === 0 && <p>No pages found.</p>}
        </div>
      ) : (
        // Otherwise, display the collapsible hierarchy table
        <table style={tableStyle}>
          <colgroup>
            <col style={{ width: "33.33%" }} />
            <col style={{ width: "33.33%" }} />
            <col style={{ width: "33.33%" }} />
          </colgroup>
          <tbody>
            {rows.map((row, rowIndex) => {
              const expectedCols = rowSizes[rowIndex] || row.length;
              // For the last row with fewer items (2 items), center them in a single cell with colspan.
              if (row.length < expectedCols && rowIndex === rows.length - 1) {
                return (
                  <tr key={rowIndex}>
                    <td colSpan={expectedCols} style={cellStyle}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "15px",
                        }}
                      >
                        {row.map((topCat) => {
                          const subCats = Object.keys(nestedData[topCat] || {});
                          return (
                            <div
                              key={topCat}
                              style={{
                                ...cellStyle,
                                border: "none",
                                padding: "0",
                              }}
                            >
                              <h3 style={{ marginTop: 0 }}>{topCat}</h3>
                              <div style={{ marginLeft: "10px" }}>
                                {subCats.map((subCat) => {
                                  const subKey = `${topCat}||${subCat}`;
                                  const isSubOpen = !!openSub[subKey];
                                  const subVal = nestedData[topCat][subCat];
                                  return (
                                    <div
                                      key={subCat}
                                      style={{ marginBottom: "8px" }}
                                    >
                                      <div
                                        style={{
                                          cursor: "pointer",
                                          fontWeight: "bold",
                                          color: "#333",
                                        }}
                                        onClick={() =>
                                          toggleSub(topCat, subCat)
                                        }
                                      >
                                        {subCat} {isSubOpen ? "(-)" : "(+)"}
                                      </div>
                                      {isSubOpen && (
                                        <div style={{ marginLeft: "15px" }}>
                                          {Array.isArray(subVal)
                                            ? subVal.map((blog) => (
                                                <div
                                                  key={blog.slug}
                                                  style={{
                                                    marginBottom: "4px",
                                                  }}
                                                >
                                                  <Link to={blog.route}>
                                                    {blog.name}
                                                  </Link>
                                                </div>
                                              ))
                                            : Object.keys(subVal).map(
                                                (thirdKey) => {
                                                  const items =
                                                    subVal[thirdKey];
                                                  return (
                                                    <div
                                                      key={thirdKey}
                                                      style={{
                                                        marginBottom: "6px",
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          fontStyle: "italic",
                                                        }}
                                                      >
                                                        {thirdKey}
                                                      </div>
                                                      <ul
                                                        style={{
                                                          marginLeft: "20px",
                                                        }}
                                                      >
                                                        {items.map((blog) => (
                                                          <li key={blog.slug}>
                                                            <Link
                                                              to={blog.route}
                                                            >
                                                              {blog.name}
                                                            </Link>
                                                          </li>
                                                        ))}
                                                      </ul>
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
                // Standard row: each top-level category gets its own <td>.
                return (
                  <tr key={rowIndex}>
                    {row.map((topCat) => {
                      const subCats = Object.keys(nestedData[topCat] || {});
                      return (
                        <td key={topCat} style={cellStyle}>
                          <h3 style={{ marginTop: 0 }}>{topCat}</h3>
                          <div style={{ marginLeft: "10px" }}>
                            {subCats.map((subCat) => {
                              const subKey = `${topCat}||${subCat}`;
                              const isSubOpen = !!openSub[subKey];
                              const subVal = nestedData[topCat][subCat];
                              return (
                                <div
                                  key={subCat}
                                  style={{ marginBottom: "8px" }}
                                >
                                  <div
                                    style={{
                                      cursor: "pointer",
                                      fontWeight: "bold",
                                      color: "#333",
                                    }}
                                    onClick={() => toggleSub(topCat, subCat)}
                                  >
                                    {subCat} {isSubOpen ? "(-)" : "(+)"}
                                  </div>
                                  {isSubOpen && (
                                    <div style={{ marginLeft: "15px" }}>
                                      {Array.isArray(subVal)
                                        ? subVal.map((blog) => (
                                            <div
                                              key={blog.slug}
                                              style={{ marginBottom: "4px" }}
                                            >
                                              <Link to={blog.route}>
                                                {blog.name}
                                              </Link>
                                            </div>
                                          ))
                                        : Object.keys(subVal).map(
                                            (thirdKey) => {
                                              const items = subVal[thirdKey];
                                              return (
                                                <div
                                                  key={thirdKey}
                                                  style={{
                                                    marginBottom: "6px",
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      fontStyle: "italic",
                                                    }}
                                                  >
                                                    {thirdKey}
                                                  </div>
                                                  <ul
                                                    style={{
                                                      marginLeft: "20px",
                                                    }}
                                                  >
                                                    {items.map((blog) => (
                                                      <li key={blog.slug}>
                                                        <Link to={blog.route}>
                                                          {blog.name}
                                                        </Link>
                                                      </li>
                                                    ))}
                                                  </ul>
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
                        </td>
                      );
                    })}
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
