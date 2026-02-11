import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Patient {
    id: string;
    name: string;
    gender: string;
    age: number;
    birthDate: string;
    weight: string;
    height: string;
    bloodType: string;
    treatment: string;
    status: string;
    label: string;
    image: string;
    serviceTimer?: number;
    diagnosis?: string;
    lastVisit?: string;
}

interface PatientContextType {
    currentPatient: Patient | null;
    allPatients: Patient[];
    setCurrentPatient: (patient: Patient) => void;
    updatePatient: (patient: Patient) => void;
}

// Initial Mock Data
const MOCK_PATIENTS: Patient[] = [
    {
        id: "RG-2025-001",
        name: "Ruben George",
        gender: "Male",
        age: 36,
        birthDate: "1989-05-12",
        weight: "82kg",
        height: "182cm",
        bloodType: "O+",
        treatment: "Chronic Shoulder Pain",
        label: "Urgent",
        status: "In Treatment",
        image: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg",
        diagnosis: "Left shoulder injury with suspected rotator cuff tear. No fractures detected on X-ray.",
        lastVisit: "2025-11-09"
    },
    {
        id: "AJ-2025-012",
        name: "Alice Johnson",
        gender: "Female",
        age: 28,
        birthDate: "1997-08-24",
        weight: "65kg",
        height: "168cm",
        bloodType: "A-",
        treatment: "Post-Op Recovery",
        label: "Routine",
        status: "Recovered",
        image: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg",
        diagnosis: "Post-operative follow-up for ACL reconstruction. Wound healing progressing normally.",
        lastVisit: "2025-11-08"
    },
    {
        id: "BS-2025-045",
        name: "Bob Smith",
        gender: "Male",
        age: 52,
        birthDate: "1973-02-15",
        weight: "95kg",
        height: "175cm",
        bloodType: "B+",
        treatment: "Fractured Tibia",
        label: "Critical",
        status: "Emergency",
        image: "https://xsgames.co/randomusers/assets/avatars/male/4.jpg",
        diagnosis: "Compound fracture of the right tibia. Requires immediate surgical intervention.",
        lastVisit: "2025-11-10"
    },
    {
        id: "DG-2025-102",
        name: "David Garcia",
        gender: "Male",
        age: 44,
        birthDate: "1981-11-30",
        weight: "88kg",
        height: "180cm",
        bloodType: "AB+",
        treatment: "Rotator Cuff Repair",
        label: "Urgent",
        status: "Surgery Pending",
        image: "https://xsgames.co/randomusers/assets/avatars/male/12.jpg",
        diagnosis: "Complete tear of the supraspinatus tendon. Scheduled for arthroscopic repair.",
        lastVisit: "2025-11-07"
    },
    {
        id: "EM-2025-156",
        name: "Eva Martinez",
        gender: "Female",
        age: 39,
        birthDate: "1986-04-18",
        weight: "70kg",
        height: "165cm",
        bloodType: "O-",
        treatment: "Joint Inflammation",
        label: "Routine",
        status: "Observation",
        image: "https://xsgames.co/randomusers/assets/avatars/female/15.jpg",
        diagnosis: "Systemic joint pain, possibly rheumatoid. Blood tests for inflammatory markers are pending.",
        lastVisit: "2025-11-06"
    },
    {
        id: "FW-2025-201",
        name: "Frank Wilson",
        gender: "Male",
        age: 62,
        birthDate: "1963-12-05",
        weight: "78kg",
        height: "172cm",
        bloodType: "A+",
        treatment: "Spinal Alignment",
        label: "Routine",
        status: "Therapy",
        image: "https://xsgames.co/randomusers/assets/avatars/male/18.jpg",
        diagnosis: "Chronic lower back pain localized in L4-L5. Progressing well with physical therapy sessions.",
        lastVisit: "2025-11-05"
    },
    {
        id: "GL-2025-245",
        name: "Grace Lee",
        gender: "Female",
        age: 21,
        birthDate: "2004-09-12",
        weight: "58kg",
        height: "170cm",
        bloodType: "B-",
        treatment: "ACL Reconstruction",
        label: "Critical",
        status: "Intensive Care",
        image: "https://xsgames.co/randomusers/assets/avatars/female/22.jpg",
        diagnosis: "Post-trauma ACL and meniscus tear. Just transitioned from surgery to early-stage recovery monitoring.",
        lastVisit: "2025-11-10"
    }
];

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [allPatients, setAllPatients] = useState<Patient[]>(() => {
        const saved = localStorage.getItem('hospital_patients');
        return saved ? JSON.parse(saved) : MOCK_PATIENTS;
    });

    const [currentPatient, setCurrentPatientState] = useState<Patient | null>(() => {
        const saved = localStorage.getItem('current_patient_id');
        if (saved) {
            return allPatients.find(p => p.id === saved) || allPatients[0];
        }
        return allPatients[0];
    });

    useEffect(() => {
        localStorage.setItem('hospital_patients', JSON.stringify(allPatients));
    }, [allPatients]);

    const setCurrentPatient = (patient: Patient) => {
        setCurrentPatientState(patient);
        localStorage.setItem('current_patient_id', patient.id);
    };

    const updatePatient = (updatedPatient: Patient) => {
        setAllPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
        if (currentPatient?.id === updatedPatient.id) {
            setCurrentPatientState(updatedPatient);
        }
    };

    return (
        <PatientContext.Provider value={{ currentPatient, allPatients, setCurrentPatient, updatePatient }}>
            {children}
        </PatientContext.Provider>
    );
};

export const usePatientContext = () => {
    const context = useContext(PatientContext);
    if (!context) throw new Error('usePatientContext must be used within a PatientProvider');
    return context;
};
