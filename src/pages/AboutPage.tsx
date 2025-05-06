import React from 'react';
import { BookOpen, Award, Heart, Coffee } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Về Thế Giới Vô Tận</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Nền tảng kể chuyện tương tác đầu tiên được phát triển dành riêng cho người Việt Nam
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Câu Chuyện Của Chúng Tôi</h2>
            <div className="prose prose-lg mx-auto">
              <p>
                Thế Giới Vô Tận ra đời với sứ mệnh mang đến trải nghiệm kể chuyện tương tác độc đáo, 
                được thiết kế riêng cho người Việt. Chúng tôi tin rằng mỗi người đều có câu chuyện riêng 
                để kể, và nền tảng của chúng tôi cung cấp công cụ để biến những ý tưởng đó thành hiện thực.
              </p>
              
              <p>
                Chúng tôi đặc biệt chú trọng vào việc tạo ra những câu chuyện mang đậm bản sắc văn hóa Việt Nam, 
                từ những truyền thuyết dân gian, những câu chuyện lịch sử hào hùng, đến những tác phẩm văn học 
                đương đại nổi tiếng như truyện của Nguyễn Nhật Ánh hay tiểu thuyết kiếm hiệp Kim Dung được 
                Việt hóa.
              </p>
              
              <p>
                Với Thế Giới Vô Tận, chúng tôi muốn tạo ra một không gian nơi người dùng có thể thoải mái 
                sáng tạo, khám phá và chia sẻ những câu chuyện độc đáo của riêng mình, đồng thời kết nối 
                với cộng đồng những người yêu thích văn học và kể chuyện.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Giá Trị Cốt Lõi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="w-12 h-12 text-primary-500" />,
                title: "Sáng Tạo Không Giới Hạn",
                description: "Chúng tôi tin vào sức mạnh của trí tưởng tượng và khả năng sáng tạo vô hạn của con người."
              },
              {
                icon: <Award className="w-12 h-12 text-primary-500" />,
                title: "Bản Sắc Văn Hóa",
                description: "Chúng tôi tôn vinh và phát huy những giá trị văn hóa truyền thống Việt Nam trong mỗi câu chuyện."
              },
              {
                icon: <Heart className="w-12 h-12 text-primary-500" />,
                title: "Cộng Đồng",
                description: "Chúng tôi xây dựng một cộng đồng nơi mọi người có thể chia sẻ, kết nối và cùng nhau phát triển."
              },
              {
                icon: <Coffee className="w-12 h-12 text-primary-500" />,
                title: "Trải Nghiệm Người Dùng",
                description: "Chúng tôi đặt trải nghiệm người dùng lên hàng đầu, đảm bảo mọi tương tác đều trở nên đơn giản và thú vị."
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Câu Hỏi Thường Gặp</h2>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Thế Giới Vô Tận hoạt động như thế nào?",
                answer: "Thế Giới Vô Tận cho phép bạn tham gia vào các câu chuyện tương tác, nơi bạn có thể đưa ra quyết định hoặc nhập nội dung để định hướng diễn biến câu chuyện. Mỗi lựa chọn sẽ dẫn đến một hướng phát triển khác nhau, tạo ra trải nghiệm độc đáo cho mỗi người."
              },
              {
                question: "Tôi có thể tạo câu chuyện của riêng mình không?",
                answer: "Có, bạn có thể bắt đầu một câu chuyện hoàn toàn mới hoặc sử dụng các mẫu có sẵn làm điểm khởi đầu. Bạn có thể tự do sáng tạo và phát triển câu chuyện theo ý muốn của mình."
              },
              {
                question: "Có những thể loại truyện nào?",
                answer: "Thế Giới Vô Tận cung cấp nhiều thể loại đa dạng như phiêu lưu, kỳ ảo, kiếm hiệp, lịch sử, tình cảm và nhiều thể loại khác. Mỗi thể loại đều có những bối cảnh và nhân vật đặc trưng riêng."
              },
              {
                question: "Tôi có thể chia sẻ câu chuyện của mình không?",
                answer: "Có, bạn có thể lưu và chia sẻ câu chuyện của mình với bạn bè thông qua đường link. Họ có thể đọc câu chuyện của bạn hoặc tiếp tục phát triển theo hướng của riêng họ."
              },
              {
                question: "Thế Giới Vô Tận có phí sử dụng không?",
                answer: "Hiện tại, Thế Giới Vô Tận cung cấp trải nghiệm cơ bản miễn phí cho tất cả người dùng. Trong tương lai, chúng tôi có thể giới thiệu các tính năng cao cấp với mức phí hợp lý."
              }
            ].map((faq, index) => (
              <div key={index} className="mb-6 p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Hãy Khám Phá Thế Giới Vô Tận Ngay Hôm Nay</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Bắt đầu hành trình sáng tạo câu chuyện của riêng bạn và khám phá vô vàn khả năng
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/story/new" 
              className="btn btn-primary text-lg py-3 px-8"
            >
              Bắt Đầu Ngay
            </a>
            <a 
              href="/templates" 
              className="btn btn-outline text-lg py-3 px-8"
            >
              Khám Phá Mẫu Truyện
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;