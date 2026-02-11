import { useState, useEffect } from "react";
import type { DashboardData } from "../types";

// Mock Data
// Patient Hook
const MOCK_PATIENT_DATA: DashboardData = {
    patient: {
        id: "#RG-2025-001",
        name: "Ruben George",
        sex: "Male",
        birthDate: "1989-01-01",
        age: 36,
        weight: { value: 82, unit: "kg" },
        height: { value: 182, unit: "cm" },
        bloodType: "O+",
        photoUrl: "/src/assets/ruben-george.png", // Or the imported image path
    },
    currentDiagnosis: {
        id: "DIAG-01",
        title: "Left Shoulder Injury",
        details:
            "Soft tissue injury suspected. No fractures detected on X-ray. Possible rotator cuff or subacromial injury.",
        severityScore: 6, // 6/10
        incidentDate: "2025-11-07",
        status: "Active",
        imaging: {
            title: "Left Shoulder X-Ray",
            view: "Frontal & Lateral View",
            date: "2025-11-09",
            findings:
                "The x-ray shows no fractures or dislocations. Swelling suggests soft tissue injury, possibly rotator cuff or subacromial, MRI recommended if symptoms persist.",
        },
    },
    labResults: [
        {
            id: "CRP-01",
            name: "CRP",
            value: "1.7",
            unit: "mg/L",
            status: "Elevated",
            message: "Slightly elevated",
            trend: "Rising",
        },
        {
            id: "WBC-01",
            name: "WBC",
            value: "8,500",
            unit: "/L",
            status: "Normal",
            message: "No Infection",
            trend: "Stable",
        },
        {
            id: "WBC-02",
            name: "WBC",
            value: "8,500",
            unit: "/L",
            status: "Elevated", // From Figma (Red card)
            message: "No Infection",
            trend: "Stable",
        },
    ],
    appointments: [
        {
            id: "APT-01",
            date: "November 9, 2025",
            doctor: "Doctor Pedro",
            reason: "Left shoulder injury",
            status: "Completed",
            colorGradient: "from-primary to-primary-dark", // Teal gradient
        },
        {
            id: "APT-02",
            date: "Sep 17, 2025",
            doctor: "Doctor Vini",
            reason: "Routine check",
            status: "Completed",
        },
        {
            id: "APT-03",
            date: "Mar 20, 2025",
            doctor: "Doctor Jessica",
            reason: "Routine check",
            status: "Completed",
        },
    ],
};

export function usePatient(id: string = "default") {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);

    useEffect(() => {
        // Simulate async fetch
        const timeout = setTimeout(() => {
            setData(MOCK_PATIENT_DATA);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [id]);

    return { data, loading, error };
}
