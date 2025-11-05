import React from 'react';
import Footer from './Footer';
import Header from './Header';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import {
  ArrowDownIcon,
  BarChartIcon,
  CbseLogo,
  CertificateIcon,
  DigiLockerLogo,
  DrivingLicenseIcon,
  GstnLogo,
  MarksheetIcon,
  McLogo,
  MeriPehchaanLogo,
  MySchemeLogo,
  NetworkIcon,
  RationCardIcon,
  RegistrationIcon,
  UmangLogo,
  UsersIcon
} from './icons';

interface HomePageProps {
  navigateToLogin: () => void;
  navigateToApiDirectory: () => void;
}

const BackgroundBlobs: React.FC = () => (
  <>
    <div className="absolute top-0 -left-64 w-[40rem] h-[40rem] bg-violet-200/30 rounded-full blur-3xl opacity-50 -z-10" aria-hidden="true" />
    <div className="absolute top-[30rem] -right-72 w-[50rem] h-[50rem] bg-sky-200/30 rounded-full blur-3xl opacity-60 -z-10" aria-hidden="true" />
    <div className="absolute top-[80rem] -left-80 w-[50rem] h-[50rem] bg-blue-200/30 rounded-full blur-3xl opacity-50 -z-10" aria-hidden="true" />
    <div className="absolute top-[150rem] -right-64 w-[45rem] h-[45rem] bg-violet-200/30 rounded-full blur-3xl opacity-60 -z-10" aria-hidden="true" />
    <div className="absolute top-[200rem] -left-72 w-[40rem] h-[40rem] bg-sky-200/30 rounded-full blur-3xl opacity-50 -z-10" aria-hidden="true" />
  </>
);


const StatsSection: React.FC = () => {
    const stats = [
        { value: '7.5k+', label: 'Published APIs', icon: NetworkIcon },
        { value: '2.3k+', label: 'Publishers', icon: BarChartIcon },
        { value: '769+', label: 'Consumers', icon: UsersIcon }
    ];
    return (
        <section className="bg-slate-50/70 backdrop-blur-sm py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        An API platform you can rely on
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Our numbers demonstrate the reliability of our platform, and our commitment to driving innovation that helps organizations thrive.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white/60 p-8 rounded-lg border border-slate-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden group">
                           <div className="absolute -right-8 -bottom-8 text-slate-100 transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                                <stat.icon className="h-32 w-32" />
                           </div>
                           <div className="relative">
                                <p className="text-5xl font-bold text-blue-600">{stat.value}</p>
                                <p className="mt-2 text-lg font-medium text-slate-700">{stat.label}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PartnerOrganizations: React.FC = () => (
  <section className="bg-transparent py-16 sm:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Vast directory of publishing organizations</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Browse through our ever-increasing list of partner organizations who rely on our platform.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-sm border border-slate-200 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-300">
          <p className="text-lg font-semibold text-slate-800">Central Government</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">140</p>
          <p className="text-slate-500">Organizations</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-sm border border-slate-200 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-300">
          <p className="text-lg font-semibold text-slate-800">State Government</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">2026</p>
          <p className="text-slate-500">Organizations</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-lg shadow-sm border border-slate-200 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-300">
          <p className="text-lg font-semibold text-slate-800">Industry & Private Sector</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">117</p>
          <p className="text-slate-500">Organizations</p>
        </div>
      </div>
    </div>
  </section>
);

const TopApisSection: React.FC = () => {
  const apis = [
    { name: 'Income Certificate', icon: CertificateIcon },
    { name: 'Caste Certificate', icon: CertificateIcon },
    { name: 'Registration of Vehicles', icon: RegistrationIcon },
    { name: 'Driving License', icon: DrivingLicenseIcon },
    { name: 'Class X Marksheet', icon: MarksheetIcon },
    { name: 'Class XII Marksheet', icon: MarksheetIcon },
    { name: 'Ration Card', icon: RationCardIcon },
  ];
  return (
    <section className="py-16 sm:py-24 bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Explore hundreds of APIs</h2>
        <p className="mt-4 text-lg text-slate-600">API Hub offers a diverse range of APIs from reputable organizations.</p>
        <ArrowDownIcon className="mx-auto mt-4 h-8 w-8 text-blue-600 animate-bounce" />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
          {apis.map(api => (
            <div key={api.name} className="flex flex-col items-center p-4 bg-slate-50 rounded-lg border border-slate-200 hover:-translate-y-2 transition-transform duration-300 cursor-pointer group hover:shadow-lg">
              <div className="flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full mb-3 group-hover:bg-blue-200 transition-colors duration-300 group-hover:scale-110">
                <api.icon className="h-8 w-8 text-blue-600"/>
              </div>
              <p className="font-semibold text-sm text-slate-700 leading-tight">{api.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrustedBy: React.FC = () => {
  const logos = [
    { name: 'DigiLocker', component: DigiLockerLogo },
    { name: 'MeriPehchaan', component: MeriPehchaanLogo },
    { name: 'UMANG', component: UmangLogo },
    { name: 'MyScheme', component: MySchemeLogo },
    { name: 'CBSE', component: CbseLogo },
    { name: 'GSTN', component: GstnLogo },
    { name: 'MCA', component: McLogo },
  ];
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 sm:py-24 bg-slate-50/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">Trusted by India Stack platforms</h2>
        <p className="mt-4 text-lg text-slate-600 text-center max-w-3xl mx-auto">
          Equip your application with all the tools for API management. API Hub is already a trusted partner for large Digital India platforms.
        </p>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] mt-12">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_svg]:max-w-none animate-infinite-scroll">
            {duplicatedLogos.map((logo, index) => (
              <li key={index}><logo.component className="h-10 text-slate-500 transition-colors hover:text-slate-800" /></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const CallToAction: React.FC = () => (
    <section className="bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-16 -translate-y-16" aria-hidden="true"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-20 translate-y-20" aria-hidden="true"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-4xl font-bold">Reach new heights with API Hub</h2>
            <button className="mt-8 bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-slate-100 transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Get Started
            </button>
        </div>
    </section>
);

const LearningResources: React.FC = () => {
    const resources = [
        { title: 'OpenAPI Initiative', description: 'Develops and maintains the OpenAPI Specification for building APIs.' },
        { title: 'OpenAPI Specification', description: 'Open-source format for defining APIs, enabling machine-readable documentation.' },
        { title: 'REST APIs', description: 'Learn about REST architectural style, a widely-used standard for building scalable APIs.' },
    ];
    return (
        <section className="bg-slate-50/70 backdrop-blur-sm py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Empower yourself with these helpful resources</h2>
                    <p className="mt-4 text-lg text-slate-600">Explore our curated resources to learn about industry-standard API development practices.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {resources.map(res => (
                        <div key={res.title} className="bg-white/60 p-8 rounded-lg shadow-sm border border-slate-200 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-slate-800">{res.title}</h3>
                            <p className="mt-2 text-slate-600">{res.description}</p>
                            <a href="#" className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-700">Learn More &rarr;</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const HomePage: React.FC<HomePageProps> = ({ navigateToLogin, navigateToApiDirectory }) => {
  return (
    <div className="relative overflow-x-hidden">
      <BackgroundBlobs />
      <Header onSignInClick={navigateToLogin} onApiDirectoryClick={navigateToApiDirectory} />
      <main>
        <HeroSection />
        <StatsSection />
        <PartnerOrganizations />
        <TopApisSection />
        <TrustedBy />
        <CallToAction />
        <HowItWorksSection />
        <LearningResources />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;