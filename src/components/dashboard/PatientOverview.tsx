import { Cake, Weight, Ruler, Droplet, ClipboardPlus, User } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePatientContext } from "../../context/PatientContext";

// --- Components ---

interface BiometricCardProps {
    label: string;
    value: string;
    unit?: string;
    icon: React.ElementType;
    gradientClass: string;
    borderClass: string;
    iconColorClass: string;
}

function BiometricCard({ label, value, unit, icon: Icon, gradientClass, borderClass, iconColorClass }: BiometricCardProps) {
    return (
        <div
            className={cn(
                "relative rounded-[16px] p-4 flex flex-col justify-between h-[107px] border-[0.8px] backdrop-blur-sm",
                gradientClass,
                borderClass
            )}
        >
            {/* Header: Icon + Label */}
            <div className="flex items-center gap-2 opacity-80">
                <Icon size={20} className={cn(iconColorClass)} />
                <span className="text-xs text-[#cad5e2]">{label}</span>
            </div>

            {/* Value */}
            <div className="mt-auto">
                <p className="text-2xl font-bold text-white">
                    {value} <span className="text-sm font-normal text-[#90a1b9] ml-1">{unit}</span>
                </p>
            </div>
        </div>
    );
}

export function PatientOverview() {
    const { currentPatient } = usePatientContext();

    if (!currentPatient) return null;

    return (
        <div className="w-full space-y-8 animate-in fade-in duration-500">
            {/* Top Header Section */}
            <div className="flex flex-col gap-1 relative">
                <div className="flex flex-row items-center justify-between gap-4">
                    <h1 className="text-xl md:text-3xl font-bold text-white">Patient Overview</h1>

                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-prescription-modal'))}
                        className="bg-primary hover:bg-primary-dark transition-colors text-white px-3 md:px-6 py-2 rounded-xl flex items-center gap-2 font-medium text-[10px] md:text-sm shrink-0"
                    >
                        <ClipboardPlus size={16} className="md:w-[18px] md:h-[18px]" />
                        <span className="hidden xs:inline">PRESCRIPTION</span>
                    </button>
                </div>
                <p className="text-[#90a1b9] text-sm md:text-base">Comprehensive medical overview for {currentPatient.name}</p>
            </div>

            {/* Patient Profile & Biometrics Container */}
            <div className="bg-[#17191a]/50 rounded-[18px] p-6 flex flex-col xl:flex-row gap-8 items-center xl:items-start w-full backdrop-blur-sm border border-white/5">

                {/* Patient Profile Section */}
                <div className="flex flex-col sm:flex-row items-center gap-4 min-w-full xl:min-w-[300px] xl:border-r border-white/5 xl:pr-8">
                    <div className="relative">
                        <div className="w-[80px] h-[80px] rounded-[24px] border-4 border-[rgba(142,81,255,0.2)] overflow-hidden p-1">
                            <img src={currentPatient.image} alt={currentPatient.name} className="w-full h-full object-cover rounded-[18px]" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00bc7d] border-4 border-[#0F172B] rounded-full flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-white leading-tight">{currentPatient.name}</h2>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-[#90a1b9] text-xs md:text-sm mt-2 font-medium">
                            <div className="flex items-center gap-1.5 bg-[#1d293d] px-2 py-1 rounded-md">
                                <User size={14} className="text-primary" />
                                <span>{currentPatient.gender}</span>
                            </div>
                            <span className="text-white/20 hidden xs:inline">•</span>
                            <span>Patient ID: #{currentPatient.id}</span>
                        </div>
                    </div>
                </div>

                {/* Biometrics Grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <BiometricCard
                        label="Age"
                        value={currentPatient.age.toString()}
                        unit="years"
                        icon={Cake}
                        gradientClass="bg-gradient-to-br from-[rgba(142,81,255,0.2)] to-[rgba(173,70,255,0.2)]"
                        borderClass="border-[rgba(142,81,255,0.3)]"
                        iconColorClass="text-[#c1a0ff]"
                    />
                    <BiometricCard
                        label="Weight"
                        value={currentPatient.weight.replace('kg', '')}
                        unit="kg"
                        icon={Weight}
                        gradientClass="bg-gradient-to-br from-[rgba(43,127,255,0.2)] to-[rgba(0,184,219,0.2)]"
                        borderClass="border-[rgba(43,127,255,0.3)]"
                        iconColorClass="text-[#72aaff]"
                    />
                    <BiometricCard
                        label="Height"
                        value={currentPatient.height.replace('cm', '')}
                        unit="cm"
                        icon={Ruler}
                        gradientClass="bg-gradient-to-br from-[rgba(0,184,219,0.2)] to-[rgba(0,187,167,0.2)]"
                        borderClass="border-[rgba(0,184,219,0.3)]"
                        iconColorClass="text-[#4efde5]"
                    />
                    <BiometricCard
                        label="Blood Type"
                        value={currentPatient.bloodType}
                        icon={Droplet}
                        gradientClass="bg-gradient-to-br from-[rgba(255,32,86,0.2)] to-[rgba(246,51,154,0.2)]"
                        borderClass="border-[rgba(255,32,86,0.3)]"
                        iconColorClass="text-[#ff8fa5]"
                    />
                </div>
            </div>
        </div>
    );
}
