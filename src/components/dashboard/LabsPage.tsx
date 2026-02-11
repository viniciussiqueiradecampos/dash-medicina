import { useState } from "react";
import { FlaskConical, Search, Clock, CheckCircle2, AlertCircle, FileText, ChevronRight, Plus, Filter, History, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePatientContext } from "../../context/PatientContext";

// Mock Data for Labs
const PENDING_EXAMS = [
    { id: "LAB-9021", patient: "Ruben George", exam: "Blood Count (CBC)", status: "Pending Collection", priority: "Urgent", requestedAt: "10 mins ago" },
    { id: "LAB-9022", patient: "Alice Johnson", exam: "CRP & Sed Rate", status: "Awaiting Analysis", priority: "Routine", requestedAt: "1 hour ago" },
    { id: "LAB-9023", patient: "Bob Smith", exam: "Lipid Panel", status: "In Processing", priority: "Critical", requestedAt: "25 mins ago" },
];

const RECENT_HISTORY = [
    { id: "LAB-8950", patient: "Ruben George", exam: "Liver Function Test", result: "Normal", date: "Nov 08, 2025", doctor: "Dr. Pedro Campos" },
    { id: "LAB-8945", patient: "Eva Martinez", exam: "Thyroid Panel (TSH)", result: "Elevated", date: "Nov 07, 2025", doctor: "Dr. Pedro Campos" },
    { id: "LAB-8940", patient: "David Garcia", exam: "Kidney Function (GFR)", result: "Critical", date: "Nov 06, 2025", doctor: "Dr. Ana Silva" },
];

const STATUS_ICONS: Record<string, any> = {
    "Pending Collection": { icon: Clock, color: "text-status-warning", bg: "bg-status-warning/10" },
    "Awaiting Analysis": { icon: AlertCircle, color: "text-accent-purple", bg: "bg-accent-purple/10" },
    "In Processing": { icon: FlaskConical, color: "text-primary", bg: "bg-primary/10" },
    "Ready": { icon: CheckCircle2, color: "text-status-success", bg: "bg-status-success/10" },
};

