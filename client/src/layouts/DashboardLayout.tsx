import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PageContainer from "../components/PageContainer";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}") || {};

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar userName={user.name} />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 lg:flex-row lg:items-start">
        <Sidebar />
        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
}

export default DashboardLayout;
