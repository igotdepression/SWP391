import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './HomePage.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAvatarColor, getInitials } from '../utils/avatarUtils';
import { useNavigation } from '../hooks/useNavigation';

const labSlides = [
  { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemWZjv5ir6K4K2RMsjfA5-KCMN5rUDgBVkA&s', icon: '/img/icon-lab-blue.png' },
  { img: 'https://img.docnhanh.vn/images/uploads/2024/04/08/xet-nghiem-adn-585.png', icon: '/img/icon-lab-blue.png' },
  { img: 'https://zalo-article-photo.zadn.vn/c2707386aad0438e1ac1#333778904', icon: '/img/icon-lab-blue.png' },
  { img: 'https://phuongnamhospital.com/wp-content/uploads/2024/08/cac-dich-vu-xet-nghiem-adn-tai-da-khoa-phuong-nam-da-lat.jpg', icon: '/img/icon-lab-blue.png' },
  { img: 'https://static-images.vnncdn.net/vps_images_publish/000001/000003/2024/6/17/giam-dinh-adn-680.jpg?width=260&s=kEz5ph5JV8GCloNtIBNw1g', icon: '/img/icon-lab-blue.png' },
  { img: 'https://ccrd.org.vn/wp-content/uploads/2023/10/p31.jpg', icon: '/img/icon-lab-blue.png' },
  { img: 'https://ccrd.org.vn/wp-content/uploads/2023/10/BV-DK-Tam-Tri-Dong-Thap-4.jpg', icon: '/img/icon-lab-blue.png' },
  { img: 'https://genplus.vn/wp-content/uploads/2022/07/xet-nghiem-ADN-tai-TP-HCM-24-1.jpg', icon: '/img/icon-lab-blue.png' },
  { img: 'https://genplus.vn/wp-content/uploads/2022/10/xet-nghiem-adn-thai-nguyen-4.jpg', icon: '/img/icon-lab-blue.png' },
  { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDgmiwU7-l35jziKuayzp9_KVgfYl65-UnVQ&s', icon: '/img/icon-lab-blue.png' }
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
  const { goToBookingCreate, goToContact } = useNavigation();
  const [progressAnimated, setProgressAnimated] = useState(false);
  const progressRef = useRef(null);

  // Form state cho consultation
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    message: '',
    preferredTime: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Intersection Observer cho progress bars
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProgressAnimated(true);
          } else {
            setProgressAnimated(false);
          }
        });
      },
      {
        threshold: 0.5, // Kích hoạt khi 50% element hiển thị
        rootMargin: '-50px 0px', // Offset để animation mượt hơn
      }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, []); // Chỉ chạy 1 lần khi mount

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

  const handleRestrictedAction = (actionType) => {
    if (!user || user.role === 'GUEST') {
      alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để sử dụng chức năng này.');
    } else {
      if (actionType === 'register') {
        goToBookingCreate();
      } else if (actionType === 'advice') {
        goToContact();
      }
    }
  };

  const handleConsultationInputChange = (e) => {
    const { name, value } = e.target;
    setConsultationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert('Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.');

      // Reset form
      setConsultationForm({
        name: '',
        phone: '',
        email: '',
        serviceType: '',
        message: '',
        preferredTime: ''
      });
    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScrollToConsultation = () => {
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const labSlide = labSlides[labSlideIdx];

  return (
    <div className="homepage-container">
      <Header />
      <main className="homepage-content">
        <div className="adn-main">
          <div className="adn-banner">
            <div className="adn-banner-img">
              <img src="https://genplus.vn/wp-content/uploads/2022/10/xet-nghiem-adn-bac-giang-3.jpg" alt="ADN Test Banner" />
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
                <button className="adn-btn adn-btn-main" onClick={() => handleRestrictedAction('register')}>Đăng ký xét nghiệm ngay</button>
                <button className="adn-btn adn-btn-outline" onClick={handleScrollToConsultation}>Đặt lịch tư vấn miễn phí</button>
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

          <section className="adn-section" id="experts">
            <div className="adn-section-title-group">
              <span className="adn-section-icon">+</span>
              <span className="adn-section-title">CỐ VẤN CHUYÊN MÔN</span>
            </div>
            <div className="experts-subtitle">
              Những chuyên gia hàng đầu trong lĩnh vực y sinh, di truyền
            </div>
            <div className="experts-grid">
              <Link to="/doctor/chris-tan" className="expert-card-link">
                <div className="expert-card">
                  <div className="expert-avatar">
                    <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Bác sĩ Chris Tan" />
                  </div>
                  <h4 className="expert-name">BÁC SĨ CHRIS TAN</h4>
                  <p className="expert-specialty">Cố vấn chuyên môn</p>
                </div>
              </Link>
              <Link to="/doctor/robert-elliott" className="expert-card-link">
                <div className="expert-card">
                  <div className="expert-avatar">
                    <img src="https://genplus.vn/wp-content/uploads/2022/08/image-3-e1661323749235-1.jpg" alt="TS Robert Elliott" />
                  </div>
                  <h4 className="expert-name">TS ROBERT ELLIOTT</h4>
                  <p className="expert-specialty">Di truyền học & Sinh học ung thư</p>
                </div>
              </Link>
              <Link to="/doctor/ronald-gulick" className="expert-card-link">
                <div className="expert-card">
                  <div className="expert-avatar">
                    <img src="https://genplus.vn/wp-content/uploads/2022/08/image-6-e1674405216860.jpg" alt="TS Ronald Gulick" />
                  </div>
                  <h4 className="expert-name">TS RONALD GULICK</h4>
                  <p className="expert-specialty">Miễn dịch & Di truyền</p>
                </div>
              </Link>
              <Link to="/doctor/andrea-miller" className="expert-card-link">
                <div className="expert-card">
                  <div className="expert-avatar">
                    <img src="https://genplus.vn/wp-content/uploads/2022/08/image-e1674405251682.jpg" alt="TS Andrea Miller" />
                  </div>
                  <h4 className="expert-name">TS ANDREA MILLER</h4>
                  <p className="expert-specialty">Sinh học</p>
                </div>
              </Link>
            </div>
          </section>

          <section className="modernlab-section" id="labs">
            <div className="modernlab-box">
              <div className="modernlab-left">
                <div className="modernlab-titlebar">TRANG THIẾT BỊ HIỆN ĐẠI</div>
                <h2 className="modernlab-title">Phòng thí nghiệm chuẩn Quốc tế</h2>
                <div className="modernlab-desc">
                  Phòng thí nghiệm được trang bị những thiết bị tiên tiến nhất trong sinh học phân tử và phân tích di truyền. Đặc biệt, các hệ thống giải trình tự gen và hệ gen thế hệ mới đã được lắp đặt và vận hành, phục vụ nghiên cứu và dịch vụ xét nghiệm.
                </div>
                <div className="modernlab-progress-list" ref={progressRef}>
                  {[
                    { label: 'ĐỘ CHÍNH XÁC', value: '99.99%', percent: 99.99 },
                    { label: 'BẢO MẬT THÔNG TIN KHÁCH HÀNG', value: '100%', percent: 100 },
                    { label: 'TỶ LỆ KHÁCH HÀNG HÀI LÒNG', value: '95%', percent: 95 }
                  ].map((item, i) => (
                    <div className="modernlab-progress-item" key={i}>
                      <span className="modernlab-progress-label">{item.label}</span>
                      <div className="modernlab-progress-bar">
                        <div
                          className={`modernlab-progress-bar-inner ${progressAnimated ? 'animated' : ''}`}
                          style={{
                            width: progressAnimated ? `${item.percent}%` : '0%',
                            transitionDelay: `${i * 0.3}s`
                          }}
                        ></div>
                      </div>
                      <span className="modernlab-progress-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modernlab-right">
                <div className="modernlab-imgbox">
                  <img className="modernlab-img" src={labSlide.img} alt="Lab" />
                  <div className="modernlab-slider-nav">
                    <button onClick={handlePrevLabSlide} aria-label="slide-prev">◀️</button>
                    <button onClick={handleNextLabSlide} aria-label="slide-next">▶️</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="adn-section advantages-section" id="advantages">
            <div className="adn-section-title-group">
              <span className="adn-section-title">LỢI THẾ CỦA CHÚNG TÔI</span>
            </div>
            <div className="advantages-subtitle">
              <div className="dna-icon">🧬</div>
              <p>Đem tới chất lượng dịch vụ tốt nhất về xét nghiệm ADN cho người Việt Nam</p>
            </div>

            <div className="advantages-container">
              <div className="advantages-left">
                <div className="lab-image">
                  <img src="https://login.medlatec.vn//ImagePath/images/20201216/20201216_trung-tam-xet-nghiem-adn-uy-tin-1.jpg" alt="Phòng thí nghiệm DNA CHAIN" />
                  <div className="lab-watermark">DNACHAIN.vn</div>
                </div>
                <div className="consultation-cta">
                  <p>Đặt lịch hẹn tư vấn <strong>miễn phí</strong> cùng đội ngũ chuyên gia</p>
                  <button className="schedule-btn" onClick={() => handleRestrictedAction('advice')}>
                    Đặt lịch ngay →
                  </button>
                </div>
              </div>

              <div className="advantages-right">
                <div className="advantages-grid">
                  <div className="advantage-item">
                    <div className="advantage-icon">✓</div>
                    <div className="advantage-content">
                      <h4>ĐỘ CHÍNH XÁC CAO</h4>
                      <p>Sử dụng các bộ Kit từ Promega, ThermoFisher, Mỹ, Đức,... đem tới kết quả có độ tin cậy tuyệt đối cho các xét nghiệm ADN tại DNA CHAIN.</p>
                    </div>
                  </div>

                  <div className="advantage-item">
                    <div className="advantage-icon">✓</div>
                    <div className="advantage-content">
                      <h4>TƯ VẤN TẬN TÌNH, CHÍNH XÁC</h4>
                      <p>Tư vấn miễn phí 24/7 với đội ngũ chuyên viên và chuyên gia giày dạn kinh nghiệm</p>
                    </div>
                  </div>

                  <div className="advantage-item">
                    <div className="advantage-icon">✓</div>
                    <div className="advantage-content">
                      <h4>NHANH CHÓNG, TIỆN LỢI</h4>
                      <p>Chỉ mất 5-10 lày mẫu, hệ thống thu mẫu toàn Quốc. Hỗ trợ thu mẫu tận nhà</p>
                    </div>
                  </div>

                  <div className="advantage-item">
                    <div className="advantage-icon">✓</div>
                    <div className="advantage-content">
                      <h4>THỜI GIAN TRẢ KẾT QUẢ NHANH</h4>
                      <p>DNA CHAIN luôn tối ưu hóa dây chuyền xử lý mẫu. Hiện nay đã có thể trả kết quả cho khách hàng nhanh nhất sau 04h làm việc</p>
                    </div>
                  </div>

                  <div className="advantage-item">
                    <div className="advantage-icon">✓</div>
                    <div className="advantage-content">
                      <h4>TUYỆT ĐỐI BẢO MẬT</h4>
                      <p>Mọi thông tin khách hàng đều được bảo mật không chia sẻ với bên thứ 3. DNA CHAIN bảo hành kết quả cho khách hàng trên kết quả.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Consultation Form Section - moved to end of page */}
          <section className="adn-section consultation-section" id="consultation">
            <div className="adn-section-title-group" >
              <span className="adn-section-icon">+</span>
              <span className="adn-section-title" >ĐĂNG KÝ TƯ VẤN MIỄN PHÍ</span>
            </div>

            <div className="consultation-container">
              <div className="consultation-intro">
                <h3>Nhận tư vấn chuyên sâu từ các chuyên gia</h3>
                <p>Để lại thông tin của bạn, chúng tôi sẽ liên hệ tư vấn miễn phí về dịch vụ xét nghiệm ADN phù hợp nhất.</p>
              </div>

              <div className="consultation-form-wrapper">
                <form className="consultation-form" onSubmit={handleConsultationSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Họ và tên *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={consultationForm.name}
                        onChange={handleConsultationInputChange}
                        placeholder="Nhập họ và tên của bạn"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Số điện thoại *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={consultationForm.phone}
                        onChange={handleConsultationInputChange}
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={consultationForm.email}
                        onChange={handleConsultationInputChange}
                        placeholder="Nhập địa chỉ email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="serviceType">Dịch vụ quan tâm *</label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={consultationForm.serviceType}
                        onChange={handleConsultationInputChange}
                        required
                      >
                        <option value="">Chọn dịch vụ</option>
                        <option value="paternity">Xét nghiệm ADN cha con</option>
                        <option value="maternity">Xét nghiệm ADN mẹ con</option>
                        <option value="grandpa">Xét nghiệm ADN ông cháu</option>
                        <option value="grandma">Xét nghiệm ADN bà cháu</option>
                        <option value="sibling">Xét nghiệm ADN anh em</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="preferredTime">Thời gian mong muốn được liên hệ</label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={consultationForm.preferredTime}
                        onChange={handleConsultationInputChange}
                      >
                        <option value="">Chọn thời gian</option>
                        <option value="morning">Buổi sáng (8h-12h)</option>
                        <option value="afternoon">Buổi chiều (13h-17h)</option>
                        <option value="evening">Buổi tối (18h-20h)</option>
                        <option value="anytime">Bất kỳ lúc nào</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Nội dung cần tư vấn</label>
                    <textarea
                      id="message"
                      name="message"
                      value={consultationForm.message}
                      onChange={handleConsultationInputChange}
                      placeholder="Mô tả chi tiết tình huống và những gì bạn cần tư vấn..."
                      rows="4"
                    />
                  </div>

                  <div className="form-submit">
                    <button
                      type="submit"
                      className="adn-btn adn-btn-main consultation-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading-spinner"></span>
                          Đang gửi...
                        </>
                      ) : (
                        ' Đăng ký tư vấn ngay'
                      )}
                    </button>
                  </div>

                  <div className="form-note">
                    <p>* Các thông tin bạn cung cấp sẽ được bảo mật tuyệt đối và chỉ phục vụ mục đích tư vấn.</p>
                    <p>📞 Hotline: <strong>1900 1234</strong> | 📧 Email: <strong>tuvan@adnchain.com</strong></p>
                  </div>
                </form>
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
