import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Civil.css';

const LegalService = () => {
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
                            <h1>Xét nghiệm ADN hành chính</h1>
                            <p className="hero-subtitle">
                                Xét nghiệm ADN hành chính có giá trị pháp lý cao, được công nhận tại tòa án và
                                các cơ quan pháp lý. Thực hiện theo quy trình nghiêm ngặt và chuẩn mực.
                            </p>
                            <div className="hero-stats">
                                <div className="stat-item">
                                    <span className="stat-number">99.99%</span>
                                    <span className="stat-label">Độ chính xác</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">5 - 7</span>
                                    <span className="stat-label">Ngày có kết quả</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">3,000+</span>
                                    <span className="stat-label">Ca xét nghiệm</span>
                                </div>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img src="https://xetnghiemadn.info/gen/wp-content/uploads/2014/07/ADN-nguoi-600x320.jpg" alt="Legal DNA Testing" />
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
                            <h2>1. Xét nghiệm ADN hành chính - Thông tin chi tiết</h2>

                            <div className="civil-dna-intro">
                                <h3>Xét nghiệm ADN hành chính là gì?</h3>
                                <p>
                                    Xét nghiệm ADN hành chính là dịch vụ xác định mối quan hệ huyết thống có giá trị pháp lý,
                                    được công nhận bởi tòa án và các cơ quan pháp lý. Kết quả có thể sử dụng trong các thủ tục
                                    pháp lý như khai sinh, thừa kế, tranh chấp và các vụ kiện tại tòa.
                                </p>
                            </div>

                            <div className="civil-dna-features">
                                <h3>Đặc điểm của xét nghiệm ADN hành chính:</h3>
                                <div className="features-grid">
                                    <div className="feature-card">
                                        <div className="feature-icon">Pháp lý</div>
                                        <ul>
                                            <li>Có giá trị pháp lý được công nhận</li>
                                            <li>Sử dụng được tại tòa án</li>
                                            <li>Phục vụ thủ tục hành chính</li>
                                            <li>Tuân thủ quy trình nghiêm ngặt</li>
                                        </ul>
                                    </div>
                                    <div className="feature-card">
                                        <div className="feature-icon">Chính xác</div>
                                        <ul>
                                            <li>Độ chính xác 99.99%</li>
                                            <li>Phân tích 20-25 marker STR</li>
                                            <li>Công nghệ hiện đại nhất</li>
                                            <li>Kiểm tra chéo kết quả</li>
                                        </ul>
                                    </div>
                                    <div className="feature-card">
                                        <div className="feature-icon">Chuẩn mực</div>
                                        <ul>
                                            <li>Quy trình ISO 17025</li>
                                            <li>Bắt buộc có mặt tại trung tâm</li>
                                            <li>Kiểm tra giấy tờ tùy thân</li>
                                            <li>Chụp ảnh và lấy vân tay</li>
                                        </ul>
                                    </div>
                                    <div className="feature-card">
                                        <div className="feature-icon">Uy tín</div>
                                        <ul>
                                            <li>Được Bộ Y tế cấp phép</li>
                                            <li>Báo cáo có chữ ký số</li>
                                            <li>Có thể xác minh trực tuyến</li>
                                            <li>Lưu trữ lâu dài theo quy định</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="civil-dna-applications">
                                <h3>Ứng dụng của xét nghiệm ADN hành chính:</h3>
                                <div className="applications-list">
                                    <div className="application-item">
                                        <h4>Thủ tục khai sinh</h4>
                                        <p>Xác định cha/mẹ để làm giấy khai sinh cho trẻ em, đặc biệt trong trường hợp sinh con ngoài giá thú hoặc không rõ cha.</p>
                                    </div>
                                    <div className="application-item">
                                        <h4>Tranh chấp thừa kế</h4>
                                        <p>Chứng minh mối quan hệ huyết thống để giải quyết các tranh chấp về tài sản thừa kế và quyền lợi pháp lý.</p>
                                    </div>
                                    <div className="application-item">
                                        <h4>Xử lý tại tòa án</h4>
                                        <p>Làm bằng chứng trong các vụ kiện dân sự, hình sự liên quan đến xác định danh tính và mối quan hệ huyết thống.</p>
                                    </div>
                                    <div className="application-item">
                                        <h4>Thủ tục nhập cư</h4>
                                        <p>Chứng minh mối quan hệ gia đình cho các thủ tục xin visa, định cư và đoàn tụ gia đình ở nước ngoài.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="civil-dna-limitations">
                                <h3>Yêu cầu của xét nghiệm ADN hành chính:</h3>
                                <div className="limitations-grid">
                                    <div className="limitation-card">
                                        <div className="limitation-icon">Giấy tờ</div>
                                        <h4>Bắt buộc có giấy tờ tùy thân</h4>
                                        <p>Phải mang CMND/CCCD gốc, giấy khai sinh của trẻ em và các giấy tờ liên quan khác.</p>
                                    </div>
                                    <div className="limitation-card">
                                        <div className="limitation-icon">Có mặt</div>
                                        <h4>Phải có mặt tại trung tâm</h4>
                                        <p>Tất cả đối tượng xét nghiệm phải đến trung tâm để lấy mẫu, chụp ảnh và xác minh danh tính.</p>
                                    </div>
                                    <div className="limitation-card">
                                        <div className="limitation-icon">Mẫu chuẩn</div>
                                        <h4>Chỉ chấp nhận mẫu chuẩn</h4>
                                        <p>Chỉ lấy máu hoặc niêm mạc miệng. Không chấp nhận tóc, móng hay các mẫu đặc biệt khác.</p>
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
                                        <span>Báo cáo có <strong>GIÁ TRỊ PHÁP LÝ</strong> được công nhận</span>
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
                                <h3>2. Quy trình xét nghiệm ADN hành chính</h3>

                                {/* Accuracy Info */}
                                <div className="accuracy-info">
                                    <div className="accuracy-card">
                                        <div className="accuracy-icon">⚖️</div>
                                        <h3>Có giá trị pháp lý</h3>
                                        <p>Quy trình xét nghiệm ADN hành chính tuân thủ nghiêm ngặt các tiêu chuẩn pháp lý, <strong>có giá trị tại tòa án</strong> và các cơ quan nhà nước.</p>
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
                    )}

                    {/* Samples Tab*/}
                    {activeTab === 'samples' && (
                        <div className="content-tab">
                            <div className="sample-types-section">
                                <h3>3. Các loại mẫu phẩm trong xét nghiệm hành chính</h3>

                                <div className="sample-categories">
                                    <div className="sample-category">
                                        <h4>🩸 Mẫu chuẩn (Duy nhất được chấp nhận)</h4>
                                        <div className="samples-grid">
                                            <div className="sample-item-card">
                                                <div className="sample-icon">💧</div>
                                                <h5>Niêm mạc miệng</h5>
                                                <p><strong>Độ thành công:</strong> 99%</p>
                                                <p><strong>Cách lấy:</strong> Dùng tăm bông chà vào má trong 30 giây</p>
                                                <p><strong>Ưu điểm:</strong> Dễ lấy, không đau, phù hợp mọi lứa tuổi</p>
                                                <span className="price-tag">Bao gồm trong giá</span>
                                            </div>
                                            <div className="sample-item-card">
                                                <div className="sample-icon">🩸</div>
                                                <h5>Máu tĩnh mạch</h5>
                                                <p><strong>Độ thành công:</strong> 99.9%</p>
                                                <p><strong>Cách lấy:</strong> Lấy 2-3ml máu tĩnh mạch</p>
                                                <p><strong>Ưu điểm:</strong> Chất lượng DNA cao nhất, kết quả chính xác</p>
                                                <span className="price-tag">Bao gồm trong giá</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sample-category">
                                        <h4>❌ Mẫu KHÔNG được chấp nhận</h4>
                                        <div className="samples-grid">
                                            <div className="sample-item-card">
                                                <div className="sample-icon">💇</div>
                                                <h5>Tóc có chân tóc</h5>
                                                <p><strong>Trạng thái:</strong> Không chấp nhận</p>
                                                <p><strong>Lý do:</strong> Không đảm bảo tính minh bạch trong quy trình</p>
                                                <span className="price-tag special">Không sử dụng</span>
                                            </div>
                                            <div className="sample-item-card">
                                                <div className="sample-icon">💅</div>
                                                <h5>Móng tay/chân</h5>
                                                <p><strong>Trạng thái:</strong> Không chấp nhận</p>
                                                <p><strong>Lý do:</strong> Không đảm bảo tính minh bạch trong quy trình</p>
                                                <span className="price-tag special">Không sử dụng</span>
                                            </div>
                                            <div className="sample-item-card">
                                                <div className="sample-icon">🔬</div>
                                                <h5>Mẫu đặc biệt khác</h5>
                                                <p><strong>Trạng thái:</strong> Không chấp nhận</p>
                                                <p><strong>Lý do:</strong> Không đảm bảo chuỗi bảo quản hợp lệ</p>
                                                <span className="price-tag special">Không sử dụng</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sample-notes">
                                    <h4>📝 Lưu ý quan trọng về mẫu phẩm hành chính:</h4>
                                    <div className="notes-grid">
                                        <div className="note-item">
                                            <span className="note-icon">⚠️</span>
                                            <p>Xét nghiệm ADN hành chính chỉ chấp nhận máu hoặc niêm mạc miệng</p>
                                        </div>
                                        <div className="note-item">
                                            <span className="note-icon">🏛️</span>
                                            <p>Phải lấy mẫu tại trung tâm có nhân viên giám sát và xác minh</p>
                                        </div>
                                        <div className="note-item">
                                            <span className="note-icon">🔒</span>
                                            <p>Mẫu được niêm phong và bảo quản theo đúng quy trình pháp lý</p>
                                        </div>
                                        <div className="note-item">
                                            <span className="note-icon">👶</span>
                                            <p>Không áp dụng cho thai nhi vì chưa có danh tính pháp lý và không thể xác minh trực tiếp</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'collection' && (
                        <div className="tab-content">
                            <div className="sample-collection-instructions">
                                <h3>4. Hướng dẫn quy trình lấy mẫu hành chính</h3>

                                <div className="instruction-categories">
                                    <div className="instruction-category">
                                        <h4>🏛️ Quy trình lấy mẫu tại trung tâm</h4>

                                        <div className="instruction-grid">
                                            <div className="instruction-card">
                                                <div className="instruction-header">
                                                    <span className="instruction-icon">📋</span>
                                                    <h5>Chuẩn bị giấy tờ</h5>
                                                </div>

                                                <div className="instruction-steps">
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">1</span>
                                                        <p>Mang theo CMND/CCCD gốc của tất cả người tham gia xét nghiệm</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">2</span>
                                                        <p>Giấy khai sinh của trẻ em (nếu có) hoặc giấy tờ chứng minh quan hệ</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">3</span>
                                                        <p>Giấy yêu cầu của tòa án (nếu là yêu cầu từ cơ quan pháp lý)</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">4</span>
                                                        <p>Sao chép và công chứng các giấy tờ liên quan (nếu cần)</p>
                                                    </div>
                                                </div>

                                                <div className="instruction-tips">
                                                    <h6>💡 Lưu ý quan trọng:</h6>
                                                    <ul>
                                                        <li>Tất cả giấy tờ phải là bản gốc</li>
                                                        <li>Trẻ em dưới 14 tuổi cần có người giám hộ</li>
                                                        <li>Người nước ngoài cần passport và visa hợp lệ</li>
                                                        <li>Liên hệ trước để đặt lịch hẹn</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="instruction-card">
                                                <div className="instruction-header">
                                                    <span className="instruction-icon">📸</span>
                                                    <h5>Xác minh danh tính</h5>
                                                </div>

                                                <div className="instruction-steps">
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">1</span>
                                                        <p>Kiểm tra và đối chiếu giấy tờ tùy thân với người thực tế</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">2</span>
                                                        <p>Chụp ảnh chân dung từng người tham gia xét nghiệm</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">3</span>
                                                        <p>Lấy vân tay (nếu yêu cầu) để xác minh danh tính</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">4</span>
                                                        <p>Ký cam kết xác nhận danh tính và đồng ý xét nghiệm</p>
                                                    </div>
                                                </div>

                                                <div className="instruction-tips">
                                                    <h6>💡 Lưu ý quan trọng:</h6>
                                                    <ul>
                                                        <li>Không được trang điểm đậm hoặc che mặt</li>
                                                        <li>Ảnh chụp phải rõ nét và nhận diện được</li>
                                                        <li>Trẻ em có thể có người thân hỗ trợ</li>
                                                        <li>Quá trình được ghi hình để lưu trữ</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="instruction-card">
                                                <div className="instruction-header">
                                                    <span className="instruction-icon">🩸</span>
                                                    <h5>Lấy mẫu chuẩn</h5>
                                                </div>

                                                <div className="instruction-steps">
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">1</span>
                                                        <p>Súc miệng sạch với nước lọc trước khi lấy mẫu nước bọt</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">2</span>
                                                        <p>Nhân viên y tế lấy mẫu niêm mạc miệng hoặc máu theo đúng quy trình</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">3</span>
                                                        <p>Dán nhãn mẫu với thông tin cá nhân và mã số xét nghiệm</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">4</span>
                                                        <p>Niêm phong mẫu và yêu cầu ký xác nhận từ người tham gia</p>
                                                    </div>
                                                </div>

                                                <div className="instruction-tips">
                                                    <h6>💡 Lưu ý quan trọng:</h6>
                                                    <ul>
                                                        <li>Quá trình lấy mẫu có nhân viên giám sát</li>
                                                        <li>Mỗi mẫu được ghi nhận đầy đủ thông tin</li>
                                                        <li>Không được can thiệp vào quá trình lấy mẫu</li>
                                                        <li>Mẫu được bảo quản ngay sau khi lấy</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="instruction-card">
                                                <div className="instruction-header">
                                                    <span className="instruction-icon">🔒</span>
                                                    <h5>Bảo quản và vận chuyển</h5>
                                                </div>

                                                <div className="instruction-steps">
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">1</span>
                                                        <p>Mẫu được bảo quản trong điều kiện nhiệt độ phù hợp</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">2</span>
                                                        <p>Ghi nhận thời gian lấy mẫu và người thực hiện</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">3</span>
                                                        <p>Vận chuyển mẫu đến phòng lab với chuỗi bảo quản không bị gián đoạn</p>
                                                    </div>
                                                    <div className="mini-step">
                                                        <span className="mini-step-number">4</span>
                                                        <p>Lưu trữ hồ sơ và mẫu theo quy định pháp luật</p>
                                                    </div>
                                                </div>

                                                <div className="instruction-tips special">
                                                    <h6>🔒 Đảm bảo tính pháp lý:</h6>
                                                    <ul>
                                                        <li>Chuỗi bảo quản được ghi nhận liên tục</li>
                                                        <li>Không thay đổi hoặc can thiệp vào mẫu</li>
                                                        <li>Lưu trữ theo tiêu chuẩn ISO 17025</li>
                                                        <li>Có thể truy xuất lại lịch sử mẫu</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="general-rules">
                                        <h4>📋 Quy định bắt buộc đối với xét nghiệm hành chính</h4>

                                        <div className="rules-grid">
                                            <div className="rule-card do">
                                                <h5>✅ BẮT BUỘC PHẢI CÓ</h5>
                                                <ul>
                                                    <li>CMND/CCCD gốc của tất cả người tham gia</li>
                                                    <li>Có mặt trực tiếp tại trung tâm để lấy mẫu</li>
                                                    <li>Ký cam kết và xác nhận danh tính</li>
                                                    <li>Chụp ảnh và lấy vân tay (nếu yêu cầu)</li>
                                                    <li>Tuân thủ quy trình lấy mẫu chuẩn</li>
                                                    <li>Thanh toán đầy đủ chi phí theo quy định</li>
                                                    <li>Cung cấp thông tin chính xác và trung thực</li>
                                                </ul>
                                            </div>

                                            <div className="rule-card dont">
                                                <h5>❌ NGHIÊM CẤM</h5>
                                                <ul>
                                                    <li>Sử dụng giấy tờ giả hoặc mượn danh tính</li>
                                                    <li>Lấy mẫu tại nhà hoặc ngoài trung tâm</li>
                                                    <li>Thay thế người khác trong quá trình lấy mẫu</li>
                                                    <li>Can thiệp vào quá trình bảo quản mẫu</li>
                                                    <li>Cung cấp thông tin sai lệch</li>
                                                    <li>Sử dụng mẫu không chuẩn (tóc, móng...)</li>
                                                    <li>Vi phạm quy trình an ninh của trung tâm</li>
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
                                <h3>5. Câu hỏi thường gặp về xét nghiệm ADN hành chính</h3>

                                <div className="faq-categories">
                                    {/* Câu hỏi về dịch vụ xét nghiệm hành chính */}
                                    <div className="faq-category">
                                        <h4>🏛️ Câu hỏi về xét nghiệm ADN hành chính</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">⚖️</span>
                                                    Xét nghiệm ADN hành chính có giá trị pháp lý không?
                                                </h5>
                                                <p>
                                                    <strong>Có</strong>, xét nghiệm ADN hành chính tại DNA CHAIN có <strong>giá trị pháp lý đầy đủ</strong>,
                                                    được công nhận bởi tòa án và các cơ quan nhà nước. Báo cáo có chữ ký số và có thể
                                                    xác minh trực tuyến.
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">⏰</span>
                                                    Bao lâu có kết quả xét nghiệm ADN hành chính?
                                                </h5>
                                                <p>
                                                    <strong>Thời gian tiêu chuẩn:</strong> 5-7 ngày làm việc<br />
                                                    <strong>Gói làm nhanh:</strong> 2-3 ngày (có phụ phí)<br />
                                                    Thời gian được tính từ khi hoàn tất quy trình lấy mẫu và xác minh danh tính.
                                                </p>
                                                <div className="faq-highlight">
                                                    <strong>Lưu ý:</strong> Do quy trình nghiêm ngặt hơn nên thời gian lâu hơn ADN dân sự
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">💰</span>
                                                    Chi phí xét nghiệm ADN hành chính bao nhiều?
                                                </h5>
                                                <p>
                                                    <strong>Gói cơ bản:</strong> 3.500.000 VNĐ<br />
                                                    <strong>Gói làm nhanh:</strong> 6.000.000 VNĐ<br />
                                                    <strong>Bao gồm:</strong><br />
                                                    • Xác minh danh tính và chụp ảnh<br />
                                                    • Lấy mẫu theo quy trình chuẩn<br />
                                                    • Báo cáo có giá trị pháp lý<br />
                                                    • Lưu trữ hồ sơ theo quy định
                                                </p>
                                                <div className="faq-highlight">
                                                    <strong>Lưu ý:</strong> Giá đã bao gồm tất cả chi phí, không phát sinh thêm
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🏢</span>
                                                    Có bắt buộc phải đến trung tâm không?
                                                </h5>
                                                <p>
                                                    <strong>Có</strong>, xét nghiệm ADN hành chính bắt buộc tất cả người tham gia phải
                                                    có mặt tại trung tâm để:<br />
                                                    • Xác minh danh tính bằng giấy tờ gốc<br />
                                                    • Chụp ảnh và lấy vân tay (nếu cần)<br />
                                                    • Lấy mẫu dưới sự giám sát<br />
                                                    • Ký xác nhận các thủ tục
                                                </p>
                                                <div className="faq-warning">
                                                    <strong>Không thể:</strong> Lấy mẫu tại nhà hoặc gửi mẫu qua đường bưu điện
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📋</span>
                                                    Cần chuẩn bị những giấy tờ gì?
                                                </h5>
                                                <p>
                                                    <strong>Giấy tờ bắt buộc:</strong><br />
                                                    • CMND/CCCD gốc của tất cả người tham gia<br />
                                                    • Giấy khai sinh của trẻ em (nếu có)<br />
                                                    • Hộ khẩu hoặc sổ gia đình (nếu cần)<br />
                                                    • Giấy yêu cầu của tòa án (nếu có)<br />
                                                    • Passport + visa (với người nước ngoài)
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">👶</span>
                                                    Có thể làm xét nghiệm ADN hành chính cho thai nhi không?
                                                </h5>
                                                <p>
                                                    <strong>Không</strong>, xét nghiệm ADN hành chính không áp dụng cho thai nhi vì:<br />
                                                    • <strong>Chưa có danh tính pháp lý:</strong> Thai nhi chưa được khai sinh<br />
                                                    • <strong>Không thể xác minh trực tiếp:</strong> Không có giấy tờ tùy thân<br />
                                                    • <strong>Quy trình không phù hợp:</strong> Không thể chụp ảnh và lấy vân tay<br />
                                                    • <strong>Tính pháp lý chưa rõ ràng:</strong> Chưa được pháp luật công nhận<br /><br />
                                                    <strong>Thay thế:</strong> Sử dụng xét nghiệm ADN dân sự cho thai nhi (NIPT)
                                                </p>
                                                <div className="faq-highlight">
                                                    <strong>Khuyến nghị:</strong> Chờ sinh ra rồi làm ADN hành chính để có giá trị pháp lý
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Câu hỏi về mẫu phẩm hành chính */}
                                    <div className="faq-category">
                                        <h4>🧬 Câu hỏi về mẫu phẩm</h4>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🩸</span>
                                                    ADN hành chính chấp nhận những loại mẫu nào?
                                                </h5>
                                                <p>
                                                    Xét nghiệm ADN hành chính <strong>CHỈ</strong> chấp nhận 2 loại mẫu chuẩn:<br />
                                                    • <strong>Niêm mạc miệng:</strong> Lấy bằng tăm bông vô trùng<br />
                                                    • <strong>Máu tĩnh mạch:</strong> Lấy 2-3ml vào ống EDTA<br /><br />
                                                    <strong>KHÔNG chấp nhận:</strong> Tóc, móng, cuống rốn, mẫu đặc biệt
                                                </p>
                                                <div className="faq-warning">
                                                    <strong>Quan trọng:</strong> Chỉ chấp nhận mẫu chuẩn để đảm bảo tính pháp lý
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">👶</span>
                                                    Làm sao với trẻ em nhỏ không hợp tác?
                                                </h5>
                                                <p>
                                                    Đối với trẻ em khó hợp tác:<br />
                                                    • <strong>Ưu tiên:</strong> Lấy mẫu niêm mạc miệng (ít đau hơn)<br />
                                                    • <strong>Hỗ trợ:</strong> Người thân có thể ôm và an ủi trẻ<br />
                                                    • <strong>Kỹ thuật:</strong> Nhân viên y tế có kinh nghiệm với trẻ em<br />
                                                    • <strong>Thời gian:</strong> Lấy mẫu nhanh, tối đa 1-2 phút
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🏥</span>
                                                    Có thể lấy mẫu ở bệnh viện khác được không?
                                                </h5>
                                                <p>
                                                    <strong>Không</strong>, để đảm bảo tính pháp lý và chuỗi bảo quản:<br />
                                                    • Mẫu phải được lấy tại trung tâm của DNA CHAIN<br />
                                                    • Có nhân viên chuyên môn giám sát<br />
                                                    • Quy trình được ghi hình lưu trữ<br />
                                                    • Đảm bảo không bị tráo đổi hoặc nhiễm bẩn
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">⚰️</span>
                                                    Có thể lấy mẫu từ người đã mất không?
                                                </h5>
                                                <p>
                                                    <strong>Rất khó khăn</strong> với xét nghiệm hành chính:<br />
                                                    • Cần có yêu cầu từ tòa án hoặc cơ quan pháp lý<br />
                                                    • Phải thông qua thủ tục pháp y<br />
                                                    • Lấy mẫu tại nhà xác hoặc bệnh viện có giám sát<br />
                                                    • Chi phí cao hơn nhiều do quy trình phức tạp<br />
                                                    • Thời gian xử lý lâu hơn (10-15 ngày)
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
                                                    <span className="faq-icon">🔄</span>
                                                    ADN hành chính khác ADN dân sự như thế nào?
                                                </h5>
                                                <p>
                                                    <strong>ADN Hành chính (có giá trị pháp lý):</strong><br />
                                                    • Có giá trị tại tòa án và cơ quan nhà nước<br />
                                                    • Bắt buộc có mặt tại trung tâm<br />
                                                    • Cần CMND/CCCD gốc và xác minh danh tính<br />
                                                    • Chỉ chấp nhận mẫu chuẩn (máu/nước bọt)<br />
                                                    • Quy trình nghiêm ngặt, thời gian lâu hơn<br />
                                                    • Giá: 3.500.000 VNĐ<br /><br />
                                                    <strong>ADN Dân sự (tham khảo cá nhân):</strong><br />
                                                    • Chỉ phục vụ mục đích cá nhân<br />
                                                    • Có thể lấy mẫu tại nhà<br />
                                                    • Không cần giấy tờ tùy thân<br />
                                                    • Chấp nhận mọi loại mẫu<br />
                                                    • Giá: 2.500.000 VNĐ
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📜</span>
                                                    Báo cáo kết quả có những thông tin gì?
                                                </h5>
                                                <p>
                                                    Báo cáo ADN hành chính bao gồm:<br />
                                                    • <strong>Thông tin nhận dạng:</strong> Họ tên, CMND, ảnh các bên<br />
                                                    • <strong>Kết quả xét nghiệm:</strong> Tỷ lệ % chính xác<br />
                                                    • <strong>Phân tích kỹ thuật:</strong> Bảng marker STR chi tiết<br />
                                                    • <strong>Kết luận pháp lý:</strong> Có/không có quan hệ huyết thống<br />
                                                    • <strong>Chữ ký số:</strong> Của giám đốc kỹ thuật<br />
                                                    • <strong>Mã QR:</strong> Để xác minh trực tuyến
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🔒</span>
                                                    Kết quả có bị làm giả được không?
                                                </h5>
                                                <p>
                                                    <strong>Rất khó</strong> để làm giả kết quả ADN hành chính:<br />
                                                    • Báo cáo có chữ ký số không thể giả mạo<br />
                                                    • Mã QR để xác minh trực tuyến với cơ sở dữ liệu<br />
                                                    • Lưu trữ hồ sơ và ảnh toàn bộ quá trình<br />
                                                    • Có thể truy xuất lại lịch sử xét nghiệm<br />
                                                    • Được Bộ Y tế giám sát và kiểm tra định kỳ
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">🏛️</span>
                                                    Tòa án có chấp nhận kết quả này không?
                                                </h5>
                                                <p>
                                                    <strong>Có</strong>, kết quả xét nghiệm ADN hành chính tại DNA CHAIN được
                                                    tòa án chấp nhận vì:<br />
                                                    • Trung tâm được Bộ Y tế cấp phép hoạt động<br />
                                                    • Tuân thủ tiêu chuẩn ISO 17025<br />
                                                    • Quy trình lấy mẫu minh bạch, có giám sát<br />
                                                    • Báo cáo có đầy đủ thông tin pháp lý<br />
                                                    • Đã được sử dụng trong nhiều vụ kiện
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📞</span>
                                                    Liên hệ tư vấn và đặt lịch hẹn như thế nào?
                                                </h5>
                                                <p>
                                                    Quý khách vui lòng liên hệ DNA CHAIN:<br />
                                                    • <strong>Hotline:</strong> 1900 636 648 (24/7)<br />
                                                    • <strong>Email:</strong> legal@dnachain.vn<br />
                                                    • <strong>Website:</strong> www.dnachain.vn<br />
                                                    • <strong>Địa chỉ:</strong> 123 Đường ABC, Phường 4, Quận 3, TP.HCM<br />
                                                    • <strong>Đặt lịch:</strong> Bắt buộc phải đặt lịch trước<br />
                                                    • <strong>Tư vấn:</strong> Miễn phí về thủ tục và quy trình
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
                                                    <span className="faq-icon">🌍</span>
                                                    Người ở tỉnh xa có thể làm được không?
                                                </h5>
                                                <p>
                                                    <strong>Có</strong>, nhưng phải đến trung tâm tại TP.HCM:<br />
                                                    • Hiện tại chưa có chi nhánh tại các tỉnh<br />
                                                    • Có thể đặt lịch hẹn vào cuối tuần<br />
                                                    • Hỗ trợ tư vấn lộ trình di chuyển<br />
                                                    • Ưu tiên xử lý nhanh cho khách từ xa<br />
                                                    • Chi phí di chuyển khách hàng tự chi trả
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">👥</span>
                                                    Một bên không đồng ý xét nghiệm thì sao?
                                                </h5>
                                                <p>
                                                    Trường hợp này cần can thiệp pháp lý:<br />
                                                    • <strong>Tự nguyện:</strong> Cả hai bên đồng ý thì tiến hành bình thường<br />
                                                    • <strong>Không đồng ý:</strong> Cần yêu cầu từ tòa án<br />
                                                    • <strong>Cưỡng chế:</strong> Chỉ khi có lệnh tòa án<br />
                                                    • <strong>Tư vấn:</strong> Hỗ trợ tư vấn thủ tục pháp lý<br />
                                                    • <strong>Chi phí:</strong> Có thể tăng do thủ tục phức tạp
                                                </p>
                                            </div>

                                            <div className="faq-item">
                                                <h5>
                                                    <span className="faq-icon">📅</span>
                                                    Có thể làm xét nghiệm khẩn cấp được không?
                                                </h5>
                                                <p>
                                                    <strong>Có</strong>, với các trường hợp đặc biệt:<br />
                                                    • <strong>Yêu cầu tòa án:</strong> Ưu tiên xử lý trong 24-48h<br />
                                                    • <strong>Cấp cứu y tế:</strong> Hỗ trợ ngoài giờ hành chính<br />
                                                    • <strong>Phí khẩn cấp:</strong> +2.000.000 VNĐ<br />
                                                    • <strong>Điều kiện:</strong> Phải có giấy tờ chứng minh tính khẩn cấp<br />
                                                    • <strong>Liên hệ:</strong> Hotline để được hỗ trợ ngay
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

export default LegalService;