import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Activity,
    FlaskConical,
    Users,
    FileText,
    Settings,
    Menu,
    Home,
    ChevronLeft,
    ChevronRight,
    X
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
                className="absolute -right-3 top-[102px] w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white shadow-lg z-50 hover:scale-110 transition-transform"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Logo */}
            <div className={cn(
                "mb-[60px] overflow-hidden transition-all duration-300 flex items-center justify-center h-[70px]",
                isCollapsed ? "w-full pl-0" : "w-[180px] pl-2"
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
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="xl:hidden fixed top-0 left-0 right-0 h-[64px] bg-[#121212] z-50 flex items-center justify-between px-4 border-b border-white/5">
            <div className="flex items-center gap-3">
                <button onClick={onMenuClick} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg">
                    <Menu size={24} />
                </button>
                <img src={logoUrl} alt="Abstract Vision" className="h-10 w-auto mix-blend-lighten" />
            </div>

            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border transition-all",
                        showUserMenu
                            ? "bg-primary border-primary shadow-lg shadow-primary/20"
                            : "bg-primary/20 border-primary/20"
                    )}
                >
                    <span className={cn("font-bold text-xs", showUserMenu ? "text-white" : "text-primary")}>DA</span>
                </button>

                {showUserMenu && (
                    <div className="absolute top-[56px] right-0 w-[220px] bg-[#17191a] border border-white/10 rounded-2xl shadow-3xl z-[100] overflow-hidden backdrop-blur-xl bg-opacity-95 animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                            <p className="text-sm font-bold text-white">Dr. Admin</p>
                            <p className="text-[10px] text-[#62748e]">pedro.campos@hospital.com</p>
                        </div>
                        <div className="p-2">
                            <button
                                onClick={() => { navigate("/settings"); setShowUserMenu(false); }}
                                className="w-full text-left px-3 py-2.5 text-xs text-[#90a1b9] hover:bg-white/5 hover:text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Settings size={14} />
                                Account Settings
                            </button>
                            <button
                                onClick={() => { navigate("/login"); setShowUserMenu(false); }}
                                className="w-full text-left px-3 py-2.5 text-xs text-status-danger hover:bg-status-danger/10 rounded-lg transition-colors font-bold mt-1 flex items-center gap-2"
                            >
                                <X size={14} />
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
