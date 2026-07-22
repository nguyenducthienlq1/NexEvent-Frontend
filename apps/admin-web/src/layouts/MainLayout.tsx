import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="w-full px-4 flex-1">
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;
