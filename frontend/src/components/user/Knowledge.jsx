import React, { useState } from 'react';
import { Book, FileText, Download, ExternalLink, Users, Award, TrendingUp, Lightbulb, Sprout, Bug, AlertCircle, Leaf } from 'lucide-react';
import { knowledgeData } from '../../data/knowledgeData';

const Knowledge = () => {
  const [activeCategory, setActiveCategory] = useState('cultivation');

  const categories = [
    { id: 'cultivation', label: 'เทคนิคการปลูก', icon: Book },
    { id: 'fertilizer', label: 'ปุ๋ยและธาตุอาหาร', icon: Sprout },
    { id: 'pest', label: 'แมลงศัตรูข้าว', icon: Bug },
    { id: 'disease', label: 'โรคข้าว', icon: AlertCircle },
    { id: 'weed', label: 'วัชพืช', icon: Leaf },
    { id: 'varieties', label: 'พันธุ์ข้าว', icon: Award },
    { id: 'technology', label: 'เทคโนโลยี', icon: Lightbulb },
  ];

  // Function to handle PDF download
  const handleDownload = async (item) => {
    try {
      const response = await fetch(item.pdfUrl);

      if (!response.ok) {
        alert('ไฟล์ PDF ไม่พบ กรุณาติดต่อผู้ดูแลระบบ');
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = item.filename || `${item.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์');
    }
  };

  const currentData = knowledgeData[activeCategory] || [];

  return (
    <section id="knowledge" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            ฐาน<span className="text-orange-500">ความรู้</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ศูนย์รวมความรู้เกี่ยวกับข้าวไทยอย่างครบถ้วน ตั้งแต่การปลูก การแปรรูป
            ไปจนถึงงานวิจัยและเทคโนโลยีล่าสุด พร้อมข้อมูลที่เชื่อถือได้จากผู้เชี่ยวชาญ
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">130+</div>
            <div className="text-gray-600">เอกสารความรู้</div>
          </div>
          <div className="bg-white/70 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">7</div>
            <div className="text-gray-600">หมวดหมู่</div>
          </div>
          <div className="bg-white/70 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Download className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">85+</div>
            <div className="text-gray-600">เอกสาร PDF</div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${activeCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transform scale-105'
                    : 'bg-white/70 text-gray-600 hover:bg-white hover:text-orange-600 shadow-md'
                  }`}
              >
                <IconComponent className="w-5 h-5" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Knowledge Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentData.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-100">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${i < Math.floor(item.rating) ? 'bg-yellow-400' : 'bg-gray-200'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{item.rating}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-3 mb-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>ผู้เขียน:</span>
                  <span className="font-medium text-gray-800">{item.author}</span>
                </div>
                <div className="flex justify-between">
                  <span>วันที่เผยแพร่:</span>
                  <span className="font-medium text-gray-800">{item.publishDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>เวลาอ่าน:</span>
                  <span className="font-medium text-orange-600">{item.readTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>ดาวน์โหลด:</span>
                  <span className="font-medium text-green-600">{item.downloads.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(item)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 text-sm"
                >
                  <Download className="w-4 h-4" />
                  ดาวน์โหลด
                </button>
                <button className="px-4 py-2 border border-orange-300 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Research Section */}
        <div className="mt-16 bg-white/70 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              งานวิจัยเด่นประจำเดือน
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              งานวิจัยที่ได้รับความสนใจสูงสุดและมีผลกระทบต่อการพัฒนาข้าวไทย
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">งานวิจัยยอดเยี่ยม 2024</h4>
                  <p className="text-sm text-gray-600">รางวัลจากสมาคมวิจัยข้าวแห่งเอเซีย</p>
                </div>
              </div>
              <h5 className="font-bold text-gray-800 mb-2">การพัฒนาข้าวทนน้ำท่วมด้วยเทคโนโลยี CRISPR</h5>
              <p className="text-sm text-gray-600 mb-4">
                การใช้เทคโนโลยีการแก้ไขยีน CRISPR เพื่อพัฒนาข้าวที่สามารถทนต่อน้ำท่วมได้นานถึง 14 วัน
              </p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                อ่านเพิ่มเติม →
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">นวัตกรรมแห่งปี</h4>
                  <p className="text-sm text-gray-600">รางวัลจากกระทรวงเกษตรและสหกรณ์</p>
                </div>
              </div>
              <h5 className="font-bold text-gray-800 mb-2">ระบบ AI สำหรับการวินิจฉัยโรคข้าว</h5>
              <p className="text-sm text-gray-600 mb-4">
                ระบบปัญญาประดิษฐ์ที่สามารถวินิจฉัยโรคข้าวได้ถูกต้อง 95% ผ่านการถ่ายภาพใบข้าว
              </p>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                อ่านเพิ่มเติม →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Knowledge;