import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './DoctorDetail.css';

const doctorData = {
  'chris-tan': {
    id: 'chris-tan',
    name: 'BÁC SĨ CHRIS TAN',
    specialty: 'Cố vấn chuyên môn',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    author: 'Nguyễn Hải Yến',
    avatar: 'https://mindandculture.org/wordpress6/wp-content/uploads/2018/07/Fotolia_188161178_XS-5.jpg',
    publishTime: '15:47 - 23/02/2025',
    education: 'Tốt nghiệp trường Y Adelaide, Úc năm 2018, chuyên ngành Y khoa và Phẫu thuật',
    experience: 'Cao học chuyên về Nội khoa tại SingHealth, Singapore. Làm việc ở các khoa thận, bệnh truyền nhiễm, di truyền học, cấp cứu, y học chăm sóc giảm nhẹ.',
    awards: [
      'Giải thưởng Y học giảm nhẹ Resthaven năm 2018 ở Úc',
      'Giải thưởng Kiến thức tốt nhất về Thận học năm 2021'
    ],
    specialties: ['Các bệnh lây qua đường tình dục', 'Nam khoa', 'Di truyền học'],
    philosophy: 'Bác sĩ cần phải giao tiếp tốt, giải thích cặn kẽ để bệnh nhân hiểu rõ tình trạng sức khỏe của mình, như vậy mới giúp họ chủ động hơn. Luôn cố gắng tạo không khí thoải mái, để bệnh nhân có thể yên tâm chia sẻ mọi lo lắng.',
    currentRole: 'Hiện tại, Dr Chris Tan đang làm cố vấn cho trung tâm ADN di truyền DNA CHAIN, ông đảm nhận vai trò quan trọng trong việc biên soạn và kiểm duyệt một số bài viết chuyên môn trên website. Với kiến thức sâu rộng về y khoa và kinh nghiệm thực tiễn phong phú, bác sĩ Tan đảm bảo rằng mọi thông tin được cung cấp đến người đọc đều chính xác, khoa học và dễ hiểu. Ông cũng tích cực tham gia vào các hoạt động tư vấn, giải đáp thắc mắc cho khách hàng về các vấn đề liên quan đến di truyền và sức khỏe, góp phần nâng cao nhận thức cộng đồng về tầm quan trọng của việc chăm sóc sức khỏe chủ động.'
  },
  'robert-elliott': {
    id: 'robert-elliott',
    name: 'TS ROBERT ELLIOTT',
    specialty: 'Di truyền học & Sinh học ung thư',
    image: 'https://genplus.vn/wp-content/uploads/2022/08/image-3-e1661323749235-1.jpg',
    author: 'Nguyễn Hải Yến',
    avatar: 'https://mindandculture.org/wordpress6/wp-content/uploads/2018/07/Fotolia_188161178_XS-5.jpg',
    publishTime: '6:57 - 31/01/2025',
    education: 'Tiến sĩ Robert Elliott tốt nghiệp Tiến sĩ chuyên ngành Y Da khoa. Tiến sĩ đã công hiến hơn 20 năm trong ngành y với nhiều thành tựu nổi bật.',
    experience: 'Ông có vai trò quan trọng trong rất nhiều công trình nghiên cứu về các lĩnh vực y tế không chỉ ở Việt Nam mà còn trên nhiều quốc gia trên thế giới như Singapore, Thái Lan, Australia,... Tiến sĩ Robert Elliott là thành viên của 20 tổ chức y tế trên thế giới, có những đóng góp to lớn cho cộng đồng.',
    awards: [
      'Thành viên của 20 tổ chức y tế trên thế giới',
      'Những đóng góp to lớn cho cộng đồng y tế'
    ],
    specialties: ['Y Da khoa', 'Nghiên cứu y tế quốc tế', 'Công trình nghiên cứu y học'],
    philosophy: 'Cống hiến cho ngành y học với tinh thần phục vụ cộng đồng và đóng góp cho sự phát triển y tế trên phạm vi quốc tế.',
    currentRole: 'Năm 2021, Tiến sĩ Robert Elliot chính thức trở thành một thành viên trong đội ngũ chuyên gia hàng đầu tại DNA CHAIN, với sứ mệnh nâng cao chất lượng đời sống sức khỏe và cá thể chất lần tình thần của người Việt bằng tinh hoa của ngành y học hiện đại trên thế giới. Tiến sĩ Robert Elliot là người có vấn, đào tạo những phương pháp, kỹ thuật xét nghiệm tân tiến nhất của ngành di truyền học. Với những đóng góp cho lĩnh vực di truyền học nói riêng và ngành y nói chung, Tiến sĩ đóng vai trò quan trọng trong đội ngũ chuyên gia tại DNA CHAIN.'
  },
  'ronald-gulick': {
    id: 'ronald-gulick',
    name: 'TS RONALD GULICK',
    specialty: 'Miễn dịch & Di truyền',
    image: 'https://genplus.vn/wp-content/uploads/2022/08/image-6-e1674405216860.jpg',
    author: 'Nguyễn Hải Yến',
    avatar: 'https://mindandculture.org/wordpress6/wp-content/uploads/2018/07/Fotolia_188161178_XS-5.jpg',
    publishTime: '18:48 - 19/01/2025',
    education: 'Tiến sĩ Ronald Gulick là một trong những gương mặt nổi bật trong lĩnh vực di truyền học tại Mỹ. Với hơn 25 năm kinh nghiệm trong nghề, Tiến sĩ đã có rất nhiều đóng góp cho xã hội.',
    experience: 'Nổi bật trong sự nghiệp của Tiến sĩ là công trình nghiên cứu về Ứng dụng thực tiễn của xét nghiệm sinh học PCR trong xét nghiệm gen di truyền. Ông là một trong những người đã mang ứng dụng của sinh học phân tử hiện đại trên thế giới tới đóng góp một phần cho nền y học Việt Nam.',
    awards: [
      'Công trình nghiên cứu về Ứng dụng thực tiễn của xét nghiệm sinh học PCR',
      'Đóng góp một phần cho nền y học Việt Nam'
    ],
    specialties: ['Di truyền học', 'Sinh học phân tử', 'Xét nghiệm PCR'],
    philosophy: 'Nhận thấy di truyền đóng một vai trò quan trọng đối với sức khỏe, Tiến sĩ mong muốn những đóng góp của mình có thể giúp giảm thiểu nguy cơ mắc các bệnh di truyền ở trẻ. Tiến sĩ là tác giả của nhiều nghiên cứu khoa học được đánh giá cao bởi các Tổ chức Y tế tại Mỹ và Canada.',
    currentRole: 'Hiện nay, ông đang tập trung nghiên cứu về các loại bệnh di truyền trong khu vực Đông Nam Á, trong đó có Việt Nam. Tại DNA CHAIN, Tiến sĩ Ronald Gulick đang nắm giữ vai trò là cố vấn chuyên môn, chuyên gia đào tạo và chịu trách nhiệm về kỹ thuật xét nghiệm sàng lọc trước sinh.'
  },
  'andrea-miller': {
    id: 'andrea-miller',
    name: 'TS ANDREA MILLER',
    specialty: 'Sinh học',
    image: 'https://genplus.vn/wp-content/uploads/2022/08/image-e1674405251682.jpg',
    author: 'Nguyễn Hải Yến',
    avatar: 'https://mindandculture.org/wordpress6/wp-content/uploads/2018/07/Fotolia_188161178_XS-5.jpg',
    publishTime: '6:56 - 15/01/2025',
    education: 'Tiến sĩ Andrea Miller là một trong những chuyên gia y tế hàng đầu tại Đức. Bà từng là giảng viên xuất sắc tại các trường Đại học và có hơn 20 năm kinh nghiệm trong ngành di truyền học tại các bệnh viện lớn tại Đức.',
    experience: 'Là một y bác sĩ được đào tạo và phát triển tại một đất nước phát triển mạnh về công nghệ sinh học và có nền y học phát triển bậc nhất, bà đã lĩnh hội được những thành tựu về khoa học công nghệ trong lĩnh vực di truyền học.',
    awards: [
      'Giảng viên xuất sắc tại các trường Đại học Đức',
      'Đào tạo và phát triển tại các bệnh viện lớn tại Đức'
    ],
    specialties: ['Di truyền học', 'Công nghệ sinh học', 'Y học Đức'],
    philosophy: 'Với sứ mệnh lan tỏa thành tựu của thời đại trong lĩnh vực, bà đã đến và công tác tại hơn 10 đất nước trên thế giới.',
    currentRole: 'Hiện nay, Tiến sĩ Andrea Miller đang nắm giữ vai trò là cố vấn chuyên môn tại DNA CHAIN. Tiến sĩ là người có trách nhiệm đào tạo và nghiên cứu những phương pháp xét nghiệm ADN huyết thống hiện đại, tân tiến bậc nhất cho người Việt.'
  }
};

