import React from "react";
import Layout from "Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "pages/MainPage/MainPage";
import VideoListPage from "pages/VideoListPage/VideoListPage";

const NotFount = () => {
  return (
    <>
      <h1 style={{ margin: 0 }}>Not Found</h1>
      <p>このページには何もありません。</p>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/list" element={<VideoListPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/*" element={<NotFount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
