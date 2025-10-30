import React from 'react';
import { Heart, Award, Users, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Heart, value: '100+', label: 'พันธุ์ข้าวไทย' },
    { icon: Award, value: '50+', label: 'ปีประสบการณ์' },
    { icon: Users, value: '1M+', label: 'เกษตรกร' },
    { icon: Globe, value: '80+', label: 'ประเทศที่ส่งออก' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            เกี่ยวกับ<span className="text-orange-500">ข้าวไทย</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ข้าวไทยมีประวัติศาสตร์ยาวนานกว่า 5,000 ปี เป็นอาหารหลักของคนไทยและได้รับการยอมรับ
            ในคุณภาพระดับโลก ด้วยความหลากหลายของพันธุ์และรสชาติที่เป็นเอกลักษณ์
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">พันธุกรรมที่หลากหลาย</h3>
            <p className="text-gray-600 leading-relaxed">
              ประเทศไทยมีพันธุ์ข้าวมากกว่า 3,500 พันธุ์ แต่ละพันธุ์มีลักษณะเฉพาะตัว 
              ทั้งรสชาติ กลิ่น และคุณค่าทางโภชนาการที่แตกต่างกัน
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">มาตรฐานระดับโลก</h3>
            <p className="text-gray-600 leading-relaxed">
              ข้าวไทยได้รับการรับรองมาตรฐานคุณภาพระดับสากล ส่งออกไปทั่วโลก
              เป็นที่ยอมรับในเรื่องความปลอดภัยและรสชาติที่เป็นเลิศ
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">วัฒนธรรมและประเพณี</h3>
            <p className="text-gray-600 leading-relaxed">
              ข้าวไม่ได้เป็นแค่อาหาร แต่เป็นส่วนสำคัญของวัฒนธรรมไทย 
              สะท้อนถึงวิถีชีวิตและภูมิปัญญาของเกษตรกรไทยมาช้านาน
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;