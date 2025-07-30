import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../hooks/useNavigation';

function About() {
  const { user } = useAuth();
  const { goToProfile } = useNavigation();
  const tocRef = useRef();
  const [tocOpen, setTocOpen] = useState(false);

  // Scroll to section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTocOpen(false);
  };

  return (
    <div className="about-container">
      <Header />
      <main className="about-content">
        <section className="adn-about-banner">
          <img src="https://genplus.vn/wp-content/uploads/2022/11/xet-nghiem-adn-lang-son-1.jpg" alt="Banner Giới thiệu DNA CHAIN" className="adn-about-banner-img about-banner-img-large" />
        </section>
        <section className="adn-about-content-box">
          <div className="adn-about-row">
            <div className="adn-about-col-left">
              <h1 className="adn-about-title">GIỚI THIỆU TRUNG TÂM XÉT NGHIỆM DNA CHAIN</h1>
              {/* Table of Content Accordion */}
              <div className="about-toc" ref={tocRef}>
                <button
                  className="about-toc-btn"
                  onClick={() => setTocOpen((open) => !open)}
                  aria-expanded={tocOpen}
                  aria-controls="about-toc-list"
                >
                  <span role="img" aria-label="toc">📑</span>Nội Dung Bài Viết
                  <span className="about-toc-arrow" style={{ transform: tocOpen ? 'rotate(90deg)' : 'none' }}>&#8250;</span>
                </button>
                {tocOpen && (
                  <ul id="about-toc-list" className="about-toc-list">
                    <li><a href="#gioi-thieu" onClick={e => {e.preventDefault(); scrollToSection('gioi-thieu');}}>Giới thiệu chung</a></li>
                    <li><a href="#co-so" onClick={e => {e.preventDefault(); scrollToSection('co-so');}}>Cơ sở vật chất & Công nghệ</a></li>
                    <li><a href="#su-menh" onClick={e => {e.preventDefault(); scrollToSection('su-menh');}}>Sứ mệnh</a></li>
                    <li><a href="#tam-nhin" onClick={e => {e.preventDefault(); scrollToSection('tam-nhin');}}>Tầm nhìn</a></li>
                    <li><a href="#gia-tri" onClick={e => {e.preventDefault(); scrollToSection('gia-tri');}}>Giá trị cốt lõi</a></li>
                  </ul>
                )}
              </div>

              {/* Giới thiệu chung */}
              <section id="gioi-thieu">
                <div className="about-intro-block">
                  <h2 className="about-intro-title">Giới thiệu chung về DNA CHAIN</h2>
                  <p className="about-intro-desc">
                    <b>DNA CHAIN</b> xuất hiện trong thời kỳ công nghệ sinh học Việt Nam phát triển mạnh mẽ, mang sứ mệnh cung cấp dịch vụ xét nghiệm ADN chất lượng cao với chi phí hợp lý. Trung tâm sở hữu hệ thống văn phòng hỗ trợ thu mẫu phủ rộng trên cả nước, đảm bảo kết quả chính xác, nhanh chóng và bảo mật tuyệt đối cho khách hàng.
                  </p>
                </div>
              </section>

              
              <section id="co-so">
                <h2 className="about-section-title">Cơ Sở Vật Chất & Công Nghệ DNA CHAIN</h2>
                <div className="about-facility-block">
                  <p>Với mong muốn đem đến các dịch vụ xét nghiệm ADN di truyền chất lượng với giá tốt nhất, Trung tâm xét nghiệm <b>DNA CHAIN</b> được thành lập với quy mô lớn, cơ sở hạ tầng khang trang, máy móc hiện đại và đội ngũ chuyên gia, kỹ thuật viên dày dạn kinh nghiệm, được đào tạo bài bản và có chuyên môn sâu.</p>
                  <p>DNA CHAIN hợp tác cùng các Viện Công nghệ ADN di truyền chuyên sâu trong và ngoài nước. Trung tâm đầu tư, đồng sở hữu nhiều phòng LAB phục vụ xét nghiệm ADN huyết thống, xét nghiệm ADN vi sinh bằng Realtime PCR, xét nghiệm gen đột biến, phát hiện gen bệnh.</p>
                  <div className="about-lab-gallery about-lab-gallery-horizontal">
                    <img src="https://adnchacon.com/wp-content/uploads/2015/01/trung-tam-xet-nghiem-adn-3.jpg" alt="Phòng lab trung tâm xét nghiệm ADN" className="about-lab-img about-lab-img-square" />
                  </div>
                  <p>Quy trình xét nghiệm ADN được thực hiện theo tiêu chuẩn SOP, phòng xét nghiệm đạt chuẩn ISO 9001:2015, trang thiết bị nhập khẩu từ các hãng lớn như Hermle, Eppendorf (Đức), Applied Biosystems (Mỹ)...</p>
                  <p>Sử dụng các bộ kit chuẩn quốc tế PowerPlex Fussion System, PowerPlex Y23 (Mỹ), Investigator X-12 (Đức), phần mềm phân tích gen tự động GeneMapperIDX cho kết quả chính xác đến 99.99999999%.</p>
                  <p>Các xét nghiệm được thực hiện tỉ mỉ, độc lập bởi kỹ thuật viên chuyên biệt, đối chiếu kết quả nhiều khâu, đảm bảo độ chính xác cao nhất.</p>
                  <p>Kết quả phân tích ADN hỗ trợ đắc lực cho nhiều tổ chức, công dân, gia đình trong các thủ tục pháp lý, nhận con, khai sinh, đoàn tụ, di dân quốc tế...</p>
                  <p>DNA CHAIN là một trong những trung tâm có đầy đủ năng lực pháp lý thực hiện giám định ADN theo yêu cầu của tòa án trên khắp các tỉnh thành Việt Nam.</p>
                  <p>Trung tâm cũng mở rộng các dịch vụ phân tích ADN: sàng lọc ung thư, virus, định lượng ADN, sàng lọc trước sinh không xâm lấn, phát hiện đột biến gen, phân tích gen bệnh lý...</p>
                  <p className="about-facility-note"><i>DNA CHAIN cam kết đồng hành, giải đáp mọi thắc mắc, mang lại sự thật và giá trị nhân văn cho cộng đồng.</i></p>
                </div>
              </section>

              {/* Sứ mệnh */}
              <section id="su-menh">
                <h2 className="about-section-subtitle">Sứ Mệnh Của DNA CHAIN</h2>
                <ul>
                  <li>Đem tới chất lượng dịch vụ tốt nhất về xét nghiệm ADN di truyền tại Việt Nam.</li>
                  <li>Đảm bảo mọi trẻ em sinh ra đều được khai sinh đầy đủ quyền lợi.</li>
                  <li>Xóa tan nghi vấn về huyết thống, mang lại niềm tin và hạnh phúc cho gia đình.</li>
                </ul>
              </section>

              {/* Tầm nhìn */}
              <section id="tam-nhin">
                <h2 className="about-section-subtitle">Tầm Nhìn DNA CHAIN</h2>
                <ul>
                  <li>Trở thành chuỗi văn phòng xét nghiệm ADN di truyền và Phân tích Gen di truyền phủ rộng khắp Việt Nam giảm thiểu chi phí và thời gian đi lại cho người dân cả nước.</li>
                  <li>Ứng dụng công nghệ tiên tiến, mang lại dịch vụ nhanh chóng, chính xác, hạnh phúc cho mọi gia đình.</li>
                </ul>
              </section>

              {/* Giá trị cốt lõi */}
              <section id="gia-tri">
                <h2 className="about-section-subtitle">Giá Trị Cốt Lõi DNA CHAIN</h2>
                <ul>
                  <li><b>Chính xác:</b> Thiết bị hiện đại, quy trình kiểm soát chất lượng nghiêm ngặt.</li>
                  <li><b>Bảo mật:</b> Thông tin khách hàng được bảo mật tuyệt đối.</li>
                  <li><b>Tận tâm:</b> Đội ngũ tư vấn, chuyên gia đồng hành, hỗ trợ chu đáo.</li>
                  <li><b>Vì cộng đồng:</b> Cam kết nâng cao sức khỏe, mang lại giá trị cho xã hội.</li>
                </ul>
              </section>
            </div>
            <div className="adn-about-col-right">
              <div className="about-lab-gallery">
                <img src="https://suckhoedoisong.qltns.mediacdn.vn/Images/nguyenkhanh/2020/07/20/xet_nghiem_ADN_3.jpg" alt="Phòng lab thực tế DNA CHAIN" className="about-lab-img about-lab-img-square" />
                <img src="https://genplus.vn/wp-content/uploads/2022/07/xet-nghiem-adn-phap-ly60.jpg" alt="Phòng lab thực tế DNA CHAIN 2" className="about-lab-img about-lab-img-square" />
              </div>
            </div>
          </div>
          <div className="adn-about-back">
            <Link to="/home" className="adn-btn adn-btn-main">Quay về trang chủ</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;