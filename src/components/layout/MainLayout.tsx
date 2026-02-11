import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar, MobileHeader } from "./Sidebar";
import { Header } from "./Header";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import logoUrl from "../../assets/logo.svg";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <div className="flex w-full min-h-screen bg-bg-main relative font-sans text-white overflow-x-hidden">
            {/* Sidebar Desktop */}
            {!isLoginPage && (
                <Sidebar
                    className="hidden xl:flex z-50"
                    isCollapsed={isCollapsed}
                    onToggle={() => setIsCollapsed(!isCollapsed)}
                />
            )}

            {/* Mobile Drawer (Overlay) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] xl:hidden">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute top-0 left-0 bottom-0 w-[85vw] max-w-[320px] bg-bg-sidebar shadow-2xl animate-in slide-in-from-left duration-300 p-6 z-[70] flex flex-col">
                        <div className="flex items-center justify-between mb-10">
                            <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-2 flex-1">
                            {[
                                { label: "Home", path: "/" },
                                { label: "Overview", path: "/overview" },
                                { label: "Labs", path: "/labs" },
                                { label: "Patients", path: "/patients" },
                                { label: "Reports", path: "/reports" },
                                { label: "Settings", path: "/settings" },
                            ].map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "px-4 py-3.5 rounded-2xl font-bold text-sm transition-all border border-transparent flex items-center justify-between group",
                                        location.pathname === item.path
                                            ? "bg-primary text-white shadow-lg shadow-primary/20 border-white/5"
                                            : "text-text-secondary hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {item.label}
                                    {location.pathname === item.path && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-auto pt-6 border-t border-white/5">
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                <img src="https://xsgames.co/randomusers/assets/avatars/male/1.jpg" alt="Admin" className="w-10 h-10 rounded-full object-cover" />
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-white truncate">Dr. Admin</p>
                                    <p className="text-[10px] text-text-secondary truncate">pedro.campos@hospital.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className={cn(
                "flex-1 flex flex-col w-full min-h-screen transition-all duration-300",
                !isLoginPage && (isCollapsed ? "xl:pl-[100px]" : "xl:pl-[297px]")
            )}>
                {!isLoginPage && <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />}

                {/* Fixed Desktop Header */}
                {!isLoginPage && (
                    <div className={cn(
                        "hidden xl:block fixed top-0 right-0 z-40 bg-bg-main/95 backdrop-blur-sm border-b border-white/5 transition-all duration-300",
                        isCollapsed ? "left-[100px]" : "left-[297px]"
                    )}>
                        <Header />
                    </div>
                )}

                {/* Content with top padding to account for fixed header */}
                <main className={cn(
                    "flex-1 w-full max-w-[1920px]",
                    !isLoginPage ? "pt-[84px] xl:pt-[120px] p-4 sm:p-6 lg:p-8" : "flex items-center justify-center"
                )}>
                    {children}
                </main>
            </div>
        </div>
    );
}
