import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import OnboardingWizard from "../ui/onboarding-wizard";

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <OnboardingWizard />
      <Sidebar />
      <main className="ml-64 p-8 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
