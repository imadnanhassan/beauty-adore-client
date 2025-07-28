import { Outlet } from "react-router-dom";
import MainHeader from "../ui/MainHeader";
import MainFooter from "../ui/MainFooter";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <MainHeader />
      <main>
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
