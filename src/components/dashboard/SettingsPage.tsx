import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Save, Camera } from "lucide-react";
import userAvatarUrl from "../../assets/97b3ba4a22daa40c617f6478912494232f8c468d.png";

export function SettingsPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("password123");

    return (
        <div className="text-white max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="bg-[#17191a]/50 backdrop-blur-sm border border-white/5 rounded-[18px] overflow-hidden">
                {/* Profile Photo Section */}
                <div className="p-8 border-b border-white/5 flex items-center gap-8">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 p-1">
                            <img
                                src={userAvatarUrl}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                            <Camera size={24} className="text-white" />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-2">Profile Photo</h2>
                        <p className="text-[#90a1b9] text-sm mb-4">Click on the image to update your profile photo.</p>
                        <div className="flex gap-4">
                            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                                Upload New
                            </button>
                            <button className="bg-white/5 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

                {/* Account Settings */}
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Login/Username */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#90a1b9]">Login / Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#62748e]" size={20} />
                                <input
                                    type="text"
                                    defaultValue="dr.pedro_campos"
                                    className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#90a1b9]">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#62748e]" size={20} />
                                <input
                                    type="email"
                                    defaultValue="pedro.campos@hospital.com"
                                    className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-[#90a1b9]">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#62748e]" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#1d293d] border border-white/5 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-primary transition-colors"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#62748e] hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                        <button className="bg-white/5 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-white/10 transition-colors">
                            Cancel
                        </button>
                        <button className="bg-primary text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                            <Save size={20} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
