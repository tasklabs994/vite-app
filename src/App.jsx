import React, { lazy, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const DynamicPage = lazy(() => import("./pages/DynamicPage"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<DynamicPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
