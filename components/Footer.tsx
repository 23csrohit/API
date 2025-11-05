import React from 'react';
import { ApiHubLogo, DigitalIndiaLogo } from './icons';

const Footer: React.FC = () => {
  const footerLinks = {
    'About': ['About Us', 'Blog', 'Join Us', 'Contact Us'],
    'Platform': ['Explore APIs', 'SOP for API Access', 'Dashboard', 'Developers'],
    'Utilities': ['API Policy', 'Data Standards', 'Digilocker', 'Information Videos'],
    'Legal': ['Privacy Policy', 'Terms of Use'],
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <ApiHubLogo isFooter={true} />
            <p className="mt-4 text-slate-400 max-w-sm">
              Ministry of Electronics & IT (MeitY) Government of India
            </p>
             <div className="mt-6">
              <p className="font-semibold text-slate-200 mb-2">Powered By</p>
              <DigitalIndiaLogo className="h-10 text-white" />
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-lg text-white mb-4">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-400 hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-black/20 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
          <p>Website designed & developed by National e-Governance Division (NeGD)</p>
          <p>&copy; {new Date().getFullYear()} API Setu. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;