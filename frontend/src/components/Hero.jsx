import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-800 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                ค้นพบความงาม
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-800">สำรวจ</span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                  โลกแห่งข้าวไทย
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                จากเมล็ดข้าวโบราณสู่พันธุ์สมัยใหม่ 
                สำรวจคู่มือสมบูรณ์แบบเกี่ยวกับข้าวไทย 
                พันธุ์ข้าว ผลิตภัณฑ์ ความรู้ และอีกมากมาย
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                เรียนรู้เพิ่มเติม
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-orange-300 text-orange-600 font-medium rounded-xl hover:bg-orange-50 transition-all duration-300">
                ดูพันธุ์ข้าว
              </button>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-96 h-96 mx-auto relative">
                {/* Rice bag illustration using CSS */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-amber-800 to-orange-900 rounded-2xl flex items-center justify-center overflow-hidden">
                  {/* Rice grains pattern */}
                  <div className="w-full h-full relative bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl">
                    <div className="absolute inset-0 opacity-30">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-3 bg-amber-200 rounded-full"
                          style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 80 + 10}%`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <span className="text-2xl">🌾</span>
                        </div>
                        <p className="text-amber-800 font-bold text-lg">ข้าวไทย</p>
                        <p className="text-amber-700 text-sm">คุณภาพระดับpremium</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Wooden spoon */}
                <div className="absolute -bottom-8 -right-8 w-24 h-12 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full transform rotate-12">
                  <div className="absolute inset-1 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-full flex items-center justify-center">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-2 bg-amber-300 rounded-full"
                        style={{
                          left: `${Math.random() * 60 + 20}%`,
                          top: `${Math.random() * 60 + 20}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-10 -left-10 w-20 h-20 bg-orange-200 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute bottom-20 -right-5 w-12 h-12 bg-amber-300 rounded-full opacity-40 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;