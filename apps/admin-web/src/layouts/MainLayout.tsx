import NavBar from "../components/NavBar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="w-full px-4 flex-1">{children}</div>
    </div>
  );
};
export default MainLayout;
