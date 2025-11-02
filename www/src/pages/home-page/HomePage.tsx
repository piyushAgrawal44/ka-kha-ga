import { useState } from 'react';
import { Sparkles, Users, LineChart, Bell, FileText, Shield, Zap, Heart, Target, Calendar, Award, TrendingUp, Brain, Mic, Ear, Smile, CheckCircle2, ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhyTherapistsChoose from './components/WhyTherapistChooseUs';

export default function HomePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const features = [
        {
            icon: <Target className="w-6 h-6" />,
            title: "Milestone Tracking",
            description: "Track weekly progress and achievements with customizable milestones for each child's unique journey"
        },
        {
            icon: <Brain className="w-6 h-6" />,
            title: "AI-Powered Insights",
            description: "Get intelligent recommendations and progress predictions based on historical data and patterns"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Manage and Monitor Therapist",
            description: "Seamlessly coordinate between speech therapists, occupational therapists, and special educators"
        },
        {
            icon: <Bell className="w-6 h-6" />,
            title: "Real-Time Updates",
            description: "Parents receive instant notifications when new milestones are achieved or updates are posted"
        },
        {
            icon: <LineChart className="w-6 h-6" />,
            title: "Visual Progress Reports",
            description: "Beautiful, easy-to-understand charts and graphs showing growth over time"
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Comprehensive Documentation",
            description: "Maintain detailed records, session notes, and evidence-based assessments in one place"
        },
        {
            icon: <Calendar className="w-6 h-6" />,
            title: "Session Management",
            description: "Schedule, manage, and document therapy sessions with automated reminders"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Secure & Private",
            description: "Data protection ensuring all information remains confidential"
        }
    ];

    const specializations = [
        { icon: <Mic className="w-8 h-8" />, name: "Speech Therapy" },
        { icon: <Brain className="w-8 h-8" />, name: "Autism Spectrum" },
        { icon: <Heart className="w-8 h-8" />, name: "ADHD" },
        { icon: <Ear className="w-8 h-8" />, name: "Hearing Support" },
        { icon: <Smile className="w-8 h-8" />, name: "Behavioral Therapy" },
        { icon: <Award className="w-8 h-8" />, name: "Developmental Delays" }
    ];

    const benefits = {
        therapists: [
            "Save hours on manual administrative tasks",
            "Standardized assessment templates",
            "Easy progress documentation",
            "Increase rate in parent satisfaction",
            "Automated report generation",
            "Client management dashboard"
        ],
        parents: [
            "24/7 access to child's progress",
            "Understand therapy goals clearly",
            "Celebrate every milestone",
            "Direct communication with therapists",
            "Activity suggestions for home",
            "Progress comparison tools"
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    क-ख-ग
                                </span>
                                <p className='text-xs'>Kids Growth Tracking Software</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">Features</a>
                            <a href="#benefits" className="text-gray-700 hover:text-purple-600 transition-colors">Benefits</a>
                            <a href="#specializations" className="text-gray-700 hover:text-purple-600 transition-colors">Specializations</a>
                            <Link to={'/workflow'} className="text-gray-700 hover:text-purple-600 transition-colors">Workflows</Link>
                           
                        </div>

                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-4 py-4 space-y-3">
                            <a href="#features" className="block text-gray-700 hover:text-purple-600">Features</a>
                            <a href="#benefits" className="block text-gray-700 hover:text-purple-600">Benefits</a>
                            <a href="#specializations" className="block text-gray-700 hover:text-purple-600">Specializations</a>
                            <Link to={'/workflow'} className="block text-gray-700 hover:text-purple-600">Workflows</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
                                <Zap className="w-4 h-4" />
                                <span className="text-sm font-medium">AI-Powered Growth Tracking</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Every Child's
                                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Growth Story </span>
                                Matters
                            </h1>

                            <p className="text-xl text-gray-600 mb-8">
                                The complete platform for special educators, therapists, and parents to track, celebrate, and nurture every milestone in a child's developmental journey.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href='mailto:developerbowl@gmail.com'>
                                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                                        <span>Request Demo</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-white rounded-2xl p-6">
                                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                                        <TrendingUp className="w-24 h-24 text-purple-600" />
                                    </div>
                                    <div className="mt-6 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Speech Progress</span>
                                            <span className="text-sm font-semibold text-green-600">+32%</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 w-4/5 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 bg-yellow-400 p-4 rounded-2xl shadow-lg animate-bounce">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-green-400 p-4 rounded-2xl shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specializations */}
            <section id="specializations" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Supporting Every
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Special Need</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Specialized tracking modules designed for different therapeutic approaches and developmental needs
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {specializations.map((spec, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl text-center hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl text-white mb-4">
                                    {spec.icon}
                                </div>
                                <h3 className="font-semibold text-gray-900">{spec.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Powerful Features for
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Better Care</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Everything you need to provide exceptional care and keep parents connected to their child's progress
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl text-white mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Therapist Choose Us */}
            <WhyTherapistsChoose />
            
            {/* Benefits Section */}
            <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Benefits for
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Everyone</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* For Therapists */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="bg-purple-600 p-3 rounded-xl">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">For Therapists & Educators</h3>
                            </div>

                            <ul className="space-y-4">
                                {benefits.therapists.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* For Parents */}
                        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-3xl">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="bg-pink-600 p-3 rounded-xl">
                                    <Heart className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">For Parents</h3>
                            </div>

                            <ul className="space-y-4">
                                {benefits.parents.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <CheckCircle2 className="w-6 h-6 text-pink-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Build Unshakeable Trust and Transform Your Child Growth?
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href='mailto:developerbowl@gmail.com'>
                                <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105">
                                    Request a Demo
                                </button>
                            </a>
                            <a href='mailto:developerbowl@gmail.com'><button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all">
                                Contact Us
                            </button></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    <div className=" text-center text-gray-400">
                        <p>&copy; 2025 Developer Bowl. All rights reserved. Making every milestone count.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}