export function LabsPage() {
    const { allPatients } = usePatientContext();
    const [search, setSearch] = useState("");
    const [showNewRequest, setShowNewRequest] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRequest = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mock API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setShowNewRequest(false);
            }, 2000);
        }, 1000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Labs Management</h1>
                    <p className="text-[#90a1b9]">Order management, real-time status, and clinical exam history.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowNewRequest(!showNewRequest)}
                        className={cn(
                            "px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg",
                            showNewRequest ? "bg-white/10 text-white" : "bg-primary text-white shadow-primary/20 hover:bg-primary-dark"
                        )}
                    >
                        {showNewRequest ? <X size={18} /> : <Plus size={18} />}
                        {showNewRequest ? "Cancel Request" : "New Request"}
                    </button>
                </div>
            </div>

            {/* New Request Panel */}
            {showNewRequest && (
                <div className="bg-[#1d293d]/50 border border-white/5 rounded-[32px] p-8 animate-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                            <FlaskConical size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Laboratory Requisition</h2>
                            <p className="text-xs text-[#90a1b9]">Specify exam details for the clinical order</p>
                        </div>
                    </div>

                    <form onSubmit={handleRequest} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#62748e] uppercase tracking-wider px-1">Select Patient</label>
                            <select className="w-full bg-[#0b0d0f]/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                                {allPatients.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#62748e] uppercase tracking-wider px-1">Exam Category</label>
                            <select className="w-full bg-[#0b0d0f]/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                                <option>Complete Blood Count (CBC)</option>
                                <option>Lipid Profile</option>
                                <option>Comprehensive Metabolic Panel</option>
                                <option>Thyroid Function Test</option>
                                <option>Radiology / X-Ray</option>
                                <option>MRI / CT Scan</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#62748e] uppercase tracking-wider px-1">Priority Level</label>
                            <div className="flex gap-2">
                                <select className="flex-1 bg-[#0b0d0f]/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                                    <option>Routine</option>
                                    <option>Urgent</option>
                                    <option>Critical (STAT)</option>
                                </select>
                                <button
                                    disabled={isSubmitting || success}
                                    className={cn(
                                        "px-6 rounded-xl font-bold transition-all flex items-center gap-2",
                                        success ? "bg-status-success text-white" : "bg-primary text-white hover:bg-primary-dark"
                                    )}
                                >
                                    {isSubmitting ? <Clock size={18} className="animate-spin" /> : success ? <CheckCircle2 size={18} /> : <Plus size={18} />}
                                    {success ? "Requested" : "Submit"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pending Requests Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-[3px] h-6 bg-status-warning rounded-full" />
                            <h2 className="text-xl font-bold text-white">Pending Requests</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#62748e]" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search orders..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-[#1d293d] border border-white/5 rounded-lg py-1.5 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-primary transition-all w-[180px]"
                                />
                            </div>
                            <button className="p-2 bg-white/5 rounded-lg text-[#62748e] hover:text-white transition-colors">
                                <Filter size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {PENDING_EXAMS.map((exam) => {
                            const Status = STATUS_ICONS[exam.status];
                            return (
                                <div key={exam.id} className="bg-[#17191a]/50 p-6 rounded-[24px] border border-white/5 backdrop-blur-sm hover:bg-white/[0.02] transition-all group">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", Status.bg)}>
                                                <Status.icon className={Status.color} size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold">{exam.exam}</h3>
                                                <p className="text-xs text-[#90a1b9]">{exam.patient} • ID: {exam.id}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border",
                                                exam.priority === "Urgent" ? "bg-status-warning/10 text-status-warning border-status-warning/20" :
                                                    exam.priority === "Critical" ? "bg-status-danger/10 text-status-danger border-status-danger/20" :
                                                        "bg-primary/10 text-primary border-primary/20"
                                            )}>
                                                {exam.priority}
                                            </span>
                                            <p className="text-[10px] text-[#62748e] mt-2 italic">Requested {exam.requestedAt}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-2 h-2 rounded-full", Status.color.replace('text-', 'bg-'))} />
                                                <span className={cn("text-xs font-bold", Status.color)}>{exam.status}</span>
                                            </div>
                                            <div className="h-4 w-[1px] bg-white/5" />
                                            <p className="text-xs text-[#62748e]">Processing stage: <span className="text-white font-medium">Initial collection</span></p>
                                        </div>
                                        <button className="flex items-center gap-1 text-xs font-bold text-primary hover:text-white transition-colors">
                                            View Details
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* History Sidebar */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-[3px] h-6 bg-primary rounded-full" />
                        <h2 className="text-xl font-bold text-white">Order History</h2>
                    </div>

                    <div className="bg-[#17191a]/50 rounded-[24px] border border-white/5 overflow-hidden backdrop-blur-sm">
                        <div className="p-4 border-b border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#62748e] uppercase tracking-wider">Latest Completed</span>
                            <History size={14} className="text-[#62748e]" />
                        </div>
                        <div className="divide-y divide-white/5">
                            {RECENT_HISTORY.map((h) => (
                                <div key={h.id} className="p-5 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{h.exam}</h4>
                                        <span className={cn(
                                            "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                            h.result === "Normal" ? "bg-status-success/10 text-status-success" :
                                                h.result === "Elevated" ? "bg-status-warning/10 text-status-warning" :
                                                    "bg-status-danger/10 text-status-danger"
                                        )}>
                                            {h.result}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#90a1b9]">{h.patient}</p>
                                    <div className="flex justify-between items-center mt-3 text-[10px] text-[#62748e]">
                                        <span>{h.date}</span>
                                        <span>{h.doctor}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 text-xs font-bold text-[#62748e] hover:text-white transition-colors border-t border-white/5 hover:bg-white/[0.02]">
                            View Full Laboratory Log
                        </button>
                    </div>

                    {/* Quick Action: Lab Docs */}
                    <div className="bg-primary/5 border border-primary/20 p-6 rounded-[24px] space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Lab Certifications</h3>
                                <p className="text-[10px] text-[#90a1b9]">Accredited Laboratory System</p>
                            </div>
                        </div>
                        <p className="text-xs text-[#90a1b9] leading-relaxed">
                            Access documentation for laboratory accreditation and standard operating procedures.
                        </p>
                        <button className="w-full py-2 bg-primary/20 text-primary text-xs font-bold rounded-lg border border-primary/30 hover:bg-primary/30 transition-all">
                            Open SOP Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
