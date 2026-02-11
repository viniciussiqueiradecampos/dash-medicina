import { User, Activity, Heart, Moon, Utensils, Cigarette, FileText, Plus, Thermometer, Droplets, Gauge, Clipboard, Pill, Users, Stethoscope, Calendar, Clock, Briefcase } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePatientContext } from "../../context/PatientContext";

// --- Intake Section ---
export function IntakeSection() {
    const { currentPatient } = usePatientContext();
    if (!currentPatient) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Demographic & Main Complaint */}
                <div className="bg-[#17191a]/50 p-8 rounded-[24px] border border-white/5 backdrop-blur-sm space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-[3px] h-6 bg-primary rounded-full" />
                        <h2 className="text-xl font-bold text-white">Demographics & Complaint</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <InfoItem icon={User} label="Full Name" value={currentPatient.name} />
                        <InfoItem icon={Calendar} label="Age" value={`${currentPatient.age} yrs old`} />
                        <InfoItem icon={Briefcase} label="Occupation" value={currentPatient.treatment.includes('Shoulder') ? "Professional Athlete" : "Corporate Professional"} />
                        <InfoItem icon={Users} label="ID Number" value={currentPatient.id} />
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <Activity size={16} className="text-status-danger" />
                            Primary Diagnosis
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-status-danger/10 text-status-danger border border-status-danger/20 rounded-lg text-xs font-bold uppercase tracking-wider">
                                {currentPatient.treatment}
                            </span>
                        </div>
                        <p className="text-sm text-[#90a1b9] leading-relaxed bg-[#1d293d] p-4 rounded-xl border border-white/5 mt-4 text-justify">
                            {currentPatient.diagnosis || "No specific clinical notes available for this case yet. Follow-up diagnostic imaging may be required for a detailed tissue analysis."}
                        </p>
                    </div>
                </div>

                {/* Medical History & Lifestyle */}
                <div className="bg-[#17191a]/50 p-8 rounded-[24px] border border-white/5 backdrop-blur-sm space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-[3px] h-6 bg-accent-purple rounded-full" />
                        <h2 className="text-xl font-bold text-white">Clinical History & Lifestyle</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-white mb-4">Medical History (Anamnesis)</h3>
                            <div className="space-y-3">
                                <HistoryBadge label="Diabetes Type II" type="preexisting" />
                                <HistoryBadge label="Allergy: Penicillin" type="allergy" />
                                <HistoryBadge label="Right Shoulder Surgery (2022)" type="surgery" />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-6">
                            <LifestyleItem icon={Cigarette} label="Smoking" value="Non-smoker" status="Good" />
                            <LifestyleItem icon={Activity} label="Exercise" value="High (Athlete)" status="Good" />
                            <LifestyleItem icon={Moon} label="Sleep" value="6.5 hrs/night" status="Fair" />
                            <LifestyleItem icon={Utensils} label="Diet" value="Keto/High Protein" status="Good" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Document Upload Area */}
            <div className="bg-[#17191a]/50 p-8 rounded-[24px] border border-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Identity & Insurance Documents</h2>
                    <button className="text-primary text-xs font-bold hover:underline">Manage all files</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DocumentCard title="National ID / Passport" type="PDF" size="1.2 MB" />
                    <DocumentCard title="Health Insurance Card" type="IMG" size="842 KB" />
                    <div className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 hover:border-primary/50 cursor-pointer transition-colors group">
                        <Plus size={24} className="text-[#62748e] group-hover:text-primary transition-colors" />
                        <p className="text-xs font-bold text-[#62748e] mt-2 group-hover:text-white transition-colors">Upload New Document</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Assessment Section ---
