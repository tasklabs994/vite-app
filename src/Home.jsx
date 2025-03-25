import React, { useState } from "react";
import { Link } from "react-router-dom";
import blogsData from "./blogs.json";

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
    return val[0].route;
  }
  if (val && typeof val === "object") {
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
      if (!Array.isArray(nested[top][sub])) {
        nested[top][sub] = [];
      }
      addBlogToArray(nested[top][sub], blog);
    } else {
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

  // top-level categories
  const topCats = Object.keys(nestedData);
  // 3,3,2 layout
  const rowSizes = [3, 3, 2];
  let rows = [];
  if (topCats.length >= 8) {
    rows = customChunk(topCats, rowSizes);
  } else {
    rows = [topCats];
  }

  return (
    <div
      className="mt-[120px] w-full text-black"
      style={{ fontFamily: "inherit" }}
    >
      {/* Version Toggle */}
      <div className="m-5 text-center">
        {versions.map((version) => (
          <button
            key={version}
            className={`py-2.5 px-5 mx-[10px] rounded bg-[#e0e0e0] cursor-pointer font-bold transition-colors duration-200 ${
              selectedVersion === version ? "bg-[#3179c1] text-white" : ""
            } hover:bg-[#d0d0d0]`}
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
      <div className="mt-5 mb-5 w-full text-center">
        <input
          type="text"
          placeholder="Search pages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-4/5 p-2.5 text-base border-2 border-[#ccc] rounded bg-[rgb(240,240,240)] text-black"
        />
      </div>

      {searchQuery ? (
        // Show blog cards
        <div className="flex flex-col">
          {filteredBlogs.map((blog, idx) => (
            <a
              key={idx}
              href={blog.route}
              className="w-[90%] ml-12 mr-20 bg-[#f4f4f4] border border-[#ddd] rounded-lg p-5 mb-5 shadow no-underline transition-transform duration-200 transform hover:-translate-y-[5px]"
              style={{ color: "#0083DB", textDecoration: "none" }}
            >
              <span className="text-xs text-[#666] block mb-[5px]">
                {blog.fullPath}
              </span>
              <h2 className="text-black text-xl mt-0">{blog.name}</h2>
              <p className="text-[#333] text-sm">{blog.snippet}...</p>
            </a>
          ))}
          {filteredBlogs.length === 0 && <p>No pages found.</p>}
        </div>
      ) : (
        // 3,3,2 table layout
        <table
          className="border-separate border-spacing-4 mt-[10px] mb-[40px] mx-auto w-[65%] text-[#0083DB]"
          style={{
            fontFamily: "Lucida Sans Unicode, Lucida Grande, Arial, sans-serif",
          }}
        >
          <colgroup>
            <col style={{ width: "33.33%" }} />
            <col style={{ width: "33.33%" }} />
            <col style={{ width: "33.33%" }} />
          </colgroup>
          <tbody>
            {rows.map((row, rowIndex) => {
              const expectedCols = rowSizes[rowIndex] || row.length;
              return (
                <tr key={rowIndex}>
                  {row.map((topCat) => {
                    const subCats = Object.keys(nestedData[topCat] || {});
                    return (
                      <td key={topCat} className="align-top p-0 text-[0.9rem]">
                        <div className="border-[2.2px] border-[#0083DB] p-[15px] rounded-none min-h-[315px]">
                          <h3 className="mt-0 mb-[10px] text-[#0083DB] text-[1.1rem] font-bold">
                            {topCat}
                          </h3>
                          <div className="ml-[10px] text-[#0083DB]">
                            {subCats.map((subCat) => {
                              const subVal = nestedData[topCat][subCat];
                              const subKey = `${topCat}||${subCat}`;
                              const hasThirdLevel =
                                !Array.isArray(subVal) &&
                                Object.keys(subVal).length > 0;
                              let route = null;
                              if (!hasThirdLevel) {
                                route = subVal.length ? subVal[0].route : "#";
                              }
                              const isSubOpen = !!openSub[subKey];
                              return (
                                <div key={subCat} className="mb-[5px]">
                                  {hasThirdLevel ? (
                                    <div
                                      className="cursor-pointer text-[#0083DB]"
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
                                      className="text-[#0083DB] no-underline font-bold"
                                    >
                                      {subCat}
                                    </a>
                                  )}
                                  {hasThirdLevel && isSubOpen && (
                                    <div className="ml-[20px] mt-[5px]">
                                      {Object.keys(subVal).map((thirdKey) => {
                                        const thirdVal = subVal[thirdKey];
                                        const thirdRoute =
                                          findFirstBlogRoute(thirdVal) || "#";
                                        return (
                                          <div
                                            key={thirdKey}
                                            className="mb-[5px]"
                                          >
                                            <a
                                              href={thirdRoute}
                                              className="text-[#0083DB] no-underline"
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
                  {row.length < expectedCols &&
                    Array.from({ length: expectedCols - row.length }).map(
                      (_, idx) => (
                        <td
                          key={`empty-${idx}`}
                          className="align-top p-0 text-[0.9rem]"
                        ></td>
                      )
                    )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
