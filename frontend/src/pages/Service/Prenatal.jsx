import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Prenatal.css';

const PrenatalService = () => {
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
        <div className="prenatal-service-page">
            <Header />

            {/* Hero Section */}
            <section className="service-hero">
                <div className="hero-background-container">
                    <img src="https://www.vinmec.com/static/uploads/20191118_111531_540345_bao_thai_max_1800x1800_jpg_fa425883b7.jpg" className="hero-background" alt="Prenatal DNA Testing" />
                </div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>Xét nghiệm ADN Thai nhi không xâm lấn</h1>
                            <p className="hero-subtitle">
                                Xác định huyết thống cha-con an toàn trong thai kỳ với độ chính xác 99.9%.
                                Không cần chọc ối, không ảnh hưởng đến thai nhi và mẹ bầu
                            </p>
                            <div className="hero-stats">
                                <div className="stat-item">
                                    <span className="stat-number">99.9%</span>
                                    <span className="stat-label">Độ chính xác</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">10+</span>
                                    <span className="stat-label">Tuần thai</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">10-14</span>
                                    <span className="stat-label">Ngày có kết quả</span>
                                </div>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img
                                src="https://www.vinmec.com/static/uploads/20191118_111531_540345_bao_thai_max_1800x1800_jpg_fa425883b7.jpg" className="hero-background"
                                alt="Prenatal DNA Testing"
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
                            className={`nav-tab ${activeTab === 'process' ? 'active' : ''}`}
                            onClick={() => handleTabChange('process')}
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
            <section className="prenatal-service-content">
                <div className="container">

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="content-tab">
                            <h2>1. Xét nghiệm ADN Thai nhi không xâm lấn - Xác định huyết thống cha con</h2>
                            <p>
                                Xét nghiệm ADN thai nhi không xâm lấn là phương pháp hiện đại, an toàn giúp xác định quan hệ huyết thống cha con ngay từ tuần thai thứ 10 mà không gây ảnh hưởng đến sức khỏe mẹ và thai nhi.
                            </p>


                            <div className="pricing-section">
                                <h3>Chi phí xét nghiệm ADN Thai nhi không xâm lấn dành cho dân sự:</h3>

                                <div className="pricing-preview">
                                    <div className="pricing-preview-table">
                                        <div className="pricing-row pricing-header">
                                            <div className="pricing-cell">Quy cách</div>
                                            <div className="pricing-cell">Thời gian</div>
                                            <div className="pricing-cell">Chi phí (VNĐ)</div>
                                            <div className="pricing-cell">Phụ phí mẫu thứ 3</div>
                                        </div>

                                        <div className="pricing-row">
                                            <div className="pricing-cell">Tiêu chuẩn</div>
                                            <div className="pricing-cell">10 - 14 ngày</div>
                                            <div className="pricing-cell">16.000.000</div>
                                            <div className="pricing-cell extra-sample-cell">4.500.000</div>
                                        </div>
                                        <div className="pricing-row">
                                            <div className="pricing-cell">Làm nhanh</div>
                                            <div className="pricing-cell">7 - 10 ngày</div>
                                            <div className="pricing-cell">22.000.000</div>
                                            <div className="pricing-cell extra-sample-cell">5.500.000</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="note-section">
                                    <h4>Lưu ý:</h4>
                                    <ul>
                                        <li>Xét nghiệm chỉ thực hiện khi thai nhi đã <strong>≥ 10 tuần</strong></li>
                                        <li>Cần có kết quả siêu âm xác định tuổi thai trước khi thực hiện</li>
                                        <li>Mẫu máu mẹ bầu: 10ml máu tĩnh mạch</li>
                                        <li>Mẫu người cha nghi vấn: máu tĩnh mạch, nước bọt hoặc các mẫu khác</li>
                                        <li>Kết quả mang tính chất tham khảo y tế, không có giá trị pháp lý</li>
                                    </ul>
                                </div>

                                <div className="process-advantages-grid">
                                    <h4>Ưu điểm của xét nghiệm ADN Thai nhi không xâm lấn</h4>
                                    <div className="advantage-grid">
                                        <div className="advantage-col">
                                            <h4>✔️ An toàn tuyệt đối</h4>
                                            <p>Không xâm lấn, chỉ lấy máu tĩnh mạch mẹ bầu, không ảnh hưởng đến thai nhi và mẹ.</p>
                                        </div>
                                        <div className="advantage-col">
                                            <h4>✔️ Độ chính xác cao</h4>
                                            <p>Áp dụng công nghệ NGS hiện đại, kết quả chính xác đến 99.9%.</p>
                                        </div>
                                        <div className="advantage-col">
                                            <h4>✔️ Thực hiện sớm</h4>
                                            <p>Có thể thực hiện từ tuần thai thứ 10, giúp chủ động chuẩn bị tâm lý và kế hoạch.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="overview-description">
                                <h3>Chi phí xét nghiệm ADN Thai nhi tại DNA CHAIN bao gồm:</h3>
                                <ul>
                                    <li>Phí lấy mẫu máu mẹ bầu tại trung tâm hoặc tại nhà</li>
                                    <li>Chi phí xét nghiệm và phân tích mẫu bằng công nghệ NGS hiện đại</li>
                                    <li>Phí tách và phân tích ADN thai nhi từ máu mẹ</li>
                                    <li>Phí so sánh và xác định huyết thống với ADN người cha</li>
                                    <li>Phí xuất báo cáo kết quả chi tiết kèm tư vấn chuyên môn</li>
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
                                            <span>Độ chính xác <strong>99.9%</strong> với công nghệ hiện đại</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="note-box important">
                                    <h4>Lưu ý quan trọng về xét nghiệm ADN Thai nhi:</h4>
                                    <p>
                                        Đây là xét nghiệm y tế mang tính chất tham khảo, không có giá trị pháp lý.
                                        Kết quả giúp xác định huyết thống cha-con trong thai kỳ với mục đích cá nhân,
                                        hỗ trợ gia đình trong việc chuẩn bị tâm lý và các quyết định cá nhân.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Process Tab */}
                    {activeTab === 'process' && (
                        <div className="tab-content">
                            <div className="process-section">
                                <h3 className="process-title">2. Quy trình xét nghiệm ADN Thai nhi không xâm lấn</h3>

                                <div className="accuracy-info">
                                    <div className="accuracy-card">
                                        <div className="accuracy-icon">🔬</div>
                                        <h3>Độ chính xác 99.99%</h3>
                                        <p>Công nghệ xét nghiệm ADN hiện đại với độ chính xác lên đến <strong>99,999%</strong> trong việc xác định mối quan hệ huyết thống thai nhi.</p>
                                    </div>
                                </div>

                                <div className="process-type">
                                    <h4>🏠 Quy trình ADN Thai nhi</h4>
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
                                                <p>Lấy 10ml máu tĩnh mạch của mẹ bầu vào ống EDTA tại cơ sở y tế/trung tâm xét nghiệm.</p>
                                                <p>Người cha lấy mẫu máu tĩnh mạch (khuyến nghị), nước bọt, tóc có chân tóc, móng tay/chân hoặc mẫu đặc biệt.</p>
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
                                                <h5>Trả kết quả & Tư vấn</h5>
                                                <p>Kết quả được trả bảo mật, chi tiết và rõ ràng. Thời gian trả kết quả từ 7-14 ngày làm việc tùy gói dịch vụ.Gửi kết quả qua email/SMS hoặc nhận trực tiếp. Bảo mật tuyệt đối.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Samples Tab */}
                    {activeTab === 'samples' && (
                        <div className="content-tab">


                            <div className="sample-types-section">
                                <h3>3. Mẫu phẩm xét nghiệm ADN Thai nhi không xâm lấn</h3>
                                <div className="sample-categories">
                                    <div className="sample-category">
                                        <h4>🤰 Mẫu của mẹ bầu</h4>
                                        <div className="samples-grid">
                                            <div className="sample-item-card">
                                                <div className="sample-icon">🩸</div>
                                                <h5>Máu tĩnh mạch</h5>
                                                <p><strong>Lượng cần:</strong> 10ml máu tĩnh mạch</p>
                                                <p><strong>Điều kiện:</strong> Thai ≥ 10 tuần, không cần nhịn ăn</p>
                                                <p><strong>Lưu ý:</strong> Bảo quản lạnh 2-8°C, gửi trong 48h</p>
                                                <span className="price-tag">Bắt buộc</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sample-category">
                                        <h4>👨 Mẫu của người cha nghi vấn</h4>
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
                                </div>

                                <div className="sample-notes">
                                    <h4>📝 Lưu ý quan trọng về mẫu phẩm:</h4>
                                    <div className="notes-grid">
                                        <div className="note-item">
                                            <span className="note-icon">🤰</span>
                                            <p>Mẫu máu mẹ bầu là bắt buộc và không thể thay thế</p>
                                        </div>
                                        <div className="note-item">
                                            <span className="note-icon">👨</span>
                                            <p>Ưu tiên mẫu máu hoặc nước bọt của người cha để độ chính xác cao nhất</p>
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

                    {/* Collection Tab */}
                    {activeTab === 'collection' && (
                        <div className="content-tab">


                            <div className="sample-collection-instructions">
                                <h3>4. Hướng dẫn lấy mẫu xét nghiệm ADN Thai nhi</h3>
                                <div className="instruction-categories">
                                    <div className="instruction-category">
                                        <h4>🤰 Hướng dẫn lấy mẫu mẹ bầu</h4>

                                        <div className="instruction-grid">
                                            <div className="instruction-card">
                                                <div className="instruction-header">
                                                    <span className="instruction-icon">🩸</span>
                                                    <h5>Máu tĩnh mạch mẹ bầu</h5>
                                                </div>

                                                <div className="instruction-steps">
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">1</span>
                                                        <p>Đảm bảo thai nhi đã đủ 10 tuần theo kết quả siêu âm</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">2</span>
                                                        <p>Không cần nhịn ăn, có thể uống nước và ăn bình thường</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">3</span>
                                                        <p>Lấy 10ml máu tĩnh mạch vào ống chứa EDTA màu tím</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">4</span>
                                                        <p>Lắc đều 8-10 lần, bảo quản lạnh</p>
                                                    </div>
                                                </div>

                                                <div className="instruction-tips">
                                                    <h6>💡 Lưu ý quan trọng:</h6>
                                                    <ul>
                                                        <li>Cần có kết quả siêu âm xác định tuổi thai</li>
                                                        <li>Không lấy mẫu khi mẹ bầu bị sốt cao</li>
                                                        <li>Tránh để máu đông trong ống</li>
                                                        <li>Ghi rõ tuổi thai và thông tin liên hệ</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="instruction-category">
                                        <h4>👨 Hướng dẫn lấy mẫu người cha nghi vấn</h4>

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

                                        </div>
                                    </div>

                                    <div className="general-rules">
                                        <h4>📋 Quy tắc chung khi lấy mẫu</h4>

                                        <div className="rules-grid">
                                            <div className="rule-card do">
                                                <h5>✅ NÊN LÀM</h5>
                                                <ul>
                                                    <li>Kiểm tra tuổi thai trước khi lấy mẫu</li>
                                                    <li>Rửa tay sạch trước khi lấy mẫu</li>
                                                    <li>Ghi rõ thông tin trên mẫu</li>
                                                    <li>Bảo quản mẫu đúng cách</li>
                                                    <li>Gửi mẫu trong thời gian quy định</li>
                                                    <li>Liên hệ hotline khi có thắc mắc</li>
                                                </ul>
                                            </div>

                                            <div className="rule-card dont">
                                                <h5>❌ KHÔNG NÊN</h5>
                                                <ul>
                                                    <li>Lấy mẫu khi thai khi chưa đủ 10 tuần tuổi</li>
                                                    <li>Lấy mẫu khi mẹ bầu bị sốt cao</li>
                                                    <li>Để mẫu máu đông trong ống</li>
                                                    <li>Bảo quản mẫu sai cách</li>
                                                    <li>Trộn lẫn mẫu của nhiều người</li>
                                                    <li>Gửi mẫu quá thời hạn</li>
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
                                <h3>5. Câu hỏi thường gặp về xét nghiệm ADN Thai nhi</h3>
                                <div className="faq-categories">
                                    <div className="faq-category">
                                        <h4>🔍 Câu hỏi về xét nghiệm</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">❓</span>
                                                    Xét nghiệm ADN Thai nhi có an toàn không?
                                                </h5>
                                                <p>
                                                    Hoàn toàn an toàn cho cả mẹ và thai nhi. Đây là xét nghiệm <strong>không xâm lấn</strong>,
                                                    chỉ cần lấy máu tĩnh mạch mẹ bầu, không cần chọc ối hay sinh thiết nhau thai.
                                                    Không có nguy cơ sảy thai hay biến chứng.
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📅</span>
                                                    Khi nào có thể thực hiện xét nghiệm?
                                                </h5>
                                                <p>
                                                    Xét nghiệm có thể thực hiện từ <strong>tuần thai thứ 10</strong> trở đi.
                                                    Lúc này nồng độ ADN thai nhi tự do trong máu mẹ đã đủ để phân tích chính xác.
                                                    Cần có kết quả siêu âm xác định tuổi thai trước khi thực hiện.
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🎯</span>
                                                    Độ chính xác của xét nghiệm như thế nào?
                                                </h5>
                                                <p>
                                                    Độ chính xác lên đến <strong>99.9%</strong> khi xác định mối quan hệ huyết thống
                                                    cha-con. Sử dụng công nghệ NGS (Next Generation Sequencing) hiện đại nhất
                                                    để tách và phân tích ADN thai nhi từ máu mẹ.
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">⏰</span>
                                                    Bao lâu có kết quả xét nghiệm?
                                                </h5>
                                                <p>
                                                    <strong>Gói tiêu chuẩn:</strong> 10-14 ngày làm việc<br />
                                                    <strong>Gói khẩn cấp:</strong> 7-10 ngày làm việc<br />
                                                    Thời gian tính từ khi phòng lab nhận được mẫu đạt chất lượng.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="faq-category">
                                        <h4>🧬 Câu hỏi về mẫu phẩm</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🤰</span>
                                                    Mẹ bầu cần lấy mẫu gì?
                                                </h5>
                                                <p>
                                                    Chỉ cần lấy <strong>10ml máu tĩnh mạch</strong> của mẹ bầu. Không cần nhịn ăn,
                                                    có thể ăn uống bình thường. Máu được bảo quản lạnh 2-8°C và gửi trong vòng 48 giờ.
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">👨</span>
                                                    Người cha cần lấy mẫu gì?
                                                </h5>
                                                <p>
                                                    Có thể lấy các loại mẫu sau:<br />
                                                    • <strong>Máu tĩnh mạch</strong> (khuyến nghị - 99.9% thành công)<br />
                                                    • <strong>Nước bọt</strong> (phổ biến - 99% thành công)<br />
                                                    • <strong>Tóc có chân tóc</strong> (85% thành công, phụ phí)<br />
                                                    • <strong>Móng tay/chân</strong> (75% thành công, phụ phí)
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🏠</span>
                                                    Có thể lấy mẫu tại nhà không?
                                                </h5>
                                                <p>
                                                    <strong>Có</strong>, DNA CHAIN hỗ trợ lấy mẫu tại nhà trong nội thành.
                                                    Nhân viên y tế sẽ đến tận nơi lấy mẫu máu mẹ bầu và hướng dẫn lấy mẫu người cha.
                                                    Dịch vụ này miễn phí trong nội thành.
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">❄️</span>
                                                    Làm sao bảo quản mẫu?
                                                </h5>
                                                <p>
                                                    <strong>Mẫu máu:</strong> Bảo quản lạnh 2-8°C, gửi trong 48h<br />
                                                    <strong>Mẫu nước bọt:</strong> Để khô tự nhiên, bảo quản nơi khô ráo<br />
                                                    <strong>Mẫu tóc/móng:</strong> Gói trong giấy A4, để nơi khô ráo<br />
                                                    Tuyệt đối không để mẫu dưới ánh nắng trực tiếp.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="faq-category">
                                        <h4>⚖️ Câu hỏi về pháp lý</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📋</span>
                                                    Kết quả có giá trị pháp lý không?
                                                </h5>
                                                <p>
                                                    Kết quả xét nghiệm ADN Thai nhi <strong>mang tính chất tham khảo y tế</strong>,
                                                    không có giá trị pháp lý. Mục đích chính là giúp gia đình xác định huyết thống
                                                    trong thai kỳ để có sự chuẩn bị tâm lý và các quyết định cá nhân phù hợp.
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🔒</span>
                                                    Thông tin có được bảo mật không?
                                                </h5>
                                                <p>
                                                    DNA CHAIN cam kết bảo mật thông tin khách hàng <strong>tuyệt đối</strong>.
                                                    Hệ thống bảo mật 3 lớp, mã hóa dữ liệu và không lưu trữ thông tin sau khi
                                                    trả kết quả. Chỉ khách hàng có quyền truy cập kết quả.
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">💰</span>
                                                    Chi phí xét nghiệm bao nhiều?
                                                </h5>
                                                <p>
                                                    <strong>Huyết thống cơ bản:</strong> 15.000.000 VNĐ<br />
                                                    <strong>Huyết thống + Giới tính:</strong> 17.000.000 VNĐ<br />
                                                    <strong>Gói khẩn cấp:</strong> 20.000.000 VNĐ<br />
                                                    Phụ phí cho mẫu thay thế: +500.000 VNĐ<br />
                                                    Phụ phí cho mẫu đặc biệt: +2.000.000 VNĐ
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📞</span>
                                                    Liên hệ hỗ trợ khi có thắc mắc?
                                                </h5>
                                                <p>
                                                    Hotline: <strong>1900 636 648</strong><br />
                                                    Email: <strong>support@dnachain.vn</strong><br />
                                                    Địa chỉ: 123 Đường ABC, Phường 4, Quận 3, TP.HCM<br />
                                                    Hỗ trợ 24/7 với đội ngũ chuyên viên tư vấn.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section >

            <Footer />
        </div >
    );
};


export default PrenatalService;