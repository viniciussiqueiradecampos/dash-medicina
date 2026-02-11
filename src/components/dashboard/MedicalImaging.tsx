import { Maximize2, Scan, MoreVertical } from "lucide-react";
const xrayUrl = "https://super.abril.com.br/wp-content/uploads/2018/07/site33.jpg?crop=1&resize=1212,909";

export function MedicalImaging() {
    const lateralViews = [
        { id: 1, title: "Lateral View", type: "X-Ray", url: xrayUrl },
        { id: 2, title: "Axial View", type: "X-Ray", url: xrayUrl },
        { id: 3, title: "Sagittal View", type: "X-Ray", url: xrayUrl },
    ];

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Section Header */}
            <div className="flex items-center justify-between px-0">
                <div className="flex items-center gap-3">
                    <div className="w-[3px] h-[24px] bg-[#F04248] rounded-full" />
                    <Scan className="text-[#4efde5]" size={20} />
                    <h2 className="text-xl font-bold text-white">Medical Imaging</h2>
                </div>
                <button className="text-[#90a1b9] hover:text-white transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[404px]">
                {/* Main View */}
                <div
                    onClick={() => window.dispatchEvent(new CustomEvent('open-image-modal', {
                        detail: { url: xrayUrl, title: "Main View - Left Shoulder X-Ray" }
                    }))}
                    className="relative flex-1 rounded-[18px] overflow-hidden border border-white/5 group cursor-pointer shadow-xl min-h-[280px] md:min-h-0"
                    style={{
                        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.62) 100%), url(${xrayUrl}) center/cover no-repeat`
                    }}
                >
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex items-end justify-between">
                        <div>
                            <h3 className="text-white font-bold text-base md:text-lg">Main Frontal View</h3>
                            <p className="text-[#90a1b9] text-[10px] md:text-xs">Left Shoulder - Captured 10/11/2025</p>
                        </div>
                        <button className="p-2 md:p-2.5 bg-[#1d293d]/80 hover:bg-primary text-white rounded-xl backdrop-blur-md border border-white/10 transition-all group-hover:scale-110">
                            <Maximize2 size={18} />
                        </button>
                    </div>
                </div>

                {/* Lateral Views Sidebar */}
                <div className="w-full md:w-[180px] flex flex-row md:flex-col gap-3 h-[100px] md:h-auto overflow-x-auto md:overflow-y-auto custom-scrollbar">
                    {lateralViews.map((view) => (
                        <div
                            key={view.id}
                            onClick={() => window.dispatchEvent(new CustomEvent('open-image-modal', {
                                detail: { url: view.url, title: `Lateral View - ${view.title}` }
                            }))}
                            className="relative flex-1 rounded-[14px] overflow-hidden border border-white/5 group cursor-pointer hover:border-primary/40 transition-all min-w-[100px] md:min-w-0"
                            style={{
                                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%), url(${view.url}) center/cover no-repeat`
                            }}
                        >
                            <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-3 bg-black/20 group-hover:bg-transparent transition-colors">
                                <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-wider">{view.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
