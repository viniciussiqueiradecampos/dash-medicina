import { Link, useLocation } from "react-router-dom";
import {
    Activity,
    FlaskConical,
    Users,
    FileText,
    Settings,
    Menu,
    Home
} from "lucide-react";
import { cn } from "../../lib/utils";
import logoUrl from "../../assets/logo.svg";
import userAvatarUrl from "../../assets/97b3ba4a22daa40c617f6478912494232f8c468d.png";

interface SidebarProps {
    className?: string;
}

const NAV_ITEMS = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Overview", icon: Activity, path: "/overview" },
    { label: "Labs", icon: FlaskConical, path: "/labs" },
    { label: "Patients", icon: Users, path: "/patients" },
    { label: "Reports", icon: FileText, path: "/reports" },
    { label: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar({ className }: SidebarProps) {
    const location = useLocation();
    const activePath = location.pathname;

    return (
        <aside
            className={cn(
                "hidden xl:flex flex-col fixed left-0 top-0 h-full z-40 bg-[#121212]",
                "w-[297px] py-[30px] pl-[20px] pr-0", // Specific Padding from specs
                "shadow-[10px_-3px_53.4px_0px_rgba(0,0,0,0.25)]", // Specific Shadow
                className
            )}
        >
            {/* Logo */}
            <div className="mb-[60px] pl-2">
                <img
                    src={logoUrl}
                    alt="Abstract Vision"
                    className="w-[180px] h-auto object-contain"
                />
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-2 w-full pr-[20px]">
                {NAV_ITEMS.map((item) => {
                    const isActive = activePath === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-4 px-4 h-[44px] rounded-xl transition-all duration-200 group text-sm font-medium",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-text-secondary hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon
                                size={20}
                                className={cn(
                                    "transition-colors",
                                    isActive ? "text-white" : "text-text-secondary group-hover:text-white"
                                )}
                            />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="mt-auto mb-[16px] pr-[20px]">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1d293d]/50 border border-[#314158]/50 backdrop-blur-sm">
                    <div className="relative">
                        <img
                            src={userAvatarUrl}
                            alt="Dr. Admin"
                            className="w-10 h-10 rounded-full object-cover border-2 border-accent-purple/30"
                        />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-status-success rounded-full border-2 border-[#121212]"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">Dr. Admin</span>
                        <span className="text-xs text-text-secondary">Physician</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

// Mobile Header with Drawer Trigger
interface MobileHeaderProps {
    onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
    return (
        <header className="xl:hidden fixed top-0 left-0 right-0 h-[64px] bg-[#121212] z-50 flex items-center justify-between px-4 border-b border-white/5">
            <div className="flex items-center gap-3">
                <button onClick={onMenuClick} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg">
                    <Menu size={24} />
                </button>
                <img src={logoUrl} alt="Abstract Vision" className="h-10 w-auto mix-blend-lighten" />
            </div>

            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-xs">DA</span>
            </div>
        </header>
    );
}
