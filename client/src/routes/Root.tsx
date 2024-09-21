// Root file for routes

import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}

export default Root;
