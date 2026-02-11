import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

interface CurrentDiagnosisProps {
    className?: string;
}

export function CurrentDiagnosis({ className }: CurrentDiagnosisProps) {
    return (
        <div className={cn("w-full h-full", className)}>
            {/* Card Content */}
            <div className="bg-[#17191a]/50 backdrop-blur-sm border border-white/5 rounded-[18px] p-6 lg:p-8">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-[3px] h-[24px] bg-[#8e51ff] rounded-full" />
                    <h2 className="text-xl font-bold text-white">Current Diagnosis</h2>
                </div>

                <div className="flex flex-col gap-8">
                    <style>
                        {`
                        @keyframes fillBar {
                            from { width: 0; }
                            to { width: 60%; }
                        }
                        .animate-fill-bar {
                            animation: fillBar 1.5s ease-out forwards;
                        }
                        `}
                    </style>

                    {/* Top Row: Icon + Diagnosis Details */}
                    <div className="flex items-start gap-5">
                        {/* Warning Icon Container */}
                        <div className="w-12 h-12 rounded-full bg-[#3d2e0f] flex items-center justify-center shrink-0 border border-[#FEBC1E]/20">
                            <AlertCircle className="text-[#FEBC1E]" size={24} />
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold text-white">Left Shoulder Injury</h3>
                            <p className="text-[#90a1b9] text-sm leading-relaxed max-w-2xl">
                                Soft tissue injury suspected. No fractures detected on X-ray. Possible rotator cuff or subacromial injury. MRI recommended if symptoms persist.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Row: Severity & Date */}
                    <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 w-full mt-2">

                        {/* Severity Slider */}
                        <div className="flex flex-col gap-2 w-full max-w-md">
                            <span className="text-xs font-medium text-[#62748e]">Severity</span>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-3 bg-[#1d293d] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#FFC94D] to-[#FF8800] rounded-full animate-fill-bar"
                                        style={{ width: '60%' }} // 6/10
                                    />
                                </div>
                                <span className="text-[#FEBC1E] font-bold text-sm">6/10</span>
                            </div>
                        </div>

                        {/* Incident Date */}
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-medium text-[#62748e]">Incident Date</span>
                                <span className="text-white font-medium">Nov 7, 2025</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
