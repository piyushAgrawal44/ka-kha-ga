// components/common/LanguageSelector.tsx - Fun language selector

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, X, Sparkles, Star } from 'lucide-react';

interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
    gradient: string;
}

const languages: Language[] = [
    {
        code: 'hi',
        name: 'Hindi',
        nativeName: 'हिन्दी',
        flag: 'HI',
        gradient: 'from-orange-400 to-green-500',
    },
    {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        flag: 'EN',
        gradient: 'from-blue-400 to-blue-600',
    },
];

export const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredLang, setHoveredLang] = useState<string | null>(null);

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    
    return (
        <>
            {/* Floating Button - Bottom Right */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 hover:rotate-12 border-4 border-white group"
                aria-label="Change Language"
                draggable
            >
                <div className="relative">
                    A{"/"}अ
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Change Language
                    <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border-8 border-purple-300 animate-bounce-in">
                        {/* Decorative Top Bar */}
                        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300"></div>

                        {/* Floating Decorations */}
                        <Star className="absolute top-4 left-4 w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                        <Sparkles className="absolute top-4 right-4 w-6 h-6 text-pink-400 animate-pulse" />

                        {/* Header */}
                        <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 p-6 border-b-4 border-purple-200">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-red-100 transition-colors shadow-lg"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>

                            <div className="flex items-center space-x-4">
                                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg">
                                    <Globe className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900">
                                        Choose Language 🌍
                                    </h2>
                                    <p className="text-sm text-gray-600 font-semibold">
                                        Select your preferred language
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Language List */}
                        <div className="overflow-y-auto max-h-[50vh] p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {languages.map((language) => {
                                    const isActive = i18n.language === language.code;
                                    const isHovered = hoveredLang === language.code;

                                    return (
                                        <button
                                            key={language.code}
                                            onClick={() => handleLanguageChange(language.code)}
                                            onMouseEnter={() => setHoveredLang(language.code)}
                                            onMouseLeave={() => setHoveredLang(null)}
                                            className={`relative p-4 rounded-2xl border-3 transition-all transform hover:scale-105 ${isActive
                                                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg scale-105'
                                                    : 'border-purple-200 bg-white hover:border-purple-400 shadow-sm'
                                                }`}
                                        >
                                            {/* Active Indicator */}
                                            {isActive && (
                                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-1 shadow-lg">
                                                    <Check className="w-5 h-5 text-white" />
                                                </div>
                                            )}

                                            {/* Sparkle on Hover */}
                                            {isHovered && !isActive && (
                                                <div className="absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '2s' }}>
                                                    <Sparkles className="w-5 h-5 text-yellow-400" fill="currentColor" />
                                                </div>
                                            )}

                                            <div className="flex items-center space-x-4">
                                                {/* Flag with Gradient Background */}
                                                <div className={`w-14 h-14 bg-gradient-to-br ${language.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg ${isActive || isHovered ? 'scale-110' : ''
                                                    } transition-transform`}>
                                                    {language.flag}
                                                </div>

                                                {/* Language Info */}
                                                <div className="flex-1 text-left">
                                                    <div className="font-black text-gray-900 text-lg">
                                                        {language.name}
                                                    </div>
                                                    <div className="text-sm text-gray-600 font-semibold">
                                                        {language.nativeName}
                                                    </div>
                                                </div>

                                                {/* Arrow Indicator */}
                                                {(isActive || isHovered) && (
                                                    <div className="">
                                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 border-t-4 border-purple-200">
                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 font-semibold">
                                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                                <span>Currently using: {currentLanguage.nativeName}</span>
                                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                            </div>
                        </div>

                        {/* Decorative Bottom Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400"></div>
                    </div>
                </div>
            )}

            {/* CSS for bounce-in animation */}
            <style>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s ease-out;
        }
      `}</style>
        </>
    );
};

export default LanguageSelector;