import React, { useEffect, useState } from 'react';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Use APIs as Building Blocks for Innovative Applications",
      subtitle: "Discover high-quality APIs from a wide range of reputable sources, both government and private sector, through our platform."
    },
    {
      title: "Get Access to Thousands of APIs",
      subtitle: "Explore a world of APIs for developing innovative solutions. API Hub provides consent based access for a variety of use cases such as KYC, Paperless Admission processes and employment."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section aria-labelledby="hero-heading" className="relative bg-white overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-100 to-violet-100">
         <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.1) 0px, transparent 50%), 
                              radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.1) 0px, transparent 50%),
                              radial-gradient(at 52% 99%, hsla(355, 98%, 72%, 0.1) 0px, transparent 50%),
                              radial-gradient(at 10% 29%, hsla(256, 96%, 68%, 0.1) 0px, transparent 50%),
                              radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.1) 0px, transparent 50%),
                              radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.1) 0px, transparent 50%),
                              radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 0.1) 0px, transparent 50%)`
         }}></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-48 sm:h-44 md:h-48 lg:h-52">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
              >
                <h1 id={`hero-heading-${index}`} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explore
            </button>
            <button
              type="button"
              className="px-8 py-3 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;