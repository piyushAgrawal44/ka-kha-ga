import React, { useState } from 'react';
import { 
  Eye, 
  Heart, 
  TrendingUp, 
  Users, 
  Zap, 
  CheckCircle,
  Sparkles,
  Star
} from 'lucide-react';

const WhyTherapistsChoose: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const reasons = [
    {
      icon: Eye,
      title: "The Reality Check",
      problem: "Parents don't leave because therapy isn't working.",
      solution: "They leave because they can't see it working.",
      result: "क-ख-ग makes every breakthrough visible.",
      color: "from-purple-500 to-pink-500",
      accentColor: "purple",
    },
    {
      icon: Zap,
      title: "The Bold Truth",
      problem: "Your best work happens when parents aren't watching.",
      solution: "Parents miss 95% of the magic moments.",
      result: "क-ख-ग captures every milestone instantly.",
      color: "from-blue-500 to-cyan-500",
      accentColor: "blue",
    },
    {
      icon: Users,
      title: "The 45-Minute Problem",
      problem: "You're crushing it with kids.",
      solution: "But parents only see you 45 mins/week.",
      result: "क-ख-ग keeps them connected to every win.",
      color: "from-orange-500 to-red-500",
      accentColor: "orange",
    },
    {
      icon: Heart,
      title: "The Gap",
      problem: "Parents lose faith between sessions.",
      solution: "You know the progress is real. They don't.",
      result: "क-ख-ग bridges that gap instantly.",
      color: "from-pink-500 to-rose-500",
      accentColor: "pink",
    },
    {
      icon: TrendingUp,
      title: "Invisible Progress",
      problem: "Invisible progress = Lost trust.",
      solution: "Your hard work goes unnoticed daily.",
      result: "क-ख-ग makes your impact visible.",
      color: "from-indigo-500 to-purple-500",
      accentColor: "indigo",
    },
    {
      icon: CheckCircle,
      title: "The Trust Crisis",
      problem: "70% of parents doubt therapy progress between sessions.",
      solution: "Doubt leads to dropout.",
      result: "क-ख-ग shows every breakthrough in real-time.",
      color: "from-teal-500 to-green-500",
      accentColor: "teal",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Star className="w-24 h-24 text-yellow-400 animate-pulse" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <Sparkles className="w-32 h-32 text-purple-400 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Why Therapists Choose Us</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            The Real Problem We're
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Solving</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            It's not about paperwork. It's about trust, transparency, and keeping parents engaged in their child's journey.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const isActive = activeCard === index;
            
            return (
              <div
                key={index}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${
                  isActive ? 'ring-4 ring-purple-300' : ''
                }`}
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${reason.color} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 opacity-20">
                    <Icon className="w-32 h-32 transform rotate-12" />
                  </div>
                  <div className="relative z-10">
                    <div className="bg-white/20 backdrop-blur w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {reason.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Problem */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-red-600 font-bold text-xs">✗</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Problem
                      </p>
                      <p className="text-gray-700 font-medium">
                        {reason.problem}
                      </p>
                    </div>
                  </div>

                  {/* Why */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-yellow-600 font-bold text-xs">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Why it Matters
                      </p>
                      <p className="text-gray-700 font-medium">
                        {reason.solution}
                      </p>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Solution
                      </p>
                      <p className="text-gray-900 font-bold">
                        {reason.result}
                      </p>
                    </div>
                  </div>
                </div>

               
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyTherapistsChoose;