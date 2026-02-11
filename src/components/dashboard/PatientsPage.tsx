import { useState } from "react";
import { Search, UserCheck, ChevronRight, Users, X, Save, Filter } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePatientContext } from "../../context/PatientContext";
import type { Patient } from "../../context/PatientContext";
import { useNavigate } from "react-router-dom";

const LABEL_COLORS: Record<string, string> = {
    Urgent: "bg-status-warning/10 text-status-warning border-status-warning/20",
    Critical: "bg-status-danger/10 text-status-danger border-status-danger/20",
    Routine: "bg-primary/10 text-primary border-primary/20",
};

export function PatientsPage() {
    const { allPatients, setCurrentPatient, updatePatient } = usePatientContext();
    const [search, setSearch] = useState("");
    const [filterGender, setFilterGender] = useState("All");
    const [filterLabel, setFilterLabel] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterDate, setFilterDate] = useState("");
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
    const navigate = useNavigate();

    const filteredPatients = allPatients.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
        const matchesGender = filterGender === "All" || p.gender === filterGender;
        const matchesLabel = filterLabel === "All" || p.label === filterLabel;
        const matchesDate = !filterDate || (p.lastVisit && p.lastVisit === filterDate);
        const isCompleted = p.status === "Recovered";
        const matchesStatus = filterStatus === "All" || (filterStatus === "Completed" ? isCompleted : !isCompleted);
        return matchesSearch && matchesGender && matchesLabel && matchesStatus && matchesDate;
    });

    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPatient) {
            updatePatient(editingPatient);
            setEditingPatient(null);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full relative">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Patients Registry</h1>
                    <p className="text-sm md:text-base text-[#90a1b9]">A comprehensive list of all patients currently in the hospital system.</p>
                </div>

                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <div className="relative w-full xl:w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#62748e]" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-[#1d293d] border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center bg-[#17191a]/50 p-4 md:p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#62748e] uppercase tracking-wider">Gender:</span>
                        <div className="flex gap-1">
                            {["All", "Male", "Female"].map(g => (
                                <button
                                    key={g}
                                    onClick={() => setFilterGender(g)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                                        filterGender === g ? "bg-primary text-white" : "bg-white/5 text-[#90a1b9] hover:bg-white/10"
                                    )}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-6 w-[1px] bg-white/5 hidden xl:block" />
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#62748e] uppercase tracking-wider">Urgency:</span>
                        <div className="flex gap-1">
                            {["All", "Urgent", "Critical", "Routine"].map(l => (
                                <button
                                    key={l}
                                    onClick={() => setFilterLabel(l)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                                        filterLabel === l ? "bg-primary text-white" : "bg-white/5 text-[#90a1b9] hover:bg-white/10"
                                    )}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-6 w-[1px] bg-white/5 hidden xl:block" />
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#62748e] uppercase tracking-wider">Status:</span>
                        <div className="flex gap-1">
                            {["All", "Completed", "In Progress"].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setFilterStatus(s)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                                        filterStatus === s ? "bg-primary text-white" : "bg-white/5 text-[#90a1b9] hover:bg-white/10"
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 lg:ml-auto">
                    <div className="flex items-center gap-2 flex-1 lg:flex-none">
                        <span className="text-[10px] font-bold text-[#62748e] uppercase tracking-wider whitespace-nowrap">Last Visit:</span>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="bg-[#1d293d] border border-white/5 rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none focus:border-primary transition-all color-scheme-dark"
                        />
                        {filterDate && (
                            <button
                                onClick={() => setFilterDate("")}
                                className="p-1.5 hover:bg-white/10 rounded-lg text-[#62748e] hover:text-white transition-all"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                    <div className="hidden sm:block text-[10px] text-[#62748e] whitespace-nowrap">
                        Showing <span className="text-white font-bold">{filteredPatients.length}</span> patients
                    </div>
                </div>
            </div>

            {/* Patients List */}
            <div className="bg-[#17191a]/50 rounded-[24px] border border-white/5 overflow-hidden backdrop-blur-sm shadow-2xl">
                <div className="hidden md:grid grid-cols-12 px-8 py-4 bg-white/5 border-b border-white/5 text-[10px] font-bold text-[#62748e] uppercase tracking-[0.1em]">
                    <div className="col-span-4">Patient Information</div>
                    <div className="col-span-2 text-center">ID Number</div>
                    <div className="col-span-3">Medical Case / Treatment</div>
                    <div className="col-span-2">Priority Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                <div className="divide-y divide-white/5">
                    {filteredPatients.map((patient) => (
                        <div key={patient.id} className="flex flex-col md:grid md:grid-cols-12 px-6 md:px-8 py-6 md:py-5 items-start md:items-center hover:bg-white/[0.02] transition-colors group gap-4 md:gap-0">
                            {/* Patient Info */}
                            <div className="col-span-4 flex items-center gap-4 cursor-pointer w-full" onClick={() => { setCurrentPatient(patient); navigate('/overview'); }}>
                                <div className="relative shrink-0">
                                    <img src={patient.image} alt={patient.name} className="w-12 h-12 md:w-11 md:h-11 rounded-full object-cover border-2 border-white/5 group-hover:border-primary/50 transition-colors" />
                                    <div className={cn(
                                        "absolute -bottom-1 -right-1 w-4 h-4 md:w-3.5 md:h-3.5 rounded-full border-2 border-[#17191a]",
                                        patient.gender === "Male" ? "bg-[#38bdf8]" : "bg-[#f472b6]"
                                    )} />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{patient.name}</h3>
                                    <p className="text-xs text-[#62748e]">{patient.gender} • {patient.age} years old</p>
                                </div>
                            </div>

                            {/* ID - Mobile Label Added */}
                            <div className="col-span-2 md:text-center flex md:block items-center justify-between w-full">
                                <span className="md:hidden text-[10px] font-bold text-[#62748e] uppercase tracking-wider">ID Number</span>
                                <span className="font-mono text-xs md:text-[11px] text-[#90a1b9] bg-white/5 md:bg-transparent px-2 py-1 md:p-0 rounded-md md:rounded-none">
                                    {patient.id}
                                </span>
                            </div>

                            {/* Treatment */}
                            <div className="col-span-3 w-full">
                                <span className="md:hidden text-[10px] font-bold text-[#62748e] uppercase tracking-wider block mb-1">Medical Case</span>
                                <p className="text-sm md:text-xs text-white font-medium">{patient.treatment}</p>
                                <div className="flex items-center gap-1.5 mt-1.5 md:mt-1">
                                    <UserCheck size={12} className="text-[#00bc7d]" />
                                    <span className="text-[11px] md:text-[10px] text-[#62748e] font-bold uppercase tracking-widest">{patient.status}</span>
                                </div>
                            </div>

                            {/* Priority Status */}
                            <div className="col-span-2 flex md:block items-center justify-between w-full">
                                <span className="md:hidden text-[10px] font-bold text-[#62748e] uppercase tracking-wider">Priority</span>
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                    LABEL_COLORS[patient.label]
                                )}>
                                    {patient.label}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="col-span-1 flex justify-end gap-3 md:gap-2 w-full pt-4 md:pt-0 border-t border-white/5 md:border-t-0 mt-2 md:mt-0">
                                <button
                                    onClick={() => setEditingPatient(patient)}
                                    className="flex-1 md:flex-none py-2.5 md:p-2 bg-white/5 md:bg-transparent text-[#62748e] hover:text-white hover:bg-white/10 rounded-xl md:rounded-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <Filter size={18} />
                                    <span className="md:hidden text-xs font-bold uppercase">Filter/Edit</span>
                                </button>
                                <button
                                    onClick={() => { setCurrentPatient(patient); navigate('/overview'); }}
                                    className="flex-1 md:flex-none py-2.5 md:p-2 bg-primary/10 md:bg-transparent text-primary md:text-[#62748e] hover:text-white hover:bg-primary-dark md:hover:bg-white/5 rounded-xl md:rounded-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="md:hidden text-xs font-bold uppercase">View Profile</span>
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Modal Overlay */}
            {editingPatient && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setEditingPatient(null)} />
                    <div className="relative w-full max-w-xl bg-[#17191a] rounded-[32px] border border-white/10 shadow-3xl animate-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Edit Patient info</h2>
                                    <p className="text-xs text-[#90a1b9]">Update details for {editingPatient.name}</p>
                                </div>
                            </div>
                            <button onClick={() => setEditingPatient(null)} className="p-2 text-[#62748e] hover:text-white hover:bg-white/10 rounded-full transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#62748e] uppercase tracking-wider px-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={editingPatient.name}
                                        onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })}
                                        className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#62748e] uppercase tracking-wider px-1">Case / Treatment</label>
                                    <input
                                        type="text"
                                        value={editingPatient.treatment}
                                        onChange={(e) => setEditingPatient({ ...editingPatient, treatment: e.target.value })}
                                        className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#62748e] uppercase tracking-wider px-1">Gender</label>
                                    <select
                                        value={editingPatient.gender}
                                        onChange={(e) => setEditingPatient({ ...editingPatient, gender: e.target.value })}
                                        className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-all font-medium"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#62748e] uppercase tracking-wider px-1">Priority</label>
                                    <select
                                        value={editingPatient.label}
                                        onChange={(e) => setEditingPatient({ ...editingPatient, label: e.target.value })}
                                        className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-all font-medium"
                                    >
                                        <option value="Urgent">Urgent</option>
                                        <option value="Critical">Critical</option>
                                        <option value="Routine">Routine</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#62748e] uppercase tracking-wider px-1">Age</label>
                                    <input
                                        type="number"
                                        value={editingPatient.age}
                                        onChange={(e) => setEditingPatient({ ...editingPatient, age: parseInt(e.target.value) })}
                                        className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20"
                                >
                                    <Save size={20} /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
