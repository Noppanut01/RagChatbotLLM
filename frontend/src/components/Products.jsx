import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, Award, Truck, Shield } from 'lucide-react';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'jasmine', label: 'ข้าวหอมมะลิ' },
    { id: 'glutinous', label: 'ข้าวเหนียว' },
    { id: 'brown', label: 'ข้าวกล้อง' },
    { id: 'specialty', label: 'ข้าวพิเศษ' },
    { id: 'organic', label: 'ข้าวออร์แกนิก' },
  ];

  const products = [
    {
      id: 1,
      name: 'ข้าวหอมมะลิ 105',
      category: 'jasmine',
      image: 'src/images/rice105.jpg',
      price: '150 บาท/กก.',
      rating: 4.9,
      description: 'ข้าวหอมมะลิคุณภาพพรีเมียม หอมกลิ่นมะลิ เมล็ดยาวสวย ได้รับการรับรองมาตรฐาน GAP',
      features: ['หอมกลิ่นมะลิ', 'เมล็ดยาวงาม', 'คุณภาพส่งออก', 'มาตรฐาน GAP'],
      specifications: {
        moisture: '≤ 14%',
        brokenRice: '≤ 5%',
        chalkiness: '≤ 6%',
        amylose: '12-18%'
      },
      origin: 'จังหวัดยโสธร, ร้อยเอ็ด, มหาสารคาม',
      harvestSeason: 'พฤศจิกายน - มกราคม',
      certifications: ['GAP', 'HACCP', 'ISO 9001']
    },
    {
      id: 2,
      name: 'ข้าวเหนียวขาว',
      category: 'glutinous',
      image: 'src/images/stickyrice.jpg',
      price: '120 บาท/กก.',
      rating: 4.8,
      description: 'ข้าวเหนียวขาวคุณภาพดี เหนียวนุ่ม เหมาะสำหรับทำขนมไทย อาหารพื้นบ้าน',
      features: ['เหนียวนุ่ม', 'สีขาวสวย', 'ทำขนมไทยได้ดี', 'ไม่มีสารเคมีตกค้าง'],
      specifications: {
        moisture: '≤ 14%',
        brokenRice: '≤ 3%',
        glutinosity: 'สูง',
        amylose: '1-2%'
      },
      origin: 'จังหวัดเชียงใหม่, เชียงราย, น่าน',
      harvestSeason: 'ตุลาคม - ธันวาคม',
      certifications: ['GAP', 'Organic Thailand']
    },
    {
      id: 3,
      name: 'ข้าวกล้องแดง',
      category: 'brown',
      image: 'src/images/redrice.jpg',
      price: '180 บาท/กก.',
      rating: 4.7,
      description: 'ข้าวกล้องแดงอุดมไปด้วยสารอาหาร ใยอาหารสูง เหมาะสำหรับคนรักสุขภาพ',
      features: ['อุดมสารอาหาร', 'ใยอาหารสูง', 'ดีต่อสุขภาพ', 'วิตามิน B1 สูง'],
      specifications: {
        moisture: '≤ 14%',
        fiber: '3.5%',
        protein: '8-9%',
        iron: '2.2 mg/100g'
      },
      origin: 'จังหวัดสุรินทร์, บุรีรัมย์, ศีสะเกษ',
      harvestSeason: 'พฤศจิกายน - มกราคม',
      certifications: ['Organic Thailand', 'HACCP']
    },
    {
      id: 4,
      name: 'ข้าวไรซ์เบอรี่',
      category: 'specialty',
      image: 'src/images/riceberry.jpg',
      price: '250 บาท/กก.',
      rating: 4.9,
      description: 'ข้าวไรซ์เบอรี่สีม่วงธรรมชาติ อุดมไปด้วยแอนโธไซยานิน ต้านอนุมูลอิสระ',
      features: ['สีม่วงธรรมชาติ', 'แอนโธไซยานินสูง', 'ต้านออกซิเดชัน', 'ลดคอเลสเตอรอล'],
      specifications: {
        moisture: '≤ 14%',
        anthocyanin: '327 mg/100g',
        protein: '10.5%',
        fiber: '4.2%'
      },
      origin: 'จังหวัดพิษณุโลก, เพชรบูรณ์',
      harvestSeason: 'ธันวาคม - กุมภาพันธ์',
      certifications: ['GAP', 'HACCP', 'Health Claim']
    },
    {
      id: 5,
      name: 'ข้าวหอมมะลิแดง',
      category: 'jasmine',
      image: 'src/images/ricered.jpg',
      price: '200 บาท/กก.',
      rating: 4.6,
      description: 'ข้าวหอมมะลิแดงหายาก หอมกลิ่นมะลิ โภชนาการสูงกว่าข้าวขาวทั่วไป',
      features: ['หายาก', 'หอมกลิ่นมะลิ', 'โภชนาการสูง', 'เหล็กสูง'],
      specifications: {
        moisture: '≤ 14%',
        protein: '9.2%',
        iron: '3.8 mg/100g',
        zinc: '2.1 mg/100g'
      },
      origin: 'จังหวัดอุบลราชธานี, อำนาจเจริญ',
      harvestSeason: 'พฤศจิกายน - ธันวาคม',
      certifications: ['GAP', 'GI (Geographical Indication)']
    },
    {
      id: 6,
      name: 'ข้าวเหนียวดำ',
      category: 'glutinous',
      image: 'src/images/stickyblack.jpg',
      price: '160 บาท/กก.',
      rating: 4.8,
      description: 'ข้าวเหนียวดำคุณภาพดี เหนียวหอม เหมาะทำขนมหวานไทย อุดมไปด้วยแอนโธไซยานิน',
      features: ['สีดำธรรมชาติ', 'เหนียวหอม', 'ทำขนมไทย', 'แอนโธไซยานิน'],
      specifications: {
        moisture: '≤ 14%',
        anthocyanin: '215 mg/100g',
        protein: '8.5%',
        glutinosity: 'สูงมาก'
      },
      origin: 'จังหวัดเลย, หนองคาย, อุดรธานี',
      harvestSeason: 'ตุลาคม - พฤศจิกายน',
      certifications: ['Organic Thailand', 'GAP']
    },
    {
      id: 7,
      name: 'ข้าวหอมปทุมธานี 1',
      category: 'jasmine',
      image: 'src/images/pathumrice.jpg',
      price: '140 บาท/กก.',
      rating: 4.5,
      description: 'ข้าวหอมปทุมธานี 1 พันธุ์ปรับปรุง หอมกลิ่นมะลิ ผลผลิตสูง เหมาะปลูกในพื้นที่ชลประทาน',
      features: ['ผลผลิตสูง', 'หอมกลิ่นมะลิ', 'ทนโรค', 'เหมาะชลประทาน'],
      specifications: {
        moisture: '≤ 14%',
        brokenRice: '≤ 5%',
        amylose: '15-20%',
        yield: '4-5 ตัน/ไร่'
      },
      origin: 'จังหวัดปทุมธานี, อยุธยา, สุพรรณบุรี',
      harvestSeason: 'กุมภาพันธ์ - เมษายน, สิงหาคม - ตุลาคม',
      certifications: ['GAP', 'HACCP']
    },
    {
      id: 8,
      name: 'ข้าวออร์แกนิกหอมมะลิ',
      category: 'organic',
      image: 'src/images/riceorganic.jpg',
      price: '280 บาท/กก.',
      rating: 4.9,
      description: 'ข้าวหอมมะลิออร์แกนิก ปลูกโดยไม่ใช้สารเคมี ปลอดภัย หอมกลิ่นมะลิธรรมชาติ',
      features: ['ปลอดสารเคมี', 'หอมกลิ่นมะลิ', 'ปลอดภัย', 'เป็นมิตรกับสิ่งแวดล้อม'],
      specifications: {
        moisture: '≤ 14%',
        pesticide: '0 ppm',
        heavyMetal: 'ไม่ตรวจพบ',
        amylose: '12-18%'
      },
      origin: 'จังหวัดยโสธร, ร้อยเอ็ด (ฟาร์มออร์แกนิก)',
      harvestSeason: 'พฤศจิกายน - มกราคม',
      certifications: ['Organic Thailand', 'ACT Organic', 'IFOAM']
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            ผลิตภัณฑ์<span className="text-orange-500">ข้าวไทย</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            สำรวจคอลเลกชันข้าวไทยคุณภาพพรีเมียม แต่ละพันธุ์ได้รับการคัดสรรอย่างพิถีพิถัน
            พร้อมข้อมูลรายละเอียดครบถ้วน
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                  {product.certifications.slice(0, 2).map((cert, index) => (
                    <span key={index} className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>แหล่งผลิต:</span>
                    <span className="font-medium">{product.origin.split(',')[0]}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ฤดูเก็บเกี่ยว:</span>
                    <span className="font-medium">{product.harvestSeason.split(' - ')[0]}...</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-orange-600">{product.price}</div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h3>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.certifications.map((cert, index) => (
                        <span key={index} className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          <Award className="w-3 h-3" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">รายละเอียดผลิตภัณฑ์</h4>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">คุณสมบัติเด่น</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProduct.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">ข้อมูลทางเทคนิค</h4>
                      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-600 capitalize">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                        <Truck className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-800">แหล่งผลิต</div>
                          <div className="text-sm text-gray-600">{selectedProduct.origin}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                        <Shield className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium text-gray-800">ฤดูเก็บเกี่ยว</div>
                          <div className="text-sm text-gray-600">{selectedProduct.harvestSeason}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-3xl font-bold text-orange-600">{selectedProduct.price}</div>
                      <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300">
                        สั่งซื้อสินค้า
                      </button>
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

export default Products;