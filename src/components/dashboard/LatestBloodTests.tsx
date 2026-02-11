import { Activity, MoreVertical, ArrowUp, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

// Types
type LabStatus = 'normal' | 'elevated' | 'critical' | 'low';

interface LabResultProps {
    name: string;
    value: string;
    unit: string;
    status: LabStatus;
    TrendIcon: React.ElementType;
    subtext: string;
}

const statusStyles = {
    normal: {
        badgeBg: "bg-[#00bc7d]/20",
        badgeText: "text-[#00bc7d]",
        border: "border-[#00bc7d]/30",
        iconColor: "text-[#00bc7d]"
    },
    elevated: {
        badgeBg: "bg-[#FEBC1E]/20",
        badgeText: "text-[#FEBC1E]",
        border: "border-[#FEBC1E]/30",
        iconColor: "text-[#FEBC1E]"
    },
    critical: {
        badgeBg: "bg-[#FF3B30]/20",
        badgeText: "text-[#FF3B30]",
        border: "border-[#FF3B30]/30",
        iconColor: "text-[#FF3B30]"
    },
    low: {
        badgeBg: "bg-[#38bdf8]/20",
        badgeText: "text-[#38bdf8]",
        border: "border-[#38bdf8]/30",
        iconColor: "text-[#38bdf8]"
    }
}

function LabResultCard({ name, value, unit, status, TrendIcon, subtext }: LabResultProps) {
    const styles = statusStyles[status];

    return (
        <div className={cn(
            "min-w-[180px] h-[130px] rounded-[18px] p-4 flex flex-col justify-between backdrop-blur-sm transition-transform hover:scale-105",
            "bg-[#1d293d]/40 border-[0.8px] border-white/5" // Default generic card style
        )}>
            {/* Header: Badge & Trend */}
            <div className="flex items-center justify-between">
                <span className={cn("px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider", styles.badgeBg, styles.badgeText)}>
                    {name}
                </span>
                <TrendIcon size={16} className={cn(styles.iconColor)} />
            </div>

            {/* Value */}
            <div className="mt-2">
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
                    <span className="text-xs text-[#62748e] font-medium">{unit}</span>
                </div>
                <p className="text-xs text-[#90a1b9] mt-1 font-medium">{subtext}</p>
            </div>
        </div>
    )
}

export function LatestBloodTests() {
    const results: LabResultProps[] = [
        { name: "CRP", value: "1.7", unit: "mg/L", status: "elevated", TrendIcon: ArrowUp, subtext: "Slightly elevated" },
        { name: "WBC", value: "8,500", unit: "/L", status: "normal", TrendIcon: ArrowRight, subtext: "No Infection" },
        { name: "HGB", value: "14.2", unit: "g/dL", status: "normal", TrendIcon: ArrowRight, subtext: "Within range" },
        { name: "GLU", value: "105", unit: "mg/dL", status: "elevated", TrendIcon: ArrowUp, subtext: "Slightly high" },
        { name: "PLT", value: "250", unit: "k/uL", status: "normal", TrendIcon: ArrowRight, subtext: "Healthy count" },
        { name: "SOD", value: "138", unit: "mEq/L", status: "normal", TrendIcon: ArrowRight, subtext: "Normal levels" },
        { name: "POT", value: "4.1", unit: "mEq/L", status: "normal", TrendIcon: ArrowRight, subtext: "Stable" },
    ];

    return (
        <div className="w-full">
            {/* Added container wrapper with specific background styling */}
            <div className="bg-[#17191a]/50 backdrop-blur-sm border border-white/5 rounded-[18px] p-6 lg:p-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-[3px] h-[24px] bg-[#f43f5e] rounded-full" />
                        <Activity className="text-[#f43f5e]" size={20} />
                        <h2 className="text-xl font-bold text-white">Latest Blood Test Results</h2>
                    </div>
                    <button className="text-[#62748e] hover:text-white transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>

                {/* Scrollable Container */}
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                    {results.map((result, i) => (
                        <LabResultCard key={i} {...result} />
                    ))}
                </div>
            </div>
        </div>
    );
}
