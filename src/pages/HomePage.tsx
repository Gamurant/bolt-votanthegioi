import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Edit, Sparkles, Map } from 'lucide-react';
import { storyTemplates } from '../data/storyTemplates';

const HomePage: React.FC = () => {
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowFeatures(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-hero-pattern bg-cover bg-center text-white">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            Thế Giới Vô Tận
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Khám phá và sáng tạo những câu chuyện tương tác đầy hấp dẫn với bối cảnh và nhân vật đậm chất Việt Nam
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/story/new" className="btn btn-primary text-lg py-3 px-8 flex items-center justify-center gap-2">
              <Sparkles size={20} />
              <span>Bắt Đầu Truyện Mới</span>
            </Link>
            <Link to="/templates" className="btn btn-outline bg-white/10 backdrop-blur-sm text-lg py-3 px-8 flex items-center justify-center gap-2">
              <BookOpen size={20} />
              <span>Khám Phá Mẫu Truyện</span>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ArrowRight size={20} className="rotate-90" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Tính Năng Nổi Bật</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trải nghiệm cách kể chuyện tương tác hoàn toàn mới, nơi bạn là người quyết định diễn biến của câu chuyện
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Edit className="w-10 h-10 text-primary-500" />,
                title: "Tương Tác Qua Văn Bản",
                description: "Nhập văn bản hoặc chọn lựa các lựa chọn có sẵn để phát triển câu chuyện theo ý muốn của bạn."
              },
              {
                icon: <Map className="w-10 h-10 text-primary-500" />,
                title: "Bối Cảnh Việt Nam",
                description: "Khám phá những câu chuyện với bối cảnh, nhân vật và truyền thuyết đậm chất Việt Nam."
              },
              {
                icon: <Sparkles className="w-10 h-10 text-primary-500" />,
                title: "Đa Dạng Thể Loại",
                description: "Từ truyện Kim Dung, truyện dân gian đến truyện hiện đại của Nguyễn Nhật Ánh, tất cả đều có tại đây."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`card p-6 ${showFeatures ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Mẫu Truyện Nổi Bật</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá những mẫu truyện phổ biến và bắt đầu cuộc phiêu lưu của riêng bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyTemplates.slice(0, 3).map((template, index) => (
              <div 
                key={template.id}
                className="card group h-full"
              >
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${template.imageUrl})` }}
                >
                  <div className="w-full h-full bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      to={`/story/${template.id}`}
                      className="btn btn-primary"
                    >
                      Bắt Đầu Ngay
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{template.title}</h3>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/templates"
              className="btn btn-outline inline-flex items-center space-x-2"
            >
              <span>Xem Tất Cả Mẫu Truyện</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Cách Hoạt Động</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quá trình tạo và trải nghiệm câu chuyện tương tác đơn giản chỉ với vài bước
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
              
              {[
                {
                  step: 1,
                  title: "Chọn một mẫu truyện",
                  description: "Lựa chọn một trong những mẫu truyện đa dạng hoặc bắt đầu với một câu chuyện hoàn toàn mới."
                },
                {
                  step: 2,
                  title: "Đọc và tương tác",
                  description: "Đọc nội dung câu chuyện và chọn lựa hướng phát triển tiếp theo hoặc tự nhập nội dung của riêng bạn."
                },
                {
                  step: 3,
                  title: "Phát triển câu chuyện",
                  description: "Câu chuyện sẽ tiếp tục phát triển dựa trên lựa chọn của bạn, tạo ra một trải nghiệm độc đáo."
                },
                {
                  step: 4,
                  title: "Chia sẻ và lưu trữ",
                  description: "Lưu lại câu chuyện của bạn để đọc lại hoặc chia sẻ với bạn bè."
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white font-bold mb-3">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-500 border-4 border-white z-10"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-vngold-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Sẵn Sàng Bắt Đầu Cuộc Phiêu Lưu?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Khám phá vô vàn thế giới tưởng tượng đang chờ đợi bạn. Bắt đầu cuộc phiêu lưu của riêng bạn ngay hôm nay!
          </p>
          <Link 
            to="/story/new"
            className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg py-3 px-8 inline-flex items-center space-x-2"
          >
            <Sparkles size={20} />
            <span>Bắt Đầu Ngay</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;