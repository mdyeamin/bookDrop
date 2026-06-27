import React from 'react';
import { FiBookOpen, FiUsers, FiGlobe, FiTarget, FiHeart, FiShield } from 'react-icons/fi';

const About = () => {
    return (
        <div className="p-4 sm:p-8 w-full max-w-7xl mx-auto space-y-16">
            
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto pt-8">
                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
                    Discover Our Story
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
                    Connecting Readers with the Books They Love
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed">
                    We believe that knowledge should be accessible to everyone. Our platform bridges the gap between passionate readers and dedicated librarians, making book borrowing and lending easier than ever.
                </p>
            </div>

            {/* Mission & Vision Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mission Card */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <FiTarget size={28} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
                    <p className="text-slate-600 leading-relaxed">
                        To empower communities by building a seamless digital library ecosystem. We strive to provide a reliable platform where users can easily find, request, and read their favorite books while supporting local librarians.
                    </p>
                </div>

                {/* Vision Card */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                        <FiGlobe size={28} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h3>
                    <p className="text-slate-600 leading-relaxed">
                        We envision a world where every book finds its reader. By leveraging modern technology, we aim to become the largest and most trusted decentralized library network globally.
                    </p>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Why Choose Us?</h2>
                    <p className="text-slate-500 mt-2">The core values that drive our platform.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <FiBookOpen size={24} />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">Massive Collection</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Access thousands of books across various categories, continually updated by our network of librarians.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <FiUsers size={24} />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">Community Driven</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Built for the community, by the community. Connect with other readers and share your reviews.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <FiShield size={24} />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">Secure & Trusted</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Verified librarians, secure payment gateways, and transparent transaction tracking for your peace of mind.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Call to Action (Optional) */}
            <div className="text-center pb-8">
                <p className="text-slate-600 mb-4 flex items-center justify-center gap-2">
                    Built with <FiHeart className="text-rose-500 fill-rose-500" /> for book lovers.
                </p>
            </div>

        </div>
    );
};

export default About;