export function AssessmentSection() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Vital Signs */}
                <div className="lg:col-span-1 bg-[#17191a]/50 p-8 rounded-[24px] border border-white/5 backdrop-blur-sm space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-[3px] h-6 bg-status-success rounded-full" />
                        <h2 className="text-xl font-bold text-white">Vital Signs</h2>
                    </div>

                    <div className="space-y-6">
                        <VitalCard label="Blood Pressure" value="128/84" unit="mmHg" icon={Gauge} color="text-status-success" />
                        <VitalCard label="Heart Rate" value="72" unit="bpm" icon={Heart} color="text-primary" />
                        <VitalCard label="Oxygen Level" value="98" unit="%" icon={Droplets} color="text-accent-purple" />
                        <VitalCard label="Temperature" value="36.6" unit="°C" icon={Thermometer} color="text-status-warning" />
                    </div>
                </div>

                {/* Physical Exam & Notes */}
                <div className="lg:col-span-2 bg-[#17191a]/50 p-8 rounded-[24px] border border-white/5 backdrop-blur-sm space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-[3px] h-6 bg-primary rounded-full" />
                            <h2 className="text-xl font-bold text-white">Physical Examination</h2>
                        </div>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-lab-modal'))}
                            className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-[#90a1b9] hover:text-white border border-white/5 transition-all flex items-center gap-2"
                        >
                            <Clipboard size={14} /> Open Lab Integration
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-[#62748e] uppercase tracking-wider">Visual Inspection</h3>
                            <p className="text-sm text-white leading-relaxed">
                                Visible bruising and edema around the acromioclavicular joint. No open wounds or skin discoloration.
                            </p>

                            <h3 className="text-xs font-bold text-[#62748e] uppercase tracking-wider mt-6">Palpation & Range of Motion</h3>
                            <p className="text-sm text-white leading-relaxed">
                                Point tenderness over the greater tuberosity. Internal rotation limited to 30 degrees due to guarding. Positive Empty Can test.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-bold text-[#62748e] uppercase tracking-wider">Pain Scale (VAS)</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-white">Current Intensity</span>
                                    <span className="text-status-danger">8 / 10</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-primary via-status-warning to-status-danger w-[80%]" />
                                </div>
                                <div className="flex justify-between text-[10px] text-[#62748e] font-bold uppercase tracking-widest">
                                    <span>No Pain</span>
                                    <span>Moderate</span>
                                    <span>Severe</span>
                                </div>
                            </div>

                            <div className="bg-[#1d293d] p-6 rounded-2xl border border-white/5">
                                <h3 className="text-xs font-bold text-white mb-3">Clinical Insight</h3>
                                <p className="text-xs text-[#90a1b9] leading-relaxed italic">
                                    "Clinical findings strongly suggest a partial rotator cuff tear versus severe impingement. Immediate imaging required to confirm surgical candidacy."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Treatment Plan Section ---
export function TreatmentPlanSection() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Prescriptions & Procedures */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Prescriptions */}
                    <div className="bg-[#17191a]/50 p-8 rounded-[24px] border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-[3px] h-6 bg-primary rounded-full" />
                                <h2 className="text-xl font-bold text-white">Active Prescriptions</h2>
                            </div>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-prescription-modal'))}
                                className="text-primary text-xs font-bold hover:underline flex items-center gap-1"
                            >
                                <Pill size={14} /> Add Medication
                            </button>
                        </div>
                        <div className="space-y-4">
                            <MedicationRow name="Naproxen 500mg" dosage="1 tablet / twice daily" duration="7 days" instructions="Take with food" />
                            <MedicationRow name="Cyclobenzaprine 5mg" dosage="1 tablet / night" duration="5 days" instructions="May cause drowsiness" />
                        </div>
                    </div>

                    {/* Interventions */}
                    <div className="bg-[#17191a]/50 p-8 rounded-[24px] border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-[3px] h-6 bg-accent-purple rounded-full" />
                                <h2 className="text-xl font-bold text-white">Interventions & Procedures</h2>
                            </div>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-intervention-modal'))}
                                className="p-2 bg-accent-purple/10 text-accent-purple rounded-lg hover:bg-accent-purple hover:text-white transition-all"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ProcedureCard title="Physiotherapy" status="Scheduled" date="Nov 15, 2025" description="Range of motion focus and muscle strengthening." icon={Stethoscope} />
                            <ProcedureCard title="MRI Shoulder" status="Pending" date="Awaiting Auth" description="3-Tesla Imaging for detailed tissue analysis." icon={FileText} />
                        </div>
                    </div>
                </div>

                {/* Right Column: Goals & Referrals */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Health Goals */}
                    <div className="bg-[#17191a]/50 p-8 rounded-[24px] border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-[3px] h-6 bg-status-success rounded-full" />
                                <h2 className="text-xl font-bold text-white">Recovery Goals</h2>
                            </div>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-goal-modal'))}
                                className="text-status-success hover:scale-110 transition-transform"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <GoalProgress label="Pain Management" percentage={45} goal="Pain < 3/10" />
                            <GoalProgress label="Mobility" percentage={20} goal="120° Rotation" />
                            <GoalProgress label="Function" percentage={10} goal="Resume Training" />
                        </div>
                    </div>

                    {/* Return Schedule */}
                    <div className="bg-primary/10 border border-primary/20 p-8 rounded-[24px] space-y-6">
                        <div className="flex items-center gap-3">
                            <Calendar className="text-primary" size={24} />
                            <h3 className="text-white font-bold">Follow-up Appointment</h3>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs text-[#90a1b9]">Suggested Date:</p>
                            <p className="text-2xl font-bold text-white">Nov 23, 2025</p>
                            <p className="text-sm font-medium text-primary">10:30 AM (Room 402)</p>
                        </div>
                        <button
                            onClick={(e) => {
                                const btn = e.currentTarget;
                                btn.innerHTML = '<span class="flex items-center gap-2"><svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Confirming...</span>';
                                setTimeout(() => {
                                    btn.innerHTML = '<span class="flex items-center gap-2"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Confirmed</span>';
                                    btn.className = "w-full py-3 bg-status-success text-white font-bold rounded-xl transition-all shadow-lg shadow-status-success/20";
                                }, 1500);
                            }}
                            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                        >
                            Confirm Appointment
                        </button>
                    </div>

                    {/* Referrals */}
                    <div className="bg-[#17191a]/50 p-6 rounded-[24px] border border-white/5 space-y-4">
                        <h3 className="text-xs font-bold text-[#62748e] uppercase tracking-wider">Referrals</h3>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="w-10 h-10 bg-accent-purple/20 rounded-lg flex items-center justify-center text-accent-purple">
                                <Users size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white">Dr. Sarah Miller</p>
                                <p className="text-[10px] text-[#90a1b9]">Orthopedic Surgery Expert</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Helper Components ---
function InfoItem({ icon: Icon, label, value }: any) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#62748e]">
                <Icon size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-sm font-bold text-white">{value}</p>
        </div>
    );
}

function HistoryBadge({ label, type }: any) {
    const colors: any = {
        allergy: "bg-status-danger/10 text-status-danger border-status-danger/20",
        surgery: "bg-primary/10 text-primary border-primary/20",
        preexisting: "bg-accent-purple/10 text-accent-purple border-accent-purple/20",
    }
    return (
        <div className={cn("px-4 py-2.5 rounded-xl border flex items-center justify-between", colors[type])}>
            <span className="text-xs font-bold">{label}</span>
            <span className="text-[10px] uppercase font-black opacity-40">{type}</span>
        </div>
    );
}

function LifestyleItem({ icon: Icon, label, value, status }: any) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#62748e]">
                <Icon size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{value}</span>
                <span className={cn(
                    "w-2 h-2 rounded-full",
                    status === "Good" ? "bg-status-success" : "bg-status-warning"
                )} />
            </div>
        </div>
    );
}

