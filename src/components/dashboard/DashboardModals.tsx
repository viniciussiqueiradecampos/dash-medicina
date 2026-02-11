import { useState, useEffect } from "react";
import { X, Search, Activity, History, ClipboardList, Calendar, Clock, MapPin, CheckCircle2, Plus, Trash2, AlertCircle, Download, FlaskConical } from "lucide-react";
import { cn } from "../../lib/utils";

// --- Components ---

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
}

function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className={cn("relative w-full bg-[#17191a] border border-white/10 rounded-[24px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden", maxWidth)}>
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="text-[#90a1b9] hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                    {children}
                </div>
            </div>
        </div>
    );
}

// --- History Modal ---
export function HistoryModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-history-modal', handleOpen);
        return () => window.removeEventListener('open-history-modal', handleOpen);
    }, []);

    const events = [
        { date: "Oct 24, 2025", type: "Check-up", doctor: "Dr. Jessica Smith", icon: History, color: "text-primary" },
        { date: "Aug 12, 2025", type: "X-ray Results", doctor: "Dr. Vinicius Campos", icon: Activity, color: "text-status-warning" },
        { date: "May 05, 2025", type: "Initial Consultation", doctor: "Dr. Pedro Campos", icon: ClipboardList, color: "text-[#00bc7d]" },
    ];

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Patient Visit Timeline">
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-[19px] before:w-[2px] before:bg-white/5 before:my-4">
                {events.map((event, i) => (
                    <div key={i} className="relative pl-12">
                        <div className={cn("absolute left-0 top-1 w-10 h-10 rounded-full bg-[#1d293d] border border-white/5 flex items-center justify-center z-10", event.color)}>
                            <event.icon size={20} />
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="text-xs text-[#90a1b9] block mb-1">{event.date}</span>
                            <h3 className="text-white font-bold">{event.type}</h3>
                            <p className="text-sm text-[#62748e]">Conducted by {event.doctor}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
}

interface Medication {
    id: number;
    name: string;
    route: string;
    concentration: string;
    dosage: string;
    duration: string;
    observations: string;
}

// --- Prescription Modal ---
export function PrescriptionModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [sendMethod, setSendMethod] = useState("email");
    const [allergies, setAllergies] = useState<string[]>(["Penicillin", "Peanuts"]);
    const [medications, setMedications] = useState<Medication[]>([{
        id: Date.now(),
        name: "",
        route: "Oral",
        concentration: "",
        dosage: "",
        duration: "",
        observations: ""
    }]);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-prescription-modal', handleOpen);
        return () => window.removeEventListener('open-prescription-modal', handleOpen);
    }, []);

    const addAllergy = () => {
        const name = prompt("Enter new allergy:");
        if (name) setAllergies([...allergies, name]);
    };

    const removeAllergy = (index: number) => {
        setAllergies(allergies.filter((_, i) => i !== index));
    };

    const addMedication = () => {
        setMedications([...medications, {
            id: Date.now(),
            name: "",
            route: "Oral",
            concentration: "",
            dosage: "",
            duration: "",
            observations: ""
        }]);
    };

    const removeMedication = (id: number) => {
        if (medications.length > 1) {
            setMedications(medications.filter((m: Medication) => m.id !== id));
        }
    };

    const updateMedication = (id: number, field: keyof Medication, value: string) => {
        setMedications(medications.map((m: Medication) => m.id === id ? { ...m, [field]: value } : m));
    };

    const handleSave = () => {
        setIsSaved(true);

        // Dispatch event for PatientsPage and profile update
        window.dispatchEvent(new CustomEvent('prescription-saved', {
            detail: {
                patientId: "RG-2025-001",
                patientName: "Ruben George",
                status: "Recovered",
                medications: medications
            }
        }));

        setTimeout(() => {
            setIsSaved(false);
            setIsOpen(false);
        }, 3000);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Digital Prescription" maxWidth="max-w-4xl">
            <div className="space-y-8">
                {/* Header: Identification */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">RG</div>
                            <div>
                                <h3 className="text-white font-bold">Ruben George</h3>
                                <p className="text-xs text-[#90a1b9]">36 years • 82 kg • Male</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-status-danger/10 border border-status-danger/20 p-4 rounded-xl relative group">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 text-status-danger">
                                <AlertCircle size={16} />
                                <span className="text-xs font-bold uppercase">Allergies</span>
                            </div>
                            <button onClick={addAllergy} className="text-status-danger hover:scale-110 transition-transform">
                                <Plus size={16} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {allergies.map((allergy: string, idx: number) => (
                                <span key={idx} className="flex items-center gap-1 px-2 py-0.5 bg-status-danger/20 border border-status-danger/30 rounded text-[10px] text-status-danger">
                                    {allergy}
                                    <button onClick={() => removeAllergy(idx)} className="hover:text-white">
                                        <X size={10} />
                                    </button>
                                </span>
                            ))}
                            {allergies.length === 0 && <p className="text-xs text-status-danger/50 italic">No allergies recorded</p>}
                        </div>
                    </div>
                </div>

                {/* Body: Medications List */}
                <div className="space-y-6">
                    {medications.map((med: Medication, index: number) => (
                        <div key={med.id} className="bg-white/5 border border-white/5 rounded-[24px] p-6 space-y-6 relative">
                            {medications.length > 1 && (
                                <button
                                    onClick={() => removeMedication(med.id)}
                                    className="absolute top-4 right-4 text-[#62748e] hover:text-status-danger transition-colors p-2"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}

                            <div className="space-y-4">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <ClipboardList size={18} className="text-primary" />
                                    Medication #{index + 1}
                                </h3>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#62748e]" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search medication name..."
                                        value={med.name}
                                        onChange={(e) => updateMedication(med.id, 'name', e.target.value)}
                                        className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-[#90a1b9]">Administration Route</label>
                                    <select
                                        value={med.route}
                                        onChange={(e) => updateMedication(med.id, 'route', e.target.value)}
                                        className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary appearance-none"
                                    >
                                        <option>Oral</option>
                                        <option>Intravenous</option>
                                        <option>Topical</option>
                                        <option>Inhalation</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-[#90a1b9]">Concentration</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 500mg"
                                        value={med.concentration}
                                        onChange={(e) => updateMedication(med.id, 'concentration', e.target.value)}
                                        className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-[#90a1b9]">Dosage Instructions</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 1 pill every 8 hours"
                                        value={med.dosage}
                                        onChange={(e) => updateMedication(med.id, 'dosage', e.target.value)}
                                        className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-[#90a1b9]">Duration</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="7 days"
                                            value={med.duration}
                                            onChange={(e) => updateMedication(med.id, 'duration', e.target.value)}
                                            className="flex-1 bg-[#1d293d] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary"
                                        />
                                        <button
                                            onClick={() => updateMedication(med.id, 'duration', 'Continuous Use')}
                                            className="px-4 bg-white/5 rounded-xl border border-white/5 text-xs text-[#90a1b9] hover:text-white"
                                        >
                                            Continuous
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-[#90a1b9]">Observations / Directions</label>
                                <textarea
                                    rows={2}
                                    placeholder="e.g. Take after meals, avoid alcohol..."
                                    value={med.observations}
                                    onChange={(e) => updateMedication(med.id, 'observations', e.target.value)}
                                    className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary resize-none"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addMedication}
                        className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl text-[#90a1b9] hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                        <Plus size={20} />
                        Add Additional Medication
                    </button>
                </div>

                {/* Footer: Signature & Send */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 pt-6 border-t border-white/5">
                    <div className="w-full md:w-auto">
                        <label className="text-sm text-[#90a1b9] block mb-2">Send Prescription via:</label>
                        <div className="flex gap-3">
                            {['Email', 'SMS', 'WhatsApp'].map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setSendMethod(m.toLowerCase())}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                                        sendMethod === m.toLowerCase()
                                            ? "bg-primary/20 border-primary text-primary"
                                            : "bg-white/5 border-white/5 text-[#90a1b9] hover:bg-white/10"
                                    )}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="text-right">
                            <p className="italic text-white text-lg font-serif">Dr. Pedro Campos</p>
                            <p className="text-[10px] text-[#62748e]">Digital Signature • ID #987221</p>
                        </div>
                        <button
                            onClick={handleSave}
                            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all transform active:scale-95 shadow-lg shadow-primary/20"
                        >
                            Save & Send
                        </button>
                    </div>
                </div>

                {/* Success Overlay */}
                {isSaved && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#17191a]/95 backdrop-blur-md animate-in fade-in duration-500">
                        <div className="flex flex-col items-center gap-6 text-center">
                            <div className="w-24 h-24 bg-status-success/20 rounded-full flex items-center justify-center animate-in zoom-in duration-700">
                                <CheckCircle2 className="text-status-success w-12 h-12" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-white">Prescription Sent!</h3>
                                <p className="text-[#90a1b9]">"Salvo e enviado com sucesso"</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}

// --- Appointment Details Modal ---
export function AppointmentDetailsModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [appointment, setAppointment] = useState<any>(null);

    useEffect(() => {
        const handleOpen = (e: any) => {
            setAppointment(e.detail);
            setIsOpen(true);
        };
        window.addEventListener('open-appointment-modal', handleOpen);
        return () => window.removeEventListener('open-appointment-modal', handleOpen);
    }, []);

    if (!appointment) return null;

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Appointment Details">
            <div className="space-y-6">
                <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/5">
                    <img
                        src={appointment.image}
                        alt={appointment.doctor}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/20"
                    />
                    <div>
                        <h3 className="text-2xl font-bold text-white">{appointment.doctor}</h3>
                        <p className="text-primary font-medium">Orthopedic Surgeon</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1">
                        <div className="flex items-center gap-2 text-[#90a1b9] text-xs">
                            <Calendar size={14} />
                            <span>Date</span>
                        </div>
                        <p className="text-white font-medium">{appointment.date}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1">
                        <div className="flex items-center gap-2 text-[#90a1b9] text-xs">
                            <Clock size={14} />
                            <span>Time</span>
                        </div>
                        <p className="text-white font-medium">10:30 AM</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1 col-span-2">
                        <div className="flex items-center gap-2 text-[#90a1b9] text-xs">
                            <MapPin size={14} />
                            <span>Location</span>
                        </div>
                        <p className="text-white font-medium">Main Hospital • Floor 4, Room 402</p>
                    </div>
                </div>

                <div className="p-6 bg-[#1d293d]/40 rounded-2xl border border-white/5 space-y-3">
                    <h4 className="text-white font-bold flex items-center gap-2">
                        <ClipboardList size={18} className="text-primary" />
                        Reason for Visit
                    </h4>
                    <p className="text-[#90a1b9] text-sm leading-relaxed">
                        {appointment.description}. Check-up for persistent pain following physical activity.
                        Initial assessment suggests inflammation in the joint capsule.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="flex-1 bg-white/5 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
                        Reschedule
                    </button>
                    <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors">
                        <CheckCircle2 size={18} />
                        Confirm Visit
                    </button>
                </div>
            </div>
        </Modal>
    );
}

// --- Image Expansion Modal ---
export function ImageModal() {
    const [data, setData] = useState<{ isOpen: boolean; url: string; title: string }>({
        isOpen: false,
        url: "",
        title: ""
    });

    useEffect(() => {
        const handleOpen = (e: any) => setData({ isOpen: true, url: e.detail.url, title: e.detail.title });
        window.addEventListener('open-image-modal', handleOpen);
        return () => window.removeEventListener('open-image-modal', handleOpen);
    }, []);

    return (
        <Modal
            isOpen={data.isOpen}
            onClose={() => setData({ ...data, isOpen: false })}
            title={data.title}
            maxWidth="max-w-6xl"
        >
            <div className="relative group rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                <img
                    src={data.url}
                    alt={data.title}
                    className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                />
                <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white hover:bg-primary transition-colors">
                        <Download size={20} />
                    </button>
                    <button
                        onClick={() => setData({ ...data, isOpen: false })}
                        className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white hover:bg-status-danger transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </Modal>
    );
}

// --- Lab Integration Modal ---
export function LabIntegrationModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-lab-modal', handleOpen);
        return () => window.removeEventListener('open-lab-modal', handleOpen);
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
            setIsOpen(false);
        }, 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Clinical Lab Integration">
            <form onSubmit={handleSave} className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl space-y-2">
                    <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                        <AlertCircle size={16} /> Order Sync Status
                    </h3>
                    <p className="text-xs text-[#90a1b9]">All new lab requests are automatically synchronized with the hospital central laboratory system.</p>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#90a1b9]">Laboratory Branch</label>
                        <select className="w-full bg-[#1d293d] border border-white/10 rounded-xl py-3 px-4 text-white">
                            <option>Main Hospital Lab - Floor 2</option>
                            <option>External Diagnostic Center</option>
                            <option>Pathology Specialized Unit</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#90a1b9]">Clinical Instructions</label>
                        <textarea placeholder="Specific handling instructions..." className="w-full bg-[#1d293d] border border-white/10 rounded-xl py-3 px-4 text-white resize-none" rows={3} />
                    </div>
                </div>

                <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all">
                    {isSaved ? "Synced with Lab" : "Synchronize & Order"}
                </button>
            </form>
        </Modal>
    );
}

// --- Intervention Modal ---
export function InterventionModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-intervention-modal', handleOpen);
        return () => window.removeEventListener('open-intervention-modal', handleOpen);
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
            setIsOpen(false);
        }, 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="New Intervention / Procedure">
            <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#90a1b9]">Procedure Type</label>
                        <select className="w-full bg-[#1d293d] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary">
                            <option>Physiotherapy Session</option>
                            <option>MRI (Radiology)</option>
                            <option>X-Ray</option>
                            <option>Minor Surgery</option>
                            <option>Laboratory Collection</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#90a1b9]">Description / Notes</label>
                        <textarea
                            rows={3}
                            placeholder="Detailed notes about the procedure..."
                            className="w-full bg-[#1d293d] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#90a1b9]">Proposed Date</label>
                            <input type="date" className="w-full bg-[#1d293d] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#90a1b9]">Priority Level</label>
                            <select className="w-full bg-[#1d293d] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary">
                                <option>Routine</option>
                                <option>Urgent</option>
                                <option>Stat / Critical</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                    {isSaved ? <CheckCircle2 size={20} /> : <Plus size={20} />}
                    {isSaved ? "Saved Successfully" : "Schedule Intervention"}
                </button>
            </form>
        </Modal>
    );
}

// --- Goal Modal ---
export function GoalModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-goal-modal', handleOpen);
        return () => window.removeEventListener('open-goal-modal', handleOpen);
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
            setIsOpen(false);
        }, 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Set Recovery Goal">
            <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#90a1b9]">Goal Category</label>
                        <input type="text" placeholder="e.g. Pain Management, Mobility" className="w-full bg-[#1d293d] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#90a1b9]">Specific Metric / Target</label>
                        <input type="text" placeholder="e.g. Pain < 3/10, 120 Rotation" className="w-full bg-[#1d293d] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#90a1b9]">Target Completion Date</label>
                        <input type="date" className="w-full bg-[#1d293d] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary" />
                    </div>
                </div>

                <button className="w-full bg-status-success/20 text-status-success border border-status-success/30 py-4 rounded-xl font-bold hover:bg-status-success hover:text-white transition-all flex items-center justify-center gap-2">
                    {isSaved ? <CheckCircle2 size={20} /> : <Plus size={20} />}
                    {isSaved ? "Goal Tracked" : "Track Recovery Goal"}
                </button>
            </form>
        </Modal>
    );
}

