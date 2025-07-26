import { Outlet } from "react-router-dom";
import MainHeader from "../ui/MainHeader";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header>
        <MainHeader />
      </header>
      <main>
        <Outlet />
      </main>
      {/* <footer>
        <p>Copyright &copy; 2025 Beauty Adore</p>
      </footer> */}
    </div>
  );
};

export default MainLayout;
