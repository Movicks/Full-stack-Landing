// MainLayout file to house the Routes
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const MainLayouts = () => {
  return (
    <main className="h-full w-full">
      <Header />
      <div className="h-full px-2 w-full pb-[2rem]">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayouts;
