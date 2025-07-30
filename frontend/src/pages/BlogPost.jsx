import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogPost.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function BlogPost() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', title: 'Tất cả bài viết', count: 8 },
        { id: 'dna-knowledge', title: 'Kiến thức về ADN', count: 5 },
        { id: 'testing-guide', title: 'Hướng dẫn xét nghiệm', count: 3 }
    ];

    const articles = [
        // Mục Kiến thức về ADN (5 bài viết)
        {
            id: 1,
            category: 'dna-knowledge',
            title: 'Giới thiệu công nghệ xét nghiệm ADN',
            excerpt: 'Tìm hiểu về công nghệ xét nghiệm ADN hiện đại, nguyên lý hoạt động và ưu điểm vượt trội của phương pháp STR (Short Tandem Repeat) trong việc xác định huyết thống với độ chính xác cao.',
            image: '/logo.png',
            date: '2025-01-15',
            readTime: '6 phút đọc',
            author: 'Đội ngũ chuyên gia',
            isHot: true,
            content: 'Công nghệ xét nghiệm ADN đã phát triển mạnh mẽ...'
        },
        {
            id: 2,
            category: 'dna-knowledge',
            title: 'Quy trình phân tích mẫu ADN',
            excerpt: 'Khám phá quy trình phân tích mẫu ADN từ khâu tiếp nhận, xử lý sơ bộ, chiết tách ADN, khuếch đại PCR đến phân tích kết quả bằng hệ thống tự động hiện đại.',
            image: '/logo.png',
            date: '2025-01-14',
            readTime: '8 phút đọc',
            author: 'Đội kỹ thuật xét nghiệm',
            content: 'Quy trình phân tích mẫu ADN đòi hỏi độ chính xác cao...'
        },
        {
            id: 3,
            category: 'dna-knowledge',
            title: 'Hệ thống quản lý và truy xuất mẫu',
            excerpt: 'Tìm hiểu về hệ thống quản lý mẫu thông minh với công nghệ mã vạch và QR code, đảm bảo theo dõi toàn bộ quá trình từ thu thập đến phân tích kết quả.',
            image: '/logo.png',
            date: '2025-01-13',
            readTime: '7 phút đọc',
            author: 'Đội công nghệ thông tin',
            content: 'Hệ thống quản lý mẫu hiện đại giúp đảm bảo...'
        },
        {
            id: 4,
            category: 'dna-knowledge',
            title: 'Độ chính xác và độ tin cậy',
            excerpt: 'Phân tích về độ chính xác 99.99% của xét nghiệm ADN, các yếu tố ảnh hưởng đến kết quả và biện pháp kiểm soát chất lượng đảm bảo độ tin cậy cao nhất.',
            image: '/logo.png',
            date: '2025-01-12',
            readTime: '6 phút đọc',
            author: 'Đội kiểm soát chất lượng',
            content: 'Độ chính xác là yếu tố quan trọng nhất...'
        },
        {
            id: 5,
            category: 'dna-knowledge',
            title: 'Chính sách bảo mật thông tin',
            excerpt: 'Tìm hiểu về chính sách bảo mật nghiêm ngặt, quyền riêng tư khách hàng và các biện pháp an toàn thông tin theo tiêu chuẩn quốc tế trong lĩnh vực xét nghiệm ADN.',
            image: '/logo.png',
            date: '2025-01-11',
            readTime: '5 phút đọc',
            author: 'Đội bảo mật thông tin',
            content: 'Chính sách bảo mật được xây dựng theo tiêu chuẩn cao nhất...'
        },

        // Mục Hướng dẫn xét nghiệm (3 bài viết)
        {
            id: 6,
            category: 'testing-guide',
            title: 'Hướng dẫn đặt lịch hẹn xét nghiệm',
            excerpt: 'Hướng dẫn chi tiết cách đặt lịch hẹn xét nghiệm ADN online, các bước chuẩn bị cần thiết và quy trình thanh toán an toàn qua VNPay.',
            image: '/logo.png',
            date: '2025-01-10',
            readTime: '7 phút đọc',
            author: 'Đội hỗ trợ khách hàng',
            content: 'Việc đặt lịch hẹn xét nghiệm rất đơn giản...'
        },
        {
            id: 7,
            category: 'testing-guide',
            title: 'Phân biệt ADN Dân sự và Pháp lý',
            excerpt: 'Giải thích rõ ràng sự khác biệt giữa xét nghiệm ADN Dân sự (mục đích cá nhân) và ADN Pháp lý (có giá trị tại tòa án), quy trình và yêu cầu của từng loại.',
            image: '/logo.png',
            date: '2025-01-09',
            readTime: '6 phút đọc',
            author: 'Đội tư vấn pháp lý',
            content: 'Sự khác biệt giữa ADN dân sự và pháp lý...'
        },
        {
            id: 13,
            category: 'testing-guide',
            title: 'Chuẩn bị mẫu và quy trình lấy mẫu',
            excerpt: 'Hướng dẫn chi tiết cách chuẩn bị và thu thập các loại mẫu (tế bào niêm mạc, máu, tóc, móng), bảo quản mẫu và những lưu ý quan trọng.',
            image: '/logo.png',
            date: '2025-01-03',
            readTime: '7 phút đọc',
            author: 'Đội kỹ thuật lấy mẫu',
            content: 'Việc chuẩn bị mẫu đúng cách rất quan trọng...'
        }
    ];

    const filteredArticles = activeCategory === 'all' 
        ? articles 
        : articles.filter(article => article.category === activeCategory);

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
    };

    const handleReadMore = (articleId) => {
        // Navigate to article detail page with article ID
        navigate(`/blog/article/${articleId}`);
    };

    return (
        <div className="knowledge-container">
            <Header/>

            {/* Hero Section */}
            <section className="knowledge-hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-badge">🧬 Hệ thống xét nghiệm ADN hàng đầu</div>
                        <h1>TRI THỨC & KIẾN THỨC XÉT NGHIỆM ADN</h1>
                        <p>Khám phá kho tàng kiến thức về xét nghiệm ADN với 8 bài viết chuyên sâu được chia thành 2 chuyên mục chính: 5 bài viết về kiến thức khoa học ADN và 3 hướng dẫn thực hành xét nghiệm. Hệ thống tiên phong trong lĩnh vực xét nghiệm ADN tại Việt Nam với công nghệ STR hiện đại.</p>
                        <div className="hero-highlights">
                            <div className="highlight-item">
                                <span className="highlight-icon">📚</span>
                                <span>5 bài viết kiến thức ADN</span>
                            </div>
                            <div className="highlight-item">
                                <span className="highlight-icon">📋</span>
                                <span>3 hướng dẫn xét nghiệm</span>
                            </div>
                            <div className="highlight-item">
                                <span className="highlight-icon">🔬</span>
                                <span>Công nghệ STR tiên tiến</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-stats-container">
                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-number">99.99%</div>
                                <div className="stat-label">Độ chính xác</div>
                                <div className="stat-detail">Kết quả dương tính</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">5-7</div>
                                <div className="stat-label">Ngày có kết quả</div>
                                <div className="stat-detail">Thời gian xử lý nhanh</div>
                            </div>

                            <div className="stat-item">
                                <div className="stat-number">8</div>
                                <div className="stat-label">Bài viết chuyên sâu</div>
                                <div className="stat-detail">Kiến thức và hướng dẫn</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="category-section">
                <div className="container">
                    <div className="category-tabs">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(category.id)}
                            >
                                {category.title}
                                <span className="count">({category.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            {activeCategory === 'all' && (
                <section className="featured-section">
                    <div className="container">
                        <h2 className="section-title">Bài viết nổi bật</h2>
                        <div className="featured-articles">
                            {articles.filter(article => article.isHot).map((article) => (
                                <div key={article.id} className="featured-card">
                                    <div className="featured-image">
                                        <img src={article.image} alt={article.title} />
                                        <div className="featured-badge">Nổi bật</div>
                                    </div>
                                    <div className="featured-content">
                                        <div className="featured-category">
                                            {categories.find(cat => cat.id === article.category)?.title}
                                        </div>
                                        <h3 className="featured-title">{article.title}</h3>
                                        <p className="featured-excerpt">{article.excerpt}</p>
                                        <div className="featured-meta">
                                            <span className="author">{article.author}</span>
                                            <span className="date">{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                                            <span className="read-time">{article.readTime}</span>
                                        </div>
                                        <button 
                                            className="read-more-btn"
                                            onClick={() => handleReadMore(article.id)}
                                            style={{ marginTop: '1rem' }}
                                        >
                                            Đọc thêm
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Articles List */}
            <main className="articles-main">
                <div className="container">
                    <div className="articles-header">
                        <h2 className="section-title">
                            {(() => {
                                if (activeCategory === 'all') return 'Tất cả bài viết';
                                if (activeCategory === 'dna-knowledge') return 'Kiến thức về ADN';
                                return 'Hướng dẫn xét nghiệm';
                            })()}
                        </h2>
                        <div className="articles-count">
                            {filteredArticles.length} bài viết
                        </div>
                    </div>
                    
                    <div className="articles-grid">
                        {filteredArticles.map((article) => (
                            <article key={article.id} className="article-card">
                                <div className="article-image">
                                    <img src={article.image} alt={article.title} />
                                    <div className="article-category">
                                        {categories.find(cat => cat.id === article.category)?.title}
                                    </div>
                                    {article.isHot && <div className="hot-badge">Hot</div>}
                                </div>
                                <div className="article-content">
                                    <h2 className="article-title">{article.title}</h2>
                                    <p className="article-excerpt">{article.excerpt}</p>
                                    <div className="article-meta">
                                        <div className="meta-info">
                                            <span className="author">{article.author}</span>
                                            <span className="date">{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                                            <span className="read-time">{article.readTime}</span>
                                        </div>
                                        <button 
                                            className="read-more-btn"
                                            onClick={() => handleReadMore(article.id)}
                                        >
                                            Đọc thêm
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}
