import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogsData from "../assets/blogs.json";
import "../hello.css";

export default function DynamicPage() {
  const { version, slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/blogs.json"); // Fetch from public folder
        const data = await response.json();
        const foundBlog = data.find(b => b.version === version && b.slug === slug);
        setBlog(foundBlog);
      } catch (error) {
        console.error("Failed to load blogs.json:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [version, slug]);
  

  useEffect(() => {
    if (!loading) {
      const container = document.getElementById("page-content");
      if (container) {
        const hotSpots = container.querySelectorAll(".MCDropDownHotSpot");
        const handleClick = function(e) {
          e.preventDefault();
          const parent = this.closest(".MCDropDown");
          if (parent.classList.contains("MCDropDown_Closed")) {
            parent.classList.remove("MCDropDown_Closed");
            parent.classList.add("MCDropDown_Open");
          } else {
            parent.classList.add("MCDropDown_Closed");
            parent.classList.remove("MCDropDown_Open");
          }
        };
        hotSpots.forEach(element => {
          element.addEventListener("click", handleClick);
        });
        return () => {
          hotSpots.forEach(element => {
            element.removeEventListener("click", handleClick);
          });
        };
      }
    }
  }, [loading]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!blog) {
    return <div>Page not found.</div>;
  }

  return (
    <article id="page-content" dangerouslySetInnerHTML={{ __html: blog.fullData.html }} />
  );
}
