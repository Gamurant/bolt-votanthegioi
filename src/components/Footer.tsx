import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-400">Thế Giới Vô Tận</h3>
            <p className="text-gray-300 leading-relaxed">
              Nền tảng kể chuyện tương tác dành cho người Việt, nơi bạn có thể tạo và trải nghiệm 
              những câu chuyện phong phú với bối cảnh và nhân vật đậm chất Việt Nam.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-400">Liên Kết</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-300 transition-colors">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-gray-300 hover:text-primary-300 transition-colors">
                  Mẫu Truyện
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-300 transition-colors">
                  Giới Thiệu
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-400">Liên Hệ</h3>
            <div className="space-y-3">
              <a 
                href="mailto:contact@thegioimotan.vn" 
                className="flex items-center space-x-2 text-gray-300 hover:text-primary-300 transition-colors"
              >
                <Mail size={18} />
                <span>contact@thegioimotan.vn</span>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center space-x-2 text-gray-300 hover:text-primary-300 transition-colors"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Thế Giới Vô Tận. Mọi quyền được bảo lưu.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-2 md:mt-0">
            Được phát triển với <Heart size={14} className="mx-1 text-vnred-500" /> tại Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;