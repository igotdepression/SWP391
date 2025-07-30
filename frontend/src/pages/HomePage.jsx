import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './HomePage.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAvatarColor, getInitials } from '../utils/avatarUtils';
import { useNavigation } from '../hooks/useNavigation';
import api from '../services/api';
import dayjs from 'dayjs';

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
    name: "Xét nghiệm ADN cha con",
    description: "Xác định mối quan hệ huyết thống giữa cha và con với độ chính xác cao nhất",
    image: "https://bestselfatlanta.com/wp-content/uploads/2017/05/father-son.jpg",
    route: "/services/father-child"
  },
  {
    id: 2,
    name: "Xét nghiệm ADN mẹ con",
    description: "Kiểm tra mối quan hệ huyết thống giữa mẹ và con một cách chính xác",
    image: "https://static.wixstatic.com/media/bd583d_35da8d7c9c0e4f4496fa6ed9da8d405f~mv2.jpg/v1/fill/w_319,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/42-31107334.jpg",
    route: "/services/mother-child"
  },
  {
    id: 3,
    name: "Xét nghiệm ADN ông cháu",
    description: "Xác định mối quan hệ huyết thống giữa ông và cháu qua nhiều thế hệ",
    image: "https://live.staticflickr.com/5323/17735673811_47a36ffa1e_b.jpg",
    route: "/services/grandfather-grandchild"
  },
  {
    id: 4,
    name: "Xét nghiệm ADN bà cháu",
    description: "Kiểm tra mối quan hệ huyết thống giữa bà và cháu với độ tin cậy cao",
    image: "https://herviewfromhome.com/wp-content/uploads/2024/10/shutterstock_1926117458.jpg",
    route: "/services/grandmother-grandchild"
  },
];

function HomePage() {
  const [labSlideIdx, setLabSlideIdx] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { goToBookingCreate, goToContact } = useNavigation();
  const [progressAnimated, setProgressAnimated] = useState(false);
  const progressRef = useRef(null);


  const [consultationForm, setConsultationForm] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    message: '',
    preferredTime: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);


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
        threshold: 0.5, 
        rootMargin: '-50px 0px', 
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
  }, []); 

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

 
  const handleServiceClick = (route) => {
    navigate(route);
    setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
  };

  const handleRestrictedAction = (route) => {
    if (!user || user.role === 'GUEST') {
      alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để sử dụng chức năng này.');
    } else {
      navigate(route);
      
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
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
      await api.post('/consultations/request', {
        name: consultationForm.name,
        phone: consultationForm.phone,
        type: consultationForm.serviceType,
        note: consultationForm.message
      });
      alert('Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.');
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
                <button className="adn-btn adn-btn-main" onClick={() => handleRestrictedAction("/booking-create")}>Đăng ký xét nghiệm ngay</button>
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
              {services.map(service => (
                <div key={service.id} className="adn-service-card">
                  <div className="service-image">
                    <img src={service.image} alt={service.name} />
                  </div>
                  <div className="service-content">
                    <h3 className="adn-service-name">{service.name}</h3>
                    <p className="adn-service-desc">{service.description}</p>
                    <button
                      className="adn-btn adn-btn-small"
                      onClick={() => handleServiceClick(service.route)}
                    >
                      Tìm hiểu thêm
                    </button>
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
              <p>Đem tới chất lượng dịch vụ tốt nhất về xét nghiệm ADN cho mọi người</p>
            </div>

            <div className="advantages-container">
              <div className="advantages-left">
                <div className="lab-image">
                  <img src="https://login.medlatec.vn//ImagePath/images/20201216/20201216_trung-tam-xet-nghiem-adn-uy-tin-1.jpg" alt="Phòng thí nghiệm DNA CHAIN" />
                  <div className="lab-watermark">DNACHAIN.vn</div>
                </div>
                <div className="consultation-cta">
                  <p>Đặt lịch hẹn tư vấn <strong>miễn phí</strong> cùng đội ngũ chuyên gia</p>
                  <NavLink
                    to="/booking-create"
                    className={({ isActive }) => isActive ? "active" : ""}
                  >
                    <button className="schedule-btn" onClick={() => handleRestrictedAction("/booking-create")}>
                      Đặt lịch ngay →
                    </button>
                  </NavLink>

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

          
          <section className="adn-section homepage-consultation-section" id="consultation">
            <div className="adn-section-title-group" >
              <span className="adn-section-icon">+</span>
              <span className="adn-section-title" >ĐĂNG KÝ TƯ VẤN MIỄN PHÍ</span>
            </div>

            <div className="homepage-consultation-container">
              <div className="homepage-consultation-intro">
                <h3>Nhận tư vấn chuyên sâu từ các chuyên gia</h3>
                <p>Để lại thông tin của bạn, chúng tôi sẽ liên hệ tư vấn miễn phí về dịch vụ xét nghiệm ADN phù hợp nhất.</p>
              </div>

              <div className="homepage-consultation-form-wrapper">
                <form className="homepage-consultation-form" onSubmit={handleConsultationSubmit}>
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
                    <p>📞 Hotline: <strong>1900 1234</strong> | 📧 Email: <strong>dnachain@gmail.com</strong></p>
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