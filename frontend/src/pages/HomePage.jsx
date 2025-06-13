import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './HomePage.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAvatarColor, getInitials } from '../utils/avatarUtils';

const labSlides = [
  { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemWZjv5ir6K4K2RMsjfA5-KCMN5rUDgBVkA&s', icon: '/img/icon-lab-blue.png'},
  { img: 'https://img.docnhanh.vn/images/uploads/2024/04/08/xet-nghiem-adn-585.png', icon: '/img/icon-lab-blue.png'},
  { img: 'https://zalo-article-photo.zadn.vn/c2707386aad0438e1ac1#333778904', icon: '/img/icon-lab-blue.png'},
  { img: 'https://phuongnamhospital.com/wp-content/uploads/2024/08/cac-dich-vu-xet-nghiem-adn-tai-da-khoa-phuong-nam-da-lat.jpg', icon: '/img/icon-lab-blue.png'},
  { img: 'https://static-images.vnncdn.net/vps_images_publish/000001/000003/2024/6/17/giam-dinh-adn-680.jpg?width=260&s=kEz5ph5JV8GCloNtIBNw1g', icon: '/img/icon-lab-blue.png'},
  { img: 'https://ccrd.org.vn/wp-content/uploads/2023/10/p31.jpg', icon: '/img/icon-lab-blue.png'},
  { img: 'https://ccrd.org.vn/wp-content/uploads/2023/10/BV-DK-Tam-Tri-Dong-Thap-4.jpg', icon: '/img/icon-lab-blue.png'},
  { img: 'https://genplus.vn/wp-content/uploads/2022/07/xet-nghiem-ADN-tai-TP-HCM-24-1.jpg', icon: '/img/icon-lab-blue.png'},
  { img: 'https://genplus.vn/wp-content/uploads/2022/10/xet-nghiem-adn-thai-nguyen-4.jpg', icon: '/img/icon-lab-blue.png'},
  { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDgmiwU7-l35jziKuayzp9_KVgfYl65-UnVQ&s', icon: '/img/icon-lab-blue.png'}
];

const services = [
  {
    id: 1,
    name: 'Xét nghiệm ADN cha con',
    description: 'Dịch vụ xác định mối quan hệ huyết thống giữa cha và con với độ chính xác lên đến 99.999%.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCJ5A6YSvh59XtclfXWw-aPPSAQ_wEu6TyFA&s'
  },
  {
    id: 2,
    name: 'Xét nghiệm ADN mẹ con',
    description: 'Xác định mối quan hệ huyết thống giữa mẹ và con, cam kết bảo mật và chính xác.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWNpWoDGmekMYkfIqMbrrunR5kNUtmul7RtA&s'
  },
  {
    id: 3,
    name: 'Xét nghiệm ADN ông cháu',
    description: 'Dịch vụ kiểm tra mối quan hệ huyết thống giữa ông và cháu, áp dụng trong các trường hợp đặc biệt.',
    img: 'data:image/jpeg;base64,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'
  },
  {
    id: 4,
    name: 'Xét nghiệm ADN bà cháu',
    description: 'Kiểm chứng mối liên hệ huyết thống giữa bà và cháu một cách chính xác.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzv8GihBuCraZppBlTs7Pw7JkXt6KobneZig&s'
  }
];

function HomePage() {
  const [labSlideIdx, setLabSlideIdx] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePrevLabSlide = () => {
    setLabSlideIdx(labSlideIdx === 0 ? labSlides.length - 1 : labSlideIdx - 1);
  };

  const handleNextLabSlide = () => {
    setLabSlideIdx((labSlideIdx + 1) % labSlides.length);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const labSlide = labSlides[labSlideIdx];

  return (
    <div className="homepage-container">
      <Header />
      <main className="homepage-content">
        <div className="adn-main">
          <div className="adn-banner">
            <div className="adn-banner-img">
              <img src="https://login.medlatec.vn//ImagePath/images/20200306/20200306_xet-nghiem-adn-het-bao-nhieu-tien-01.jpg" alt="ADN Test Banner" />
            </div>
            <div className="adn-banner-content adn-banner-center">
              <div className="adn-banner-intro">
                <h1>ADN CHAIN</h1>
                <div className="adn-banner-sub">
                  Chính xác - Nhanh chóng - Bảo mật
                </div>
                <div className="adn-banner-quote">
                  <span>
                    "Chuyên nghiệp trong từng kết quả, tận tâm trong từng bước"
                  </span>
                </div>
              </div>
              <div className="adn-banner-actions">
                <a href="#register" className="adn-btn adn-btn-main">Đăng ký xét nghiệm ngay</a>
                <a href="#advice" className="adn-btn adn-btn-outline">Đặt lịch tư vấn miễn phí</a>
              </div>
            </div>
          </div>

          <section className="adn-section" id="about">
            <div className="adn-section-title-group">
              <span className="adn-section-icon">+</span>
              <span className="adn-section-title">GIỚI THIỆU</span>
            </div>
            <div className="adn-about-content adn-about-content--custom">
              <div className="adn-about-text adn-about-text--custom">
                <span className="adn-about-headline">
                  Trung tâm xét nghiệm ADN chuyên sâu
                </span>
                <p>
                  ADN CHAIN là trung tâm xét nghiệm ADN chuyên sâu, cung cấp các dịch vụ xác minh huyết thống phục vụ mục đích dân sự và pháp lý. Chúng tôi kết hợp đội ngũ chuyên gia hàng đầu trong lĩnh vực sinh học phân tử với công nghệ phân tích ADN hiện đại, đảm bảo độ chính xác tuyệt đối và tính bảo mật tối đa trong từng kết quả.
                </p>
                <p>
                  Với phương châm hoạt động "Chính xác – Bảo mật – Tận tâm", ADN CHAIN không ngừng hoàn thiện dịch vụ, hỗ trợ khách hàng thu mẫu tận nhà, gửi kit tận nơi hoặc xét nghiệm trực tiếp tại trung tâm – giúp việc kiểm tra huyết thống trở nên dễ dàng, minh bạch và đáng tin cậy.
                </p>
                <p className="adn-about-center">
                  Sự thật có thể khó nói – nhưng chúng tôi luôn ở đây để giúp bạn tìm thấy nó.
                </p>
                <div className="adn-about-more adn-about-more--flexend">
                  <Link to="/about" className="adn-btn adn-btn-more">Xem thêm &gt;&gt;</Link>
                </div>
              </div>
            </div>
          </section>

          <section className="adn-section" id="services">
            <div className="adn-section-title-group">
              <span className="adn-section-icon">+</span>
              <span className="adn-section-title">DỊCH VỤ CHÍNH</span>
            </div>
            <div className="adn-service-list">
              {services.map((s) => (
                <div className="adn-service-card" key={s.id}>
                  <div className="adn-service-image">
                    <img src={s.img} alt={s.name} />
                  </div>
                  <div className="adn-service-name">{s.name}</div>
                  <div className="adn-service-desc">{s.description}</div>
                  <div>
                    <a href="#detail" className="adn-btn adn-btn-small">Xem chi tiết</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="adn-section" id="labs">
            <div className="adn-section-title-group">
              <span className="adn-section-icon">+</span>
              <span className="adn-section-title">PHÒNG THÍ NGHIỆM TIÊU BIỂU</span>
            </div>
            <div className="adn-lab-slides">
              <button className="adn-lab-slides-arrow adn-lab-slides-arrow-left" onClick={handlePrevLabSlide}>&#10094;</button>
              <div className="adn-lab-slide-container">
                <img src={labSlide.img} alt="Lab Slide" className="adn-lab-slide-img" />
                <img src={labSlide.icon} alt="Lab Icon" className="adn-lab-slide-icon" />
              </div>
              <button className="adn-lab-slides-arrow adn-lab-slides-arrow-right" onClick={handleNextLabSlide}>&#10095;</button>
            </div>
          </section>

          <section className="adn-section" id="news">
            <div className="adn-section-title-group">
              <span className="adn-section-icon">+</span>
              <span className="adn-section-title">TIN TỨC</span>
            </div>
            <div className="adn-news-items">
              <div className="adn-news-card">
                <img src="/img/news-img-1.jpg" alt="News 1" className="adn-news-img" />
                <div className="adn-news-title">ADN CHAIN - Nâng tầm sức khỏe Việt bằng công nghệ di truyền</div>
                <div className="adn-news-date">10/05/2024</div>
                <div className="adn-news-desc">ADN CHAIN không ngừng đổi mới, ứng dụng các công nghệ sinh học tiên tiến nhất, hợp tác cùng các viện nghiên cứu, bệnh viện hàng đầu trong và ngoài nước, góp phần nâng cao chất lượng sống và sức khỏe cộng đồng.</div>
                <a href="#" className="adn-btn adn-btn-small">Xem chi tiết</a>
              </div>
              <div className="adn-news-card">
                <img src="/img/news-img-2.jpg" alt="News 2" className="adn-news-img" />
                <div className="adn-news-title">Chính xác - Nhanh chóng - Bảo mật: 3 tiêu chí vàng của ADN CHAIN</div>
                <div className="adn-news-date">08/05/2024</div>
                <div className="adn-news-desc">Với phương châm hoạt động "Chính xác – Bảo mật – Tận tâm", ADN CHAIN không ngừng hoàn thiện dịch vụ, hỗ trợ khách hàng thu mẫu tận nhà, gửi kit tận nơi hoặc xét nghiệm trực tiếp tại trung tâm – giúp việc kiểm tra huyết thống trở nên dễ dàng, minh bạch và đáng tin cậy.</div>
                <a href="#" className="adn-btn adn-btn-small">Xem chi tiết</a>
              </div>
              <div className="adn-news-card">
                <img src="/img/news-img-3.jpg" alt="News 3" className="adn-news-img" />
                <div className="adn-news-title">Dịch vụ xét nghiệm ADN tận nhà: Tiện lợi và bảo mật</div>
                <div className="adn-news-date">05/05/2024</div>
                <div className="adn-news-desc">ADN CHAIN cung cấp dịch vụ thu mẫu tận nhà, mang đến sự tiện lợi tối đa cho khách hàng. Đội ngũ chuyên gia của chúng tôi sẽ đến tận nơi để thực hiện thu mẫu, đảm bảo quá trình diễn ra nhanh chóng, an toàn và bảo mật thông tin.</div>
                <a href="#" className="adn-btn adn-btn-small">Xem chi tiết</a>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
