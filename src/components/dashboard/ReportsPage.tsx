import { useState, useEffect } from "react";
import { FileText, Download, Calendar, ArrowUpRight, ArrowDownRight, Users, CheckCircle, Clock } from "lucide-react";
import { cn } from "../../lib/utils";

// Mock Data for Charts
const WEEKLY_DATA = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 52 },
    { day: "Wed", value: 38 },
    { day: "Thu", value: 65 },
    { day: "Fri", value: 48 },
    { day: "Sat", value: 25 },
    { day: "Sun", value: 30 },
];

const DEPARTMENTS = [
    { name: "Orthopedic", count: 120, color: "bg-primary" },
    { name: "Cardiology", count: 85, color: "bg-status-danger" },
    { name: "Neurology", count: 42, color: "bg-accent-purple" },
    { name: "Pediatrics", count: 68, color: "bg-status-success" },
];

export function ReportsPage() {
    const [period, setPeriod] = useState("Weekly");
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Medical Reports</h1>
                    <p className="text-[#90a1b9]">Performance analytics and patient statistics for Abstract Vision Hospital.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex bg-[#1d293d] p-1 rounded-xl border border-white/5">
                        {["Weekly", "Monthly", "Yearly"].map(p => (
                            <button
                                key={p}
                                onClick={() => { setAnimate(false); setTimeout(() => { setPeriod(p); setAnimate(true); }, 50); }}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs font-medium transition-all",
                                    period === p ? "bg-[#121212] text-white shadow-lg" : "text-[#62748e] hover:text-[#90a1b9]"
                                )}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                    <button className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                        <Download size={20} />
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Patients" value="1,280" trend="+12.5%" trendType="up" icon={Users} color="text-primary" />
                <StatCard label="Completed Cases" value="942" trend="+8.2%" trendType="up" icon={CheckCircle} color="text-status-success" />
                <StatCard label="Avg. Waiting Time" value="18 min" trend="-15%" trendType="down" icon={Clock} color="text-status-warning" />
                <StatCard label="Recovery Rate" value="96.4%" trend="+2.4%" trendType="up" icon={ArrowUpRight} color="text-accent-purple" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Performance Chart */}
                <div className="lg:col-span-2 bg-[#17191a]/50 p-8 rounded-[24px] border border-white/5 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-[3px] h-6 bg-primary rounded-full" />
                            <h2 className="text-xl font-bold text-white">Patient Admittance</h2>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#62748e]">
                            <Calendar size={14} />
                            <span>Nov 03 - Nov 10, 2025</span>
                        </div>
                    </div>

                    <div className="h-[300px] flex items-end justify-between gap-4 px-4 relative mt-12">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {[0, 25, 50, 75, 100].map(val => (
                                <div key={val} className="w-full border-t border-white/[0.03] flex items-center">
                                    <span className="text-[10px] text-[#314158] absolute -left-8">{val}</span>
                                </div>
                            ))}
                        </div>

                        {/* Bars */}
                        {WEEKLY_DATA.map((item, i) => (
                            <div key={item.day} className="flex-1 flex flex-col items-center gap-4 group relative z-10">
                                <div
                                    className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-[8px] transition-all duration-1000 ease-out cursor-pointer hover:shadow-lg hover:shadow-primary/30 relative"
                                    style={{
                                        height: animate ? `${(item.value / 100) * 300}px` : '0px',
                                        transitionDelay: `${i * 100}ms`
                                    }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1d293d] text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.value} patients
                                    </div>
                                </div>
                                <span className="text-[11px] font-bold text-[#62748e] uppercase group-hover:text-primary transition-colors">{item.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Distribution by Department */}
                <div className="bg-[#17191a]/50 p-8 rounded-[24px] border border-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-[3px] h-6 bg-accent-purple rounded-full" />
                        <h2 className="text-xl font-bold text-white">Case Distribution</h2>
                    </div>

                    <div className="space-y-6">
                        {DEPARTMENTS.map((dept, i) => (
                            <div key={dept.name} className="space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-white">{dept.name}</span>
                                    <span className="text-[#90a1b9] font-mono">{dept.count} cases</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-full transition-all duration-1000 ease-out", dept.color)}
                                        style={{
                                            width: animate ? `${(dept.count / 150) * 100}%` : '0%',
                                            transitionDelay: `${i * 150}ms`
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-[#121212] rounded-2xl border border-white/5 text-center">
                        <div className="text-3xl font-bold text-white mb-1">94%</div>
                        <p className="text-[10px] text-[#62748e] uppercase font-bold tracking-wider">Patient Satisfaction</p>
                        <div className="flex justify-center gap-1 mt-3">
                            {[1, 2, 3, 4, 5].map(star => (
                                <div key={star} className="w-2 h-2 rounded-full bg-primary" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent generated reports */}
            <div className="bg-[#17191a]/50 rounded-[24px] border border-white/5 p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Latest Documents</h2>
                    <button className="text-primary text-xs font-bold hover:underline">View archive</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { title: "Monthly Operational Audit", size: "2.4 MB", date: "Oct 31, 2025" },
                        { title: "Departmental Performance", size: "1.8 MB", date: "Oct 28, 2025" },
                        { title: "Patient Satisfaction Survey", size: "4.2 MB", date: "Oct 15, 2025" },
                    ].map((doc, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#1d293d]/50 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <FileText size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-white truncate">{doc.title}</h3>
                                <p className="text-[10px] text-[#62748e] mt-1 uppercase font-bold">{doc.date} • {doc.size}</p>
                            </div>
                            <Download size={16} className="text-[#314158] group-hover:text-white transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, trend, trendType, icon: Icon, color }: any) {
    return (
        <div className="bg-[#17191a]/50 p-6 rounded-[24px] border border-white/5 flex flex-col gap-4 backdrop-blur-sm hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="flex items-center justify-between">
                <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center", color)}>
                    <Icon size={20} />
                </div>
                <div className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold",
                    trendType === "up" ? "bg-status-success/10 text-status-success" : "bg-status-danger/10 text-status-danger"
                )}>
                    {trendType === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {trend}
                </div>
            </div>
            <div>
                <p className="text-xs text-[#62748e] font-bold uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-bold text-white mt-1">{value}</p>
            </div>
        </div>
    );
}
