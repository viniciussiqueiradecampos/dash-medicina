import { Pin, MoreHorizontal } from "lucide-react";
const xrayUrl = "https://super.abril.com.br/wp-content/uploads/2018/07/site33.jpg?crop=1&resize=1212,909";

export function GeneralPatientPanel() {
    const xrays = [1, 2, 3, 4, 5, 6];

    return (
        <div className="w-full min-h-[500px] lg:h-[756px] bg-[#17191A] rounded-[18px] border border-white/5 flex flex-col overflow-hidden shrink-0 shadow-2xl">
            {/* Header */}
            <div className="p-6 pb-0">
                <h2 className="text-xl font-bold text-white mb-6">General Patient</h2>
                <div className="h-[1px] bg-white/5 w-full mb-6" />

                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-white">Left shoulder</h3>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide px-6 space-y-8 pb-8">
                {/* X-ray Results Section */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-white">X-ray results</h4>
                        <div className="flex items-center gap-3 text-[#90a1b9]">
                            <Pin size={18} className="rotate-45" />
                            <MoreHorizontal size={18} />
                        </div>
                    </div>

                    <p className="text-sm text-[#90a1b9] leading-relaxed">
                        The x-ray shows no fractures or dislocations. Swelling suggests soft tissue injury, possibly rotator cuff or subacromial, MRI recommended if symptoms persist.
                    </p>

                    {/* Carousel */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {xrays.map((id) => (
                            <div
                                key={id}
                                onClick={() => window.dispatchEvent(new CustomEvent('open-image-modal', {
                                    detail: { url: xrayUrl, title: `X-ray View #${id} - Left Shoulder` }
                                }))}
                                className="w-[84px] h-[96px] bg-[#D9D9D9]/20 rounded-[12px] shrink-0 hover:scale-105 transition-transform cursor-pointer overflow-hidden border border-white/5"
                            >
                                <img
                                    src={xrayUrl}
                                    alt={`X-ray ${id}`}
                                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Doctor Badge */}
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-2 bg-[#D9D9D9]/5 px-3 py-1.5 rounded-lg border border-white/5">
                            <img
                                src="https://xsgames.co/randomusers/assets/avatars/male/4.jpg"
                                alt="Dr. Vinicius"
                                className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-xs font-medium text-white">Dr. Vinicius Campos</span>
                        </div>
                        <span className="text-[10px] text-[#90a1b9]">November 9, 2025</span>
                    </div>
                </section>

                {/* Complaint Details Section */}
                <section className="space-y-6 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-white">Complaint details</h4>
                        <MoreHorizontal size={18} className="text-[#90a1b9]" />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h5 className="text-sm font-bold text-white mb-1.5">Primary complaint</h5>
                            <p className="text-[13px] text-[#90a1b9] leading-relaxed">
                                Started 2 days ago after a fall during a basketball game landing on the left shoulder.
                            </p>
                        </div>

                        <div>
                            <h5 className="text-sm font-bold text-white mb-1.5">Prior Injuries</h5>
                            <p className="text-[13px] text-[#90a1b9] leading-relaxed">
                                Strained right shoulder in July 2022
                            </p>
                        </div>

                        <div>
                            <h5 className="text-sm font-bold text-white mb-1.5">Activity</h5>
                            <p className="text-[13px] text-[#90a1b9] leading-relaxed">
                                Regular basketball player, prone to high-impact injuries
                            </p>
                        </div>
                    </div>

                    {/* Bottom Doctor Badge */}
                    <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2 bg-[#D9D9D9]/5 px-3 py-1.5 rounded-lg border border-white/5">
                            <img
                                src="https://xsgames.co/randomusers/assets/avatars/male/4.jpg"
                                alt="Dr. Vinicius"
                                className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-xs font-medium text-white">Dr. Vinicius Campos</span>
                        </div>
                        <span className="text-[10px] text-[#90a1b9]">November 9, 2025</span>
                    </div>
                </section>
            </div>
        </div>
    );
}
