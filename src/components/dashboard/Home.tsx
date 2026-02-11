import { useState, useEffect, useRef } from 'react';
import {
    Play, Pause, Square, Users, FileText, Activity,
    ArrowUpRight, Clock, Calendar, ChevronRight,
    CheckCircle2, AlertCircle, UserCheck
} from "lucide-react";
import { cn } from "../../lib/utils";
import { usePatientContext } from "../../context/PatientContext";
import { useNavigate } from "react-router-dom";

export function Home() {
    const { currentPatient, allPatients, updatePatient, setCurrentPatient } = usePatientContext();
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const navigate = useNavigate();

    // Upcoming patients (mock logic: patients not recovered)
    const upcomingPatients = allPatients.filter(p => p.status !== "Recovered").slice(0, 4);

    // Timer logic
    useEffect(() => {
        if (isTimerRunning) {
            timerRef.current = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isTimerRunning]);

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStopTimer = () => {
        if (timer > 0) {
            const finalDuration = timer;
            setIsTimerRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);

            if (currentPatient) {
                const updatedPatient = {
                    ...currentPatient,
                    serviceTimer: (currentPatient.serviceTimer || 0) + finalDuration
                };
                updatePatient(updatedPatient);

                // Dispatch event for recording in registry
                window.dispatchEvent(new CustomEvent('service-recorded', {
                    detail: {
                        patientId: currentPatient.id,
                        duration: finalDuration,
                        timestamp: new Date().toISOString()
                    }
                }));
            }

            setTimer(0);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Hero Section with Timer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                <div className="lg:col-span-8 bg-gradient-to-br from-[#1d293d] to-[#121212] p-6 md:p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
                        <div className="space-y-4">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                                Good morning, <br className="sm:hidden" />
                                <span className="text-primary italic">Dr. Admin</span>
                            </h1>
                            <p className="text-[#90a1b9] text-sm md:text-base max-w-md">You have 8 appointments scheduled for today. Your first patient is arriving in 5 minutes.</p>

                            <div className="flex flex-wrap gap-4 pt-2 md:pt-4">
                                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-white/10">
                                    <Clock size={14} className="text-primary" />
                                    <span className="text-[10px] md:text-xs font-bold text-white line-clamp-1">Shift: 08:00 - 17:00</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-white/10">
                                    <Calendar size={14} className="text-accent-purple" />
                                    <span className="text-[10px] md:text-xs font-bold text-white line-clamp-1">November 10, 2025</span>
                                </div>
                            </div>
                        </div>

                        {/* Service Counter Card */}
                        <div className="w-full md:w-auto bg-[#17191a] p-5 md:p-6 rounded-[24px] border border-white/10 shadow-2xl space-y-4 min-w-[280px]">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-[#62748e] uppercase tracking-widest">
                                    Consultation {currentPatient && <span className="text-primary/50 ml-1">• {currentPatient.id}</span>}
                                </span>
                                <div className={cn("w-2 h-2 rounded-full", isTimerRunning ? "bg-status-danger animate-pulse" : "bg-white/20")} />
                            </div>

                            <div className="text-3xl md:text-4xl font-mono font-bold text-white text-center py-1 md:py-2">
                                {formatTime(timer)}
                            </div>

                            <div className="flex gap-2">
                                {!isTimerRunning ? (
                                    <button
                                        onClick={() => setIsTimerRunning(true)}
                                        className="flex-1 bg-primary hover:bg-primary-dark text-white p-2.5 md:p-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                                    >
                                        <Play size={16} /> <span className="text-xs md:text-sm font-bold">Start</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsTimerRunning(false)}
                                        className="flex-1 bg-status-warning hover:bg-status-warning/80 text-white p-2.5 md:p-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                                    >
                                        <Pause size={16} /> <span className="text-xs md:text-sm font-bold">Pause</span>
                                    </button>
                                )}
                                <button
                                    onClick={handleStopTimer}
                                    disabled={timer === 0}
                                    className="flex-1 bg-white/5 hover:bg-status-danger hover:border-status-danger text-white p-2.5 md:p-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Square size={16} /> <span className="text-xs md:text-sm font-bold">Finish</span>
                                </button>
                            </div>
                            {currentPatient && (
                                <p className="text-[10px] text-center text-[#62748e] line-clamp-1">Recording for <b>{currentPatient.name}</b></p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Stats Card */}
                <div className="lg:col-span-4 bg-[#17191a]/50 p-6 md:p-8 rounded-[32px] border border-white/5 backdrop-blur-sm flex flex-col justify-between min-h-[250px] lg:min-h-0">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Hospital Activity</h3>
                            <Activity size={20} className="text-primary" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                        <Users size={16} />
                                    </div>
                                    <span className="text-sm text-[#90a1b9]">Active Patients</span>
                                </div>
                                <span className="text-lg font-bold text-white">42</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                                        <FileText size={16} />
                                    </div>
                                    <span className="text-sm text-[#90a1b9]">Pending Reports</span>
                                </div>
                                <span className="text-lg font-bold text-white">12</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => navigate('/reports')} className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2">
                        View Detailed Reports <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upcoming Patients */}
                <div className="bg-[#17191a]/50 rounded-[32px] border border-white/5 backdrop-blur-sm p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-[3px] h-6 bg-primary rounded-full" />
                            <h2 className="text-xl font-bold text-white">Upcoming Patients</h2>
                        </div>
                        <button onClick={() => navigate('/patients')} className="text-xs font-bold text-primary hover:underline">View All</button>
                    </div>

                    <div className="space-y-4">
                        {upcomingPatients.map((patient) => (
                            <div
                                key={patient.id}
                                className="group flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all cursor-pointer"
                                onClick={() => {
                                    setCurrentPatient(patient);
                                    navigate('/overview');
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <img src={patient.image} alt={patient.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/10 group-hover:border-primary/50 transition-colors" />
                                    <div>
                                        <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{patient.name}</h4>
                                        <p className="text-xs text-[#62748e]">{patient.id} • {patient.treatment}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[10px] font-bold text-[#62748e] uppercase">Status</p>
                                        <p className="text-xs font-medium text-white">{patient.status}</p>
                                    </div>
                                    <ChevronRight size={18} className="text-[#314158] group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Clinical Reports Summary */}
                <div className="bg-[#17191a]/50 rounded-[32px] border border-white/5 backdrop-blur-sm p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-[3px] h-6 bg-accent-purple rounded-full" />
                        <h2 className="text-xl font-bold text-white">Clinical Performance</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-[#121212] rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center space-y-2">
                            <div className="w-10 h-10 rounded-full bg-status-success/20 flex items-center justify-center text-status-success">
                                <CheckCircle2 size={24} />
                            </div>
                            <p className="text-2xl font-bold text-white">96%</p>
                            <p className="text-[10px] font-bold text-[#62748e] uppercase tracking-widest">Success Rate</p>
                        </div>
                        <div className="p-6 bg-[#121212] rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center space-y-2">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <UserCheck size={24} />
                            </div>
                            <p className="text-2xl font-bold text-white">128</p>
                            <p className="text-[10px] font-bold text-[#62748e] uppercase tracking-widest">Treated This Week</p>
                        </div>
                    </div>

                    <div className="p-6 bg-[#1d293d]/30 rounded-3xl border border-white/5 space-y-4">
                        <div className="flex items-center gap-2">
                            <AlertCircle size={14} className="text-status-warning" />
                            <h4 className="text-xs font-bold text-white">Daily Highlight</h4>
                        </div>
                        <p className="text-xs text-[#90a1b9] leading-relaxed italic">
                            "Patient satisfaction is up by 14% this month following the implementation of the new digital triage system."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
