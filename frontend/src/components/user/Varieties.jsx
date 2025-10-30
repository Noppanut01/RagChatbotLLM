import React, { useState } from 'react';
import { Leaf, Droplets, Sun, Thermometer, MapPin, Calendar, TrendingUp, Info } from 'lucide-react';

const Varieties = () => {
  const [selectedVariety, setSelectedVariety] = useState(null);

  const varieties = [
    {
      id: 1,
      name: 'ข้าวหอมมะลิ 105',
      scientificName: 'Oryza sativa L. cv. KDML105',
      image: 'src/images/rice105.jpg',
      type: 'ข้าวเจ้า',
      characteristics: [
        { icon: Leaf, label: 'ความยาวเมล็ด', value: '6.0-7.0 มม.' },
        { icon: Droplets, label: 'ความชื้น', value: '≤ 14%' },
        { icon: Sun, label: 'ระยะการเจริญ', value: '120-130 วัน' },
        { icon: Thermometer, label: 'อุณหภูมิเหมาะสม', value: '25-30°C' }
      ],
      description: 'ข้าวหอมมะลิ 105 เป็นข้าวพันธุ์พื้นเมืองของไทย มีกลิ่นหอมเฉพาะตัวคล้ายกลิ่นใบเตย เมล็ดข้าวยาวใส มีคุณภาพดีเยี่ยม เป็นที่ยอมรับในตลาดโลก',
      cultivationArea: 'ภาคอีสาน โดยเฉพาะจังหวัดยโสธร ร้อยเอ็ด มหาสารคาม และสุรินทร์',
      yield: '300-400 กก./ไร่',
      specialty: 'หอมกลิ่นมะลิธรรมชาติ เมล็ดยาวใส คุณภาพส่งออก ได้รับการคุ้มครองทางภูมิศาสตร์ (GI)',
      plantingMethod: 'ปลูกในฤดูฝน เดือนมิถุนายน-กรกฎาคม',
      soilType: 'ดินร่วนปนทราย ระบายน้ำดี pH 5.5-6.5',
      waterRequirement: '1,200-1,500 มม./ปี',
      diseases: ['โรคไหม้', 'โรคใบจุด', 'โรคขอบใบแห้ง'],
      pests: ['เพลี้ยกระโดดสีน้ำตาล', 'หนอนกออ', 'หนอนผีเสื้อ'],
      nutritionalValue: {
        carbohydrate: '78.2%',
        protein: '7.1%',
        fat: '0.7%',
        fiber: '0.4%',
        amylose: '12-18%'
      },
      marketPrice: '15,000-18,000 บาท/ตัน',
      exportCountries: ['สหรัฐอเมริกา', 'จีน', 'ฮ่องกง', 'สิงคโปร์', 'มาเลเซีย']
    },
    {
      id: 2,
      name: 'ข้าวเหนียวขาว',
      scientificName: 'Oryza sativa var. glutinosa',
      image: 'src/images/stickyrice.jpg',
      type: 'ข้าวเหนียว',
      characteristics: [
        { icon: Leaf, label: 'ความยาวเมล็ด', value: '4.5-5.5 มม.' },
        { icon: Droplets, label: 'ความชื้น', value: '≤ 13%' },
        { icon: Sun, label: 'ระยะการเจริญ', value: '110-120 วัน' },
        { icon: Thermometer, label: 'อุณหภูมิเหมาะสม', value: '28-32°C' }
      ],
      description: 'ข้าวเหนียวขาวมีเนื้อแป้งเหนียว เมื่อสุกจะมีความเหนียวนุ่ม สีขาวใส เหมาะสำหรับทำขนมไทย อาหารพื้นบ้าน และเป็นอาหารหลักของคนภาคเหนือและภาคอีสาน',
      cultivationArea: 'ภาคเหนือ ภาคอีสาน โดยเฉพาะจังหวัดเชียงใหม่ เชียงราย น่าน และขอนแก่น',
      yield: '250-350 กก./ไร่',
      specialty: 'เหนียวนุ่ม เหมาะทำขนมไทย อาหารพื้นบ้าน มีความเหนียวสูง',
      plantingMethod: 'ปลูกในฤดูฝน เดือนพฤษภาคม-มิถุนายน',
      soilType: 'ดินร่วน ดินร่วนเหนียว pH 6.0-7.0',
      waterRequirement: '1,000-1,200 มม./ปี',
      diseases: ['โรคไหม้', 'โรคใบจุดสีน้ำตาล', 'โรคกาบใบแห้ง'],
      pests: ['เพลี้ยกระโดดสีน้ำตาล', 'หนอนกออ', 'หนอนใส'],
      nutritionalValue: {
        carbohydrate: '79.5%',
        protein: '6.8%',
        fat: '0.5%',
        fiber: '0.3%',
        amylose: '1-2%'
      },
      marketPrice: '12,000-15,000 บาท/ตัน',
      exportCountries: ['ลาว', 'กัมพูชา', 'เวียดนาม', 'จีน']
    },
    {
      id: 3,
      name: 'ข้าวไรซ์เบอรี่',
      scientificName: 'Oryza sativa L. cv. Riceberry',
      image: 'src/images/riceberry.jpg',
      type: 'ข้าวเจ้า (พันธุ์ปรับปรุง)',
      characteristics: [
        { icon: Leaf, label: 'ความยาวเมล็ด', value: '5.5-6.5 มม.' },
        { icon: Droplets, label: 'ความชื้น', value: '≤ 14%' },
        { icon: Sun, label: 'ระยะการเจริญ', value: '125-135 วัน' },
        { icon: Thermometer, label: 'อุณหภูมิเหมาะสม', value: '24-28°C' }
      ],
      description: 'ข้าวไรซ์เบอรี่เป็นข้าวพันธุ์ปรับปรุงที่พัฒนาโดยมหาวิทยาลัยเกษตรศาสตร์ มีสีม่วงธรรมชาติ อุดมไปด้วยแอนโธไซยานิน มีคุณสมบัติต้านอนุมูลอิสระสูง',
      cultivationArea: 'หลายจังหวัด โดยเฉพาะจังหวัดพิษณุโลก เพชรบูรณ์ และลพบุรี',
      yield: '280-320 กก./ไร่',
      specialty: 'แอนโธไซยานินสูง ต้านออกซิเดชัน ดีต่อสุขภาพ ลดคอเลสเตอรอล',
      plantingMethod: 'ปลูกได้ทั้งฤดูฝนและฤดูแล้ง',
      soilType: 'ดินร่วน ดินร่วนปนทราย pH 5.5-7.0',
      waterRequirement: '1,100-1,300 มม./ปี',
      diseases: ['โรคไหม้', 'โรคใบจุด', 'โรคกาบใบแห้ง'],
      pests: ['เพลี้ยกระโดดสีน้ำตาล', 'หนอนกออ', 'หนอนผีเสื้อ'],
      nutritionalValue: {
        carbohydrate: '75.8%',
        protein: '10.5%',
        fat: '2.8%',
        fiber: '4.2%',
        anthocyanin: '327 mg/100g'
      },
      marketPrice: '25,000-30,000 บาท/ตัน',
      exportCountries: ['ญี่ปุ่น', 'เกาหลีใต้', 'สิงคโปร์', 'ออสเตรเลีย']
    },
    {
      id: 4,
      name: 'ข้าวกล้องแดง',
      scientificName: 'Oryza sativa L. (Red Rice)',
      image: 'src/images/redrice.jpg',
      type: 'ข้าวเจ้า',
      characteristics: [
        { icon: Leaf, label: 'ความยาวเมล็ด', value: '5.0-6.0 มม.' },
        { icon: Droplets, label: 'ความชื้น', value: '≤ 14%' },
        { icon: Sun, label: 'ระยะการเจริญ', value: '115-125 วัน' },
        { icon: Thermometer, label: 'อุณหภูมิเหมาะสม', value: '26-30°C' }
      ],
      description: 'ข้าวกล้องแดงเป็นข้าวที่ยังคงรำข้าวสีแดง อุดมไปด้วยสารอาหาร วิตามิน แร่ธาตุ และใยอาหาร เหมาะสำหรับผู้ที่ใส่ใจสุขภาพ',
      cultivationArea: 'ภาคอีสาน โดยเฉพาะจังหวัดสุรินทร์ บุรีรัมย์ และศีสะเกษ',
      yield: '280-350 กก./ไร่',
      specialty: 'อุดมสารอาหาร ใยอาหารสูง ดีต่อสุขภาพ วิตามิน B1 สูง',
      plantingMethod: 'ปลูกในฤดูฝน เดือนมิถุนายน-กรกฎาคม',
      soilType: 'ดินร่วนปนทราย ดินร่วน pH 5.5-6.5',
      waterRequirement: '1,200-1,400 มม./ปี',
      diseases: ['โรคไหม้', 'โรคใบจุด', 'โรคขอบใบแห้ง'],
      pests: ['เพลี้ยกระโดดสีน้ำตาล', 'หนอนกออ', 'หนอนใส'],
      nutritionalValue: {
        carbohydrate: '76.2%',
        protein: '8.5%',
        fat: '2.2%',
        fiber: '3.5%',
        iron: '2.2 mg/100g'
      },
      marketPrice: '18,000-22,000 บาท/ตัน',
      exportCountries: ['ญี่ปุ่น', 'เกาหลีใต้', 'ไต้หวัน', 'ฮ่องกง']
    },
    {
      id: 5,
      name: 'ข้าวหอมปทุมธานี 1',
      scientificName: 'Oryza sativa L. cv. Pathum Thani 1',
      image: 'src/images/pathumrice.jpg',
      type: 'ข้าวเจ้า',
      characteristics: [
        { icon: Leaf, label: 'ความยาวเมล็ด', value: '5.8-6.8 มม.' },
        { icon: Droplets, label: 'ความชื้น', value: '≤ 14%' },
        { icon: Sun, label: 'ระยะการเจริญ', value: '105-115 วัน' },
        { icon: Thermometer, label: 'อุณหภูมิเหมาะสม', value: '25-30°C' }
      ],
      description: 'ข้าวหอมปทุมธานี 1 เป็นพันธุ์ปรับปรุงที่มีกลิ่นหอมคล้ายข้าวหอมมะลิ ให้ผลผลิตสูง ทนโรค เหมาะสำหรับการปลูกในพื้นที่ชลประทาน',
      cultivationArea: 'ภาคกลาง โดยเฉพาะจังหวัดปทุมธานี อยุธยา และสุพรรณบุรี',
      yield: '400-500 กก./ไร่',
      specialty: 'ผลผลิตสูง หอมกลิ่นมะลิ ทนโรค เหมาะปลูกในพื้นที่ชลประทาน',
      plantingMethod: 'ปลูกได้ 2 ฤดู ฤดูฝนและฤดูแล้ง',
      soilType: 'ดินเหนียว ดินร่วนเหนียว pH 6.0-7.5',
      waterRequirement: '1,000-1,200 มม./ปี',
      diseases: ['โรคไหม้', 'โรคใบจุดสีน้ำตาล', 'โรคกาบใบแห้ง'],
      pests: ['เพลี้ยกระโดดสีน้ำตาล', 'หนอนกออ', 'หนอนผีเสื้อ'],
      nutritionalValue: {
        carbohydrate: '78.5%',
        protein: '7.3%',
        fat: '0.8%',
        fiber: '0.5%',
        amylose: '15-20%'
      },
      marketPrice: '14,000-16,000 บาท/ตัน',
      exportCountries: ['อิรัก', 'เบนิน', 'เซเนกัล', 'กินี']
    },
    {
      id: 6,
      name: 'ข้าวเหนียวดำ',
      scientificName: 'Oryza sativa var. glutinosa (Black)',
      image: 'src/images/stickyblack.jpg',
      type: 'ข้าวเหนียว',
      characteristics: [
        { icon: Leaf, label: 'ความยาวเมล็ด', value: '4.0-5.0 มม.' },
        { icon: Droplets, label: 'ความชื้น', value: '≤ 13%' },
        { icon: Sun, label: 'ระยะการเจริญ', value: '115-125 วัน' },
        { icon: Thermometer, label: 'อุณหภูมิเหมาะสม', value: '26-30°C' }
      ],
      description: 'ข้าวเหนียวดำมีสีดำธรรมชาติ เหนียวหอม อุดมไปด้วยแอนโธไซยานิน เหมาะสำหรับทำขนมหวานไทย มีคุณค่าทางโภชนาการสูง',
      cultivationArea: 'ภาคเหนือ ภาคอีสาน โดยเฉพาะจังหวัดเลย หนองคาย และอุดรธานี',
      yield: '220-280 กก./ไร่',
      specialty: 'สีดำธรรมชาติ เหนียวหอม ทำขนมไทย แอนโธไซยานินสูง',
      plantingMethod: 'ปลูกในฤดูฝน เดือนพฤษภาคม-มิถุนายน',
      soilType: 'ดินร่วน ดินร่วนเหนียว pH 5.5-6.5',
      waterRequirement: '1,100-1,300 มม./ปี',
      diseases: ['โรคไหม้', 'โรคใบจุดสีน้ำตาล', 'โรคกาบใบแห้ง'],
      pests: ['เพลี้ยกระโดดสีน้ำตาล', 'หนอนกออ', 'หนอนใส'],
      nutritionalValue: {
        carbohydrate: '77.8%',
        protein: '8.5%',
        fat: '1.2%',
        fiber: '1.8%',
        anthocyanin: '215 mg/100g'
      },
      marketPrice: '16,000-20,000 บาท/ตัน',
      exportCountries: ['จีน', 'ไต้หวัน', 'ฮ่องกง', 'สิงคโปร์']
    }
  ];

  return (
    <section id="varieties" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            พันธุ์<span className="text-orange-500">ข้าวไทย</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ศึกษาพันธุ์ข้าวไทยที่หลากหลาย แต่ละพันธุ์มีลักษณะเฉพาะ คุณค่าทางโภชนาการ
            และวิธีการเพาะปลูกที่แตกต่างกัน พร้อมข้อมูลครบถ้วนสำหรับเกษตรกรและผู้สนใจ
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {varieties.map((variety, index) => (
            <div
              key={variety.id}
              className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={variety.image}
                    alt={variety.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {variety.type}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{variety.name}</h3>
                    <p className="text-orange-600 font-medium italic text-sm mb-3">{variety.scientificName}</p>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{variety.description}</p>
                  </div>

                  {/* Quick Characteristics */}
                  <div className="grid grid-cols-2 gap-2">
                    {variety.characteristics.slice(0, 4).map((char, charIndex) => (
                      <div key={charIndex} className="flex items-center space-x-2 bg-white/60 rounded-lg p-2">
                        <div className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center">
                          <char.icon className="w-3 h-3 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">{char.label}</div>
                          <div className="font-medium text-gray-800 text-xs">{char.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">ผลผลิต:</span> {variety.yield}
                    </div>
                    <button
                      onClick={() => setSelectedVariety(variety)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300"
                    >
                      <Info className="w-4 h-4" />
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Variety Detail Modal */}
        {selectedVariety && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">{selectedVariety.name}</h3>
                    <p className="text-orange-600 font-medium italic">{selectedVariety.scientificName}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                      {selectedVariety.type}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedVariety(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Image and Basic Info */}
                  <div className="space-y-6">
                    <img
                      src={selectedVariety.image}
                      alt={selectedVariety.name}
                      className="w-full h-64 object-cover rounded-xl"
                    />

                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4">
                      <h4 className="font-bold text-gray-800 mb-3">ข้อมูลพื้นฐาน</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-orange-600" />
                          <span className="text-gray-600">พื้นที่เพาะปลูก:</span>
                        </div>
                        <p className="text-gray-800 ml-6">{selectedVariety.cultivationArea}</p>

                        <div className="flex items-center gap-2 mt-3">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600">ผลผลิต:</span>
                          <span className="font-medium text-gray-800">{selectedVariety.yield}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-600">วิธีปลูก:</span>
                        </div>
                        <p className="text-gray-800 ml-6">{selectedVariety.plantingMethod}</p>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">รายละเอียด</h4>
                      <p className="text-gray-600 leading-relaxed">{selectedVariety.description}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">คุณลักษณะเด่น</h4>
                      <p className="text-gray-600 leading-relaxed">{selectedVariety.specialty}</p>
                    </div>

                    {/* Characteristics Grid */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">คุณลักษณะทางกายภาพ</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedVariety.characteristics.map((char, charIndex) => (
                          <div key={charIndex} className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                              <char.icon className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">{char.label}</div>
                              <div className="font-medium text-gray-800">{char.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Growing Conditions */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-bold text-gray-800 mb-3">เงื่อนไขการปลูก</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">ประเภทดิน:</span> {selectedVariety.soilType}</div>
                          <div><span className="font-medium">ความต้องการน้ำ:</span> {selectedVariety.waterRequirement}</div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-xl p-4">
                        <h4 className="font-bold text-gray-800 mb-3">ราคาตลาด</h4>
                        <div className="text-2xl font-bold text-green-600 mb-2">{selectedVariety.marketPrice}</div>
                        <div className="text-sm text-gray-600">ราคาเฉลี่ยในตลาด</div>
                      </div>
                    </div>

                    {/* Nutritional Value */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">คุณค่าทางโภชนาการ (ต่อ 100 กรัม)</h4>
                      <div className="bg-yellow-50 rounded-xl p-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          {Object.entries(selectedVariety.nutritionalValue).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="font-bold text-gray-800">{value}</div>
                              <div className="text-gray-600 capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Diseases and Pests */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3">โรคที่พบบ่อย</h4>
                        <div className="space-y-2">
                          {selectedVariety.diseases.map((disease, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-gray-600">{disease}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-800 mb-3">แมลงศัตรูพืช</h4>
                        <div className="space-y-2">
                          {selectedVariety.pests.map((pest, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span className="text-gray-600">{pest}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Export Countries */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">ประเทศที่ส่งออก</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedVariety.exportCountries.map((country, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Varieties;