import { NavLink } from "react-router-dom";
import { User, Sparkles, History } from "lucide-react";

const navItems = [
  { to: "/", icon: Sparkles, label: "Ask" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/history", icon: History, label: "History" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-bg-secondary border-r border-border-default flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-border-default">
        <h1 className="text-xl font-bold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
          JobHelper AI
        </h1>
        <p className="text-xs text-text-muted mt-1">Your career assistant</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-accent-soft text-accent border border-accent/20"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {/* <div className="p-4 border-t border-border-default">
        <p className="text-xs text-text-muted text-center">
          Powered by Gemini AI
        </p>
      </div> */}
    </aside>
  );
}
