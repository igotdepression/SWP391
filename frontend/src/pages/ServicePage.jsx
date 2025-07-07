import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ServicePage.css';

const ServicePage = () => {
  const services = [
    {
      id: 1,
      title: "Xét nghiệm ADN cha con",
      description: "Xác định mối quan hệ huyết thống giữa cha và con với độ chính xác cao nhất",
      image: "https://bestselfatlanta.com/wp-content/uploads/2017/05/father-son.jpg",
    },
    {
      id: 2,
      title: "Xét nghiệm ADN mẹ con",
      description: "Kiểm tra mối quan hệ huyết thống giữa mẹ và con một cách chính xác",
      image: "https://static.wixstatic.com/media/bd583d_35da8d7c9c0e4f4496fa6ed9da8d405f~mv2.jpg/v1/fill/w_319,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/42-31107334.jpg",
    },
    {
      id: 3,
      title: "Xét nghiệm ADN ông cháu",
      description: "Xác định mối quan hệ huyết thống giữa ông và cháu qua nhiều thế hệ",
      image: "https://live.staticflickr.com/5323/17735673811_47a36ffa1e_b.jpg",
    },
    {
      id: 4,
      title: "Xét nghiệm ADN bà cháu",
      description: "Kiểm tra mối quan hệ huyết thống giữa bà và cháu với độ tin cậy cao",
      image: "https://herviewfromhome.com/wp-content/uploads/2024/10/shutterstock_1926117458.jpg",
    },
    {
      id: 5,
      title: "Xét nghiệm ADN anh em ruột",
      description: "Xác định mối quan hệ huyết thống giữa anh chị em ruột",
      image: "https://duyendangvietnam.net.vn/public/uploads/file1s/Siblings%20Day%2010_04_21%201.jpg",
    },
    {
      id: 6,
      title: "Xét nghiệm ADN thai nhi",
      description: "Kiểm tra ADN thai nhi trong thời kỳ mang thai an toàn",
      image: "https://www.vinmec.com/static/uploads/20191118_111531_540345_bao_thai_max_1800x1800_jpg_fa425883b7.jpg",
    }
  ];

  // Thêm array cho ADN types
  const adnTypes = [
    {
      id: 1,
      title: "ADN Dân sự",
      description: "Phù hợp cho mục đích cá nhân, nội bộ gia đình. Quy trình linh hoạt, có thể tự lấy mẫu tại nhà. Bảo mật tuyệt đối nhưng không có giá trị pháp lý.",
      image: "https://xetnghiemadn.info/gen/wp-content/uploads/2014/07/ADN-nguoi-600x320.jpg",
    },
    {
      id: 2,
      title: "ADN Pháp lý / Hành chính",
      description: "Dành cho các thủ tục pháp lý, hành chính. Quy trình nghiêm ngặt, lấy mẫu tại trung tâm. Kết quả được công nhận bởi tòa án và cơ quan nhà nước.",
      image: "https://baokhanhhoa.vn/file/e7837c02857c8ca30185a8c39b582c03/022025/1_20250207182332.webp",
    }
  ];

  return (
    <div className="service-page">
      {/* Use existing Header component */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="dna-background">
            <img src="https://www.science.org.au/curious/sites/default/files/article-banner-image/DNA-banner.jpg" alt="DNA Helix" className="dna-image" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Các dịch vụ xét nghiệm ADN</h2>

          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="service-content">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <button className="service-button">Tìm hiểu thêm</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADN Types Section - Thêm section mới */}
      <section className="adn-types-section">
        <div className="container">
          <h2 className="section-title">Tìm hiểu về các loại xét nghiệm ADN</h2>
          <p className="section-subtitle">
            Chọn loại xét nghiệm phù hợp với nhu cầu và mục đích sử dụng của bạn
          </p>
          
          <div className="adn-types-grid">
            {adnTypes.map(type => (
              <div key={type.id} className="adn-type-card">
                <div className="adn-type-image">
                  <img src={type.image} alt={type.title} />
                </div>
                <div className="adn-type-content">
                  <div className="adn-type-icon">{type.icon}</div>
                  <h3 className="adn-type-title">{type.title}</h3>
                  <p className="adn-type-description">{type.description}</p>
                  <button className="adn-type-button">Tìm hiểu thêm</button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Comparison Table */}
          <div className="comparison-section">
            <h3 className="comparison-title">So sánh ADN Dân sự và ADN Pháp lý</h3>
            <div className="comparison-table">
              <div className="comparison-row comparison-header">
                <div className="comparison-cell">Tiêu chí</div>
                <div className="comparison-cell">ADN Dân sự</div>
                <div className="comparison-cell">ADN Pháp lý</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Mục đích sử dụng</div>
                <div className="comparison-cell">Cá nhân, nội bộ gia đình</div>
                <div className="comparison-cell">Thủ tục pháp lý, hành chính</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Yêu cầu giấy tờ</div>
                <div className="comparison-cell">Không bắt buộc</div>
                <div className="comparison-cell">Bắt buộc (CMND/CCCD gốc)</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Nơi lấy mẫu</div>
                <div className="comparison-cell">Tại nhà hoặc trung tâm</div>
                <div className="comparison-cell">Tại trung tâm</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Giá trị pháp lý</div>
                <div className="comparison-cell">Không có</div>
                <div className="comparison-cell">Có giá trị cao nhất</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Chi phí</div>
                <div className="comparison-cell">Thấp hơn</div>
                <div className="comparison-cell">Cao hơn</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Thời gian kết quả</div>
                <div className="comparison-cell">3-5 ngày</div>
                <div className="comparison-cell">5-7 ngày</div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
};

export default ServicePage;