// --- Lab Exam Details Modal ---
export function LabExamDetailsModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [exam, setExam] = useState<any>(null);

    useEffect(() => {
        const handleOpen = (e: any) => {
            setExam(e.detail);
            setIsOpen(true);
        };
        window.addEventListener('open-lab-exam-details-modal', handleOpen);
        return () => window.removeEventListener('open-lab-exam-details-modal', handleOpen);
    }, []);

    if (!exam) return null;

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Blood Test Details">
            <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                            <FlaskConical size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{exam.exam}</h3>
                            <p className="text-[#90a1b9] text-sm">Patient: {exam.patient}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold text-[#62748e] block mb-1">Status</span>
                        <span className="text-primary font-bold">{exam.status}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#1d293d] rounded-xl border border-white/5">
                        <span className="text-[10px] font-bold text-[#62748e] uppercase tracking-wider block mb-2">Reference Range</span>
                        <p className="text-white font-medium">135 - 145 mEq/L</p>
                    </div>
                    <div className="p-4 bg-[#1d293d] rounded-xl border border-white/5">
                        <span className="text-[10px] font-bold text-[#62748e] uppercase tracking-wider block mb-2">Measured Value</span>
                        <p className="text-status-success font-bold text-lg">140 mEq/L</p>
                    </div>
                </div>

                <div className="bg-[#17191a] p-6 rounded-2xl border border-white/5 space-y-4">
                    <h4 className="text-white font-bold flex items-center gap-2">
                        <AlertCircle size={18} className="text-primary" />
                        Clinical Interpretation
                    </h4>
                    <p className="text-[#90a1b9] text-sm leading-relaxed">
                        The patient's electrolytic levels are within the normal physiological range.
                        No immediate intervention is required for this parameter.
                        Continue to monitor during regular consultations.
                    </p>
                </div>

                <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-white/5 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
                        Download Report (PDF)
                    </button>
                    <button onClick={() => setIsOpen(false)} className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors">
                        Acknowledge Results
                    </button>
                </div>
            </div>
        </Modal>
    );
}

// --- Main Modals Provider ---
export function DashboardModals() {
    return (
        <>
            <HistoryModal />
            <PrescriptionModal />
            <AppointmentDetailsModal />
            <ImageModal />
            <InterventionModal />
            <GoalModal />
            <LabIntegrationModal />
            <LabExamDetailsModal />
        </>
    );
}
