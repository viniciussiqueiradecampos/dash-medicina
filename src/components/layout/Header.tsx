import { Search, History, Bell, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import userAvatarUrl from "../../assets/97b3ba4a22daa40c617f6478912494232f8c468d.png";
import { useNavigate } from "react-router-dom";
import { usePatientContext } from "../../context/PatientContext";
import type { Patient } from "../../context/PatientContext";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const { allPatients, setCurrentPatient } = usePatientContext();
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState<Patient[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAvatarMenu, setShowAvatarMenu] = useState(false);
    const [newPatientWaiting, setNewPatientWaiting] = useState(true);
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);

    const [notifications] = useState([
        { id: 1, title: "New Patient Waiting", message: "Alice Johnson has arrived for her 2:30 PM appointment.", time: "2 min ago", unread: true, type: "arrival" },
        { id: 2, title: "Lab Results Ready", message: "Blood test results for Ruben George are now available.", time: "1 hour ago", unread: false, type: "labs" },
        { id: 3, title: "System Update", message: "Medical database will undergo maintenance tonight at 11 PM.", time: "4 hours ago", unread: false, type: "system" }
    ]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
                setShowAvatarMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (value.length > 0) {
            const filtered = allPatients.filter(p =>
                p.name.toLowerCase().includes(value.toLowerCase()) || p.id.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSelectPatient = (patient: Patient) => {
        setCurrentPatient(patient);
        setSearch("");
        setShowSuggestions(false);
        // Navigate to overview to see the data change immediately
        navigate('/overview');
    };

    return (
        <header
            className={cn(
                "hidden xl:flex items-center justify-between w-full h-[100px] px-[50px] pt-[30px] pb-[20px]",
                className
            )}
        >
            {/* Search Bar */}
            <div className="relative w-[645px] h-[46px]" ref={searchRef}>
                <div className="absolute inset-0 bg-[#1d293d]/50 border-[0.8px] border-[#314158]/50 rounded-[14px] backdrop-blur-sm" />
                <div className="relative h-full flex items-center px-[16px]">
                    <Search className="text-[#62748e] w-[20px] h-[20px] ml-2" />
                    <input
                        type="text"
                        placeholder="Search patients, records, appointments..."
                        value={search}
                        onChange={handleSearchChange}
                        onFocus={() => search.length > 0 && setShowSuggestions(true)}
                        className="flex-1 bg-transparent border-none outline-none text-[14px] text-white placeholder-[#62748e] ml-3 font-normal"
                    />
                    <button
                        onClick={() => suggestions[0] && handleSelectPatient(suggestions[0])}
                        className="bg-primary hover:bg-primary-dark text-white text-[12px] font-bold px-4 py-1.5 rounded-lg transition-all"
                    >
                        Search...
                    </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-[52px] left-0 w-full bg-[#17191a] border border-white/10 rounded-[20px] shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
                        {suggestions.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => handleSelectPatient(p)}
                                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group"
                            >
                                <div className="flex items-center gap-3">
                                    <img src={p.image} alt={p.name} className="w-8 h-8 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                    <div>
                                        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{p.name}</p>
                                        <p className="text-[10px] text-[#62748e]">{p.id} • {p.treatment}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold py-1 px-2 rounded-md bg-white/5 text-[#62748e] group-hover:text-[#90a1b9]">Press Enter</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-[30px]">
                {/* View Patient History Button */}
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-history-modal'))}
                    className="flex items-center gap-2 bg-[#f6f6f6] text-primary hover:bg-white hover:shadow-lg transition-all duration-200 px-[13px] py-[8px] rounded-[14px] h-[40px]"
                >
                    <History size={20} className="text-primary" />
                    <span className="text-[14px] font-medium whitespace-nowrap">View patient history</span>
                </button>

                {/* Icons & Profile */}
                <div className="flex items-center gap-[30px] pl-4 border-l border-white/5 h-[40px]">
                    {/* Notification */}
                    <div className="relative" ref={notificationRef}>
                        <button
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                                setNewPatientWaiting(false);
                            }}
                            className="relative group p-1"
                        >
                            <Bell size={24} className={cn(
                                "text-white group-hover:text-primary transition-colors",
                                showNotifications && "text-primary",
                                newPatientWaiting && "animate-bounce text-status-warning"
                            )} />
                            {newPatientWaiting && (
                                <span className="absolute top-0 right-0 w-3 h-3 bg-status-danger rounded-full border-2 border-[#0b0d0f] animate-pulse" />
                            )}
                        </button>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div className="absolute top-[52px] right-0 w-[380px] bg-[#17191a] border border-white/10 rounded-[24px] shadow-2xl z-50 overflow-hidden backdrop-blur-xl bg-opacity-95">
                                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-white">Notifications</h3>
                                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        {notifications.filter(n => n.unread).length} New
                                    </span>
                                </div>
                                <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                                    {notifications.map((n) => (
                                        <div
                                            key={n.id}
                                            className={cn(
                                                "p-5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer relative",
                                                n.unread && "bg-primary/5"
                                            )}
                                        >
                                            {n.unread && (
                                                <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                                            )}
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className={cn("text-sm font-bold", n.unread ? "text-white" : "text-[#90a1b9]")}>
                                                    {n.title}
                                                </h4>
                                                <span className="text-[10px] text-[#62748e]">{n.time}</span>
                                            </div>
                                            <p className="text-[13px] text-[#62748e] leading-relaxed line-clamp-2">
                                                {n.message}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-white/[0.02] text-center border-t border-white/5">
                                    <button className="text-xs font-bold text-primary hover:text-white transition-colors">
                                        View All Notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Settings */}
                    <button
                        onClick={() => navigate("/settings")}
                        className="relative group p-1"
                    >
                        <Settings size={24} className="text-white group-hover:text-primary transition-colors" />
                    </button>

                    {/* Avatar */}
                    <div className="relative" ref={avatarRef}>
                        <button
                            onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                            className={cn(
                                "relative w-[40px] h-[40px] rounded-full overflow-hidden border-2 transition-all",
                                showAvatarMenu ? "border-primary shadow-lg shadow-primary/20" : "border-transparent hover:border-primary"
                            )}
                        >
                            <img
                                src={userAvatarUrl}
                                alt="User Profile"
                                className="w-full h-full object-cover"
                            />
                        </button>

                        {showAvatarMenu && (
                            <div className="absolute top-[52px] right-0 w-[200px] bg-[#17191a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl bg-opacity-95">
                                <div className="p-4 border-b border-white/5">
                                    <p className="text-sm font-bold text-white">Dr. Pedro Campos</p>
                                    <p className="text-[10px] text-[#62748e]">pedro.campos@hospital.com</p>
                                </div>
                                <div className="p-2">
                                    <button
                                        onClick={() => { navigate("/settings"); setShowAvatarMenu(false); }}
                                        className="w-full text-left px-3 py-2 text-xs text-[#90a1b9] hover:bg-white/5 hover:text-white rounded-lg transition-colors"
                                    >
                                        Account Settings
                                    </button>
                                </div>
                                <div className="p-2 border-t border-white/5">
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="w-full text-left px-3 py-2 text-xs text-status-danger hover:bg-status-danger/10 rounded-lg transition-colors font-bold"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
