// Abstract Vision - Medical Dashboard Types

export interface Patient {
    id: string; // #RG-2025-001
    name: string; // Ruben George
    sex: 'Male' | 'Female' | 'Other';
    birthDate: string; // For age calculation (or just age)
    age: number; // 36
    weight: {
        value: number; // 82
        unit: 'kg' | 'lbs';
    };
    height: {
        value: number; // 182
        unit: 'cm' | 'ft';
    };
    bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    photoUrl?: string; // For the circular avatar
}

export type SeverityLevel = 'Low' | 'Moderate' | 'High' | 'Critical'; // Could map to 1-10

export interface Diagnosis {
    id: string;
    title: string; // Left Shoulder Injury
    details: string; // "Soft tissue injury suspected..."
    severityScore: number; // 6 out of 10
    incidentDate: string; // "Nov 7, 2025" or ISO string
    status: 'Active' | 'Resolved' | 'Discharged';
    imaging?: {
        title: string; // "Left Shoulder X-Ray"
        view: string; // "Frontal & Lateral View"
        date: string;
        findings: string[] | string;
    }
}

export interface LabResult {
    id: string;
    name: string; // CRP, WBC
    value: string; // 1.7
    unit: string; // mg/L, /L
    status: 'Normal' | 'Elevated' | 'Low' | 'Critical';
    message: string; // "Slightly elevated", "No Infection"
    trend?: 'Stable' | 'Rising' | 'Falling';
}

export interface Appointment {
    id: string;
    date: string; // Nov 9, 2025
    doctor: string; // Doctor Pedro
    reason: string; // Left shoulder injury
    status: 'Upcoming' | 'Completed' | 'Missed' | 'Cancelled';
    colorGradient?: string; // Optional override for visual
}

export interface DashboardData {
    patient: Patient;
    currentDiagnosis: Diagnosis;
    labResults: LabResult[];
    appointments: Appointment[];
}