function DoctorDetail() {
  const { doctorId } = useParams();
  const doctor = doctorData[doctorId];

  if (!doctor) {
    return (
      <div className="doctor-detail-container">
        <Header />
        <main className="doctor-detail-content">
          <div className="doctor-not-found">
            <h2>Không tìm thấy thông tin bác sĩ</h2>
            <Link to="/" className="back-home-btn">Quay về trang chủ</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="doctor-detail-container">
      <Header />
      <main className="doctor-detail-content">
        <div className="doctor-detail-wrapper">
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span> » </span>
            <Link to="/#experts">Bác sĩ</Link>
            <span> »</span>
          </div>

          <div className="doctor-header">
            <div className="doctor-header-info">
              <h1 className="doctor-title">{doctor.name}</h1>
              <div className="article-meta">
                <img src={doctor.avatar || "https://via.placeholder.com/40x40/cccccc/666666?text=NY"} alt="Avatar" />
                <span className="author">{doctor.author}</span>
                <span className="publish-time">{doctor.publishTime}</span>
              </div>
            </div>
          </div>

          <div className="doctor-content">
            <section>
              <p>{doctor.education}. {doctor.experience}</p>
            </section>

            <div className="doctor-image-container">
              <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            </div>

            <section>
              <p>Trong sự nghiệp, {doctor.name.toLowerCase()} cũng gặt hái được nhiều thành tựu quan trọng, bao gồm: {doctor.awards.join(', ')}. {doctor.philosophy}</p>
            </section>

            <section>
              <p>{doctor.currentRole}</p>
            </section>
          </div>

          {/* Rating and Social Section */}
          <div className="rating-social-section">
            <div className="rating-section">
              <div className="rating-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star empty">☆</span>
                <span className="star empty">☆</span>
              </div>
              <span className="rating-text">3/5 - (2 bình chọn)</span>
            </div>
            <div className="social-icons">
              <a href="https://zalo.me/" className="social-icon zalo" target="_blank" rel="noopener noreferrer">
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="24" fill="#1976d2"/>
                  <text x="50%" y="55%" text-anchor="middle" fill="#fff" font-size="18" font-family="Arial, Helvetica, sans-serif" dy=".3em">z</text>
                </svg>
              </a>
              <a href="https://facebook.com/" className="social-icon facebook" target="_blank" rel="noopener noreferrer">
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="24" fill="#4267b2"/>
                  <text x="50%" y="55%" text-anchor="middle" fill="#fff" font-size="18" font-family="Arial, Helvetica, sans-serif" dy=".3em">f</text>
                </svg>
              </a>
            </div>
          </div>

          <div className="last-updated">
            Cập nhật lúc 15:48 - 23/02/2025
          </div>

          {/* Comment Section */}
          <div className="comment-section">
            <h3 className="comment-title">Trở thành người đầu tiên bình luận cho bài viết này!</h3>
            
            <div className="comment-form-title">NỘI DUNG BÌNH LUẬN</div>
            <form className="comment-form">
              <textarea 
                className="comment-textarea" 
                placeholder="Nội dung bình luận"
                rows="5"
              ></textarea>
              
              <div className="comment-form-row">
                <input 
                  type="text" 
                  className="comment-input" 
                  placeholder="Họ tên"
                />
                <input 
                  type="email" 
                  className="comment-input" 
                  placeholder="Email của bạn"
                />
              </div>
              
              <button type="submit" className="comment-submit-btn">
                GỬI BÌNH LUẬN
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DoctorDetail;
