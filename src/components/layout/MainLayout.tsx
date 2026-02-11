import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar, MobileHeader } from "./Sidebar";
import { Header } from "./Header";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import logoUrl from "../../assets/logotipo.png";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <div className="flex w-full min-h-screen bg-bg-main relative font-sans text-white overflow-x-hidden">
            {/* Sidebar Desktop */}
            {!isLoginPage && <Sidebar className="hidden xl:flex z-50" />}

            {/* Mobile Drawer (Overlay) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] xl:hidden">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute top-0 left-0 bottom-0 w-[80vw] max-w-[300px] bg-bg-sidebar shadow-2xl animate-slide-in p-4 z-[70]">
                        <div className="flex items-center justify-between mb-8">
                            <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-white hover:bg-white/10 rounded-lg"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        {/* Reusing navigation logic could be refactored, but for now simple links */}
                        <nav className="flex flex-col gap-2">
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={cn("px-4 py-3 rounded-xl font-medium transition-all", location.pathname === "/" ? "bg-primary text-white" : "text-text-secondary hover:text-white hover:bg-white/5")}>
                                Home
                            </Link>
                            <Link to="/overview" onClick={() => setIsMobileMenuOpen(false)} className={cn("px-4 py-3 rounded-xl font-medium transition-all", location.pathname === "/overview" ? "bg-primary text-white" : "text-text-secondary hover:text-white hover:bg-white/5")}>
                                Overview
                            </Link>
                            <Link to="/patients" onClick={() => setIsMobileMenuOpen(false)} className={cn("px-4 py-3 rounded-xl font-medium transition-all", location.pathname === "/patients" ? "bg-primary text-white" : "text-text-secondary hover:text-white hover:bg-white/5")}>
                                Patients
                            </Link>
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className={cn(
                "flex-1 flex flex-col w-full min-h-screen transition-all duration-300",
                !isLoginPage && "xl:pl-[297px]"
            )}>
                {!isLoginPage && <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />}

                {/* Fixed Desktop Header */}
                {!isLoginPage && (
                    <div className="hidden xl:block fixed top-0 right-0 left-[297px] z-40 bg-bg-main/95 backdrop-blur-sm border-b border-white/5">
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
