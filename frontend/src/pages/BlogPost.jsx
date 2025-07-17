import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogPost.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function BlogPost() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('overview');

    const sections = [
        { id: 'overview', title: 'Tổng quan về ADN', icon: '🧬' },
        { id: 'structure', title: 'Cấu trúc ADN', icon: '🔬' },
        { id: 'function', title: 'Chức năng của ADN', icon: '⚙️' },
        { id: 'testing', title: 'Xét nghiệm ADN', icon: '🧪' },
        { id: 'applications', title: 'Ứng dụng thực tế', icon: '💡' },
        { id: 'faq', title: 'Câu hỏi thường gặp', icon: '❓' }
    ];

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        
        <div className="dna-info-container">
            <Header/>

            {/* Navigation */}
            <nav className="dna-nav">
                <div className="nav-container">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(section.id)}
                        >
                            <span className="nav-icon">{section.icon}</span>
                            <span className="nav-title">{section.title}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Main Content */}
            <main className="dna-content">
                {/* Tổng quan */}
                <section id="overview" className="content-section">
                    <div className="section-header">
                        <h2>🧬 Tổng quan về ADN</h2>
                    </div>
                    <div className="content-grid">
                        <div className="content-card">
                            <h3>ADN là gì?</h3>
                            <p>
                                ADN (Acid deoxyribonucleic) là phân tử mang thông tin di truyền của tất cả 
                                các sinh vật sống. Nó chứa đựng các hướng dẫn cần thiết để xây dựng và 
                                duy trì sự sống.
                            </p>
                        </div>
                        <div className="content-card">
                            <h3>Tầm quan trọng</h3>
                            <p>
                                ADN quyết định các đặc điểm di truyền như màu mắt, màu tóc, chiều cao, 
                                và cả khả năng mắc một số bệnh tật. Nó là "bản thiết kế" của cơ thể.
                            </p>
                        </div>
                        <div className="content-card">
                            <h3>Khám phá lịch sử</h3>
                            <p>
                                ADN được khám phá lần đầu vào năm 1869 bởi Friedrich Miescher, 
                                và cấu trúc xoắn kép được James Watson và Francis Crick mô tả năm 1953.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Cấu trúc */}
                <section id="structure" className="content-section">
                    <div className="section-header">
                        <h2>🔬 Cấu trúc ADN</h2>
                    </div>
                    <div className="structure-content">
                        <div className="structure-visual">
                            <div className="dna-helix">
                                <div className="helix-strand strand-1"></div>
                                <div className="helix-strand strand-2"></div>
                            </div>
                        </div>
                        <div className="structure-info">
                            <h3>Cấu trúc xoắn kép</h3>
                            <ul>
                                <li><strong>4 bazơ nitơ:</strong> Adenine (A), Thymine (T), Guanine (G), Cytosine (C)</li>
                                <li><strong>Nguyên tắc bổ sung:</strong> A luôn ghép với T, G luôn ghép với C</li>
                                <li><strong>Đường phosphate:</strong> Tạo thành xương sống của ADN</li>
                                <li><strong>Chiều dài:</strong> Mỗi tế bào chứa khoảng 3 tỷ cặp bazơ</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Chức năng */}
                <section id="function" className="content-section">
                    <div className="section-header">
                        <h2>⚙️ Chức năng của ADN</h2>
                    </div>
                    <div className="function-grid">
                        <div className="function-card">
                            <div className="function-icon">📝</div>
                            <h3>Lưu trữ thông tin</h3>
                            <p>ADN chứa đựng toàn bộ thông tin di truyền cần thiết để tạo ra và duy trì sự sống.</p>
                        </div>
                        <div className="function-card">
                            <div className="function-icon">🔄</div>
                            <h3>Nhân đôi</h3>
                            <p>ADN có khả năng tự nhân đôi để truyền thông tin di truyền cho thế hệ tiếp theo.</p>
                        </div>
                        <div className="function-card">
                            <div className="function-icon">🧪</div>
                            <h3>Tổng hợp protein</h3>
                            <p>ADN cung cấp thông tin để tổng hợp các protein cần thiết cho cơ thể.</p>
                        </div>
                        <div className="function-card">
                            <div className="function-icon">🎯</div>
                            <h3>Điều hòa gen</h3>
                            <p>ADN kiểm soát việc bật/tắt các gen trong các tình huống khác nhau.</p>
                        </div>
                    </div>
                </section>

                {/* Xét nghiệm ADN */}
                <section id="testing" className="content-section">
                    <div className="section-header">
                        <h2>🧪 Xét nghiệm ADN</h2>
                    </div>
                    <div className="testing-content">
                        <div className="testing-types">
                            <h3>Các loại xét nghiệm ADN</h3>
                            <div className="test-type">
                                <h4>🔍 Xét nghiệm huyết thống</h4>
                                <p>Xác định mối quan hệ cha mẹ - con cái với độ chính xác 99.9%</p>
                            </div>
                            <div className="test-type">
                                <h4>🌳 Xét nghiệm dòng dõi</h4>
                                <p>Truy tìm nguồn gốc tổ tiên và di cư của dòng họ</p>
                            </div>
                            <div className="test-type">
                                <h4>🏥 Xét nghiệm y học</h4>
                                <p>Phát hiện nguy cơ mắc bệnh di truyền và lựa chọn điều trị</p>
                            </div>
                        </div>
                        <div className="testing-process">
                            <h3>Quy trình xét nghiệm</h3>
                            <div className="process-steps">
                                <div className="step">
                                    <div className="step-number">1</div>
                                    <h4>Lấy mẫu</h4>
                                    <p>Nước bọt hoặc máu</p>
                                </div>
                                <div className="step">
                                    <div className="step-number">2</div>
                                    <h4>Tách ADN</h4>
                                    <p>Tách ADN từ mẫu sinh học</p>
                                </div>
                                <div className="step">
                                    <div className="step-number">3</div>
                                    <h4>Phân tích</h4>
                                    <p>So sánh các đoạn ADN</p>
                                </div>
                                <div className="step">
                                    <div className="step-number">4</div>
                                    <h4>Kết quả</h4>
                                    <p>Báo cáo chi tiết</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ứng dụng */}
                <section id="applications" className="content-section">
                    <div className="section-header">
                        <h2>💡 Ứng dụng thực tế</h2>
                    </div>
                    <div className="applications-grid">
                        <div className="app-card">
                            <div className="app-icon">👨‍👩‍👧‍👦</div>
                            <h3>Pháp y</h3>
                            <p>Nhận dạng nạn nhân, xác định hung thủ trong các vụ án hình sự</p>
                        </div>
                        <div className="app-card">
                            <div className="app-icon">🏥</div>
                            <h3>Y học</h3>
                            <p>Chẩn đoán bệnh di truyền, điều trị cá nhân hóa</p>
                        </div>
                        <div className="app-card">
                            <div className="app-icon">🌾</div>
                            <h3>Nông nghiệp</h3>
                            <p>Tạo giống cây trồng, vật nuôi có năng suất cao</p>
                        </div>
                        <div className="app-card">
                            <div className="app-icon">🔬</div>
                            <h3>Nghiên cứu</h3>
                            <p>Phát triển thuốc mới, hiểu về sự tiến hóa</p>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" className="content-section">
                    <div className="section-header">
                        <h2>❓ Câu hỏi thường gặp</h2>
                    </div>
                    <div className="faq-list">
                        <div className="faq-item">
                            <h3>Xét nghiệm ADN có đau không?</h3>
                            <p>Không, việc lấy mẫu nước bọt hoàn toàn không đau và rất đơn giản.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Kết quả xét nghiệm có chính xác không?</h3>
                            <p>Độ chính xác của xét nghiệm huyết thống lên đến 99.9% khi loại trừ và 99.99% khi xác nhận.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Mất bao lâu để có kết quả?</h3>
                            <p>Thông thường từ 5-10 ngày làm việc, tùy thuộc vào loại xét nghiệm.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Thông tin có được bảo mật không?</h3>
                            <p>Hoàn toàn bảo mật. Chúng tôi tuân thủ nghiêm ngặt các quy định về bảo vệ dữ liệu cá nhân.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer CTA */}
            
            <Footer/>
        </div>
    );
}