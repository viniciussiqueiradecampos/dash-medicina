import { Link, useLocation } from "react-router-dom";
import {
    Activity,
    FlaskConical,
    Users,
    FileText,
    Settings,
    Menu,
    Home,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { cn } from "../../lib/utils";
import logoUrl from "../../assets/logo.svg";
import closeLogoUrl from "../../assets/close-logo.svg";
import userAvatarUrl from "../../assets/97b3ba4a22daa40c617f6478912494232f8c468d.png";

interface SidebarProps {
    className?: string;
    isCollapsed?: boolean;
    onToggle?: () => void;
}

const NAV_ITEMS = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Overview", icon: Activity, path: "/overview" },
    { label: "Labs", icon: FlaskConical, path: "/labs" },
    { label: "Patients", icon: Users, path: "/patients" },
    { label: "Reports", icon: FileText, path: "/reports" },
    { label: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar({ className, isCollapsed, onToggle }: SidebarProps) {
    const location = useLocation();
    const activePath = location.pathname;

    return (
        <aside
            className={cn(
                "hidden xl:flex flex-col fixed left-0 top-0 h-full z-40 bg-[#121212] transition-all duration-300 ease-in-out",
                isCollapsed ? "w-[100px] px-4" : "w-[297px] pl-[20px] pr-0",
                "py-[30px]",
                "shadow-[10px_-3px_53.4px_0px_rgba(0,0,0,0.25)]",
                className
            )}
        >
            {/* Toggle Button */}
            <button
                onClick={onToggle}
                className={cn(
                    "absolute -right-3 top-[102px] w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white shadow-lg z-50 hover:scale-110 transition-transform",
                    isCollapsed && "right-4"
                )}
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Logo */}
            <div className={cn(
                "mb-[60px] pl-2 overflow-hidden transition-all duration-300 flex items-center justify-center",
                isCollapsed ? "w-full pl-0" : "w-[180px]"
            )}>
                <img
                    src={isCollapsed ? closeLogoUrl : logoUrl}
                    alt="Abstract Vision"
                    className={cn(
                        "h-auto object-contain transition-all duration-300 animate-in fade-in zoom-in-95",
                        isCollapsed ? "w-8" : "w-full"
                    )}
                />
            </div>

            {/* Navigation */}
            <nav className={cn(
                "flex-1 flex flex-col gap-2 w-full transition-all duration-300",
                !isCollapsed && "pr-[20px]"
            )}>
                {NAV_ITEMS.map((item) => {
                    const isActive = activePath === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={isCollapsed ? item.label : ""}
                            className={cn(
                                "flex items-center gap-4 h-[44px] rounded-xl transition-all duration-200 group text-sm font-medium relative",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-text-secondary hover:text-white hover:bg-white/5",
                                isCollapsed ? "justify-center px-0" : "px-4"
                            )}
                        >
                            <item.icon
                                size={20}
                                className={cn(
                                    "transition-colors shrink-0",
                                    isActive ? "text-white" : "text-text-secondary group-hover:text-white"
                                )}
                            />
                            {!isCollapsed && <span className="truncate">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className={cn(
                "mt-auto mb-[16px] transition-all duration-300",
                !isCollapsed && "pr-[20px]"
            )}>
                <div className={cn(
                    "flex items-center gap-3 p-3 rounded-xl bg-[#1d293d]/50 border border-[#314158]/50 backdrop-blur-sm transition-all duration-300",
                    isCollapsed ? "justify-center px-2" : ""
                )}>
                    <div className="relative shrink-0">
                        <img
                            src={userAvatarUrl}
                            alt="Dr. Admin"
                            className="w-10 h-10 rounded-full object-cover border-2 border-accent-purple/30"
                        />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-status-success rounded-full border-2 border-[#121212]"></div>
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col truncate">
                            <span className="text-sm font-bold text-white truncate">Dr. Admin</span>
                            <span className="text-xs text-text-secondary truncate">Physician</span>
                        </div>
                    )}
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