function DocumentCard({ title, type, size }: any) {
    return (
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <FileText size={20} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{title}</h4>
                <p className="text-[10px] text-[#62748e] uppercase font-bold">{type} • {size}</p>
            </div>
        </div>
    );
}

function VitalCard({ label, value, unit, icon: Icon, color }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/2 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center", color)}>
                    <Icon size={20} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#62748e] uppercase tracking-wider">{label}</span>
                    <p className="text-lg font-bold text-white">{value}<span className="text-xs ml-1 text-[#62748e]">{unit}</span></p>
                </div>
            </div>
        </div>
    );
}

function MedicationRow({ name, dosage, duration, instructions }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                    <Pill size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white">{name}</h4>
                    <p className="text-xs text-[#90a1b9]">{dosage} • {duration}</p>
                </div>
            </div>
            <div className="text-right">
                <span className="text-[10px] font-bold text-[#62748e] uppercase tracking-widest">{instructions}</span>
            </div>
        </div>
    );
}

function ProcedureCard({ title, status, date, description, icon: Icon }: any) {
    return (
        <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-4 hover:bg-white/8 transition-colors">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent-purple/20 rounded-lg flex items-center justify-center text-accent-purple">
                        <Icon size={16} />
                    </div>
                    <h4 className="text-sm font-bold text-white">{title}</h4>
                </div>
                <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full",
                    status === "Scheduled" ? "bg-status-success/10 text-status-success" : "bg-status-warning/10 text-status-warning"
                )}>
                    {status}
                </span>
            </div>
            <p className="text-xs text-[#90a1b9] leading-relaxed">{description}</p>
            <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-[#62748e] uppercase tracking-widest">
                <Clock size={12} />
                <span>{date}</span>
            </div>
        </div>
    );
}

function GoalProgress({ label, percentage, goal }: any) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <div>
                    <h4 className="text-xs font-bold text-white">{label}</h4>
                    <p className="text-[10px] text-[#62748e] mt-1 font-medium">Goal: {goal}</p>
                </div>
                <span className="text-xs font-bold text-primary">{percentage}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }} />
            </div>
        </div>
    );
}
