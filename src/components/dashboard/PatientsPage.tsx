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
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
    const navigate = useNavigate();

    const filteredPatients = allPatients.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
        const matchesGender = filterGender === "All" || p.gender === filterGender;
        const matchesLabel = filterLabel === "All" || p.label === filterLabel;
        const isCompleted = p.status === "Recovered";
        const matchesStatus = filterStatus === "All" || (filterStatus === "Completed" ? isCompleted : !isCompleted);
        return matchesSearch && matchesGender && matchesLabel && matchesStatus;
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Patients Registry</h1>
                    <p className="text-[#90a1b9]">A comprehensive list of all patients currently in the hospital system.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#62748e]" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-[#1d293d] border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all w-[300px]"
                        />
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap gap-4 items-center bg-[#17191a]/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#62748e] uppercase tracking-wider">Gender:</span>
                    {["All", "Male", "Female"].map(g => (
                        <button
                            key={g}
                            onClick={() => setFilterGender(g)}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-medium transition-all",
                                filterGender === g ? "bg-primary text-white" : "bg-white/5 text-[#90a1b9] hover:bg-white/10"
                            )}
                        >
                            {g}
                        </button>
                    ))}
                </div>
                <div className="h-6 w-[1px] bg-white/5 mx-2 hidden md:block" />
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#62748e] uppercase tracking-wider">Urgency:</span>
                    {["All", "Urgent", "Critical", "Routine"].map(l => (
                        <button
                            key={l}
                            onClick={() => setFilterLabel(l)}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-medium transition-all",
                                filterLabel === l ? "bg-primary text-white" : "bg-white/5 text-[#90a1b9] hover:bg-white/10"
                            )}
                        >
                            {l}
                        </button>
                    ))}
                </div>
                <div className="h-6 w-[1px] bg-white/5 mx-2 hidden md:block" />
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#62748e] uppercase tracking-wider">Status:</span>
                    {["All", "Completed", "In Progress"].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-medium transition-all",
                                filterStatus === s ? "bg-primary text-white" : "bg-white/5 text-[#90a1b9] hover:bg-white/10"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <div className="ml-auto text-xs text-[#62748e]">
                    Showing <span className="text-white font-bold">{filteredPatients.length}</span> patients
                </div>
            </div>

            {/* Patients List */}
            <div className="bg-[#17191a]/50 rounded-[24px] border border-white/5 overflow-hidden backdrop-blur-sm shadow-2xl">
                <div className="grid grid-cols-12 px-8 py-4 bg-white/5 border-b border-white/5 text-[10px] font-bold text-[#62748e] uppercase tracking-[0.1em]">
                    <div className="col-span-4">Patient Information</div>
                    <div className="col-span-2 text-center">ID Number</div>
                    <div className="col-span-3">Medical Case / Treatment</div>
                    <div className="col-span-2">Priority Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                <div className="divide-y divide-white/5">
                    {filteredPatients.map((patient) => (
                        <div key={patient.id} className="grid grid-cols-12 px-8 py-5 items-center hover:bg-white/[0.02] transition-colors group">
                            <div className="col-span-4 flex items-center gap-4 cursor-pointer" onClick={() => { setCurrentPatient(patient); navigate('/overview'); }}>
                                <div className="relative">
                                    <img src={patient.image} alt={patient.name} className="w-11 h-11 rounded-full object-cover border-2 border-white/5 group-hover:border-primary/50 transition-colors" />
                                    <div className={cn(
                                        "absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#17191a]",
                                        patient.gender === "Male" ? "bg-[#38bdf8]" : "bg-[#f472b6]"
                                    )} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{patient.name}</h3>
                                    <p className="text-xs text-[#62748e]">{patient.gender} • {patient.age} years old</p>
                                </div>
                            </div>
                            <div className="col-span-2 text-center font-mono text-[11px] text-[#90a1b9]">
                                {patient.id}
                            </div>
                            <div className="col-span-3">
                                <p className="text-xs text-white font-medium">{patient.treatment}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <UserCheck size={10} className="text-[#00bc7d]" />
                                    <span className="text-[10px] text-[#62748e] font-bold uppercase tracking-widest">{patient.status}</span>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                    LABEL_COLORS[patient.label]
                                )}>
                                    {patient.label}
                                </span>
                            </div>
                            <div className="col-span-1 flex justify-end gap-2">
                                <button
                                    onClick={() => setEditingPatient(patient)}
                                    className="p-2 text-[#62748e] hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                >
                                    <Filter size={18} />
                                </button>
                                <button
                                    onClick={() => { setCurrentPatient(patient); navigate('/overview'); }}
                                    className="p-2 text-[#62748e] hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                >
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
