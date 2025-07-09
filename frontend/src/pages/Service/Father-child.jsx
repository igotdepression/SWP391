import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Father-child.css';
import { Navigation } from 'lucide-react';

const FatherChildService = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Lấy tab từ URL params, mặc định là 'overview'
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');

    // Cập nhật URL khi tab thay đổi
    useEffect(() => {
        setSearchParams({ tab: activeTab });
    }, [activeTab, setSearchParams]);

    // Sync với URL khi component mount hoặc URL thay đổi
    useEffect(() => {
        const tabFromUrl = searchParams.get('tab');
        if (tabFromUrl && tabFromUrl !== activeTab) {
            setActiveTab(tabFromUrl);
        }
    }, [searchParams]);

    // Hàm để thay đổi tab và cập nhật URL
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="father-child-service-page">
            <Header />

            {/* Hero Section */}
            <section className="service-hero">
                <div className="hero-background-container">
                    <img src="https://bestselfatlanta.com/wp-content/uploads/2017/05/father-son.jpg" className="hero-background" alt="Hero Background" />
                </div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>Xét nghiệm ADN cha con</h1>
                            <p className="hero-subtitle">
                                Xác minh quan hệ huyết thống cha - con với độ chính xác 99,99%.
                                Xét nghiệm nhanh nhóng, bảo mật, an toàn cho mục đích cá nhân và pháp lý
                            </p>
                            <div className="hero-stats">
                                <div className="stat-item">
                                    <span className="stat-number">99.99%</span>
                                    <span className="stat-label">Độ chính xác</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">3 - 5</span>
                                    <span className="stat-label">Ngày có kết quả</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">5,000+</span>
                                    <span className="stat-label">Ca xét nghiệm</span>
                                </div>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img
                                src="https://bestselfatlanta.com/wp-content/uploads/2017/05/father-son.jpg"
                                alt="Father and Child DNA Testing"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Navigation */}
            <section className="service-nav">
                <div className="container">
                    <div className="nav-tabs">
                        <button
                            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => handleTabChange('overview')}
                        >
                            Tổng quan
                        </button>
                        <button
                            className={`nav-tab ${activeTab === 'types' ? 'active' : ''}`}
                            onClick={() => handleTabChange('types')}
                        >
                            Quy trình xét nghiệm
                        </button>
                        <button
                            className={`nav-tab ${activeTab === 'samples' ? 'active' : ''}`}
                            onClick={() => handleTabChange('samples')}
                        >
                            Mẫu xét nghiệm
                        </button>
                        <button
                            className={`nav-tab ${activeTab === 'collection' ? 'active' : ''}`}
                            onClick={() => handleTabChange('collection')}
                        >
                            Hướng dẫn lấy mẫu
                        </button>
                        <button
                            className={`nav-tab ${activeTab === 'faq' ? 'active' : ''}`}
                            onClick={() => handleTabChange('faq')}
                        >
                            Câu hỏi thường gặp
                        </button>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="fatherchild-service-content">
                <div className="container">

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="content-tab">
                            <h2>1. Xét nghiệm ADN huyết thống cha con bao nhiều tiền?</h2>

                            <p>
                                Xét nghiệm ADN xác định mối quan hệ huyết thống cha con được thực hiện với
                                hai mục đích chính: dân sự và hành chính với mức giá khác nhau.
                            </p>

                            <div className="pricing-section">
                                <h3>Chi phí xét nghiệm ADN huyết thống cha con, mẹ con dành cho dân sự:</h3>

                                <div className="pricing-preview">
                                    <div className="pricing-preview-table">
                                        <div className="pricing-row pricing-header">
                                            <div className="pricing-cell">Quy cách</div>
                                            <div className="pricing-cell">Thời gian</div>
                                            <div className="pricing-cell">Chi phí (vnđ)</div>
                                            <div className="pricing-cell">Phụ phí mẫu thứ 3</div>
                                        </div>

                                        <div className="pricing-row">
                                            <div className="pricing-cell">Tiêu Chuẩn</div>
                                            <div className="pricing-cell">03 - 05 Ngày</div>
                                            <div className="pricing-cell">2.500.000</div>
                                            <div className="pricing-cell extra-sample-cell">1.250.000</div>
                                        </div>
                                        <div className="pricing-row">
                                            <div className="pricing-cell">Làm Nhanh</div>
                                            <div className="pricing-cell">06 – 24 Tiếng</div>
                                            <div className="pricing-cell">5.000.000</div>
                                            <div className="pricing-cell extra-sample-cell">2.500.000</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="note-section">
                                    <h4>Lưu ý:</h4>
                                    <ul>
                                        <li>Đối với xét nghiệm dân sự, có thể thực hiện tại nhà hoặc tại trung tâm. Hỗ trợ lấy mẫu tại nhà: <strong>Miễn phí</strong> trong nội thành</li>
                                        <li>Bảng giá trên mang tính chất tham khảo và áp dụng đối với loại <b>mẫu máu và mẫu tế bào niêm mạc miệng</b>.</li>
                                        <li>Đối với <b>mẫu tóc, móng tay, chân, cuống rốn,...</b> cộng thêm 500.000/trường hợp.</li>
                                        <li>Đối với các <b>mẫu đặc biệt (dao cạo râu, đầu lọc thuốc lá, bả keo cao su, bàn chải đánh răng, mẫu tinh trùng)</b> cộng thêm 2.000.000/ trường hợp. <br />Trong trường hợp 2 mẫu đều là mẫu đặc biệt thì cộng thêm 500.000đ.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pricing-section">
                                <h3>Chi phí xét nghiệm ADN huyết thống cha con, mẹ con dành cho hành chính:</h3>

                                <div className="pricing-preview">
                                    <div className="pricing-preview-table">
                                        <div className="pricing-row pricing-header">
                                            <div className="pricing-cell">Quy cách</div>
                                            <div className="pricing-cell">Thời gian</div>
                                            <div className="pricing-cell">Chi phí (vnđ)</div>
                                            <div className="pricing-cell">Phụ phí mẫu thứ 3</div>
                                        </div>

                                        <div className="pricing-row">
                                            <div className="pricing-cell">Tiêu chuẩn</div>
                                            <div className="pricing-cell">03 - 05 Ngày</div>
                                            <div className="pricing-cell">3.500.000</div>
                                            <div className="pricing-cell extra-sample-cell">1.750.000</div>
                                        </div>
                                        <div className="pricing-row">
                                            <div className="pricing-cell">Làm Nhanh</div>
                                            <div className="pricing-cell">06 – 24 Tiếng</div>
                                            <div className="pricing-cell">6.000.000</div>
                                            <div className="pricing-cell extra-sample-cell">3.000.000</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="note-section">
                                    <h4>Lưu ý:</h4>
                                    <ul>
                                        <li>Đối với xét nghiệm thủ tục hành chính chỉ sử dụng <b>mẫu máu hoặc mẫu niêm mạc miệng.</b></li>
                                        <li>Xét nghiệm bắt buộc thực hiện tại <b>trung tâm</b> có nhân viên giám sát</li>
                                        <li>Yêu cầu CMND/CCCD gốc của tất cả các bên</li>
                                        <li>Kết quả có đóng dấu công chứng, có giá trị pháp lý</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="overview-description">
                                <h3>Chi phí xét nghiệm ADN cha con tại DNA CHAIN bao gồm:</h3>
                                <ul>
                                    <li>Phí lấy mẫu xét nghiệm tại trung tâm hoặc tại nhà</li>
                                    <li>Chi phí xét nghiệm và phân tích mẫu tại phòng lab chuẩn quốc tế</li>
                                    <li>Phí xuất kết quả theo yêu cầu từng loại hình dịch vụ (dân sự hoặc hành chính)</li>
                                    <li>
                                        Trong trường hợp kết quả xét nghiệm lần đầu không thể kết luận được chính xác do
                                        chất lượng mẫu không đảm bảo, DNA CHAIN sẽ tiến hành xét nghiệm bổ sung hoàn toàn miễn phí.
                                    </li>
                                </ul>

                                <div className="price-guarantee">
                                    <h4>🛡️ Cam kết của DNA CHAIN:</h4>
                                    <div className="guarantee-grid">
                                        <div className="guarantee-item">
                                            <span className="guarantee-icon">✅</span>
                                            <span>Xét nghiệm lại <strong>MIỄN PHÍ</strong> nếu mẫu không đạt chất lượng</span>
                                        </div>
                                        <div className="guarantee-item">
                                            <span className="guarantee-icon">✅</span>
                                            <span>Hoàn tiền <strong>100%</strong> nếu không đưa ra được kết quả</span>
                                        </div>
                                        <div className="guarantee-item">
                                            <span className="guarantee-icon">✅</span>
                                            <span>Bảo mật thông tin khách hàng <strong>TUYỆT ĐỐI</strong></span>
                                        </div>
                                        <div className="guarantee-item">
                                            <span className="guarantee-icon">✅</span>
                                            <span>Độ chính xác <strong>99.99%</strong> với công nghệ hiện đại</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="note-box">
                                    <h4>Lưu ý về chi phí ADN cha con tại một số đơn vị khác:</h4>
                                    <p>
                                        Hãy cẩn thận với các đơn vị báo giá quá thấp so với thị trường (dưới 2.000.000 đồng),
                                        có thể chất lượng dịch vụ không đảm bảo hoặc có phí phát sinh thêm.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}



                    {/* Types Tab */}
                    {activeTab === 'types' && (
                        <div className="content-tab">



                            {/* Section 2: Quy trình xét nghiệm */}
                            <div className="process-section">
                                <h3>2. Quy trình xét nghiệm ADN cha con</h3>

                                {/* Accuracy Info */}
                                <div className="accuracy-info">
                                    <div className="accuracy-card">
                                        <div className="accuracy-icon">🔬</div>
                                        <h3>Độ chính xác 99.99%</h3>
                                        <p>Công nghệ xét nghiệm ADN hiện đại với độ chính xác lên đến <strong>99,999%</strong> trong việc xác định mối quan hệ huyết thống cha con.</p>
                                    </div>
                                </div>

                                <div className="process-comparison">
                                    <div className="process-type">
                                        <h4>🏠 Quy trình ADN Dân sự</h4>
                                        <div className="process-steps">
                                            <div className="process-step">
                                                <div className="step-number">1</div>
                                                <div className="step-content">
                                                    <h5>Đăng ký dịch vụ</h5>
                                                    <p>Liên hệ hotline hoặc đăng ký online. Không cần giấy tờ tùy thân.</p>
                                                </div>
                                            </div>
                                            <div className="process-step">
                                                <div className="step-number">2</div>
                                                <div className="step-content">
                                                    <h5>Lấy mẫu</h5>
                                                    <p>Tại nhà (miễn phí) hoặc tại trung tâm. Hỗ trợ kit lấy mẫu tận nơi.</p>
                                                </div>
                                            </div>
                                            <div className="process-step">
                                                <div className="step-number">3</div>
                                                <div className="step-content">
                                                    <h5>Phân tích mẫu</h5>
                                                    <p>Xử lý tại phòng lab chuẩn ISO. Thời gian 3-5 ngày làm việc.</p>
                                                </div>
                                            </div>
                                            <div className="process-step">
                                                <div className="step-number">4</div>
                                                <div className="step-content">
                                                    <h5>Trả kết quả</h5>
                                                    <p>Gửi kết quả qua email/SMS hoặc nhận trực tiếp. Bảo mật tuyệt đối.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="process-type">
                                        <h4>⚖️ Quy trình ADN Hành chính</h4>
                                        <div className="process-steps">
                                            <div className="process-step">
                                                <div className="step-number">1</div>
                                                <div className="step-content">
                                                    <h5>Đăng ký & Xác thực</h5>
                                                    <p>Đăng ký với CMND/CCCD gốc. Xác thực danh tính tại trung tâm.</p>
                                                </div>
                                            </div>
                                            <div className="process-step">
                                                <div className="step-number">2</div>
                                                <div className="step-content">
                                                    <h5>Lấy mẫu giám sát</h5>
                                                    <p>Bắt buộc tại trung tâm với sự giám sát của nhân viên. Ghi nhận đầy đủ.</p>
                                                </div>
                                            </div>
                                            <div className="process-step">
                                                <div className="step-number">3</div>
                                                <div className="step-content">
                                                    <h5>Phân tích chuẩn pháp lý</h5>
                                                    <p>Quy trình nghiêm ngặt theo chuẩn pháp lý. Thời gian 5-7 ngày làm việc.</p>
                                                </div>
                                            </div>
                                            <div className="process-step">
                                                <div className="step-number">4</div>
                                                <div className="step-content">
                                                    <h5>Kết quả có giá trị pháp lý</h5>
                                                    <p>Báo cáo đóng dấu công chứng. Được tòa án và cơ quan nhà nước công nhận.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Samples Tab - Bổ sung hướng dẫn cuống rốn */}
                    {activeTab === 'samples' && (
                        <div className="content-tab">
                            <div className="sample-types-section">
                                <h3>3. Các loại mẫu phẩm sử dụng trong xét nghiệm</h3>

                                <div className="sample-categories">
                                    <div className="sample-category">
                                        <h4>🩸 Mẫu chuẩn (Khuyến nghị)</h4>
                                        <div className="samples-grid">
                                            <div className="sample-item-card">
                                                <div className="sample-icon">💧</div>
                                                <h5>Niêm mạc miệng</h5>
                                                <p><strong>Độ thành công:</strong> 99%</p>
                                                <p><strong>Cách lấy:</strong> Dùng tăm bông chà vào má trong 30 giây</p>
                                                <p><strong>Ưu điểm:</strong> Dễ lấy, không đau, phù hợp mọi lứa tuổi</p>
                                                <span className="price-tag">Không phụ phí</span>
                                            </div>
                                            <div className="sample-item-card">
                                                <div className="sample-icon">🩸</div>
                                                <h5>Máu</h5>
                                                <p><strong>Độ thành công:</strong> 99.9%</p>
                                                <p><strong>Cách lấy:</strong> Lấy 2-3ml máu tĩnh mạch</p>
                                                <p><strong>Ưu điểm:</strong> Chất lượng DNA cao nhất, kết quả chính xác</p>
                                                <span className="price-tag">Không phụ phí</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sample-category">
                                        <h4>💇 Mẫu thay thế</h4>
                                        <div className="samples-grid">
                                            <div className="sample-item-card">
                                                <div className="sample-icon">💇</div>
                                                <h5>Tóc có chân tóc</h5>
                                                <p><strong>Độ thành công:</strong> 85%</p>
                                                <p><strong>Cách lấy:</strong> Nhổ 5-7 sợi tóc có đầy đủ chân tóc</p>
                                                <p><strong>Lưu ý:</strong> Tóc cắt không có giá trị</p>
                                                <span className="price-tag extra">+500.000 VNĐ</span>
                                            </div>
                                            <div className="sample-item-card">
                                                <div className="sample-icon">💅</div>
                                                <h5>Móng tay/chân</h5>
                                                <p><strong>Độ thành công:</strong> 75%</p>
                                                <p><strong>Cách lấy:</strong> Cắt sát da, lấy 3-5 mảnh móng</p>
                                                <p><strong>Lưu ý:</strong> Không sơn móng trước khi lấy</p>
                                                <span className="price-tag extra">+500.000 VNĐ</span>
                                            </div>
                                            <div className="sample-item-card">
                                                <div className="sample-icon">🤱</div>
                                                <h5>Cuống rốn</h5>
                                                <p><strong>Độ thành công:</strong> 85%</p>
                                                <p><strong>Cách lấy:</strong> Cắt đoạn cuống rốn 3-5cm sau sinh</p>
                                                <p><strong>Ưu điểm:</strong> Mẫu lý tưởng cho trẻ sơ sinh</p>
                                                <span className="price-tag extra">+500.000 VNĐ</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sample-category">
                                        <h4>🔬 Mẫu đặc biệt</h4>
                                        <div className="samples-grid">
                                            <div className="sample-item-card">
                                                <div className="sample-icon">🪒</div>
                                                <h5>Dao cạo râu</h5>
                                                <p><strong>Độ thành công:</strong> 60%</p>
                                                <p><strong>Yêu cầu:</strong> Sử dụng trong 24h, bảo quản khô ráo</p>
                                                <span className="price-tag special">+2.000.000 VNĐ</span>
                                            </div>
                                            <div className="sample-item-card">
                                                <div className="sample-icon">🚬</div>
                                                <h5>Đầu lọc thuốc lá</h5>
                                                <p><strong>Độ thành công:</strong> 50%</p>
                                                <p><strong>Yêu cầu:</strong> Hút ít nhất 1/3 điếu thuốc</p>
                                                <span className="price-tag special">+2.000.000 VNĐ</span>
                                            </div>
                                            <div className="sample-item-card">
                                                <div className="sample-icon">🦷</div>
                                                <h5>Bàn chải đánh răng</h5>
                                                <p><strong>Độ thành công:</strong> 65%</p>
                                                <p><strong>Yêu cầu:</strong> Sử dụng ít nhất 1 tháng</p>
                                                <span className="price-tag special">+2.000.000 VNĐ</span>
                                            </div>
                                            <div className="sample-item-card">
                                                <div className="sample-icon">🩺</div>
                                                <h5>Mẫu tinh trùng</h5>
                                                <p><strong>Độ thành công:</strong> 90%</p>
                                                <p><strong>Yêu cầu:</strong> Bảo quản lạnh, gửi trong 24h</p>
                                                <span className="price-tag special">+2.000.000 VNĐ</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sample-notes">
                                    <h4>📝 Lưu ý quan trọng về mẫu phẩm:</h4>
                                    <div className="notes-grid">
                                        <div className="note-item">
                                            <span className="note-icon">⚠️</span>
                                            <p>Mẫu ADN Hành chính chỉ chấp nhận máu hoặc niêm mạc miệng</p>
                                        </div>
                                        <div className="note-item">
                                            <span className="note-icon">💰</span>
                                            <p>Nếu 2 mẫu đều đặc biệt, cộng thêm 500.000 VNĐ</p>
                                        </div>
                                        <div className="note-item">
                                            <span className="note-icon">🔄</span>
                                            <p>Xét nghiệm lại miễn phí nếu mẫu không đạt chất lượng</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    )}
                    {activeTab === 'collection' && (
                        <div className="tab-content">
                            {/* Sample collection instructions - Bổ sung hướng dẫn cuống rốn chi tiết */}
                            <div className="sample-collection-instructions">
                                <h3>4. Hướng dẫn lấy mẫu chi tiết</h3>

                                <div className="instruction-categories">
                                    {/* Mẫu chuẩn */}
                                    <div className="instruction-category">
                                        <h4>🩸 Hướng dẫn lấy mẫu chuẩn</h4>

                                        <div className="instruction-grid">
                                            <div className="instruction-card">
                                                <div className="instruction-header">
                                                    <span className="instruction-icon">💧</span>
                                                    <h5>Niêm mạc miệng (Khuyến nghị)</h5>
                                                </div>

                                                <div className="instruction-steps">
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">1</span>
                                                        <p>Súc miệng sạch với nước lọc, không ăn uống trong 30 phút trước khi lấy mẫu</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">2</span>
                                                        <p>Lấy tăm bông từ kit, tháo bao bì cẩn thận không chạm vào đầu tăm bông</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">3</span>
                                                        <p>Chà tăm bông vào má trong, xoay tròn 20-30 giây với lực vừa phải</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">4</span>
                                                        <p>Để khô tự nhiên 30 phút, sau đó cho vào túi có ghi tên</p>
                                                    </div>
                                                </div>

                                                <div className="instruction-tips">
                                                    <h6>💡 Lưu ý quan trọng:</h6>
                                                    <ul>
                                                        <li>Lấy 2 tăm bông cho mỗi người</li>
                                                        <li>Không thổi khô hay dùng máy sấy</li>
                                                        <li>Tránh nhiễm chéo giữa các mẫu</li>
                                                        <li>Ghi rõ tên và thời gian lấy mẫu</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="instruction-card">
                                                <div className="instruction-header">
                                                    <span className="instruction-icon">🩸</span>
                                                    <h5>Máu tĩnh mạch</h5>
                                                </div>

                                                <div className="instruction-steps">
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">1</span>
                                                        <p>Thực hiện tại trung tâm y tế hoặc phòng khám có nhân viên chuyên môn</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">2</span>
                                                        <p>Lấy 2-3ml máu tĩnh mạch vào ống chứa có chất chống đông EDTA</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">3</span>
                                                        <p>Lắc đều ống máu 8-10 lần để trộn đều với chất chống đông</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">4</span>
                                                        <p>Bảo quản trong tủ lạnh 2-8°C, gửi trong vòng 24-48 giờ</p>
                                                    </div>
                                                </div>

                                                <div className="instruction-tips">
                                                    <h6>💡 Lưu ý quan trọng:</h6>
                                                    <ul>
                                                        <li>Phải có nhân viên y tế thực hiện</li>
                                                        <li>Sử dụng ống EDTA màu tím</li>
                                                        <li>Không để đông máu</li>
                                                        <li>Độ chính xác cao nhất: 99.9%</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mẫu thay thế - Bổ sung cuống rốn */}
                                    <div className="instruction-category">
                                        <h4>💇 Hướng dẫn lấy mẫu thay thế</h4>

                                        <div className="instruction-grid">
                                            <div className="instruction-card">
                                                <div className="instruction-header">
                                                    <span className="instruction-icon">💇</span>
                                                    <h5>Tóc có chân tóc</h5>
                                                </div>

                                                <div className="instruction-steps">
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">1</span>
                                                        <p>Nhổ (không cắt) 10-15 sợi tóc từ nhiều vị trí trên đầu</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">2</span>
                                                        <p>Đảm bảo có chân tóc (phần trắng ở gốc tóc) - đây là nguồn DNA</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">3</span>
                                                        <p>Buộc các sợi tóc lại với nhau, để vào giấy A4 sạch</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">4</span>
                                                        <p>Gấp giấy lại, ghi tên và cho vào túi zip</p>
                                                    </div>
                                                </div>

                                                <div className="instruction-tips warning">
                                                    <h6>⚠️ Chú ý:</h6>
                                                    <ul>
                                                        <li>Tóc cắt KHÔNG có giá trị</li>
                                                        <li>Tóc rụng tự nhiên thường không có chân tóc</li>
                                                        <li>Tóc nhuộm, uốn vẫn sử dụng được</li>
                                                        <li>Phụ phí: +500.000 VNĐ</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="instruction-card">
                                                <div className="instruction-header">
                                                    <span className="instruction-icon">💅</span>
                                                    <h5>Móng tay/chân</h5>
                                                </div>

                                                <div className="instruction-steps">
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">1</span>
                                                        <p>Rửa tay/chân sạch, loại bỏ sơn móng (nếu có)</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">2</span>
                                                        <p>Cắt móng sát da, lấy 3-5 mảnh móng có kích thước tối thiểu 2x2mm</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">3</span>
                                                        <p>Cho vào giấy A4 sạch, không dùng túi nylon</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">4</span>
                                                        <p>Ghi tên và thời gian, bảo quản ở nơi khô ráo</p>
                                                    </div>
                                                </div>

                                                <div className="instruction-tips warning">
                                                    <h6>⚠️ Chú ý:</h6>
                                                    <ul>
                                                        <li>Móng phải dày, cắt sát da</li>
                                                        <li>Móng giả không sử dụng được</li>
                                                        <li>Tránh nhiễm bẩn khi lấy mẫu</li>
                                                        <li>Phụ phí: +500.000 VNĐ</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="instruction-card">
                                                <div className="instruction-header">
                                                    <span className="instruction-icon">🤱</span>
                                                    <h5>Cuống rốn</h5>
                                                </div>

                                                <div className="instruction-steps">
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">1</span>
                                                        <p>Lấy cuống rốn ngay sau khi sinh (trong vòng 24h)</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">2</span>
                                                        <p>Cắt đoạn cuống rốn dài khoảng 3-5cm</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">3</span>
                                                        <p>Để khô tự nhiên hoặc bảo quản trong cồn 70%</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">4</span>
                                                        <p>Gói trong gạc vô trùng, cho vào túi zip và gửi ngay</p>
                                                    </div>
                                                </div>

                                                <div className="instruction-tips warning">
                                                    <h6>⚠️ Chú ý:</h6>
                                                    <ul>
                                                        <li>Độ thành công 85%</li>
                                                        <li>Lấy ngay sau sinh</li>
                                                        <li>Bảo quản lạnh nếu gửi muộn</li>
                                                        <li>Phụ phí: +500.000 VNĐ</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="instruction-card">
                                                <div className="instruction-header">
                                                    <span className="instruction-icon">🩺</span>
                                                    <h5>Tinh trùng</h5>
                                                </div>

                                                <div className="instruction-steps">
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">1</span>
                                                        <p>Lấy mẫu tinh trùng vào ống nghiệm vô trùng</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">2</span>
                                                        <p>Đậy kín nắp ống, ghi rõ tên và thời gian</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">3</span>
                                                        <p>Bảo quản lạnh 2-8°C ngay lập tức</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">4</span>
                                                        <p>Gửi trong vòng 24 giờ, vận chuyển trong thùng lạnh</p>
                                                    </div>
                                                </div>

                                                <div className="instruction-tips special">
                                                    <h6>🔴 Lưu ý đặc biệt:</h6>
                                                    <ul>
                                                        <li>Độ thành công 90%</li>
                                                        <li>Phải bảo quản lạnh</li>
                                                        <li>Gửi trong 24h</li>
                                                        <li>Phụ phí: +2.000.000 VNĐ</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quy tắc chung */}
                                    <div className="general-rules">
                                        <h4>📋 Quy tắc chung khi lấy mẫu</h4>

                                        <div className="rules-grid">
                                            <div className="rule-card do">
                                                <h5>✅ NÊN LÀM</h5>
                                                <ul>
                                                    <li>Rửa tay sạch trước khi lấy mẫu</li>
                                                    <li>Ghi rõ tên, thời gian lấy mẫu</li>
                                                    <li>Bảo quản mẫu ở nơi khô ráo, thoáng mát</li>
                                                    <li>Gửi mẫu càng sớm càng tốt</li>
                                                    <li>Liên hệ hotline khi có thắc mắc</li>
                                                    <li>Sử dụng kit chuyên dụng của trung tâm</li>
                                                    <li>Tránh nhiễm chéo giữa các mẫu</li>
                                                </ul>
                                            </div>

                                            <div className="rule-card dont">
                                                <h5>❌ KHÔNG NÊN</h5>
                                                <ul>
                                                    <li>Lấy mẫu khi đang ốm, sốt cao</li>
                                                    <li>Truyền máu trong 3 tháng gần đây</li>
                                                    <li>Dùng túi nylon để bảo quản mẫu ướt</li>
                                                    <li>Để mẫu dưới ánh nắng trực tiếp</li>
                                                    <li>Rửa hoặc khử trùng mẫu trước khi gửi</li>
                                                    <li>Trộn lẫn mẫu của nhiều người</li>
                                                    <li>Sử dụng dụng cụ bẩn khi lấy mẫu</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FAQ Tab */}
                    {activeTab === 'faq' && (
                        <div className="content-tab">
                            <div className="faq-section">
                                <h3>5. Câu hỏi thường gặp về xét nghiệm ADN cha con</h3>

                                <div className="faq-categories">
                                    {/* Câu hỏi về dịch vụ */}
                                    <div className="faq-category">
                                        <h4>🔍 Câu hỏi về dịch vụ xét nghiệm</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">❓</span>
                                                    Xét nghiệm ADN cha con có chính xác không?
                                                </h5>
                                                <p>
                                                    Xét nghiệm ADN cha con tại DNA CHAIN có độ chính xác <strong>99.99%</strong> 
                                                    khi xác định mối quan hệ huyết thống. Chúng tôi sử dụng công nghệ hiện đại 
                                                    và phân tích 20-25 marker STR để đảm bảo kết quả chính xác nhất.
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">⏰</span>
                                                    Bao lâu có kết quả xét nghiệm?
                                                </h5>
                                                <p>
                                                    <strong>Gói tiêu chuẩn:</strong> 3-5 ngày làm việc<br/>
                                                    <strong>Gói làm nhanh:</strong> 6-24 tiếng<br/>
                                                    Thời gian được tính từ khi phòng lab nhận được mẫu đạt chất lượng.
                                                </p>
                                                <div className="faq-highlight">
                                                    <strong>Lưu ý:</strong> Đối với mẫu đặc biệt có thể cần thêm 1-2 ngày để xử lý.
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">💰</span>
                                                    Chi phí xét nghiệm ADN cha con bao nhiều?
                                                </h5>
                                                <p>
                                                    <strong>ADN Dân sự:</strong><br/>
                                                    • Gói tiêu chuẩn: 2.500.000 VNĐ<br/>
                                                    • Gói làm nhanh: 5.000.000 VNĐ<br/><br/>
                                                    <strong>ADN Hành chính:</strong><br/>
                                                    • Gói tiêu chuẩn: 3.500.000 VNĐ<br/>
                                                    • Gói làm nhanh: 6.000.000 VNĐ
                                                </p>
                                                <div className="faq-warning">
                                                    <strong>Phụ phí:</strong> Mẫu thay thế +500.000 VNĐ, mẫu đặc biệt +2.000.000 VNĐ
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🔒</span>
                                                    Thông tin có được bảo mật không?
                                                </h5>
                                                <p>
                                                    DNA CHAIN cam kết bảo mật thông tin khách hàng <strong>tuyệt đối</strong>. 
                                                    Chúng tôi có hệ thống bảo mật 3 lớp, mã hóa dữ liệu và không lưu trữ 
                                                    thông tin sau khi trả kết quả. Chỉ khách hàng mới có quyền truy cập kết quả.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Câu hỏi về mẫu phẩm */}
                                    <div className="faq-category">
                                        <h4>🧬 Câu hỏi về mẫu phẩm</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🤱</span>
                                                    Cuống rốn có thể dùng làm mẫu xét nghiệm được không?
                                                </h5>
                                                <p>
                                                    <strong>Có</strong>, cuống rốn là một trong những mẫu tốt nhất cho xét nghiệm ADN cha con. 
                                                    Cuống rốn chứa nhiều DNA và có độ thành công <strong>85%</strong>. Tuy nhiên, 
                                                    cần lấy trong vòng 24h sau sinh và bảo quản đúng cách.
                                                </p>
                                                <div className="faq-highlight">
                                                    <strong>Ưu điểm:</strong> Phù hợp cho trẻ sơ sinh, không cần lấy máu
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">💇</span>
                                                    Tóc cắt có sử dụng được không?
                                                </h5>
                                                <p>
                                                    <strong>Không</strong>, tóc cắt không chứa DNA nên không thể sử dụng. 
                                                    Chỉ có tóc <strong>nhổ có chân tóc</strong> (phần trắng ở gốc) mới có 
                                                    thể sử dụng cho xét nghiệm. Cần nhổ 10-15 sợi tóc từ nhiều vị trí.
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🩸</span>
                                                    Mẫu nào tốt nhất cho xét nghiệm?
                                                </h5>
                                                <p>
                                                    <strong>Thứ tự ưu tiên:</strong><br/>
                                                    1. <strong>Máu tĩnh mạch</strong> - 99.9% thành công<br/>
                                                    2. <strong>Niêm mạc miệng</strong> - 99% thành công<br/>
                                                    3. <strong>Cuống rốn</strong> - 85% thành công<br/>
                                                    4. <strong>Tóc có chân tóc</strong> - 85% thành công<br/>
                                                    5. <strong>Móng tay/chân</strong> - 75% thành công
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📦</span>
                                                    Làm sao để bảo quản và gửi mẫu?
                                                </h5>
                                                <p>
                                                    <strong>Mẫu khô</strong> (tóc, móng, cuống rốn): Gói trong giấy A4, để nơi khô ráo<br/>
                                                    <strong>Mẫu ướt</strong> (máu, nước bọt): Bảo quản lạnh 2-8°C<br/>
                                                    <strong>Gửi mẫu:</strong> Trong vòng 24-48h, sử dụng dịch vụ chuyển phát nhanh
                                                </p>
                                                <div className="faq-warning">
                                                    <strong>Tránh:</strong> Để mẫu dưới nắng, dùng túi nylon cho mẫu ướt
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Câu hỏi về quy trình */}
                                    <div className="faq-category">
                                        <h4>⚖️ Câu hỏi về quy trình pháp lý</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🏛️</span>
                                                    Khác biệt giữa ADN dân sự và hành chính?
                                                </h5>
                                                <p>
                                                    <strong>ADN Dân sự:</strong><br/>
                                                    • Mục đích cá nhân, tham khảo<br/>
                                                    • Lấy mẫu tại nhà hoặc trung tâm<br/>
                                                    • Không cần giấy tờ tùy thân<br/>
                                                    • Chấp nhận mọi loại mẫu<br/><br/>
                                                    <strong>ADN Hành chính:</strong><br/>
                                                    • Có giá trị pháp lý<br/>
                                                    • Bắt buộc lấy mẫu tại trung tâm<br/>
                                                    • Cần CMND/CCCD gốc<br/>
                                                    • Chỉ chấp nhận máu và nước bọt
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📋</span>
                                                    Kết quả ADN có được tòa án công nhận không?
                                                </h5>
                                                <p>
                                                    <strong>ADN Hành chính</strong> được tòa án và các cơ quan nhà nước công nhận 
                                                    vì được thực hiện theo đúng quy trình pháp lý, có giám sát và đóng dấu công chứng.
                                                </p>
                                                <div className="faq-highlight">
                                                    <strong>Sử dụng cho:</strong> Tranh chấp nuôi con, thừa kế, khai sinh, visa
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📞</span>
                                                    Liên hệ hỗ trợ khi có thắc mắc?
                                                </h5>
                                                <p>
                                                    Quý khách hàng có thể liên hệ qua:<br/>
                                                    • Hotline: 1900 636 648<br/>
                                                    • Email: support@dnachain.vn<br/>
                                                    • Trực tiếp tại văn phòng: 123 Đường ABC, Phường 4, Quận 3, TP.HCM
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FatherChildService;