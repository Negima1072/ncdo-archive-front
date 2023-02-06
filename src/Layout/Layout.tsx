import React, { useMemo } from "react";
import Header from "Header/Header";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const mainClass = useMemo<string>(() => {
    if (location.pathname.startsWith("/video")) {
      return "videoDetail";
    }
    return "";
  }, [location.pathname]);
  return (
    <>
      <Header />
      <main className={mainClass}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
