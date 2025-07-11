import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Civil.css';

const CivilService = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(() => {
        return searchParams.get('tab') || 'overview';
    });

    // Chỉ update URL khi activeTab thay đổi, không gây re-render
    useEffect(() => {
        if (searchParams.get('tab') !== activeTab) {
            setSearchParams({ tab: activeTab }, { replace: true });
        }
    }, [activeTab, setSearchParams]);

    // Chỉ lắng nghe URL thay đổi từ bên ngoài (navigation, bookmark, etc.)
    useEffect(() => {
        const tabFromUrl = searchParams.get('tab');
        if (tabFromUrl && tabFromUrl !== activeTab) {
            setActiveTab(tabFromUrl);
        }
    }, [searchParams]);

    const handleTabChange = (tab) => {
        console.log('Changing tab to:', tab);
        setActiveTab(tab);
    };

    console.log('Current activeTab:', activeTab);

    return (
        <div className="civil-service-page">
            <Header />

            <section className="service-hero">
                <div className="hero-background-container">
                    <img src="https://xetnghiemadn.info/gen/wp-content/uploads/2014/07/ADN-nguoi-600x320.jpg" className="hero-background" alt="Hero Background" />
                </div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>Xét nghiệm ADN dân sự</h1>
                            <p className="hero-subtitle">
                                Xét nghiệm ADN dân sự với độ chính xác cao, bảo mật tuyệt đối và
                                tiện lợi cho khách hàng. Phục vụ mục đích cá nhân, tham khảo.
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
                            <img src="https://xetnghiemadn.info/gen/wp-content/uploads/2014/07/ADN-nguoi-600x320.jpg" alt="Civil DNA Testing" />
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

            <section className="civil-service-content">
                <div className="container">
                    {activeTab === 'overview' && (
                        <div className="content-tab">
                            <h2>1. Xét nghiệm ADN dân sự - Thông tin chi tiết</h2>

                            <div className="civil-dna-intro">
                                <h3>Xét nghiệm ADN dân sự là gì?</h3>
                                <p>
                                    Xét nghiệm ADN dân sự là dịch vụ xác định mối quan hệ huyết thống giữa các cá nhân
                                    nhằm phục vụ mục đích cá nhân, tham khảo. Kết quả xét nghiệm không có giá trị pháp lý
                                    nhưng có độ chính xác cao, giúp khách hàng hiểu rõ về mối quan hệ huyết thống.
                                </p>
                            </div>

                            <div className="civil-dna-features">
                                <h3>Đặc điểm của xét nghiệm ADN dân sự:</h3>
                                <div className="features-grid">
                                    <div className="feature-card">
                                        <div className="feature-icon">Tiện lợi</div>
                                        <ul>
                                            <li>Lấy mẫu tại nhà hoặc trung tâm</li>
                                            <li>Không cần giấy tờ tùy thân</li>
                                            <li>Hỗ trợ lấy mẫu 24/7</li>
                                            <li>Quy trình đơn giản, nhanh chóng</li>
                                        </ul>
                                    </div>
                                    <div className="feature-card">
                                        <div className="feature-icon">Bảo mật</div>
                                        <ul>
                                            <li>Thông tin khách hàng được bảo mật tuyệt đối</li>
                                            <li>Có thể sử dụng tên giả</li>
                                            <li>Kết quả chỉ gửi cho người đăng ký</li>
                                            <li>Không lưu trữ thông tin sau khi trả kết quả</li>
                                        </ul>
                                    </div>
                                    <div className="feature-card">
                                        <div className="feature-icon">Đa dạng mẫu</div>
                                        <ul>
                                            <li>Máu, nước bọt (mẫu chuẩn)</li>
                                            <li>Tóc có chân tóc, móng tay/chân</li>
                                            <li>Cuống rốn (cho trẻ sơ sinh)</li>
                                            <li>Mẫu đặc biệt (dao cạo, bàn chải răng)</li>
                                        </ul>
                                    </div>
                                    <div className="feature-card">
                                        <div className="feature-icon">Tiết kiệm</div>
                                        <ul>
                                            <li>Giá cả cạnh tranh</li>
                                            <li>Miễn phí lấy mẫu tại nhà (nội thành)</li>
                                            <li>Không phát sinh chi phí ẩn</li>
                                            <li>Hỗ trợ trả góp cho trường hợp khó khăn</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="civil-dna-applications">
                                <h3>Ứng dụng của xét nghiệm ADN dân sự:</h3>
                                <div className="applications-list">
                                    <div className="application-item">
                                        <h4>Xác minh quan hệ gia đình</h4>
                                        <p>Tìm hiểu mối quan hệ huyết thống giữa các thành viên trong gia đình, đặc biệt khi có nghi ngờ về nguồn gốc sinh học.</p>
                                    </div>
                                    <div className="application-item">
                                        <h4>Truy tìm người thân</h4>
                                        <p>Xác định mối quan hệ huyết thống khi tìm kiếm người thân thất lạc, đặc biệt trong trường hợp nhận nuôi hoặc ly tán từ nhỏ.</p>
                                    </div>
                                    <div className="application-item">
                                        <h4>Y tế gia đình</h4>
                                        <p>Tìm hiểu nguy cơ mắc các bệnh di truyền, lập kế hoạch sinh sản và chăm sóc sức khỏe cho con cháu.</p>
                                    </div>
                                    <div className="application-item">
                                        <h4>Giải tỏa nghi ngờ</h4>
                                        <p>Giải quyết những thắc mắc, nghi ngờ về mối quan hệ huyết thống một cách khoa học và chính xác.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="civil-dna-limitations">
                                <h3>Hạn chế của xét nghiệm ADN dân sự:</h3>
                                <div className="limitations-grid">
                                    <div className="limitation-card">
                                        <div className="limitation-icon">Pháp lý</div>
                                        <h4>Không có giá trị pháp lý</h4>
                                        <p>Kết quả không thể sử dụng trong các thủ tục pháp lý, tranh chấp tài sản, hoặc tại tòa án.</p>
                                    </div>
                                    <div className="limitation-card">
                                        <div className="limitation-icon">Tham khảo</div>
                                        <h4>Chỉ mang tính tham khảo</h4>
                                        <p>Kết quả phục vụ mục đích cá nhân, giúp khách hàng hiểu rõ về mối quan hệ huyết thống.</p>
                                    </div>
                                    <div className="limitation-card">
                                        <div className="limitation-icon">Lặp lại</div>
                                        <h4>Có thể cần xét nghiệm lại</h4>
                                        <p>Nếu cần sử dụng cho mục đích pháp lý, phải thực hiện lại xét nghiệm ADN hành chính.</p>
                                    </div>
                                </div>
                            </div>

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
                        </div>
                    )}

                    {/* Types Tab */}
                    {activeTab === 'types' && (
                        <div className="content-tab">
                            <div className="process-section">
                                <h3>2. Quy trình xét nghiệm ADN dân sự</h3>

                                {/* Accuracy Info */}
                                <div className="accuracy-info">
                                    <div className="accuracy-card">
                                        <div className="accuracy-icon">🔬</div>
                                        <h3>Độ chính xác 99.99%</h3>
                                        <p>Công nghệ xét nghiệm ADN hiện đại với độ chính xác lên đến <strong>99,999%</strong> trong việc xác định mối quan hệ huyết thống dành cho dân sự.</p>
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
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Samples Tab*/}
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
                                <h3>5. Câu hỏi thường gặp về xét nghiệm ADN dân sự</h3>

                                <div className="faq-categories">
                                    {/* Câu hỏi về dịch vụ xét nghiệm dân sự */}
                                    <div className="faq-category">
                                        <h4>🔍 Câu hỏi về xét nghiệm ADN dân sự</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">❓</span>
                                                    Xét nghiệm ADN dân sự có chính xác không?
                                                </h5>
                                                <p>
                                                    Xét nghiệm ADN dân sự tại DNA CHAIN có độ chính xác <strong>99.99%</strong>
                                                    khi xác định mối quan hệ huyết thống. Chúng tôi sử dụng công nghệ
                                                    hiện đại và phân tích 20-25 marker STR để đảm bảo kết quả chính xác cao nhất.
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">⏰</span>
                                                    Bao lâu có kết quả xét nghiệm ADN dân sự?
                                                </h5>
                                                <p>
                                                    <strong>Gói tiêu chuẩn:</strong> 3-5 ngày làm việc<br />
                                                    <strong>Gói làm nhanh:</strong> 6-24 tiếng<br />
                                                    Thời gian được tính từ khi phòng lab nhận được mẫu đạt chất lượng.
                                                </p>
                                                <div className="faq-highlight">
                                                    <strong>Lưu ý:</strong> Mẫu đặc biệt có thể cần thêm 1-2 ngày để xử lý.
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">💰</span>
                                                    Chi phí xét nghiệm ADN dân sự bao nhiều?
                                                </h5>
                                                <p>
                                                    Còn phụ thuộc vào loại xét nghiệm là cha con, mẹ con, ông cháu,...<br />
                                                </p>
                                                <div className="faq-highlight">
                                                    <strong>Ưu đãi:</strong> Miễn phí lấy mẫu tại nhà (nội thành)
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🔒</span>
                                                    Thông tin có được bảo mật tuyệt đối không?
                                                </h5>
                                                <p>
                                                    DNA CHAIN cam kết bảo mật thông tin khách hàng <strong>tuyệt đối</strong>.
                                                    Với xét nghiệm dân sự, bạn có thể:<br />
                                                    • Sử dụng tên giả khi đăng ký<br />
                                                    • Không cần xuất trình giấy tờ tùy thân<br />
                                                    • Kết quả chỉ gửi cho người đăng ký<br />
                                                    • Dữ liệu được xóa sau khi trả kết quả
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🏠</span>
                                                    Có thể lấy mẫu tại nhà không?
                                                </h5>
                                                <p>
                                                    <strong>Có</strong>, xét nghiệm ADN dân sự cho phép lấy mẫu tại nhà hoàn toàn.<br />
                                                    • <strong>Miễn phí</strong> trong khu vực nội thành<br />
                                                    • Nhân viên sẽ mang kit chuyên dụng đến tận nơi<br />
                                                    • Hướng dẫn lấy mẫu chi tiết<br />
                                                    • Thu mẫu và vận chuyển về lab an toàn
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Câu hỏi về mẫu phẩm dân sự */}
                                    <div className="faq-category">
                                        <h4>🧬 Câu hỏi về mẫu phẩm</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🩸</span>
                                                    ADN dân sự chấp nhận những loại mẫu nào?
                                                </h5>
                                                <p>
                                                    Xét nghiệm ADN dân sự chấp nhận <strong>TẤT CẢ</strong> loại mẫu:<br />
                                                    <strong>Mẫu chuẩn:</strong> Máu, nước bọt/niêm mạc miệng<br />
                                                    <strong>Mẫu thay thế:</strong> Tóc có chân, móng tay/chân, cuống rốn<br />
                                                    <strong>Mẫu đặc biệt:</strong> Dao cạo, bàn chải răng, đầu lọc thuốc, tinh trùng
                                                </p>
                                                <div className="faq-highlight">
                                                    <strong>Khuyến nghị:</strong> Nước bọt - dễ lấy, không đau, độ thành công 99%
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🤱</span>
                                                    Cuống rốn có phù hợp cho xét nghiệm dân sự không?
                                                </h5>
                                                <p>
                                                    <strong>Rất phù hợp!</strong> Cuống rốn là lựa chọn tuyệt vời cho trẻ sơ sinh:<br />
                                                    • Độ thành công: <strong>85%</strong><br />
                                                    • Không cần lấy máu từ trẻ<br />
                                                    • Lấy trong vòng 24h sau sinh<br />
                                                    • Bảo quản khô hoặc ngâm cồn 70%<br />
                                                    • Phụ phí: +500.000 VNĐ
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">💇</span>
                                                    Tóc cắt có sử dụng được cho ADN dân sự không?
                                                </h5>
                                                <p>
                                                    <strong>Không</strong>, tóc cắt không chứa DNA. Chỉ có tóc <strong>nhổ có chân tóc</strong>
                                                    (phần trắng ở gốc) mới sử dụng được:<br />
                                                    • Nhổ 10-15 sợi từ nhiều vị trí<br />
                                                    • Tóc nhuộm, uốn vẫn dùng được<br />
                                                    • Độ thành công: 85%<br />
                                                    • Phụ phí: +500.000 VNĐ
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📦</span>
                                                    Làm sao bảo quản mẫu tại nhà?
                                                </h5>
                                                <p>
                                                    <strong>Mẫu khô</strong> (tóc, móng, cuống rốn): Để trong giấy A4, nơi khô ráo<br />
                                                    <strong>Mẫu ướt</strong> (máu, nước bọt): Bảo quản lạnh 2-8°C<br />
                                                    <strong>Gửi mẫu:</strong> Càng sớm càng tốt, tối đa 48h<br />
                                                    <strong>Tránh:</strong> Ánh nắng trực tiếp, túi nylon cho mẫu ướt
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🔬</span>
                                                    Mẫu đặc biệt có độ tin cậy như thế nào?
                                                </h5>
                                                <p>
                                                    Mẫu đặc biệt phù hợp khi không lấy được mẫu chuẩn:<br />
                                                    • <strong>Dao cạo râu:</strong> 60% thành công<br />
                                                    • <strong>Bàn chải răng:</strong> 65% thành công<br />
                                                    • <strong>Đầu lọc thuốc:</strong> 50% thành công<br />
                                                    • <strong>Tinh trùng:</strong> 90% thành công<br />
                                                    Phụ phí: +2.000.000 VNĐ/mẫu
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Câu hỏi về quy trình và pháp lý */}
                                    <div className="faq-category">
                                        <h4>⚖️ Câu hỏi về quy trình và pháp lý</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🏛️</span>
                                                    ADN dân sự khác ADN hành chính như thế nào?
                                                </h5>
                                                <p>
                                                    <strong>ADN Dân sự (mục đích cá nhân):</strong><br />
                                                    • Không có giá trị pháp lý<br />
                                                    • Lấy mẫu tại nhà hoặc trung tâm<br />
                                                    • Không cần giấy tờ tùy thân<br />
                                                    • Chấp nhận mọi loại mẫu<br />
                                                    • Bảo mật tuyệt đối, có thể dùng tên giả<br />
                                                    <strong>ADN Hành chính (có giá trị pháp lý):</strong><br />
                                                    • Sử dụng được tại tòa án<br />
                                                    • Bắt buộc lấy mẫu tại trung tâm<br />
                                                    • Cần CMND/CCCD gốc<br />
                                                    • Chỉ chấp nhận máu và nước bọt<br />
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📋</span>
                                                    Kết quả ADN dân sự có thể dùng làm bằng chứng pháp lý không?
                                                </h5>
                                                <p>
                                                    <strong>Không</strong>, kết quả ADN dân sự chỉ mang tính chất tham khảo cá nhân:<br />
                                                    • Không được tòa án công nhận<br />
                                                    • Không dùng cho thủ tục khai sinh<br />
                                                    • Không dùng cho tranh chấp thừa kế<br />
                                                    • Chỉ giúp bạn hiểu rõ mối quan hệ huyết thống
                                                </p>
                                                <div className="faq-warning">
                                                    <strong>Lưu ý:</strong> Nếu cần giá trị pháp lý, phải làm ADN hành chính
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🛡️</span>
                                                    Có cam kết gì nếu xét nghiệm không thành công?
                                                </h5>
                                                <p>
                                                    DNA CHAIN cam kết với khách hàng:<br />
                                                    • <strong>Xét nghiệm lại MIỄN PHÍ</strong> nếu mẫu không đạt chất lượng<br />
                                                    • <strong>Hoàn tiền 100%</strong> nếu không đưa ra được kết quả<br />
                                                    • Tư vấn miễn phí về cách lấy mẫu tốt hơn<br />
                                                    • Hỗ trợ lấy mẫu lại tận nơi nếu cần
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📞</span>
                                                    Liên hệ tư vấn và hỗ trợ như thế nào?
                                                </h5>
                                                <p>
                                                    Quý khách có thể liên hệ DNA CHAIN qua:<br />
                                                    • <strong>Hotline:</strong> 1900 636 648 (24/7)<br />
                                                    • <strong>Email:</strong> support@dnachain.vn<br />
                                                    • <strong>Website:</strong> www.dnachain.vn<br />
                                                    • <strong>Địa chỉ:</strong> 123 Đường ABC, Phường 4, Quận 3, TP.HCM<br />
                                                    • <strong>Tư vấn:</strong> Miễn phí trước khi quyết định làm xét nghiệm
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Câu hỏi về trường hợp đặc biệt */}
                                    <div className="faq-category">
                                        <h4>🔍 Trường hợp đặc biệt</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">👶</span>
                                                    Có thể xét nghiệm khi trẻ còn trong bụng mẹ không?
                                                </h5>
                                                <p>
                                                    <strong>Có</strong>, xét nghiệm ADN thai nhi (NIPT) có thể thực hiện từ tuần thứ 9 của thai kỳ:<br />
                                                    • Lấy máu mẹ, phân tích DNA thai nhi<br />
                                                    • An toàn, không xâm lấn<br />
                                                    • Độ chính xác: 99%<br />
                                                    • Chi phí: 16.000.000 VNĐ<br />
                                                    • Thời gian: 10-14 ngày
                                                </p>
                                                <div className="faq-highlight">
                                                    <strong>Lưu ý:</strong> Cần có mẫu so sánh từ người cha nghi ngờ
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">⚰️</span>
                                                    Có thể xét nghiệm với người đã mất không?
                                                </h5>
                                                <p>
                                                    <strong>Có thể</strong>, tùy vào thời gian và điều kiện bảo quản:<br />
                                                    • <strong>Mẫu từ người mất:</strong> Tóc, móng, mô cơ thể<br />
                                                    • <strong>Thời gian:</strong> Càng sớm càng tốt sau khi mất<br />
                                                    • <strong>Bảo quản:</strong> Đông lạnh hoặc khô ráo<br />
                                                    • <strong>Độ thành công:</strong> 30-70% tùy điều kiện<br />
                                                    • <strong>Chi phí:</strong> Tăng 50-100% do khó xử lý
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🌍</span>
                                                    Có nhận mẫu từ tỉnh xa không?
                                                </h5>
                                                <p>
                                                    <strong>Có</strong>, DNA CHAIN nhận mẫu từ toàn quốc:<br />
                                                    • Gửi kit lấy mẫu qua bưu điện<br />
                                                    • Hướng dẫn chi tiết qua điện thoại<br />
                                                    • Khách hàng gửi mẫu về lab<br />
                                                    • Bao bì chuyên dụng đảm bảo chất lượng mẫu
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

export default CivilService;