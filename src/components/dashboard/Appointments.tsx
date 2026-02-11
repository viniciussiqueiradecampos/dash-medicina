import { Clock, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface Appointment {
    doctor: string;
    date: string;
    description: string;
    image: string;
    active?: boolean;
}

const appointments: Appointment[] = [
    {
        doctor: "Doctor Pedro",
        date: "November 9, 2025",
        description: "Left shoulder injury",
        image: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg",
        active: true,
    },
    {
        doctor: "Doctor Vini",
        date: "Sep 17, 2025",
        description: "Routine check",
        image: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg",
    },
    {
        doctor: "Doctor Jessica",
        date: "Mar 20, 2025",
        description: "Routine check",
        image: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg",
    }
];

export function Appointments() {
    return (
        <div
            className="flex flex-col justify-between items-center rounded-[18px] bg-[#17191A] border border-white/5 shadow-xl shrink-0 w-full"
            style={{
                height: '284px',
                padding: '18px 16px',
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between w-full px-2">
                <div className="flex items-center gap-3">
                    <Clock className="text-[#00bc7d]" size={20} />
                    <h2 className="text-lg font-bold text-white">Appointments</h2>
                </div>
                <button className="text-[#90a1b9] hover:text-white transition-colors">
                    <ArrowUpRight size={20} />
                </button>
            </div>

            {/* List */}
            <div className="flex flex-col gap-2 w-full mt-4 flex-1">
                {appointments.map((apt) => (
                    <button
                        key={apt.doctor}
                        onClick={() => window.dispatchEvent(new CustomEvent('open-appointment-modal', { detail: apt }))}
                        className={cn(
                            "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all border border-transparent cursor-pointer text-left",
                            apt.active
                                ? "bg-[#064e4e] border-[#00bc7d]/20 shadow-lg"
                                : "hover:bg-white/5"
                        )}
                    >
                        {/* Doctor Avatar */}
                        <img
                            src={apt.image}
                            alt={apt.doctor}
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                        />

                        {/* Info */}
                        <div className="flex flex-col">
                            <h3 className="text-[14px] font-bold text-white leading-tight">
                                {apt.date} - {apt.doctor}
                            </h3>
                            <p className="text-[12px] text-[#90a1b9] mt-0.5">
                                {apt.description}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
