import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

// Components
import { PatientOverview } from "./components/dashboard/PatientOverview";
import { CurrentDiagnosis } from "./components/dashboard/CurrentDiagnosis";
import { LatestBloodTests } from "./components/dashboard/LatestBloodTests";
import { MedicalImaging } from "./components/dashboard/MedicalImaging";
import { Appointments } from "./components/dashboard/Appointments";
import { GeneralPatientPanel } from "./components/dashboard/GeneralPatientPanel";
import { SettingsPage } from "./components/dashboard/SettingsPage";
import { DashboardModals } from "./components/dashboard/DashboardModals";
import { PatientsPage } from "./components/dashboard/PatientsPage";
import { ReportsPage } from "./components/dashboard/ReportsPage";
import { LabsPage } from "./components/dashboard/LabsPage";
import { IntakeSection, AssessmentSection, TreatmentPlanSection } from "./components/dashboard/OverviewTabs";
import { Home } from "./components/dashboard/Home";
import { PatientProvider } from "./context/PatientContext";
import { cn } from "./lib/utils";
import logoUrl from "./assets/logo.svg";

// --- Mock Pages ---
const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
      <div className="w-full max-w-md bg-[#17191a] border border-white/5 p-10 rounded-[32px] shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-10">
          <div className="mx-auto mb-8">
            <img src={logoUrl} alt="Abstract Vision" className="w-[240px] h-auto mx-auto object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="text-[#62748e] mt-2">Sign in to your medical dashboard</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-[#90a1b9]">Email Address</label>
            <input
              type="email"
              placeholder="pedro.campos@hospital.com"
              className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#90a1b9]">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20 mt-4"
          >
            Sign In
          </button>
        </div>
        <p className="text-center text-xs text-[#62748e] mt-8">
          Forgot your password? <button className="text-primary hover:underline">Reset here</button>
        </p>
      </div>
    </div>
  );
};

const Overview = () => {
  const [activeTab, setActiveTab] = useState("Diagnosis");

  const renderContent = () => {
    switch (activeTab) {
      case "Intake": return <IntakeSection />;
      case "Assessment": return <AssessmentSection />;
      case "Treatment Plan": return <TreatmentPlanSection />;
      default: return (
        <div className="flex flex-row gap-8 mx-auto mt-4" style={{ width: '1238px', maxWidth: '96%' }}>
          <div className="flex-1 flex flex-col gap-8 min-w-0">
            <MedicalImaging />
            <Appointments />
          </div>
          <div className="w-[399px] shrink-0 min-w-0">
            <GeneralPatientPanel />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="text-white space-y-8">
      <PatientOverview />
      <CurrentDiagnosis />
      <LatestBloodTests />

      {/* Rectangle 29 - Container */}
      <div className="w-full max-w-[1356px] min-h-[928px] rounded-[18px] bg-[#17191a]/50 border border-white/5 backdrop-blur-sm flex flex-col pt-8 pb-12">
        {/* Navigation Menu */}
        <div className="flex justify-between items-center mx-auto bg-white/5 p-[10px] rounded-xl border border-white/5 w-[1238px] max-w-[96%]">
          {["Intake", "Assessment", "Diagnosis", "Treatment Plan"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-2 text-sm font-medium transition-all rounded-[8px]",
                activeTab === tab
                  ? "bg-[#0b0d0f] text-[#4efde5] shadow-lg border border-white/5"
                  : "text-[#90a1b9] hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area Rendering */}
        <div className="mt-10 px-4 xl:px-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <PatientProvider>
        <MainLayout>
          <DashboardModals />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/labs" element={<LabsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<div className="text-gray-400 p-10">Page not implemented</div>} />
          </Routes>
        </MainLayout>
      </PatientProvider>
    </BrowserRouter>
  );
}

export default App;
