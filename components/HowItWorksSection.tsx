import React, { useState } from 'react';
import { BuildIcon, TestIcon, PublishIcon, ConsumeIcon } from './icons';

type Tab = 'Build' | 'Test' | 'Publish' | 'Consume';

const HowItWorksSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Consume');

  const tabs: { id: Tab; icon: React.FC<{className?: string}>; title: string; content: string; details: string[] }[] = [
    { 
      id: 'Build', 
      icon: BuildIcon, 
      title: 'Build APIs', 
      content: 'Develop robust and scalable APIs using our comprehensive toolset and guidelines.',
      details: [
        "Standardized Development Kits",
        "Secure Coding Practices",
        "Version Control and Management"
      ]
    },
    { 
      id: 'Test', 
      icon: TestIcon, 
      title: 'Test APIs', 
      content: 'Efficiently test and verify API functionality with our reliable testing solutions.',
      details: [
        "Automated Testing Suites",
        "Performance and Load Testing",
        "Real-time Debugging"
      ]
    },
    { 
      id: 'Publish', 
      icon: PublishIcon, 
      title: 'Publish APIs', 
      content: 'Share your APIs with a vast audience of developers and organizations on our secure platform.',
      details: [
        "Easy Onboarding Process",
        "Access Control and Monetization",
        "Usage Analytics Dashboard"
      ]
    },
    { 
      id: 'Consume', 
      icon: ConsumeIcon, 
      title: 'Consume APIs', 
      content: 'Discover and consume APIs seamlessly to enhance your applications and services.',
      details: [
        "High-quality API discovery",
        "Transparent testing and verification",
        "Flexible and efficient deployment options"
      ]
    },
  ];

  const currentTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="bg-white/70 backdrop-blur-sm py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Holistic API Management for Your Organization</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Optimize and streamline your API production and management by tailoring the process based on your organization’s needs.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center border-b border-slate-200 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 font-semibold px-4 sm:px-6 py-3 transition-colors ${activeTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.title}</span>
              </button>
            ))}
          </div>
          
          {currentTabData && (
            <div key={currentTabData.id} className="text-left animate-fade-in">
              <h3 className="text-2xl font-bold text-slate-800">{currentTabData.title}</h3>
              <p className="mt-2 text-lg text-slate-600">{currentTabData.content}</p>
              <ul className="mt-6 space-y-3">
                  {currentTabData.details.map((detail, index) => (
                      <li key={index} className="flex items-center">
                          <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-700">{detail}</span>
                      </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;