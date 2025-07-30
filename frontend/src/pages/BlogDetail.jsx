import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogDetail.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BlogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    
    const articleDetails = {
        1: {
            title: 'Giới thiệu công nghệ xét nghiệm ADN',
            author: 'Đội ngũ chuyên gia',
            date: '2025-01-15',
            readTime: '8 phút đọc',
            category: 'Kiến thức về ADN',
            image: '/logo.png',
            content: `
                <h2>Công nghệ xét nghiệm ADN hiện đại - Nền tảng khoa học đáng tin cậy</h2>
                <p>Công nghệ xét nghiệm ADN đã phát triển mạnh mẽ trong những thập kỷ gần đây, trở thành công cụ khoa học đáng tin cậy nhất để xác định mối quan hệ huyết thống. Với độ chính xác lên đến 99.99%, công nghệ này đã cách mạng hóa ngành y học pháp y và giải quyết hàng triệu vấn đề xã hội quan trọng.</p>
                
                <h3>🧬 Nguyên lý hoạt động của xét nghiệm ADN</h3>
                <p>Xét nghiệm ADN dựa trên phân tích các đoạn ADN đặc trưng gọi là <strong>STR (Short Tandem Repeat)</strong> - những đoạn lặp ngắn có tính đa hình cao. Mỗi người có một "dấu vân tay" ADN duy nhất, ngoại trừ trường hợp sinh đôi cùng trứng.</p>
                
                <h4>Quy trình phân tích STR:</h4>
                <ol>
                    <li><strong>Thu thập mẫu:</strong> Tế bào niêm mạc miệng, máu, tóc có chân, móng tay</li>
                    <li><strong>Chiết xuất ADN:</strong> Tách ADN ra khỏi tế bào bằng kỹ thuật sinh học phân tử</li>
                    <li><strong>Khuếch đại PCR:</strong> Nhân bản các đoạn STR cần thiết để phân tích</li>
                    <li><strong>Điện di mao quản:</strong> Phân tách và đọc các đoạn STR bằng hệ thống tự động</li>
                    <li><strong>Phân tích thống kê:</strong> So sánh profile ADN và tính toán tỷ lệ huyết thống</li>
                </ol>

                <h3>📊 Độ chính xác và độ tin cậy</h3>
                <div class="accuracy-stats">
                    <div class="stat-item">
                        <h4>99.99%</h4>
                        <p>Độ chính xác khi xác định quan hệ cha con</p>
                    </div>
                    <div class="stat-item">
                        <h4>16-25 loci</h4>
                        <p>Số lượng điểm đánh dấu STR được phân tích</p>
                    </div>
                    <div class="stat-item">
                        <h4>1:10 triệu</h4>
                        <p>Tỷ lệ sai số tối đa trong kết quả</p>
                    </div>
                </div>

                <h3>🔬 Các loại xét nghiệm ADN chúng tôi cung cấp</h3>
                
                <h4>1. Xét nghiệm huyết thống trực tiếp:</h4>
                <ul>
                    <li><strong>Cha - Con:</strong> Độ chính xác cao nhất, phổ biến nhất</li>
                    <li><strong>Mẹ - Con:</strong> Bao gồm phân tích ADN ty thể (mtDNA)</li>
                    <li><strong>Anh chị em ruột:</strong> Phân tích mức độ chia sẻ ADN</li>
                </ul>

                <h4>2. Xét nghiệm huyết thống gián tiếp:</h4>
                <ul>
                    <li><strong>Ông - Cháu:</strong> Qua phân tích Y-chromosome</li>
                    <li><strong>Bà - Cháu:</strong> Qua phân tích ADN ty thể</li>
                    <li><strong>Thai nhi:</strong> Xét nghiệm không xâm lấn từ máu mẹ</li>
                </ul>

                <h3>⚡ Ưu điểm vượt trội của công nghệ hiện đại</h3>
                <ul>
                    <li><strong>Tốc độ xử lý nhanh:</strong> 5-7 ngày làm việc cho kết quả chính xác</li>
                    <li><strong>Mẫu linh hoạt:</strong> Có thể sử dụng nhiều loại mẫu khác nhau</li>
                    <li><strong>Bảo quản lâu dài:</strong> Mẫu có thể bảo quản và phân tích sau nhiều năm</li>
                    <li><strong>Không phụ thuộc tuổi:</strong> Từ thai nhi đến người cao tuổi</li>
                    <li><strong>Quy trình chuẩn quốc tế:</strong> Tuân thủ ISO 17025 và AABB</li>
                </ul>

                <h3>🔒 Bảo mật và đạo đức</h3>
                <p>Chúng tôi cam kết bảo mật tuyệt đối thông tin khách hàng với:</p>
                <ul>
                    <li>Mã hóa dữ liệu AES-256 bits</li>
                    <li>Phân quyền truy cập nghiêm ngặt</li>
                    <li>Hủy mẫu sau khi hoàn thành (nếu khách hàng yêu cầu)</li>
                    <li>Tuân thủ luật bảo vệ dữ liệu cá nhân Việt Nam</li>
                </ul>

                <h3>🌟 Ứng dụng thực tiễn</h3>
                <div class="applications">
                    <div class="app-category">
                        <h4>Gia đình & Cá nhân:</h4>
                        <ul>
                            <li>Xác định huyết thống trong gia đình</li>
                            <li>Tìm kiếm người thân thất lạc</li>
                            <li>Lập hồ sơ sức khỏe di truyền</li>
                        </ul>
                    </div>
                    <div class="app-category">
                        <h4>Pháp lý & Hành chính:</h4>
                        <ul>
                            <li>Thủ tục nhận con nuôi</li>
                            <li>Giải quyết tranh chấp thừa kế</li>
                            <li>Hồ sơ di trú, định cư</li>
                            <li>Chứng minh quan hệ huyết thống tại tòa án</li>
                        </ul>
                    </div>
                </div>

                <h3>📈 Xu hướng phát triển tương lai</h3>
                <p>Công nghệ xét nghiệm ADN đang phát triển theo hướng:</p>
                <ul>
                    <li><strong>Whole Genome Sequencing:</strong> Giải mã toàn bộ bộ gene</li>
                    <li><strong>AI & Machine Learning:</strong> Phân tích dữ liệu thông minh hơn</li>
                    <li><strong>Point-of-care testing:</strong> Xét nghiệm tại chỗ với kết quả nhanh</li>
                    <li><strong>Epigenetics:</strong> Nghiên cứu sự biểu hiện gene</li>
                </ul>

                <h3>🏆 Cam kết chất lượng</h3>
                <p>Hệ thống xét nghiệm ADN của chúng tôi được chứng nhận bởi:</p>
                <ul>
                    <li>ISO 17025 - Năng lực phòng thí nghiệm</li>
                    <li>ISO 15189 - Chất lượng phòng thí nghiệm y khoa</li>
                    <li>AABB - Hiệp hội Ngân hàng máu Mỹ</li>
                    <li>Bộ Y tế Việt Nam - Giấy phép hoạt động</li>
                </ul>

                <p><em>Với cam kết mang đến dịch vụ xét nghiệm ADN chất lượng cao, chúng tôi không ngừng đầu tư vào công nghệ hiện đại và đào tạo đội ngũ chuyên gia để phục vụ khách hàng tốt nhất.</em></p>
            `
        },
        2: {
            title: 'Quy trình phân tích mẫu ADN',
            author: 'Đội kỹ thuật xét nghiệm',
            date: '2025-01-14',
            readTime: '10 phút đọc',
            category: 'Kiến thức về ADN',
            image: '/logo.png',
            content: `
                <h2>🔬 Quy trình phân tích mẫu ADN - Từ mẫu thô đến kết quả chính xác</h2>
                <p>Quy trình phân tích mẫu ADN là một chuỗi các bước kỹ thuật phức tạp, đòi hỏi độ chính xác cao và tuân thủ nghiêm ngặt các tiêu chuẩn quốc tế. Mỗi bước đều được kiểm soát chất lượng nghiêm ngặt để đảm bảo kết quả đáng tin cậy.</p>
                
                <h3>📋 Tổng quan quy trình 6 bước</h3>
                <p>Từ khi nhận mẫu đến khi có kết quả cuối cùng, mẫu ADN sẽ trải qua 6 giai đoạn chính với thời gian xử lý 5-7 ngày làm việc:</p>
                
                <h3>🏥 Bước 1: Tiếp nhận và kiểm tra mẫu</h3>
                <h4>Quy trình tiếp nhận:</h4>
                <ol>
                    <li><strong>Kiểm tra nhãn mẫu:</strong> Xác minh thông tin trên tube mẫu khớp với hồ sơ</li>
                    <li><strong>Đánh giá chất lượng mẫu:</strong> Kiểm tra tính toàn vẹn, không bị nhiễm bẩn</li>
                    <li><strong>Ghi nhận vào hệ thống:</strong> Tạo mã vạch theo dõi toàn bộ quá trình</li>
                    <li><strong>Phân loại mẫu:</strong> Theo loại xét nghiệm và độ ưu tiên</li>
                    <li><strong>Bảo quản tạm thời:</strong> Trong tủ lạnh 2-8°C trước khi xử lý</li>
                </ol>

                <h4>Tiêu chí chất lượng mẫu:</h4>
                <ul>
                    <li><strong>Mẫu tế bào niêm mạc:</strong> Đủ lượng tế bào, không bị khô</li>
                    <li><strong>Mẫu máu:</strong> Không đông cục, không tan huyết</li>
                    <li><strong>Mẫu tóc:</strong> Có chân tóc, tối thiểu 10 sợi</li>
                    <li><strong>Mẫu móng:</strong> Sạch, không có sơn móng</li>
                </ul>

                <h3>⚗️ Bước 2: Xử lý sơ bộ và bảo quản</h3>
                <h4>Quy trình xử lý theo loại mẫu:</h4>

                <div className="sample-processing">
                    <div className="process-type">
                        <h4>Tế bào niêm mạc miệng:</h4>
                        <ul>
                            <li>Ngâm cotton swab trong buffer lysis chuyên dụng</li>
                            <li>Lắc nhẹ trong 10-15 phút để tế bào tách ra hoàn toàn</li>
                            <li>Ly tâm ở tốc độ 3000 rpm trong 5 phút để thu tế bào</li>
                            <li>Loại bỏ debris và tạp chất qua màng lọc 0.22μm</li>
                        </ul>
                    </div>
                    
                    <div className="process-type">
                        <h4>Mẫu máu:</h4>
                        <ul>
                            <li>Ly tâm ở 2500 rpm trong 10 phút để tách huyết tương và hồng cầu</li>
                            <li>Thu lấy lớp buffy coat (chứa bạch cầu và tiểu cầu)</li>
                            <li>Rửa 3 lần bằng PBS để loại bỏ hemoglobin</li>
                            <li>Chuẩn bị pellet tế bào cho bước chiết xuất ADN</li>
                        </ul>
                    </div>
                </div>

                <h3>🧪 Bước 3: Chiết tách ADN từ mẫu</h3>
                <h4>Phương pháp chiết tách hiện đại:</h4>
                
                <h4>A. Phương pháp Phenol-Chloroform (truyền thống):</h4>
                <ol>
                    <li>Phá vỡ màng tế bào bằng detergent</li>
                    <li>Loại bỏ protein bằng phenol</li>
                    <li>Tách pha bằng chloroform</li>
                    <li>Kết tủa ADN bằng ethanol</li>
                    <li>Hòa tan ADN trong buffer TE</li>
                </ol>

                <h4>B. Phương pháp Column-based (hiện đại):</h4>
                <ol>
                    <li>Lysate tế bào trong buffer đệm</li>
                    <li>ADN gắn vào silica membrane</li>
                    <li>Rửa loại bỏ tạp chất</li>
                    <li>Elution ADN tinh khiết</li>
                </ol>

                <h4>Kiểm tra chất lượng ADN:</h4>
                <ul>
                    <li><strong>Nồng độ:</strong> Đo bằng spectrophotometer (260/280 nm)</li>
                    <li><strong>Độ tinh khiết:</strong> Tỷ lệ A260/A280 = 1.8-2.0</li>
                    <li><strong>Tính toàn vẹn:</strong> Chạy gel điện di kiểm tra</li>
                    <li><strong>Không nhiễm bẩn:</strong> Kiểm tra RNA và protein</li>
                </ul>

                <h3>🔄 Bước 4: Khuếch đại PCR (Polymerase Chain Reaction)</h3>
                <h4>Nguyên tắc PCR cho xét nghiệm ADN:</h4>
                <p>PCR nhân bản đặc hiệu các loci STR cần thiết để phân tích. Chúng tôi sử dụng multiplex PCR để khuếch đại đồng thời 16-25 loci trong một phản ứng.</p>

                <h4>Thành phần phản ứng PCR:</h4>
                <ul>
                    <li><strong>Template ADN:</strong> 1-2ng ADN mẫu</li>
                    <li><strong>Primer mix:</strong> Các primer đặc hiệu cho STR loci</li>
                    <li><strong>Taq polymerase:</strong> Enzyme chịu nhiệt</li>
                    <li><strong>dNTPs:</strong> Nucleotide để tổng hợp</li>
                    <li><strong>Buffer và Mg2+:</strong> Môi trường phản ứng tối ưu</li>
                </ul>

                <h4>Chu kỳ nhiệt PCR (28-32 chu kỳ):</h4>
                <ol>
                    <li><strong>Denaturation (94°C - 30s):</strong> Tách chuỗi ADN kép</li>
                    <li><strong>Annealing (59°C - 60s):</strong> Primer gắn vào template</li>
                    <li><strong>Extension (72°C - 60s):</strong> Tổng hợp chuỗi mới</li>
                </ol>

                <h3>📊 Bước 5: Phân tích bằng hệ thống tự động</h3>
                <h4>Công nghệ Capillary Electrophoresis:</h4>
                <p>Sản phẩm PCR được phân tích bằng hệ thống điện di mao quản tự động với độ phân giải cao, có thể phân biệt các allele chỉ khác nhau 1 base pair.</p>

                <h4>Quy trình phân tích:</h4>
                <ol>
                    <li><strong>Chuẩn bị mẫu:</strong> Pha loãng sản phẩm PCR với formamide</li>
                    <li><strong>Injection:</strong> Bơm mẫu vào capillary bằng điện</li>
                    <li><strong>Separation:</strong> Phân tách theo kích thước phân tử</li>
                    <li><strong>Detection:</strong> Đọc tín hiệu huỳnh quang</li>
                    <li><strong>Data collection:</strong> Thu thập electropherogram</li>
                </ol>

                <h4>Phần mềm phân tích chuyên dụng:</h4>
                <ul>
                    <li><strong>GeneMapper ID-X:</strong> Phân tích STR profile</li>
                    <li><strong>Tự động calling allele:</strong> Xác định kích thước fragment</li>
                    <li><strong>Quality control:</strong> Kiểm tra các thông số kỹ thuật</li>
                    <li><strong>Artifact detection:</strong> Phát hiện và loại bỏ tạp nhiễu</li>
                </ul>

                <h3>📋 Bước 6: Đánh giá và báo cáo kết quả</h3>
                <h4>Phân tích thống kê:</h4>
                
                <div class="statistical-analysis">
                    <h4>Tính toán Paternity Index (PI):</h4>
                    <p>PI = Xác suất người đàn ông là cha / Xác suất người đàn ông ngẫu nhiên là cha</p>
                    
                    <h4>Combined Paternity Index (CPI):</h4>
                    <p>CPI = PI₁ × PI₂ × PI₃ × ... × PIₙ (cho tất cả loci)</p>
                    
                    <h4>Probability of Paternity:</h4>
                    <p>PP = CPI / (CPI + 1) × 100%</p>
                </div>

                <h4>Tiêu chuẩn kết luận:</h4>
                <ul>
                    <li><strong>Không loại trừ (PP ≥ 99.99%):</strong> Xác nhận quan hệ huyết thống</li>
                    <li><strong>Loại trừ:</strong> Có ≥ 3 loci không phù hợp</li>
                    <li><strong>Không kết luận:</strong> Khi mẫu không đủ chất lượng</li>
                </ul>

                <h3>🔒 Kiểm soát chất lượng và đảm bảo</h3>
                
                <h4>Quality Control trong từng bước:</h4>
                <ul>
                    <li><strong>Negative Control:</strong> Mẫu trắng để kiểm tra nhiễm bẩn</li>
                    <li><strong>Positive Control:</strong> ADN chuẩn đã biết profile</li>
                    <li><strong>Internal Standard:</strong> Marker để chuẩn hóa kích thước</li>
                    <li><strong>Reagent Blank:</strong> Kiểm tra độ tinh khiết hóa chất</li>
                </ul>

                <h4>Validation và Certification:</h4>
                <ul>
                    <li>Phòng thí nghiệm được chứng nhận ISO 17025</li>
                    <li>Tham gia chương trình kiểm tra năng lực quốc tế</li>
                    <li>Audit nội bộ định kỳ hàng quý</li>
                    <li>Đào tạo liên tục cho kỹ thuật viên</li>
                </ul>

                <h3>⏱️ Timeline và Delivery</h3>
                <div class="timeline">
                    <div class="day-item">
                        <h4>Ngày 1-2:</h4>
                        <p>Tiếp nhận mẫu, kiểm tra và chiết xuất ADN</p>
                    </div>
                    <div class="day-item">
                        <h4>Ngày 3-4:</h4>
                        <p>PCR amplification và điện di phân tích</p>
                    </div>
                    <div class="day-item">
                        <h4>Ngày 5-6:</h4>
                        <p>Phân tích dữ liệu và tính toán thống kê</p>
                    </div>
                    <div class="day-item">
                        <h4>Ngày 7:</h4>
                        <p>Review kết quả và gửi báo cáo</p>
                    </div>
                </div>

                <h3>🏆 Cam kết chất lượng</h3>
                <p>Quy trình phân tích mẫu ADN của chúng tôi đảm bảo:</p>
                <ul>
                    <li><strong>Độ chính xác 99.99%</strong> cho xét nghiệm huyết thống</li>
                    <li><strong>Tuân thủ nghiêm ngặt</strong> các tiêu chuẩn quốc tế</li>
                    <li><strong>Bảo mật tuyệt đối</strong> thông tin và mẫu khách hàng</li>
                    <li><strong>Truy xuất hoàn toàn</strong> mọi bước trong quy trình</li>
                </ul>

                <em>Với quy trình khoa học và kiểm soát chất lượng nghiêm ngặt, chúng tôi cam kết mang đến kết quả xét nghiệm ADN đáng tin cậy nhất cho khách hàng.</em>
            `
        },
        3: {
            title: 'Hệ thống quản lý và truy xuất mẫu',
            author: 'Đội công nghệ thông tin',
            date: '2025-01-13',
            readTime: '7 phút đọc',
            category: 'Kiến thức về ADN',
            image: '/logo.png',
            content: `
                <h2>🔍 Hệ thống quản lý và truy xuất mẫu thông minh - Đảm bảo chính xác 100%</h2>
                <p>Hệ thống quản lý mẫu hiện đại của chúng tôi được thiết kế với công nghệ tiên tiến nhất, đảm bảo việc theo dõi và truy xuất mẫu một cách chính xác tuyệt đối. Mỗi mẫu đều được gắn định danh duy nhất và theo dõi xuyên suốt toàn bộ quy trình từ thu thập đến phân tích kết quả.</p>
                
                <h3>💻 Công nghệ LIMS (Laboratory Information Management System)</h3>
                <p>Chúng tôi áp dụng hệ thống LIMS tiên tiến để quản lý toàn bộ quy trình xét nghiệm ADN:</p>
                
                <h4>Tính năng chính của hệ thống LIMS:</h4>
                <ul>
                    <li><strong>Quản lý mẫu tự động:</strong> Tự động ghi nhận, phân loại và theo dõi mẫu</li>
                    <li><strong>Workflow management:</strong> Điều phối quy trình xử lý mẫu hiệu quả</li>
                    <li><strong>Quality control:</strong> Kiểm soát chất lượng tự động tại mọi bước</li>
                    <li><strong>Data integrity:</strong> Đảm bảo tính toàn vẹn của dữ liệu</li>
                    <li><strong>Audit trail:</strong> Ghi nhận mọi thay đổi và truy cập</li>
                </ul>

                <h3>🏷️ Hệ thống định danh mẫu đa lớp</h3>
                
                <h4>1. Mã vạch (Barcode) 2D chuyên dụng:</h4>
                <div class="sample-identification">
                    <div class="id-method">
                        <h4>📱 QR Code Matrix</h4>
                        <ul>
                            <li>Chứa 2,500+ ký tự thông tin</li>
                            <li>Có thể đọc từ mọi góc độ</li>
                            <li>Chống bám bụi, hóa chất</li>
                            <li>Backup thông tin tự động</li>
                        </ul>
                    </div>
                    
                    <div class="id-method">
                        <h4>🔢 RFID Chip tích hợp</h4>
                        <ul>
                            <li>Đọc không tiếp xúc từ xa 10cm</li>
                            <li>Chống nhiễu từ trường</li>
                            <li>Tuổi thọ 10+ năm</li>
                            <li>Mã hóa AES-128</li>
                        </ul>
                    </div>
                    
                    <div class="id-method">
                        <h4>🏷️ Human-readable Code</h4>
                        <ul>
                            <li>Mã số dễ đọc cho con người</li>
                            <li>Format: YY-MM-DD-XXXX-ZZ</li>
                            <li>Check digit để phát hiện lỗi</li>
                            <li>Font OCR-A chuẩn quốc tế</li>
                        </ul>
                    </div>
                </div>

                <h3>📊 Quy trình truy xuất thông tin mẫu</h3>
                
                <h4>Bước 1: Tiếp nhận và đăng ký mẫu</h4>
                <ol>
                    <li><strong>Scan mã vạch:</strong> Tự động nhập thông tin vào hệ thống</li>
                    <li><strong>Xác thực danh tính:</strong> So khớp với CMND/CCCD (ADN pháp lý)</li>
                    <li><strong>Chụp ảnh mẫu:</strong> Lưu trữ hình ảnh thực tế của mẫu</li>
                    <li><strong>Ghi nhận thời gian:</strong> Timestamp chính xác đến giây</li>
                    <li><strong>Phân bổ vị trí:</strong> Gán vị trí cụ thể trong kho bảo quản</li>
                </ol>

                <h4>Bước 2: Theo dõi trong quy trình xử lý</h4>
                <div class="tracking-process">
                    <div class="process-stage">
                        <h4>🧊 Bảo quản</h4>
                        <ul>
                            <li>Vị trí: Tủ lạnh/Freezer cụ thể</li>
                            <li>Nhiệt độ: Monitor 24/7</li>
                            <li>Thời gian: Tự động cập nhật</li>
                            <li>Trạng thái: Available/In-process</li>
                        </ul>
                    </div>
                    
                    <div class="process-stage">
                        <h4>⚗️ Xử lý</h4>
                        <ul>
                            <li>Kỹ thuật viên: ID và chữ ký số</li>
                            <li>Thiết bị: Serial number máy móc</li>
                            <li>Thời gian: Start/End time</li>
                            <li>Kết quả: Pass/Fail/Retest</li>
                        </ul>
                    </div>
                    
                    <div class="process-stage">
                        <h4>📋 Báo cáo</h4>
                        <ul>
                            <li>Review: Supervisor approval</li>
                            <li>QC: Quality control check</li>
                            <li>Delivery: Gửi kết quả</li>
                            <li>Archive: Lưu trữ dài hạn</li>
                        </ul>
                    </div>
                </div>

                <h3>🔐 Bảo mật và kiểm soát truy cập</h3>
                
                <h4>Hệ thống phân quyền đa cấp:</h4>
                <ul>
                    <li><strong>Level 1 - Sample Handler:</strong> Chỉ xem thông tin cơ bản</li>
                    <li><strong>Level 2 - Technician:</strong> Cập nhật tiến độ xử lý</li>
                    <li><strong>Level 3 - Supervisor:</strong> Duyệt kết quả, báo cáo</li>
                    <li><strong>Level 4 - Administrator:</strong> Toàn quyền hệ thống</li>
                    <li><strong>Level 5 - Audit:</strong> Chỉ đọc, không sửa đổi</li>
                </ul>

                <h4>Các biện pháp bảo mật:</h4>
                <ul>
                    <li><strong>Two-factor Authentication:</strong> Xác thực 2 yếu tố bắt buộc</li>
                    <li><strong>IP Whitelist:</strong> Chỉ truy cập từ IP được phép</li>
                    <li><strong>Session timeout:</strong> Tự động đăng xuất sau 30 phút</li>
                    <li><strong>Encryption:</strong> Mã hóa AES-256 toàn bộ dữ liệu</li>
                    <li><strong>Backup:</strong> Sao lưu real-time và daily backup</li>
                </ul>

                <h3>📱 Ứng dụng di động cho khách hàng</h3>
                
                <h4>Tính năng Mobile App "DNA Tracker":</h4>
                <ul>
                    <li><strong>Tra cứu tình trạng:</strong> Scan QR code để xem tiến độ</li>
                    <li><strong>Thông báo push:</strong> Cập nhật real-time mọi bước</li>
                    <li><strong>Lịch sử mẫu:</strong> Xem tất cả mẫu đã gửi</li>
                    <li><strong>Tài liệu điện tử:</strong> Download báo cáo, hóa đơn</li>
                    <li><strong>Hỗ trợ trực tuyến:</strong> Chat với kỹ thuật viên</li>
                </ul>

                <h4>Dashboard khách hàng:</h4>
                <div class="customer-dashboard">
                    <div class="dashboard-feature">
                        <h4>📊 Tổng quan mẫu</h4>
                        <ul>
                            <li>Tổng số mẫu đã gửi</li>
                            <li>Mẫu đang xử lý</li>
                            <li>Kết quả đã hoàn thành</li>
                            <li>Mẫu cần bổ sung</li>
                        </ul>
                    </div>
                    
                    <div class="dashboard-feature">
                        <h4>⏱️ Timeline chi tiết</h4>
                        <ul>
                            <li>Thời gian nhận mẫu</li>
                            <li>Bắt đầu xử lý</li>
                            <li>Các bước trung gian</li>
                            <li>Dự kiến hoàn thành</li>
                        </ul>
                    </div>
                    
                    <div class="dashboard-feature">
                        <h4>📄 Tài liệu liên quan</h4>
                        <ul>
                            <li>Hợp đồng dịch vụ</li>
                            <li>Hóa đơn thanh toán</li>
                            <li>Báo cáo kết quả</li>
                            <li>Chứng nhận chất lượng</li>
                        </ul>
                    </div>
                </div>

                <h3>🚨 Hệ thống cảnh báo và xử lý sự cố</h3>
                
                <h4>Giám sát tự động 24/7:</h4>
                <ul>
                    <li><strong>Temperature alert:</strong> Cảnh báo nhiệt độ bảo quản</li>
                    <li><strong>Power failure:</strong> UPS backup và thông báo mất điện</li>
                    <li><strong>System downtime:</strong> Monitor server và database</li>
                    <li><strong>Access violation:</strong> Phát hiện truy cập bất thường</li>
                    <li><strong>Sample integrity:</strong> Kiểm tra tính toàn vẹn mẫu</li>
                </ul>

                <h4>Quy trình xử lý sự cố:</h4>
                <ol>
                    <li><strong>Phát hiện tự động:</strong> Hệ thống AI phát hiện bất thường</li>
                    <li><strong>Thông báo ngay lập tức:</strong> SMS/Email/Push notification</li>
                    <li><strong>Kích hoạt backup:</strong> Chuyển sang hệ thống dự phòng</li>
                    <li><strong>Báo cáo sự cố:</strong> Ghi nhận chi tiết vào log</li>
                    <li><strong>Khắc phục:</strong> Action plan và timeline cụ thể</li>
                    <li><strong>Kiểm tra sau sự cố:</strong> Verify tính toàn vẹn dữ liệu</li>
                </ol>

                <h3>📈 Thống kê và báo cáo hiệu suất</h3>
                
                <h4>KPI chính được theo dõi:</h4>
                <div class="kpi-metrics">
                    <div class="metric-item">
                        <h4>99.99%</h4>
                        <p>Độ chính xác truy xuất mẫu</p>
                    </div>
                    <div class="metric-item">
                        <h4>< 2 phút</h4>
                        <p>Thời gian tìm kiếm mẫu</p>
                    </div>
                    <div class="metric-item">
                        <h4>100%</h4>
                        <p>Khôi phục sau sự cố</p>
                    </div>
                    <div class="metric-item">
                        <h4>24/7</h4>
                        <p>Giám sát liên tục</p>
                    </div>
                </div>

                <h3>🌐 Tuân thủ tiêu chuẩn quốc tế</h3>
                
                <h4>Chứng nhận và tiêu chuẩn:</h4>
                <ul>
                    <li><strong>ISO/IEC 17025:2017</strong> - Năng lực phòng thí nghiệm</li>
                    <li><strong>ISO 15189:2012</strong> - Phòng thí nghiệm y học</li>
                    <li><strong>CAP (College of American Pathologists)</strong> - Tiêu chuẩn Mỹ</li>
                    <li><strong>AABB Standards</strong> - Hiệp hội Ngân hàng máu Mỹ</li>
                    <li><strong>GDPR Compliance</strong> - Bảo vệ dữ liệu cá nhân EU</li>
                    <li><strong>Vietnam PDPA</strong> - Luật bảo vệ dữ liệu Việt Nam</li>
                </ul>

                <h3>🎯 Lợi ích cho khách hàng</h3>
                
                <h4>Minh bạch hoàn toàn:</h4>
                <ul>
                    <li>Theo dõi tiến độ real-time</li>
                    <li>Lịch sử chi tiết mọi thao tác</li>
                    <li>Thông báo proactive</li>
                    <li>Hỗ trợ 24/7</li>
                </ul>

                <h4>Tin cậy tuyệt đối:</h4>
                <ul>
                    <li>Không nhầm lẫn mẫu 100%</li>
                    <li>Bảo mật thông tin tối đa</li>
                    <li>Backup đa lớp an toàn</li>
                    <li>Truy xuất nguồn gốc hoàn toàn</li>
                </ul>

                <h3>🏆 Cam kết chất lượng</h3>
                <p>Hệ thống quản lý và truy xuất mẫu của chúng tôi đảm bảo:</p>
                <ul>
                    <li><strong>Zero-error policy:</strong> Cam kết 0% nhầm lẫn mẫu</li>
                    <li><strong>Real-time tracking:</strong> Theo dõi 24/7 không gián đoạn</li>
                    <li><strong>Compliance ready:</strong> Tuân thủ mọi tiêu chuẩn quốc tế</li>
                    <li><strong>Customer-centric:</strong> Đặt khách hàng làm trung tâm</li>
                </ul>

                <em>Với hệ thống quản lý mẫu thông minh và hiện đại, chúng tôi mang đến sự yên tâm tuyệt đối cho khách hàng về độ chính xác, bảo mật và minh bạch trong toàn bộ quy trình xét nghiệm ADN.</em>
            `
        },
        4: {
            title: 'Độ chính xác và độ tin cậy',
            author: 'Đội kiểm soát chất lượng',
            date: '2025-01-12',
            readTime: '6 phút đọc',
            category: 'Kiến thức về ADN',
            image: '/logo.png',
            content: `
                <h2>🎯 Độ chính xác 99.99% - Tiêu chuẩn vàng trong xét nghiệm ADN</h2>
                <p>Độ chính xác là yếu tố quan trọng nhất và cũng là lý do khách hàng tin tưởng lựa chọn dịch vụ xét nghiệm ADN. Với hệ thống kiểm soát chất lượng nghiêm ngặt và công nghệ hiện đại, chúng tôi đạt được độ chính xác 99.99% - mức tiêu chuẩn cao nhất trong ngành.</p>
                
                <h3>📊 Các chỉ số độ chính xác cụ thể</h3>
                
                <h4>Độ chính xác theo loại xét nghiệm:</h4>
                <div class="accuracy-breakdown">
                    <div class="accuracy-item">
                        <h4>99.99%</h4>
                        <p><strong>Xét nghiệm cha-con trực tiếp</strong></p>
                        <small>Khi có mẫu từ cả cha và con</small>
                    </div>
                    <div class="accuracy-item">
                        <h4>99.95%</h4>
                        <p><strong>Xét nghiệm mẹ-con</strong></p>
                        <small>Bao gồm phân tích mtDNA</small>
                    </div>
                    <div class="accuracy-item">
                        <h4>99.90%</h4>
                        <p><strong>Xét nghiệm anh em ruột</strong></p>
                        <small>Phân tích độ tương đồng ADN</small>
                    </div>
                    <div class="accuracy-item">
                        <h4>99.85%</h4>
                        <p><strong>Xét nghiệm ông/bà-cháu</strong></p>
                        <small>Qua Y-chromosome/mtDNA</small>
                    </div>
                    <div class="accuracy-item">
                        <h4>99.80%</h4>
                        <p><strong>Xét nghiệm thai nhi</strong></p>
                        <small>ADN tự do trong máu mẹ</small>
                    </div>
                </div>

                <h3>🔬 Yếu tố ảnh hưởng đến độ chính xác</h3>
                
                <h4>1. Chất lượng mẫu ADN</h4>
                <div class="quality-factors">
                    <div class="factor-category">
                        <h4>✅ Mẫu chất lượng cao:</h4>
                        <ul>
                            <li><strong>Tế bào niêm mạc tươi:</strong> > 95% độ chính xác</li>
                            <li><strong>Máu trong EDTA:</strong> > 99% độ chính xác</li>
                            <li><strong>Tóc có chân rõ ràng:</strong> > 90% độ chính xác</li>
                            <li><strong>Mẫu được bảo quản tốt:</strong> Ít bị phân hủy</li>
                        </ul>
                    </div>
                    
                    <div class="factor-category">
                        <h4>⚠️ Mẫu chất lượng thấp:</h4>
                        <ul>
                            <li><strong>Mẫu cũ > 1 tuần:</strong> Có thể bị degradation</li>
                            <li><strong>Móng tay có sơn:</strong> Giảm 10-15% hiệu quả</li>
                            <li><strong>Mẫu nhiễm bẩn:</strong> Cần làm sạch trước xử lý</li>
                            <li><strong>Lượng ADN thấp:</strong> Cần thu thập thêm</li>
                        </ul>
                    </div>
                </div>

                <h4>2. Số lượng loci STR được phân tích</h4>
                <ul>
                    <li><strong>16 loci:</strong> Độ chính xác cơ bản 99.9%</li>
                    <li><strong>21 loci:</strong> Độ chính xác tiêu chuẩn 99.99%</li>
                    <li><strong>25 loci:</strong> Độ chính xác cao nhất 99.999%</li>
                    <li><strong>Y-STR (12 loci):</strong> Cho dòng họ nam giới</li>
                    <li><strong>mtDNA (HV1/HV2):</strong> Cho dòng họ nữ giới</li>
                </ul>

                <h4>3. Chất lượng quy trình kỹ thuật</h4>
                <ul>
                    <li><strong>Chiết xuất ADN:</strong> Sử dụng kit chuẩn quốc tế</li>
                    <li><strong>PCR amplification:</strong> Multiplex với primer chất lượng cao</li>
                    <li><strong>Điện di phân tích:</strong> Capillary electrophoresis độ phân giải cao</li>
                    <li><strong>Data analysis:</strong> Phần mềm chuyên dụng GeneMapper ID-X</li>
                </ul>

                <h3>🛡️ Hệ thống kiểm soát chất lượng (QC/QA)</h3>
                
                <h4>Quality Control trong từng bước:</h4>
                
                <h4>A. Kiểm soát Pre-analytical:</h4>
                <ol>
                    <li><strong>Sample intake:</strong> Kiểm tra thông tin và chất lượng mẫu</li>
                    <li><strong>Chain of custody:</strong> Đảm bảo chuỗi bảo quản liên tục</li>
                    <li><strong>Storage monitoring:</strong> Giám sát nhiệt độ và điều kiện bảo quản</li>
                    <li><strong>Contamination prevention:</strong> Phòng ngừa nhiễm chéo</li>
                </ol>

                <h4>B. Kiểm soát Analytical:</h4>
                <ol>
                    <li><strong>Negative Control:</strong> Mẫu trống để phát hiện contamination</li>
                    <li><strong>Positive Control:</strong> ADN chuẩn để kiểm tra hệ thống</li>
                    <li><strong>Internal Standard:</strong> Size marker để chuẩn hóa</li>
                    <li><strong>Reagent QC:</strong> Kiểm tra chất lượng hóa chất</li>
                    <li><strong>Equipment calibration:</strong> Hiệu chuẩn thiết bị định kỳ</li>
                </ol>

                <h4>C. Kiểm soát Post-analytical:</h4>
                <ol>
                    <li><strong>Data review:</strong> Kiểm tra kỹ lưỡng electropherogram</li>
                    <li><strong>Statistical analysis:</strong> Tính toán PI, CPI, PP</li>
                    <li><strong>Independent verification:</strong> Kiểm tra độc lập bởi chuyên gia khác</li>
                    <li><strong>Report validation:</strong> Xác thực báo cáo cuối cùng</li>
                </ol>

                <h3>📈 Phương pháp tính toán độ tin cậy</h3>
                
                <h4>Các chỉ số thống kê chính:</h4>
                
                <div class="statistical-metrics">
                    <div class="metric-explanation">
                        <h4>🔢 Paternity Index (PI)</h4>
                        <p><strong>Công thức:</strong> PI = Probability(Alleged Father is true father) / Probability(Random man is true father)</p>
                        <p><strong>Ý nghĩa:</strong> Tỷ lệ khả năng người đàn ông này là cha so với người đàn ông ngẫu nhiên</p>
                        <p><strong>Ví dụ:</strong> PI = 1000 có nghĩa là khả năng này gấp 1000 lần so với ngẫu nhiên</p>
                    </div>
                    
                    <div class="metric-explanation">
                        <h4>🎯 Combined Paternity Index (CPI)</h4>
                        <p><strong>Công thức:</strong> CPI = PI₁ × PI₂ × PI₃ × ... × PIₙ</p>
                        <p><strong>Ý nghĩa:</strong> Tích các PI từ tất cả loci được phân tích</p>
                        <p><strong>Yêu cầu:</strong> CPI ≥ 10,000 để kết luận "không loại trừ"</p>
                    </div>
                    
                    <div class="metric-explanation">
                        <h4>📊 Probability of Paternity (PP)</h4>
                        <p><strong>Công thức:</strong> PP = CPI / (CPI + 1) × 100%</p>
                        <p><strong>Ý nghĩa:</strong> Xác suất phần trăm quan hệ huyết thống</p>
                        <p><strong>Tiêu chuẩn:</strong> PP ≥ 99.99% = "Không loại trừ quan hệ cha con"</p>
                    </div>
                </div>

                <h3>🎯 Các trường hợp đặc biệt</h3>
                
                <h4>Xử lý các tình huống phức tạp:</h4>
                
                <h4>1. Mutation (Đột biến gen):</h4>
                <ul>
                    <li><strong>Tần suất:</strong> 1/1000 - 1/10000 allele</li>
                    <li><strong>Xử lý:</strong> Phân tích thêm loci khác</li>
                    <li><strong>Tác động:</strong> Không ảnh hưởng kết luận cuối</li>
                    <li><strong>Báo cáo:</strong> Ghi chú rõ trong kết quả</li>
                </ul>

                <h4>2. Null allele (Allele âm tính):</h4>
                <ul>
                    <li><strong>Nguyên nhân:</strong> Primer dropout</li>
                    <li><strong>Giải pháp:</strong> Sử dụng primer kit khác</li>
                    <li><strong>Xác nhận:</strong> Re-test với điều kiện khác</li>
                </ul>

                <h4>3. Mixed samples (Mẫu hỗn hợp):</h4>
                <ul>
                    <li><strong>Phát hiện:</strong> Xuất hiện > 2 allele/locus</li>
                    <li><strong>Xử lý:</strong> Phân tách bằng kỹ thuật đặc biệt</li>
                    <li><strong>Quy trình:</strong> STR separation protocol</li>
                </ul>

                <h3>🏆 Chứng nhận chất lượng quốc tế</h3>
                
                <h4>Các tiêu chuẩn được tuân thủ:</h4>
                <ul>
                    <li><strong>ISO/IEC 17025:2017</strong> - General requirements for competence of testing laboratories</li>
                    <li><strong>ISO 15189:2012</strong> - Medical laboratories requirements for quality and competence</li>
                    <li><strong>AABB Standards</strong> - American Association of Blood Banks</li>
                    <li><strong>CAP Guidelines</strong> - College of American Pathologists</li>
                    <li><strong>ENFSI Guidelines</strong> - European Network of Forensic Science Institutes</li>
                    <li><strong>DAkkS Accreditation</strong> - German national accreditation body</li>
                </ul>

                <h4>Chương trình External Quality Assessment:</h4>
                <ul>
                    <li><strong>CAP Surveys:</strong> Tham gia 2 lần/năm</li>
                    <li><strong>GEDNAP:</strong> German DNA Profiling Group</li>
                    <li><strong>ENFSI Collaborative Exercises:</strong> EU proficiency testing</li>
                    <li><strong>Kết quả:</strong> Đạt 100% các đợt kiểm tra năng lực</li>
                </ul>

                <h3>⚡ Công nghệ nâng cao độ chính xác</h3>
                
                <h4>1. Next Generation Sequencing (NGS):</h4>
                <ul>
                    <li><strong>Ưu điểm:</strong> Phân tích sequence level</li>
                    <li><strong>Ứng dụng:</strong> Các trường hợp phức tạp</li>
                    <li><strong>Độ phân giải:</strong> Single nucleotide level</li>
                    <li><strong>Chi phí:</strong> Cao hơn nhưng chính xác hơn</li>
                </ul>

                <h4>2. Massive Parallel Sequencing (MPS):</h4>
                <ul>
                    <li><strong>Thông lượng:</strong> Millions of reads đồng thời</li>
                    <li><strong>Ứng dụng:</strong> Degraded samples</li>
                    <li><strong>Thời gian:</strong> 24-48h cho kết quả</li>
                </ul>

                <h4>3. Digital PCR:</h4>
                <ul>
                    <li><strong>Nguyên lý:</strong> Absolute quantification</li>
                    <li><strong>Ưu điểm:</strong> Không cần standard curve</li>
                    <li><strong>Độ chính xác:</strong> > 99.99%</li>
                </ul>

                <h3>📋 Báo cáo và diễn giải kết quả</h3>
                
                <h4>Cấu trúc báo cáo chuẩn:</h4>
                <ol>
                    <li><strong>Thông tin mẫu:</strong> ID, ngày nhận, loại mẫu</li>
                    <li><strong>Phương pháp:</strong> Kỹ thuật và kit sử dụng</li>
                    <li><strong>Kết quả STR:</strong> Profile ADN đầy đủ</li>
                    <li><strong>Tính toán thống kê:</strong> PI, CPI, PP</li>
                    <li><strong>Kết luận:</strong> Có/không quan hệ huyết thống</li>
                    <li><strong>Diễn giải:</strong> Ý nghĩa kết quả</li>
                    <li><strong>Chữ ký:</strong> Kỹ thuật viên và giám đốc kỹ thuật</li>
                </ol>

                <h3>💯 Cam kết về độ chính xác</h3>
                
                <div class="accuracy-commitment">
                    <div class="commitment-item">
                        <h4>🎯 99.99%</h4>
                        <p>Độ chính xác đảm bảo</p>
                    </div>
                    <div class="commitment-item">
                        <h4>🔬 3 lần</h4>
                        <p>Kiểm tra độc lập</p>
                    </div>
                    <div class="commitment-item">
                        <h4>📊 25 loci</h4>
                        <p>STR markers phân tích</p>
                    </div>
                    <div class="commitment-item">
                        <h4>🏆 100%</h4>
                        <p>Tuân thủ tiêu chuẩn quốc tế</p>
                    </div>
                </div>

                <h3>🔄 Quy trình tái kiểm tra</h3>
                <p>Trong trường hợp hiếm hoi có nghi ngờ về kết quả:</p>
                <ul>
                    <li><strong>Retest miễn phí:</strong> Với mẫu backup</li>
                    <li><strong>Independent lab:</strong> Gửi lab khác kiểm tra</li>
                    <li><strong>Additional markers:</strong> Phân tích thêm loci</li>
                    <li><strong>Technical review:</strong> Hội đồng chuyên gia đánh giá</li>
                </ul>

                <em>Với hệ thống kiểm soát chất lượng nghiêm ngặt và công nghệ tiên tiến, chúng tôi tự tin cam kết mang đến độ chính xác cao nhất trong từng kết quả xét nghiệm ADN, xứng đáng với niềm tin của khách hàng.</em>
            `
        },
        5: {
            title: 'Chính sách bảo mật thông tin',
            author: 'Đội bảo mật thông tin',
            date: '2025-01-11',
            readTime: '5 phút đọc',
            category: 'Kiến thức về ADN',
            image: '/logo.png',
            content: `
                <h2>🔐 Chính sách bảo mật thông tin - Bảo vệ quyền riêng tư tuyệt đối</h2>
                <p>Chính sách bảo mật thông tin của chúng tôi được xây dựng theo tiêu chuẩn cao nhất quốc tế, đảm bảo thông tin cá nhân và kết quả xét nghiệm ADN của khách hàng được bảo vệ tuyệt đối. Chúng tôi tuân thủ nghiêm ngặt các quy định pháp luật về bảo vệ dữ liệu cá nhân và áp dụng công nghệ bảo mật tiên tiến nhất.</p>
                
                <h3>🛡️ Khung chính sách bảo mật toàn diện</h3>
                
                <h4>Nguyên tắc cơ bản của chính sách bảo mật:</h4>
                <ul>
                    <li><strong>Confidentiality (Bảo mật):</strong> Thông tin chỉ được truy cập bởi người có thẩm quyền</li>
                    <li><strong>Integrity (Toàn vẹn):</strong> Dữ liệu không bị thay đổi trái phép</li>
                    <li><strong>Availability (Sẵn sàng):</strong> Thông tin luôn có sẵn khi cần thiết</li>
                    <li><strong>Accountability (Trách nhiệm):</strong> Mọi thao tác đều được ghi nhận và truy xuất</li>
                    <li><strong>Non-repudiation (Không thể chối bỏ):</strong> Không thể phủ nhận các hành động đã thực hiện</li>
                </ul>

                <h3>🔒 Hệ thống mã hóa dữ liệu đa lớp</h3>
                
                <h4>1. Mã hóa dữ liệu (Data Encryption):</h4>
                <div class="encryption-layers">
                    <div class="encryption-method">
                        <h4>🔐 AES-256 Encryption</h4>
                        <ul>
                            <li><strong>Thuật toán:</strong> Advanced Encryption Standard 256-bit</li>
                            <li><strong>Độ bảo mật:</strong> Military-grade, chuẩn NSA</li>
                            <li><strong>Ứng dụng:</strong> Mã hóa tất cả dữ liệu lưu trữ</li>
                            <li><strong>Key management:</strong> HSM (Hardware Security Module)</li>
                        </ul>
                    </div>
                    
                    <div class="encryption-method">
                        <h4>🌐 TLS 1.3 for Transit</h4>
                        <ul>
                            <li><strong>Bảo vệ:</strong> Dữ liệu truyền tải trên Internet</li>
                            <li><strong>Chứng chỉ:</strong> SSL Certificate Extended Validation</li>
                            <li><strong>Forward Secrecy:</strong> Perfect Forward Secrecy (PFS)</li>
                            <li><strong>Cipher Suite:</strong> AEAD (Authenticated Encryption)</li>
                        </ul>
                    </div>
                    
                    <div class="encryption-method">
                        <h4>🔑 RSA-4096 for Keys</h4>
                        <ul>
                            <li><strong>Mục đích:</strong> Trao đổi khóa mã hóa</li>
                            <li><strong>Độ dài key:</strong> 4096-bit minimum</li>
                            <li><strong>Signing:</strong> SHA-256 with RSA</li>
                            <li><strong>Key rotation:</strong> Thay đổi định kỳ 90 ngày</li>
                        </ul>
                    </div>
                </div>

                <h3>👥 Hệ thống phân quyền truy cập (Access Control)</h3>
                
                <h4>Role-Based Access Control (RBAC):</h4>
                
                <h4>A. Cấp độ truy cập nhân viên:</h4>
                <ul>
                    <li><strong>Level 1 - Sample Handler:</strong> Chỉ xem ID mẫu, không xem thông tin cá nhân</li>
                    <li><strong>Level 2 - Lab Technician:</strong> Truy cập dữ liệu kỹ thuật, không xem tên khách hàng</li>
                    <li><strong>Level 3 - Senior Technician:</strong> Xem kết quả, cập nhật tiến độ</li>
                    <li><strong>Level 4 - Quality Manager:</strong> Duyệt kết quả, báo cáo chất lượng</li>
                    <li><strong>Level 5 - Lab Director:</strong> Toàn quyền kỹ thuật, không truy cập billing</li>
                    <li><strong>Level 6 - Privacy Officer:</strong> Quản lý chính sách bảo mật, audit logs</li>
                    <li><strong>Level 7 - System Admin:</strong> Quản lý hệ thống, không xem dữ liệu khách hàng</li>
                </ul>

                <h4>B. Cấp độ truy cập khách hàng:</h4>
                <ul>
                    <li><strong>Customer Portal:</strong> Chỉ xem thông tin và kết quả của mình</li>
                    <li><strong>Guardian Access:</strong> Phụ huynh xem thông tin con dưới 18 tuổi</li>
                    <li><strong>Legal Representative:</strong> Theo giấy ủy quyền hợp pháp</li>
                    <li><strong>Emergency Access:</strong> Y tế khẩn cấp với xác thực đặc biệt</li>
                </ul>

                <h3>🔐 Xác thực đa yếu tố (Multi-Factor Authentication)</h3>
                
                <h4>Các phương thức xác thực bắt buộc:</h4>
                
                <h4>1. Nhân viên (3 yếu tố):</h4>
                <ul>
                    <li><strong>Something you know:</strong> Password phức tạp (12+ ký tự)</li>
                    <li><strong>Something you have:</strong> Smart card/USB token</li>
                    <li><strong>Something you are:</strong> Vân tay hoặc nhận dạng khuôn mặt</li>
                    <li><strong>Geo-location:</strong> Chỉ truy cập từ địa điểm được phép</li>
                </ul>

                <h4>2. Khách hàng (2 yếu tố):</h4>
                <ul>
                    <li><strong>Username/Password:</strong> Tài khoản cá nhân</li>
                    <li><strong>SMS OTP:</strong> Mã xác thực qua điện thoại</li>
                    <li><strong>Email verification:</strong> Xác nhận qua email đã đăng ký</li>
                    <li><strong>Security questions:</strong> Câu hỏi bảo mật cá nhân</li>
                </ul>

                <h3>📊 Giám sát và ghi nhận hoạt động (Audit & Monitoring)</h3>
                
                <h4>Hệ thống SIEM (Security Information and Event Management):</h4>
                
                <h4>A. Ghi nhận toàn diện:</h4>
                <ul>
                    <li><strong>User activities:</strong> Mọi thao tác của người dùng</li>
                    <li><strong>System events:</strong> Sự kiện hệ thống và ứng dụng</li>
                    <li><strong>Network traffic:</strong> Luồng dữ liệu mạng</li>
                    <li><strong>Database queries:</strong> Truy vấn cơ sở dữ liệu</li>
                    <li><strong>File access:</strong> Truy cập tệp và thư mục</li>
                </ul>

                <h4>B. Phát hiện bất thường:</h4>
                <ul>
                    <li><strong>Unusual login patterns:</strong> Đăng nhập bất thường</li>
                    <li><strong>Multiple failed attempts:</strong> Nhiều lần đăng nhập sai</li>
                    <li><strong>Off-hours access:</strong> Truy cập ngoài giờ làm việc</li>
                    <li><strong>Bulk data downloads:</strong> Tải xuống dữ liệu hàng loạt</li>
                    <li><strong>Privilege escalation:</strong> Nâng quyền bất thường</li>
                </ul>

                <h4>C. Cảnh báo real-time:</h4>
                <ul>
                    <li><strong>Immediate alerts:</strong> SMS/Email ngay lập tức</li>
                    <li><strong>Dashboard monitoring:</strong> Theo dõi 24/7</li>
                    <li><strong>Automated response:</strong> Phản ứng tự động</li>
                    <li><strong>Escalation procedures:</strong> Quy trình báo cáo cấp trên</li>
                </ul>

                <h3>💾 Bảo vệ dữ liệu và sao lưu</h3>
                
                <h4>Chiến lược backup 3-2-1:</h4>
                <ul>
                    <li><strong>3 bản sao:</strong> Primary + 2 backup copies</li>
                    <li><strong>2 phương tiện:</strong> Lưu trữ trên 2 loại media khác nhau</li>
                    <li><strong>1 offsite:</strong> Ít nhất 1 bản sao lưu xa địa điểm chính</li>
                </ul>

                <h4>Phương thức sao lưu:</h4>
                <div class="backup-methods">
                    <div class="backup-type">
                        <h4>🔄 Continuous Backup</h4>
                        <ul>
                            <li>Real-time replication</li>
                            <li>RPO < 15 phút</li>
                            <li>RTO < 1 giờ</li>
                            <li>Automated failover</li>
                        </ul>
                    </div>
                    
                    <div class="backup-type">
                        <h4>📅 Scheduled Backup</h4>
                        <ul>
                            <li>Daily incremental</li>
                            <li>Weekly full backup</li>
                            <li>Monthly archive</li>
                            <li>Yearly compliance backup</li>
                        </ul>
                    </div>
                    
                    <div class="backup-type">
                        <h4>☁️ Cloud Storage</h4>
                        <ul>
                            <li>AWS S3 Glacier</li>
                            <li>Multi-region replication</li>
                            <li>Versioning enabled</li>
                            <li>Lifecycle policies</li>
                        </ul>
                    </div>
                </div>

                <h3>⚖️ Tuân thủ pháp luật và tiêu chuẩn</h3>
                
                <h4>A. Luật pháp Việt Nam:</h4>
                <ul>
                    <li><strong>Luật An toàn thông tin mạng 2015:</strong> Bảo vệ dữ liệu cá nhân</li>
                    <li><strong>Nghị định 13/2023/NĐ-CP:</strong> Bảo vệ dữ liệu cá nhân</li>
                    <li><strong>Thông tư 47/2020/TT-BTTT:</strong> An toàn thông tin</li>
                    <li><strong>Luật Y tế 2009:</strong> Bảo mật thông tin y tế</li>
                </ul>

                <h4>B. Tiêu chuẩn quốc tế:</h4>
                <ul>
                    <li><strong>GDPR (EU):</strong> General Data Protection Regulation</li>
                    <li><strong>HIPAA (US):</strong> Health Insurance Portability and Accountability Act</li>
                    <li><strong>ISO 27001:2013:</strong> Information Security Management</li>
                    <li><strong>ISO 27002:2022:</strong> Information Security Controls</li>
                    <li><strong>SOC 2 Type II:</strong> Service Organization Control</li>
                </ul>

                <h3>🔄 Quy trình xử lý sự cố bảo mật</h3>
                
                <h4>Incident Response Plan (IRP):</h4>
                
                <h4>Phase 1: Preparation (Chuẩn bị)</h4>
                <ul>
                    <li>Đào tạo đội ngũ ứng phó sự cố</li>
                    <li>Thiết lập quy trình và công cụ</li>
                    <li>Xây dựng contact list khẩn cấp</li>
                    <li>Lập kế hoạch communication</li>
                </ul>

                <h4>Phase 2: Detection & Analysis (Phát hiện & Phân tích)</h4>
                <ul>
                    <li><strong>Thời gian phát hiện:</strong> < 15 phút</li>
                    <li><strong>Phân loại mức độ:</strong> Low/Medium/High/Critical</li>
                    <li><strong>Impact assessment:</strong> Đánh giá tác động</li>
                    <li><strong>Evidence collection:</strong> Thu thập bằng chứng</li>
                </ul>

                <h4>Phase 3: Containment (Ngăn chặn)</h4>
                <ul>
                    <li><strong>Immediate containment:</strong> Ngăn chặn ngay lập tức</li>
                    <li><strong>System isolation:</strong> Cách ly hệ thống bị ảnh hưởng</li>
                    <li><strong>Damage limitation:</strong> Hạn chế thiệt hại</li>
                    <li><strong>Backup activation:</strong> Kích hoạt hệ thống dự phòng</li>
                </ul>

                <h4>Phase 4: Recovery (Khôi phục)</h4>
                <ul>
                    <li><strong>System restoration:</strong> Khôi phục hệ thống</li>
                    <li><strong>Data integrity check:</strong> Kiểm tra tính toàn vẹn dữ liệu</li>
                    <li><strong>Monitoring enhancement:</strong> Tăng cường giám sát</li>
                    <li><strong>Gradual service resumption:</strong> Khôi phục dịch vụ từng bước</li>
                </ul>

                <h3>👤 Quyền của khách hàng</h3>
                
                <h4>Các quyền được đảm bảo theo GDPR và luật Việt Nam:</h4>
                
                <h4>1. Right to Information (Quyền được thông báo):</h4>
                <ul>
                    <li>Được biết dữ liệu nào được thu thập</li>
                    <li>Mục đích sử dụng dữ liệu</li>
                    <li>Thời gian lưu trữ</li>
                    <li>Ai có quyền truy cập</li>
                </ul>

                <h4>2. Right to Access (Quyền truy cập):</h4>
                <ul>
                    <li>Xem toàn bộ dữ liệu cá nhân</li>
                    <li>Download dữ liệu định dạng chuẩn</li>
                    <li>Lịch sử truy cập dữ liệu</li>
                    <li>Thông tin về chia sẻ với bên thứ ba</li>
                </ul>

                <h4>3. Right to Rectification (Quyền chỉnh sửa):</h4>
                <ul>
                    <li>Cập nhật thông tin cá nhân</li>
                    <li>Sửa lỗi trong dữ liệu</li>
                    <li>Bổ sung thông tin thiếu</li>
                    <li>Thời gian xử lý: < 72 giờ</li>
                </ul>

                <h4>4. Right to Erasure (Quyền xóa dữ liệu):</h4>
                <ul>
                    <li>Yêu cầu xóa dữ liệu cá nhân</li>
                    <li>Xóa dữ liệu khi hết mục đích sử dụng</li>
                    <li>Trừ trường hợp có yêu cầu pháp lý</li>
                    <li>Chứng nhận xóa dữ liệu hoàn toàn</li>
                </ul>

                <h3>📞 Contact thông tin bảo mật</h3>
                
                <h4>Data Protection Officer (DPO):</h4>
                <div class="contact-security">
                    <div class="contact-method">
                        <h4>📧 Email riêng tư</h4>
                        <p>privacy@dnatest.vn</p>
                        <small>Mã hóa PGP có sẵn</small>
                    </div>
                    
                    <div class="contact-method">
                        <h4>📞 Hotline bảo mật</h4>
                        <p>1800-1234 (24/7)</p>
                        <small>Đường dây nóng sự cố</small>
                    </div>
                    
                    <div class="contact-method">
                        <h4>📍 Văn phòng</h4>
                        <p>Tầng 12, Tòa nhà ABC</p>
                        <small>Chỉ nhận appointment</small>
                    </div>
                </div>

                <h3>🏆 Cam kết bảo mật</h3>
                
                <div class="security-commitment">
                    <div class="commitment-item">
                        <h4>🔐 100%</h4>
                        <p>Mã hóa dữ liệu</p>
                    </div>
                    <div class="commitment-item">
                        <h4>🕰️ 24/7</h4>
                        <p>Giám sát bảo mật</p>
                    </div>
                    <div class="commitment-item">
                        <h4>⚡ < 15 phút</h4>
                        <p>Phát hiện sự cố</p>
                    </div>
                    <div class="commitment-item">
                        <h4>✅ 0 rò rỉ</h4>
                        <p>Thông tin 5 năm qua</p>
                    </div>
                </div>

                <h3>📋 Chính sách cập nhật</h3>
                <p>Chính sách bảo mật được:</p>
                <ul>
                    <li><strong>Review định kỳ:</strong> Mỗi 6 tháng</li>
                    <li><strong>Cập nhật khi cần:</strong> Theo thay đổi pháp luật</li>
                    <li><strong>Thông báo khách hàng:</strong> 30 ngày trước có hiệu lực</li>
                    <li><strong>Đào tạo nhân viên:</strong> Quarterly training</li>
                </ul>

                <em>Chính sách bảo mật của chúng tôi không chỉ tuân thủ pháp luật mà còn vượt xa các yêu cầu tối thiểu, đảm bảo thông tin ADN và dữ liệu cá nhân của bạn được bảo vệ với mức độ an toàn cao nhất có thể.</em>
            `
        },
        6: {
            title: 'Hướng dẫn đặt lịch hẹn xét nghiệm',
            image: '/logo.png',
            content: `
                <h2>📅 Hướng dẫn đặt lịch hẹn xét nghiệm ADN online - Đơn giản và tiện lợi</h2>
                <p>Hệ thống đặt lịch online của chúng tôi được thiết kế thân thiện, giúp bạn đặt lịch xét nghiệm ADN mọi lúc, mọi nơi chỉ với vài thao tác đơn giản. Quy trình hoàn toàn tự động và bảo mật, đảm bảo thông tin của bạn được bảo vệ tối đa.</p>
                
                <h3>🏁 Tổng quan quy trình đặt lịch</h3>
                <p>Quy trình đặt lịch được thiết kế với 6 bước chính, thời gian hoàn thành chỉ 10-15 phút:</p>
                
                <div class="booking-overview">
                    <div class="step-item">
                        <h4>1. Đăng ký/Đăng nhập</h4>
                        <p>Tạo tài khoản hoặc đăng nhập</p>
                    </div>
                    <div class="step-item">
                        <h4>2. Chọn dịch vụ</h4>
                        <p>Lựa chọn loại xét nghiệm phù hợp</p>
                    </div>
                    <div class="step-item">
                        <h4>3. Thông tin participants</h4>
                        <p>Điền thông tin người tham gia</p>
                    </div>
                    <div class="step-item">
                        <h4>4. Chọn thời gian</h4>
                        <p>Đặt lịch hẹn phù hợp</p>
                    </div>
                    <div class="step-item">
                        <h4>5. Thanh toán</h4>
                        <p>Thanh toán an toàn qua VNPay</p>
                    </div>
                    <div class="step-item">
                        <h4>6. Xác nhận</h4>
                        <p>Nhận thông tin qua email/SMS</p>
                    </div>
                </div>

                <h3>👤 Bước 1: Đăng ký/Đăng nhập tài khoản</h3>
                
                <h4>Đăng ký tài khoản mới:</h4>
                <ol>
                    <li><strong>Truy cập website:</strong> Vào trang chủ hệ thống</li>
                    <li><strong>Click "Đăng ký":</strong> Chọn nút đăng ký ở góc phải</li>
                    <li><strong>Điền thông tin cơ bản:</strong>
                        <ul>
                            <li>Họ và tên đầy đủ</li>
                            <li>Số điện thoại (10-11 số)</li>
                            <li>Email hợp lệ</li>
                            <li>Mật khẩu mạnh (ít nhất 8 ký tự)</li>
                            <li>Địa chỉ chi tiết</li>
                        </ul>
                    </li>
                    <li><strong>Xác thực OTP:</strong> Nhập mã xác nhận từ SMS</li>
                    <li><strong>Hoàn tất đăng ký:</strong> Kích hoạt tài khoản qua email</li>
                </ol>

                <h4>Đăng nhập cho thành viên:</h4>
                <ul>
                    <li>Sử dụng số điện thoại hoặc email</li>
                    <li>Nhập mật khẩu</li>
                    <li>Tích chọn "Ghi nhớ đăng nhập" (tùy chọn)</li>
                </ul>

                <h3>🧬 Bước 2: Chọn dịch vụ xét nghiệm</h3>
                
                <h4>Các dịch vụ xét nghiệm hiện có:</h4>
                
                <div class="service-types">
                    <div class="service-category">
                        <h4>Xét nghiệm huyết thống trực tiếp:</h4>
                        <ul>
                            <li><strong>Xét nghiệm ADN cha con:</strong> Phổ biến nhất, độ chính xác 99.99%</li>
                            <li><strong>Xét nghiệm ADN mẹ con:</strong> Bao gồm phân tích mtDNA</li>
                            <li><strong>Xét nghiệm ADN anh em ruột:</strong> Phân tích mức độ chia sẻ ADN</li>
                        </ul>
                    </div>
                    
                    <div class="service-category">
                        <h4>Xét nghiệm huyết thống gián tiếp:</h4>
                        <ul>
                            <li><strong>Xét nghiệm ADN ông cháu:</strong> Qua Y-chromosome</li>
                            <li><strong>Xét nghiệm ADN bà cháu:</strong> Qua mtDNA</li>
                            <li><strong>Xét nghiệm ADN thai nhi:</strong> Không xâm lấn</li>
                        </ul>
                    </div>
                </div>

                <h4>Phân loại theo mục đích sử dụng:</h4>
                
                <div class="purpose-comparison">
                    <div class="purpose-type">
                        <h4>🏠 ADN Dân sự</h4>
                        <ul>
                            <li><strong>Mục đích:</strong> Thỏa mãn tò mò cá nhân</li>
                            <li><strong>Giá trị pháp lý:</strong> Không có</li>
                            <li><strong>Lấy mẫu:</strong> Tại nhà hoặc trung tâm</li>
                            <li><strong>Giấy tờ:</strong> Không yêu cầu nghiêm ngặt</li>
                            <li><strong>Chi phí:</strong> Từ 2.5 - 4.5 triệu VNĐ</li>
                            <li><strong>Thời gian:</strong> 5-7 ngày làm việc</li>
                        </ul>
                    </div>
                    
                    <div class="purpose-type">
                        <h4>⚖️ ADN Pháp lý</h4>
                        <ul>
                            <li><strong>Mục đích:</strong> Thủ tục pháp lý, tòa án</li>
                            <li><strong>Giá trị pháp lý:</strong> Đầy đủ, được công nhận</li>
                            <li><strong>Lấy mẫu:</strong> Bắt buộc tại trung tâm</li>
                            <li><strong>Giấy tờ:</strong> CMND/CCCD gốc bắt buộc</li>
                            <li><strong>Chi phí:</strong> Từ 4.5 - 8.5 triệu VNĐ</li>
                            <li><strong>Thời gian:</strong> 7-10 ngày làm việc</li>
                        </ul>
                    </div>
                </div>

                <h3>👥 Bước 3: Điền thông tin participants</h3>
                
                <h4>Thông tin cần chuẩn bị:</h4>
                
                <h4>A. Thông tin cá nhân từng người:</h4>
                <ul>
                    <li><strong>Họ và tên đầy đủ:</strong> Theo CMND/CCCD (cho ADN pháp lý)</li>
                    <li><strong>Ngày sinh:</strong> DD/MM/YYYY</li>
                    <li><strong>Giới tính:</strong> Nam/Nữ</li>
                    <li><strong>CMND/CCCD:</strong> Số và nơi cấp (cho ADN pháp lý)</li>
                    <li><strong>Địa chỉ thường trú:</strong> Chi tiết tỉnh/thành, quận/huyện</li>
                    <li><strong>Số điện thoại liên lạc:</strong> Để nhận thông báo</li>
                </ul>

                <h4>B. Quan hệ gia đình:</h4>
                <ul>
                    <li>Xác định rõ mối quan hệ giữa các bên</li>
                    <li>Ghi chú thông tin đặc biệt (nếu có)</li>
                    <li>Người đại diện (nếu có trẻ em dưới 18 tuổi)</li>
                </ul>

                <h4>C. Thông tin liên lạc:</h4>
                <ul>
                    <li><strong>Người liên hệ chính:</strong> Nhận kết quả</li>
                    <li><strong>Email backup:</strong> Để gửi thông báo</li>
                    <li><strong>Địa chỉ nhận báo cáo:</strong> Nếu khác với địa chỉ thường trú</li>
                </ul>

                <h3>⏰ Bước 4: Chọn thời gian và địa điểm</h3>
                
                <h4>Hệ thống lịch hẹn thông minh:</h4>
<ul>
    <li><strong>Calendar view:</strong> Xem lịch trống theo tháng</li>
    <li><strong>Time slot:</strong> Chọn khung giờ phù hợp</li>
    <li><strong>Real-time update:</strong> Cập nhật lịch trống ngay lập tức</li>
    <li><strong>Địa điểm thuận tiện:</strong> Tại trung tâm hoặc tại nhà</li> // ✅ Sửa
</ul>

                <h4>Khung giờ làm việc:</h4>
                <div class="working-hours">
                    <div class="time-slot">
                        <h4>🌅 Ca sáng</h4>
                        <p>8:00 - 11:30</p>
                        <ul>
                            <li>8:00 - 8:30</li>
                            <li>9:00 - 9:30</li>
                            <li>10:00 - 10:30</li>
                            <li>11:00 - 11:30</li>
                        </ul>
                    </div>
                    
                    <div class="time-slot">
                        <h4>🌇 Ca chiều</h4>
                        <p>13:30 - 17:00</p>
                        <ul>
                            <li>13:30 - 14:00</li>
                            <li>14:30 - 15:00</li>
                            <li>15:30 - 16:00</li>
                            <li>16:30 - 17:00</li>
                        </ul>
                    </div>
                    
                    <div class="time-slot">
                        <h4>🌃 Ca tối (T7, CN)</h4>
                        <p>18:00 - 20:00</p>
                        <ul>
                            <li>18:00 - 18:30</li>
                            <li>19:00 - 19:30</li>
                            <li>20:00 - 20:30</li>
                        </ul>
                    </div>
                </div>

                <h4>Lựa chọn địa điểm:</h4>
<ul>
    <li><strong>Tại trung tâm:</strong> Địa chỉ trụ sở chính, đầy đủ thiết bị hiện đại</li>
    <li><strong>Tại nhà:</strong> Chỉ cho ADN dân sự (có phụ phí di chuyển)</li>
</ul>

                <h3>💳 Bước 5: Thanh toán qua VNPay</h3>
                
                <h4>Tích hợp thanh toán VNPay an toàn:</h4>
                <p>Hệ thống tích hợp cổng thanh toán VNPay với SSL 256-bit encryption, đảm bảo an toàn tuyệt đối cho mọi giao dịch.</p>

                <h4>Phương thức thanh toán hỗ trợ:</h4>
                <div class="payment-methods">
                    <div class="payment-category">
                        <h4>🏧 Thẻ ATM nội địa</h4>
                        <ul>
                            <li>Vietcombank, BIDV, VietinBank</li>
                            <li>Agribank, ACB, Techcombank</li>
                            <li>Sacombank, VPBank, TPBank</li>
                            <li>Và hơn 40 ngân hàng khác</li>
                        </ul>
                    </div>
                    
                    <div class="payment-category">
                        <h4>💻 Internet Banking</h4>
                        <ul>
                            <li>Đăng nhập trực tiếp ngân hàng</li>
                            <li>Không cần nhập thông tin thẻ</li>
                            <li>Bảo mật cao với OTP</li>
                            <li>Tự động cập nhật trạng thái</li>
                        </ul>
                    </div>
                    
                    <div class="payment-category">
                        <h4>📱 Ví điện tử</h4>
                        <ul>
                            <li>VNPAY-QR: Quét mã thanh toán</li>
                            <li>MoMo: Liên kết ví MoMo</li>
                            <li>ZaloPay: Thanh toán qua Zalo</li>
                            <li>ShopeePay: Ví ShopeePay</li>
                        </ul>
                    </div>
                </div>

                <h4>Quy trình thanh toán:</h4>
                <ol>
                    <li><strong>Xem tổng chi phí:</strong> Bao gồm VAT và phí dịch vụ</li>
                    <li><strong>Chọn phương thức:</strong> ATM, Internet Banking, hoặc Ví điện tử</li>
                    <li><strong>Chuyển hướng VNPay:</strong> Tự động chuyển đến trang thanh toán</li>
                    <li><strong>Thực hiện thanh toán:</strong> Theo hướng dẫn của VNPay</li>
                    <li><strong>Xác nhận thành công:</strong> Quay lại hệ thống với thông báo</li>
                    <li><strong>Nhận hóa đơn:</strong> Email hóa đơn điện tử tự động</li>
                </ol>

                <h3>📧 Bước 6: Nhận xác nhận và hướng dẫn</h3>
                
                <h4>Thông báo tự động sau khi đặt lịch:</h4>
                
                <h4>A. Email xác nhận (ngay lập tức):</h4>
                <ul>
                    <li>Thông tin lịch hẹn chi tiết</li>
                    <li>Mã booking để tra cứu</li>
                    <li>Danh sách cần mang theo</li>
                    <li>Bản đồ đường đi</li>
                    <li>Thông tin liên hệ khẩn cấp</li>
                </ul>

                <h4>B. SMS nhắc nhở:</h4>
                <ul>
                    <li><strong>Trước 24h:</strong> Nhắc nhở lịch hẹn ngày mai</li>
                    <li><strong>Trước 2h:</strong> Nhắc nhở chuẩn bị</li>
                    <li><strong>Khi hoàn thành:</strong> Xác nhận đã lấy mẫu</li>
                    <li><strong>Khi có kết quả:</strong> Thông báo kết quả sẵn sàng</li>
                </ul>

                <h4>C. Hướng dẫn chuẩn bị:</h4>
                
                <div class="preparation-guide">
                    <div class="prep-category">
                        <h4>📋 Giấy tờ cần mang:</h4>
                        <ul>
                            <li>CMND/CCCD gốc (ADN pháp lý)</li>
                            <li>Email xác nhận đặt lịch</li>
                            <li>Hóa đơn thanh toán</li>
                            <li>Giấy ủy quyền (nếu đại diện)</li>
                        </ul>
                    </div>
                    
                    <div class="prep-category">
                        <h4>🚫 Lưu ý trước khi đến:</h4>
                        <ul>
                            <li>Không ăn uống 2h trước lấy mẫu</li>
                            <li>Không hút thuốc 1h trước</li>
                            <li>Vệ sinh răng miệng sạch sẽ</li>
                            <li>Đến đúng giờ hẹn</li>
                        </ul>
                    </div>
                </div>

                <h3>📞 Hỗ trợ khách hàng 24/7</h3>
                
               <h4>Các kênh hỗ trợ:</h4>
<ul>
    <li><strong>Hotline:</strong> 1900 1234 (miễn phí từ điện thoại bàn)</li>
    <li><strong>Zalo OA:</strong> Tìm kiếm "DNA Testing Vietnam"</li>
    <li><strong>Facebook Messenger:</strong> Fanpage chính thức</li>
    <li><strong>Live Chat:</strong> Trên website trong giờ hành chính</li>
    <li><strong>Email:</strong> support@dnatest.vn</li>
    <li><strong>Trực tiếp tại trung tâm:</strong> Tư vấn face-to-face</li> // ✅ Thêm
</ul>
                <h4>Thời gian hỗ trợ:</h4>
                <ul>
                    <li><strong>Hotline:</strong> 24/7 cho khẩn cấp</li>
                    <li><strong>Chat/Email:</strong> 8:00 - 22:00 hàng ngày</li>
                    <li><strong>Tư vấn chuyên sâu:</strong> 8:00 - 17:30 (T2-T6)</li>
                </ul>

                <h3>🔄 Quản lý và thay đổi lịch hẹn</h3>
                
                <h4>Đăng nhập để quản lý:</h4>
                <ul>
                    <li><strong>Xem lịch hẹn:</strong> Tất cả lịch hẹn hiện tại và lịch sử</li>
                    <li><strong>Thay đổi giờ:</strong> Miễn phí nếu trước 24h</li>
                    <li><strong>Hủy lịch hẹn:</strong> Hoàn tiền 80% nếu trước 48h</li>
                    <li><strong>Theo dõi tiến độ:</strong> Từ lấy mẫu đến có kết quả</li>
                </ul>

                <h3>💡 Tips sử dụng hiệu quả</h3>
                
                <div class="tips-section">
                    <div class="tip-category">
                        <h4>⚡ Tối ưu trải nghiệm:</h4>
                        <ul>
                            <li>Chuẩn bị đầy đủ thông tin trước khi đặt</li>
                            <li>Chọn khung giờ sáng để tránh đông</li>
                            <li>Đặt lịch trước 3-5 ngày</li>
                            <li>Lưu mã booking để tra cứu</li>
                        </ul>
                    </div>
                    
                    <div class="tip-category">
                        <h4>🚫 Tránh các lỗi thường gặp:</h4>
                        <ul>
                            <li>Kiểm tra kỹ thông tin trước khi xác nhận</li>
                            <li>Đảm bảo số điện thoại nhận được SMS</li>
                            <li>Không để trống email</li>
                            <li>Chọn đúng loại xét nghiệm cần thiết</li>
                        </ul>
                    </div>
                </div>

                <h3>🏆 Cam kết dịch vụ</h3>
                <p>Với hệ thống đặt lịch hiện đại và đội ngũ hỗ trợ chuyên nghiệp, chúng tôi cam kết:</p>
                <ul>
                    <li><strong>Quy trình đơn giản:</strong> Chỉ 6 bước, hoàn thành trong 15 phút</li>
                    <li><strong>Bảo mật tuyệt đối:</strong> Thông tin được mã hóa và bảo vệ</li>
                    <li><strong>Hỗ trợ 24/7:</strong> Luôn sẵn sàng giải đáp thắc mắc</li>
                    <li><strong>Linh hoạt thay đổi:</strong> Dễ dàng điều chỉnh lịch hẹn</li>
                    <li><strong>Minh bạch chi phí:</strong> Không phát sinh thêm phí ẩn</li>
                </ul>

                <em>Hệ thống đặt lịch online giúp bạn tiết kiệm thời gian và đảm bảo được slot phù hợp nhất. Hãy trải nghiệm ngay để cảm nhận sự tiện lợi và chuyên nghiệp!</em>
            `
        },
        7: {
            title: 'Phân biệt ADN Dân sự và Pháp lý',
            author: 'Đội tư vấn pháp lý',
            date: '2025-01-09',
            readTime: '6 phút đọc',
            category: 'Hướng dẫn xét nghiệm',
            image: '/logo.png',
            content: `
                <h2>⚖️ Phân biệt ADN Dân sự và Pháp lý - Lựa chọn đúng cho mục đích của bạn</h2>
                <p>Việc hiểu rõ sự khác biệt giữa xét nghiệm ADN Dân sự và ADN Pháp lý/Hành chính là vô cùng quan trọng để bạn lựa chọn đúng loại dịch vụ phù hợp với nhu cầu và mục đích sử dụng. Mỗi loại đều có những ưu điểm riêng và phục vụ cho các mục đích khác nhau trong cuộc sống.</p>
                
                <h3>🏠 ADN Dân sự (Peace of Mind Testing)</h3>
                
                <h4>Định nghĩa và đặc điểm:</h4>
                <p>ADN Dân sự là loại xét nghiệm được thực hiện để thỏa mãn tò mò cá nhân, giải quyết nghi ngờ trong nội bộ gia đình hoặc để có thông tin rõ ràng về mối quan hệ huyết thống mà không cần sử dụng cho mục đích pháp lý.</p>
                
                <h4>Đặc điểm chính của ADN Dân sự:</h4>
                <div class="dna-characteristics">
                    <div class="characteristic-item">
                        <h4>🎯 Mục đích sử dụng</h4>
                        <ul>
                            <li>Thỏa mãn tò mò cá nhân về quan hệ huyết thống</li>
                            <li>Giải quyết nghi ngờ trong gia đình</li>
                            <li>Xác định quan hệ cho việc lập gia phả</li>
                            <li>Thông tin y tế gia đình (di truyền)</li>
                            <li>Chuẩn bị thông tin trước khi làm thủ tục pháp lý</li>
                        </ul>
                    </div>
                    
                    <div class="characteristic-item">
                        <h4>📄 Giá trị pháp lý</h4>
                        <ul>
                            <li><strong>Không có giá trị pháp lý:</strong> Không được tòa án chấp nhận</li>
                            <li><strong>Không dùng cho di trú:</strong> Không hợp lệ cho visa, định cư</li>
                            <li><strong>Không dùng cho thừa kế:</strong> Không có giá trị tranh chấp tài sản</li>
                            <li><strong>Chỉ mang tính tham khảo:</strong> Thông tin nội bộ gia đình</li>
                        </ul>
                    </div>
                    
                    <div class="characteristic-item">
                        <h4>Điểm lấy mẫu</h4>
<ul>
    <li><strong>Tại trung tâm:</strong> Được hỗ trợ chuyên nghiệp</li>
    <li><strong>Tại nhà:</strong> Tự lấy mẫu theo hướng dẫn (ADN dân sự)</li>
    <li><strong>Linh hoạt thời gian:</strong> Phù hợp với lịch trình cá nhân</li>
    <li><strong>Thuận tiện:</strong> Lựa chọn theo nhu cầu</li> // ✅ Sửa
</ul>
                    </div>
                </div>

                <h4>Quy trình ADN Dân sự:</h4>
                <ol>
                    <li><strong>Đặt hàng online/điện thoại:</strong> Không cần giấy tờ tùy thân</li>
                    <li><strong>Nhận kit lấy mẫu:</strong> Giao tận nhà hoặc nhận tại trung tâm</li>
                    <li><strong>Lấy mẫu:</strong> Tự thực hiện hoặc có hỗ trợ</li>
                    <li><strong>Gửi mẫu về lab:</strong> Qua đường bưu điện hoặc mang trực tiếp</li>
                    <li><strong>Nhận kết quả:</strong> Email hoặc đăng nhập portal</li>
                </ol>

                <h3>⚖️ ADN Pháp lý/Hành chính (Legal/Forensic Testing)</h3>
                
                <h4>Định nghĩa và đặc điểm:</h4>
                <p>ADN Pháp lý là loại xét nghiệm được thực hiện theo quy trình nghiêm ngặt, tuân thủ chuỗi bảo quản (Chain of Custody) và có giá trị pháp lý đầy đủ, được các cơ quan nhà nước, tòa án và tổ chức quốc tế công nhận.</p>
                
                <h4>Đặc điểm chính của ADN Pháp lý:</h4>
                <div class="legal-characteristics">
                    <div class="characteristic-item">
                        <h4>🏛️ Mục đích sử dụng</h4>
                        <ul>
                            <li>Thủ tục pháp lý tại tòa án</li>
                            <li>Hồ sơ di trú, định cư nước ngoài</li>
                            <li>Tranh chấp thừa kế, tài sản</li>
                            <li>Thủ tục nhận con nuôi</li>
                            <li>Xác định danh tính trong các vụ án</li>
                            <li>Bảo hiểm nhân thọ</li>
                        </ul>
                    </div>
                    
                    <div class="characteristic-item">
                        <h4>✅ Giá trị pháp lý</h4>
                        <ul>
                            <li><strong>Được tòa án chấp nhận:</strong> Có thể dùng làm bằng chứng</li>
                            <li><strong>Hợp lệ cho di trú:</strong> Đạt tiêu chuẩn quốc tế</li>
                            <li><strong>Giá trị thừa kế:</strong> Chứng minh quyền thừa kế</li>
                            <li><strong>Công nhận toàn cầu:</strong> Được chấp nhận ở nhiều quốc gia</li>
                        </ul>
                    </div>
                    
                    <div class="characteristic-item">
                       <h4>🏢 Điểm lấy mẫu</h4>
<ul>
    <li><strong>Bắt buộc tại trung tâm:</strong> Không được lấy mẫu tại nhà</li>
    <li><strong>Có giám sát:</strong> Nhân viên chứng kiến toàn bộ quá trình</li>
    <li><strong>Xác thực danh tính:</strong> Kiểm tra CMND/CCCD gốc</li>
    <li><strong>Chụp ảnh:</strong> Lưu trữ hình ảnh người tham gia</li>
    <li><strong>Địa điểm duy nhất:</strong> Tại trụ sở chính với đầy đủ thiết bị</li> // ✅ Thêm
</ul>
                    </div>
                </div>

                <h4>Quy trình ADN Pháp lý nghiêm ngặt:</h4>
                <ol>
                    <li><strong>Đặt lịch hẹn:</strong> Phải đặt trước và có đầy đủ giấy tờ</li>
                    <li><strong>Xác thực danh tính:</strong> Kiểm tra CMND/CCCD, chụp ảnh</li>
                    <li><strong>Lấy mẫu có giám sát:</strong> Nhân viên chứng kiến, niêm phong</li>
                    <li><strong>Chain of Custody:</strong> Theo dõi chuỗi bảo quản liên tục</li>
                    <li><strong>Báo cáo pháp lý:</strong> Có chữ ký giám định viên pháp y</li>
                </ol>

                <h3>📊 So sánh chi tiết ADN Dân sự vs ADN Pháp lý</h3>
                
                <div class="detailed-comparison">
                    <div class="detailed-comparison-table">
                        <div class="comparison-header">
                            <div class="header-cell">Tiêu chí so sánh</div>
                            <div class="header-cell civil">ADN Dân sự</div>
                            <div class="header-cell legal">ADN Pháp lý</div>
                        </div>
                        
                        <div class="comparison-row">
                            <div class="criteria-cell"><strong>Chi phí</strong></div>
                            <div class="civil-cell">2.5 - 4.5 triệu VNĐ</div>
                            <div class="legal-cell">4.5 - 8.5 triệu VNĐ</div>
                        </div>
                        
                        <div class="comparison-row">
                            <div class="criteria-cell"><strong>Thời gian</strong></div>
                            <div class="civil-cell">5-7 ngày làm việc</div>
                            <div class="legal-cell">7-10 ngày làm việc</div>
                        </div>
                        
                        <div class="comparison-row">
                            <div class="criteria-cell"><strong>Độ chính xác</strong></div>
                            <div class="civil-cell">99.99% (giống nhau)</div>
                            <div class="legal-cell">99.99% (giống nhau)</div>
                        </div>
                        
                        <div class="comparison-row">
                            <div class="criteria-cell"><strong>Giấy tờ yêu cầu</strong></div>
                            <div class="civil-cell">Không bắt buộc</div>
                            <div class="legal-cell">CMND/CCCD gốc bắt buộc</div>
                        </div>
                        
                        <div class="comparison-row">
                            <div class="criteria-cell"><strong>Loại mẫu</strong></div>
                            <div class="civil-cell">Tất cả loại mẫu</div>
                            <div class="legal-cell">Chỉ máu/niêm mạc miệng</div>
                        </div>
                        
                        <div class="comparison-row">
                            <div class="criteria-cell"><strong>Lấy mẫu</strong></div>
                            <div class="civil-cell">Tại nhà hoặc trung tâm</div>
                            <div class="legal-cell">Bắt buộc tại trung tâm</div>
                        </div>
                        
                        <div class="comparison-row">
                            <div class="criteria-cell"><strong>Bảo mật</strong></div>
                            <div class="civil-cell">Hoàn toàn riêng tư</div>
                            <div class="legal-cell">Theo quy định pháp luật</div>
                        </div>
                        
                        <div class="comparison-row">
                            <div class="criteria-cell"><strong>Báo cáo</strong></div>
                            <div class="civil-cell">Báo cáo cá nhân</div>
                            <div class="legal-cell">Báo cáo pháp lý có công chứng</div>
                        </div>
                    </div>
                </div>

                <h3>🤔 Khi nào chọn ADN Dân sự?</h3>
                
                <h4>Các tình huống phù hợp:</h4>
                <ul>
                    <li><strong>Nghi ngờ cá nhân:</strong> Muốn biết chắc chắn về quan hệ huyết thống</li>
                    <li><strong>Thông tin gia đình:</strong> Lập gia phả, tìm hiểu dòng họ</li>
                    <li><strong>Y tế gia đình:</strong> Hiểu về nguy cơ di truyền</li>
                    <li><strong>Chuẩn bị trước:</strong> Thu thập thông tin trước khi làm thủ tục pháp lý</li>
                    <li><strong>Riêng tư tuyệt đối:</strong> Không muốn để lại dấu vết pháp lý</li>
                </ul>

                <h4>Ưu điểm của ADN Dân sự:</h4>
                <div class="advantages">
                    <div class="advantage-category">
                        <h4>💰 Kinh tế</h4>
                        <ul>
                            <li>Chi phí thấp hơn 40-50%</li>
                            <li>Không phí giám sát</li>
                            <li>Không phí công chứng</li>
                            <li>Thường có chương trình khuyến mãi</li>
                        </ul>
                    </div>
                    
                    <div class="advantage-category">
                        <h4>⏰ Tiện lợi</h4>
                        <ul>
                            <li>Lấy mẫu tại nhà</li>
                            <li>Thời gian linh hoạt</li>
                            <li>Không cần hẹn lịch nghiêm ngặt</li>
                            <li>Kết quả nhanh hơn</li>
                        </ul>
                    </div>
                    
                    <div class="advantage-category">
                        <h4>🔒 Riêng tư</h4>
                        <ul>
                            <li>Không cần giấy tờ tùy thân</li>
                            <li>Bảo mật tuyệt đối</li>
                            <li>Không để lại hồ sơ pháp lý</li>
                            <li>Có thể sử dụng tên giả</li>
                        </ul>
                    </div>
                </div>

                <h3>⚖️ Khi nào chọn ADN Pháp lý?</h3>
                
                <h4>Các tình huống bắt buộc:</h4>
                <ul>
                    <li><strong>Thủ tục tòa án:</strong> Tranh chấp về quyền nuôi con, thừa kế</li>
                    <li><strong>Di trú quốc tế:</strong> Visa, định cư, đoàn tụ gia đình</li>
                    <li><strong>Nhận con nuôi:</strong> Thủ tục chính thức với cơ quan nhà nước</li>
                    <li><strong>Bảo hiểm:</strong> Yêu cầu từ công ty bảo hiểm</li>
                    <li><strong>Thay đổi giấy tờ:</strong> Sửa đổi giấy khai sinh, hộ khẩu</li>
                </ul>

                <h4>Ưu điểm của ADN Pháp lý:</h4>
                <div class="legal-advantages">
                    <div class="advantage-category">
                        <h4>🏛️ Giá trị pháp lý</h4>
                        <ul>
                            <li>Được tòa án chấp nhận</li>
                            <li>Có thể dùng làm bằng chứng</li>
                            <li>Công nhận quốc tế</li>
                            <li>Tuân thủ tiêu chuẩn nghiêm ngặt</li>
                        </ul>
                    </div>
                    
                    <div class="advantage-category">
                        <h4>🔍 Chính xác tuyệt đối</h4>
                        <ul>
                            <li>Chain of custody nghiêm ngặt</li>
                            <li>Không thể làm giả</li>
                            <li>Xác thực danh tính đầy đủ</li>
                            <li>Có chữ ký giám định viên</li>
                        </ul>
                    </div>
                    
                    <div class="advantage-category">
                        <h4>🌍 Được công nhận rộng rãi</h4>
                        <ul>
                            <li>Tất cả tòa án Việt Nam</li>
                            <li>Đại sứ quán các nước</li>
                            <li>Cơ quan di trú quốc tế</li>
                            <li>Tổ chức bảo hiểm</li>
                        </ul>
                    </div>
                </div>

                <h3>💡 Lời khuyên chọn lựa</h3>
                
                <h4>Hỏi bản thân những câu hỏi sau:</h4>
                <div class="decision-questions">
                    <div class="question-group">
                        <h4>❓ Về mục đích sử dụng</h4>
                        <ul>
                            <li>Tôi cần kết quả để làm gì?</li>
                            <li>Có cần dùng cho thủ tục pháp lý không?</li>
                            <li>Có cần đưa ra tòa án không?</li>
                            <li>Có cần cho hồ sơ di trú không?</li>
                        </ul>
                    </div>
                    
                    <div class="question-group">
                        <h4>❓ Về tính riêng tư</h4>
                        <ul>
                            <li>Tôi có muốn giữ bí mật không?</li>
                            <li>Có người nào khác biết về việc này không?</li>
                            <li>Tôi có ngại để lại thông tin cá nhân không?</li>
                            <li>Tôi có cần chứng minh với ai không?</li>
                        </ul>
                    </div>
                    
                    <div class="question-group">
                        <h4>❓ Về ngân sách</h4>
                        <ul>
                            <li>Tôi có sẵn sàng chi thêm tiền không?</li>
                            <li>Chi phí có quan trọng với tôi không?</li>
                            <li>Tôi có thể đợi lâu hơn không?</li>
                            <li>Có cần kết quả gấp không?</li>
                        </ul>
                    </div>
                </div>

                <h3>🔄 Chuyển đổi từ Dân sự sang Pháp lý</h3>
                
                <h4>Trường hợp cần chuyển đổi:</h4>
                <ul>
                    <li><strong>Kết quả ADN Dân sự positive:</strong> Muốn dùng cho mục đích pháp lý</li>
                    <li><strong>Phát sinh nhu cầu mới:</strong> Ban đầu chỉ muốn biết, sau đó cần thủ tục</li>
                    <li><strong>Yêu cầu từ cơ quan:</strong> Tòa án/đại sứ quán yêu cầu báo cáo pháp lý</li>
                </ul>

                <h4>Quy trình chuyển đổi:</h4>
                <ol>
                    <li><strong>Tham khảo kết quả cũ:</strong> Để biết trước kết quả như thế nào</li>
                    <li><strong>Đặt lại lịch ADN pháp lý:</strong> Thực hiện quy trình mới hoàn toàn</li>
                    <li><strong>Chuẩn bị giấy tờ:</strong> CMND/CCCD và các giấy tờ liên quan</li>
                    <li><strong>Lấy mẫu lại:</strong> Không thể sử dụng mẫu từ lần trước</li>
                    <li><strong>Nhận báo cáo pháp lý:</strong> Có giá trị sử dụng cho mục đích cần thiết</li>
                </ol>

                <h3>🏆 Cam kết chất lượng</h3>
                
                <div class="quality-commitment">
                    <div class="commitment-item">
                        <h4>🎯 99.99%</h4>
                        <p>Độ chính xác đảm bảo</p>
                    </div>
                    <div class="commitment-item">
                        <h4>⚖️ 100%</h4>
                        <p>Tuân thủ pháp luật</p>
                    </div>
                    <div class="commitment-item">
                        <h4>🔒 100%</h4>
                        <p>Bảo mật thông tin</p>
                    </div>
                    <div class="commitment-item">
                        <h4>✅ 24/7</h4>
                        <p>Hỗ trợ khách hàng</p>
                    </div>
                </div>

                <em>Dù bạn chọn ADN Dân sự hay ADN Pháp lý, chúng tôi đều cam kết mang đến chất lượng dịch vụ tốt nhất với độ chính xác cao nhất. Hãy liên hệ với chúng tôi để được tư vấn cụ thể về loại xét nghiệm phù hợp nhất cho tình huống của bạn.</em>
            `
        },
        13: {
            title: 'Chuẩn bị mẫu và quy trình lấy mẫu',
            author: 'Đội kỹ thuật lấy mẫu',
            date: '2025-01-03',
            readTime: '7 phút đọc',
            category: 'Hướng dẫn xét nghiệm',
            image: '/logo.png',
            content: `
                <h2>🧪 Chuẩn bị mẫu và quy trình lấy mẫu - Đảm bảo chất lượng tối ưu</h2>
                <p>Việc chuẩn bị và thu thập mẫu đúng cách là yếu tố quyết định đến chất lượng và độ chính xác của kết quả xét nghiệm ADN. Chúng tôi hướng dẫn chi tiết từng bước để bạn có thể chuẩn bị mẫu một cách hoàn hảo, đảm bảo kết quả đáng tin cậy nhất.</p>
                
                <h3>🩸 Các loại mẫu có thể sử dụng</h3>
                
                <h4>Mẫu chuẩn (Standard Samples):</h4>
                
                <div class="sample-types">
                    <div class="sample-category">
                        <h4>🩸 Mẫu máu</h4>
                        <p><strong>Độ ưu tiên:</strong> Cao nhất ⭐⭐⭐⭐⭐</p>
                        <ul>
                            <li><strong>Ưu điểm:</strong> ADN chất lượng cao, ổn định lâu</li>
                            <li><strong>Lượng cần:</strong> 2-3ml máu trong ống EDTA</li>
                            <li><strong>Bảo quản:</strong> 2-8°C, dùng được 1 tháng</li>
                            <li><strong>Thích hợp:</strong> ADN pháp lý, trường hợp phức tạp</li>
                        </ul>
                    </div>
                    
                    <div class="sample-category">
                        <h4>👄 Tế bào niêm mạc miệng</h4>
                        <p><strong>Độ ưu tiên:</strong> Cao ⭐⭐⭐⭐</p>
                        <ul>
                            <li><strong>Ưu điểm:</strong> Lấy dễ dàng, không đau, trẻ em chấp nhận</li>
                            <li><strong>Phương pháp:</strong> Cotton swab/Buccal brush</li>
                            <li><strong>Bảo quản:</strong> Khô ráo, nhiệt độ phòng</li>
                            <li><strong>Thích hợp:</strong> Mọi loại xét nghiệm, phổ biến nhất</li>
                        </ul>
                    </div>
                    
                    <div class="sample-category">
                        <h4>💦 Nước bọt (Saliva)</h4>
                        <p><strong>Độ ưu tiên:</strong> Trung bình ⭐⭐⭐</p>
                        <ul>
                            <li><strong>Ưu điểm:</strong> Tự lấy được, không xâm lấn</li>
                            <li><strong>Lượng cần:</strong> 2-4ml nước bọt</li>
                            <li><strong>Yêu cầu:</strong> Ống chuyên dụng có chất bảo quản</li>
                            <li><strong>Hạn chế:</strong> Có thể pha loãng, chất lượng không đồng đều</li>
                        </ul>
                    </div>
                </div>

                <h4>Mẫu thay thế (Alternative Samples):</h4>
                
                <div class="alternative-samples">
                    <div class="alt-sample">
                        <h4>💇 Tóc có chân</h4>
                        <ul>
                            <li><strong>Yêu cầu:</strong> Tối thiểu 10-15 sợi có chân rõ ràng</li>
                            <li><strong>Lưu ý:</strong> Không dùng tóc cắt, tóc rụng tự nhiên</li>
                            <li><strong>Bảo quản:</strong> Giấy ăn, phong bì giấy</li>
                            <li><strong>Độ thành công:</strong> 85-90%</li>
                        </ul>
                    </div>
                    
                    <div class="alt-sample">
                        <h4>💅 Móng tay</h4>
                        <ul>
                            <li><strong>Yêu cầu:</strong> Cắt sát da, khoảng 10 miếng</li>
                            <li><strong>Lưu ý:</strong> Không sơn móng, rửa sạch trước khi cắt</li>
                            <li><strong>Bảo quản:</strong> Phong bì giấy sạch</li>
                            <li><strong>Độ thành công:</strong> 70-80%</li>
                        </ul>
                    </div>
                    
                    <div class="alt-sample">
                        <h4>🦷 Răng</h4>
                        <ul>
                            <li><strong>Điều kiện:</strong> Răng có chân, không sâu quá nặng</li>
                            <li><strong>Bảo quản:</strong> Khô ráo, không dùng nước</li>
                            <li><strong>Thích hợp:</strong> Trường hợp đặc biệt</li>
                            <li><strong>Độ thành công:</strong> 60-75%</li>
                        </ul>
                    </div>
                </div>

                <h3>📋 Chuẩn bị trước khi lấy mẫu</h3>
                
                <h4>Yêu cầu chung cho mọi loại mẫu:</h4>
                
                <h4>A. Chuẩn bị cá nhân:</h4>
                <ul>
                    <li><strong>Không ăn uống:</strong> 2 giờ trước khi lấy mẫu</li>
                    <li><strong>Không hút thuốc:</strong> 1 giờ trước lấy mẫu</li>
                    <li><strong>Không uống rượu:</strong> 24 giờ trước lấy mẫu</li>
                    <li><strong>Vệ sinh răng miệng:</strong> Đánh răng, súc miệng sạch sẽ</li>
                    <li><strong>Nghỉ ngơi đầy đủ:</strong> Tránh stress, mệt mỏi</li>
                </ul>

                <h4>B. Chuẩn bị giấy tờ (ADN Pháp lý):</h4>
                <ul>
                    <li><strong>CMND/CCCD gốc:</strong> Bắt buộc, còn hạn sử dụng</li>
                    <li><strong>Giấy khai sinh:</strong> Cho trẻ em dưới 14 tuổi</li>
                    <li><strong>Giấy ủy quyền:</strong> Nếu có người đại diện</li>
                    <li><strong>Hợp đồng dịch vụ:</strong> Đã ký và thanh toán</li>
                </ul>

                <h4>C. Chuẩn bị thông tin:</h4>
                <ul>
                    <li><strong>Lịch sử y tế:</strong> Thuốc đang uống, bệnh đặc biệt</li>
                    <li><strong>Thông tin liên hệ:</strong> Số điện thoại, email chính xác</li>
                    <li><strong>Mục đích xét nghiệm:</strong> Để tư vấn phù hợp</li>
                    <li><strong>Độ khẩn cấp:</strong> Nếu cần kết quả gấp</li>
                </ul>

                <h3>🏥 Quy trình lấy mẫu tại trung tâm</h3>
                
                <h4>Bước 1: Check-in và xác thực</h4>
                <ol>
                    <li><strong>Đăng ký tại lễ tân:</strong> Cung cấp thông tin đặt lịch</li>
                    <li><strong>Kiểm tra giấy tờ:</strong> CMND/CCCD, so khớp thông tin</li>
                    <li><strong>Chụp ảnh:</strong> Lưu trữ trong hồ sơ (ADN pháp lý)</li>
                    <li><strong>Xác nhận thông tin:</strong> Họ tên, ngày sinh, địa chỉ</li>
                    <li><strong>Giao hợp đồng:</strong> Ký xác nhận và nhận biên lai</li>
                </ol>

                <h4>Bước 2: Tư vấn và hướng dẫn</h4>
                <ul>
                    <li><strong>Giải thích quy trình:</strong> Các bước sẽ thực hiện</li>
                    <li><strong>Lựa chọn loại mẫu:</strong> Tùy theo tình trạng cá nhân</li>
                    <li><strong>Trả lời thắc mắc:</strong> Giải đáp mọi câu hỏi</li>
                    <li><strong>Đồng ý tham gia:</strong> Xác nhận cuối cùng</li>
                </ul>

                <h4>Bước 3: Thu thập mẫu chuyên nghiệp</h4>
                
                <h4>3.1. Quy trình lấy tế bào niêm mạc miệng:</h4>
                <ol>
                    <li><strong>Chuẩn bị dụng cụ:</strong> Cotton swab vô trùng, ống đựng</li>
                    <li><strong>Hướng dẫn khách hàng:</strong> Mở miệng, thư giãn</li>
                    <li><strong>Thực hiện lấy mẫu:</strong>
                        <ul>
                            <li>Đặt cotton swab vào má trong</li>
                            <li>Xoay nhẹ 10-15 lần</li>
                            <li>Lấy từ 2-3 vị trí khác nhau</li>
                            <li>Mỗi bên má lấy 1 mẫu</li>
                        </ul>
                    </li>
                    <li><strong>Bảo quản mẫu:</strong> Phơi khô 5-10 phút, cho vào ống</li>
                    <li><strong>Ghi nhãn:</strong> Mã số, tên, ngày giờ lấy mẫu</li>
                </ol>

                <h4>3.2. Quy trình lấy mẫu máu:</h4>
                <ol>
                    <li><strong>Chuẩn bị:</strong> Kim tiêm vô trùng, ống EDTA</li>
                    <li><strong>Chọn vị trí:</strong> Tĩnh mạch cánh tay</li>
                    <li><strong>Khử trùng:</strong> Cồn 70% tại vị trí chọc</li>
                    <li><strong>Lấy máu:</strong> 2-3ml máu vào ống EDTA</li>
                    <li><strong>Trộn đều:</strong> Lật ngược ống 8-10 lần</li>
                    <li><strong>Kiểm tra:</strong> Đảm bảo máu không đông</li>
                </ol>

                <h4>Bước 4: Kiểm tra và bảo quản</h4>
                <ul>
                    <li><strong>Kiểm tra chất lượng:</strong> Đủ lượng, không nhiễm bẩn</li>
                    <li><strong>Ghi nhãn đầy đủ:</strong> Mã vạch, thông tin cá nhân</li>
                    <li><strong>Bảo quản tạm thời:</strong> Nhiệt độ và độ ẩm phù hợp</li>
                    <li><strong>Cập nhật hệ thống:</strong> Ghi nhận vào LIMS</li>
                </ul>

                <h4>Bước 5: Hoàn tất và hướng dẫn</h4>
                <ul>
                    <li><strong>Thông báo hoàn thành:</strong> Xác nhận đã lấy mẫu thành công</li>
                    <li><strong>Cung cấp mã tracking:</strong> Để theo dõi tiến độ</li>
                    <li><strong>Hướng dẫn theo dõi:</strong> Cách xem kết quả</li>
                    <li><strong>Lịch hẹn tái khám:</strong> Nếu cần thiết</li>
                </ul>

                <h3>🏠 Hướng dẫn lấy mẫu tại nhà (ADN Dân sự)</h3>
                
                <h4>Kit lấy mẫu tại nhà bao gồm:</h4>
                <ul>
                    <li><strong>Cotton swab:</strong> 4 cái (2 cho mỗi người)</li>
                    <li><strong>Ống đựng mẫu:</strong> Có nhãn riêng biệt</li>
                    <li><strong>Hướng dẫn chi tiết:</strong> Bằng hình ảnh</li>
                    <li><strong>Phong bì gửi mẫu:</strong> Có địa chỉ in sẵn</li>
                    <li><strong>Form thông tin:</strong> Điền thông tin cá nhân</li>
                </ul>

                <h4>Các bước thực hiện tại nhà:</h4>
                
                <h4>Bước 1: Chuẩn bị</h4>
                <ul>
                    <li><strong>Đọc kỹ hướng dẫn:</strong> Trước khi bắt đầu</li>
                    <li><strong>Chuẩn bị không gian:</strong> Sạch sẽ, đủ ánh sáng</li>
                    <li><strong>Rửa tay:</strong> Xà phòng kỹ lưỡng</li>
                    <li><strong>Chuẩn bị tinh thần:</strong> Thư giãn, không vội vã</li>
                </ul>

                <h4>Bước 2: Lấy mẫu từng người</h4>
                <div class="home-sampling">
                    <div class="sampling-step">
                        <h4>👤 Người lớn tự lấy</h4>
                        <ol>
                            <li>Mở miệng rộng</li>
                            <li>Đặt cotton swab vào má trong</li>
                            <li>Xoay nhẹ nhàng 15-20 lần</li>
                            <li>Tránh chạm vào răng, lợi</li>
                            <li>Lấy cả 2 bên má</li>
                            <li>Phơi khô 10 phút</li>
                        </ol>
                    </div>
                    
                    <div class="sampling-step">
                        <h4>👶 Trẻ em cần hỗ trợ</h4>
                        <ol>
                            <li>Cho bé ngồi ổn định</li>
                            <li>Giữ nhẹ đầu bé</li>
                            <li>Mở miệng bé từ từ</li>
                            <li>Lấy mẫu nhanh nhẹn</li>
                            <li>Khen ngợi bé hợp tác</li>
                            <li>Đảm bảo bé không sợ hãi</li>
                        </ol>
                    </div>
                </div>

                <h4>Bước 3: Bảo quản và gửi mẫu</h4>
                <ul>
                    <li><strong>Để khô hoàn toàn:</strong> 10-15 phút</li>
                    <li><strong>Cho vào ống:</strong> Không chạm vào phần có mẫu</li>
                    <li><strong>Dán nhãn:</strong> Ghi tên, ngày lấy mẫu</li>
                    <li><strong>Điền form:</strong> Thông tin đầy đủ, chính xác</li>
                    <li><strong>Đóng gói:</strong> Phong bì có sẵn</li>
                    <li><strong>Gửi ngay:</strong> Trong 24 giờ sau khi lấy</li>
                </ul>

                <h3>⚠️ Lưu ý quan trọng và lỗi thường gặp</h3>
                
                <h4>Những điều PHẢI làm:</h4>
                <div class="dos-donts">
                    <div class="dos">
                        <h4>✅ PHẢI làm</h4>
                        <ul>
                            <li>Rửa tay sạch trước khi lấy mẫu</li>
                            <li>Để mẫu khô hoàn toàn trước khi đóng gói</li>
                            <li>Ghi nhãn rõ ràng, chính xác</li>
                            <li>Bảo quản mẫu ở nhiệt độ phòng</li>
                            <li>Gửi mẫu trong 48 giờ</li>
                            <li>Thông báo nếu có vấn đề đặc biệt</li>
                        </ul>
                    </div>
                    
                    <div class="donts">
                        <h4>❌ KHÔNG được làm</h4>
                        <ul>
                            <li>Chạm tay vào đầu cotton swab</li>
                            <li>Để mẫu ẩm ướt khi đóng gói</li>
                            <li>Trộn lẫn mẫu của nhiều người</li>
                            <li>Bảo quản trong tủ lạnh/tủ đông</li>
                            <li>Để mẫu dưới ánh nắng trực tiếp</li>
                            <li>Sử dụng lại cotton swab</li>
                        </ul>
                    </div>
                </div>

                <h4>Các trường hợp cần lấy lại mẫu:</h4>
                <ul>
                    <li><strong>Mẫu bị nhiễm bẩn:</strong> Có vi khuẩn, nấm mốc</li>
                    <li><strong>Lượng ADN không đủ:</strong> Do lấy mẫu không đúng cách</li>
                    <li><strong>Mẫu bị hỏng:</strong> Do vận chuyển không đúng</li>
                    <li><strong>Thông tin sai lầm:</strong> Nhãn mẫu không chính xác</li>
                    <li><strong>Mẫu không phù hợp:</strong> Không đúng yêu cầu kỹ thuật</li>
                </ul>

                <h3>🚀 Quy trình sau khi lấy mẫu</h3>
                
                <h4>Timeline xử lý mẫu:</h4>
                <div class="processing-timeline">
                    <div class="timeline-item">
                        <h4>Ngày 0</h4>
                        <p><strong>Lấy mẫu hoàn thành</strong></p>
                        <ul>
                            <li>Vận chuyển về lab</li>
                            <li>Đăng ký vào hệ thống</li>
                            <li>Gửi SMS xác nhận</li>
                        </ul>
                    </div>
                    
                    <div class="timeline-item">
                        <h4>Ngày 1-2</h4>
                        <p><strong>Tiếp nhận và kiểm tra</strong></p>
                        <ul>
                            <li>Kiểm tra chất lượng mẫu</li>
                            <li>Chiết xuất ADN</li>
                            <li>Đánh giá độ tinh khiết</li>
                        </ul>
                    </div>
                    
                    <div class="timeline-item">
                        <h4>Ngày 3-5</h4>
                        <p><strong>Phân tích và xử lý</strong></p>
                        <ul>
                            <li>PCR amplification</li>
                            <li>Điện di phân tích</li>
                            <li>Thu thập dữ liệu</li>
                        </ul>
                    </div>
                    
                    <div class="timeline-item">
                        <h4>Ngày 6-7</h4>
                        <p><strong>Kết quả và báo cáo</strong></p>
                        <ul>
                            <li>Phân tích thống kê</li>
                            <li>Viết báo cáo</li>
                            <li>Gửi kết quả</li>
                        </ul>
                    </div>
                </div>

                <h3>📞 Hỗ trợ kỹ thuật 24/7</h3>
                
                <h4>Khi nào cần liên hệ:</h4>
                <ul>
                    <li><strong>Khó khăn trong việc lấy mẫu:</strong> Cần hướng dẫn thêm</li>
                    <li><strong>Mẫu bị hỏng:</strong> Cần lấy lại mẫu</li>
                    <li><strong>Thay đổi thông tin:</strong> Sửa đổi thông tin cá nhân</li>
                    <li><strong>Thắc mắc quy trình:</strong> Cần giải thích thêm</li>
                    <li><strong>Khẩn cấp:</strong> Cần xử lý ưu tiên</li>
                </ul>

                <div class="support-contacts">
                    <div class="contact-option">
                        <h4>📱 Hotline kỹ thuật</h4>
                        <p>1900-1234 (24/7)</p>
                        <small>Miễn phí từ mọi mạng</small>
                    </div>
                    
                    <div class="contact-option">
                        <h4>📧 Email hỗ trợ</h4>
                        <p>support@dnatest.vn</p>
                        <small>Phản hồi trong 2 giờ</small>
                    </div>
                    
                    <div class="contact-option">
                        <h4>💬 Chat trực tuyến</h4>
                        <p>Website/Zalo/Facebook</p>
                        <small>Hỗ trợ ngay lập tức</small>
                    </div>
                </div>

                <h3>🏆 Cam kết chất lượng mẫu</h3>
                
                <div class="sample-quality-commitment">
                    <div class="quality-item">
                        <h4>🎯 100%</h4>
                        <p>Mẫu đạt chuẩn chất lượng</p>
                    </div>
                    <div class="quality-item">
                        <h4>🔄 Miễn phí</h4>
                        <p>Lấy lại mẫu nếu cần</p>
                    </div>
                    <div class="quality-item">
                        <h4>⚡ < 24h</h4>
                        <p>Thông báo tình trạng mẫu</p>
                    </div>
                    <div class="quality-item">
                        <h4>🛡️ 99.99%</h4>
                        <p>Độ chính xác đảm bảo</p>
                    </div>
                </div>

                <em>Với hướng dẫn chi tiết và đội ngũ hỗ trợ chuyên nghiệp, chúng tôi đảm bảo quá trình lấy mẫu diễn ra thuận lợi và mẫu đạt chất lượng tối ưu để có kết quả xét nghiệm ADN chính xác nhất. Hãy liên hệ ngay nếu bạn cần bất kỳ hỗ trợ nào!</em>
            `
        }
    };

    const article = articleDetails[id];

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Bài viết không tồn tại</h1>
                        <p className="text-gray-600 mb-6">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                       
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-4 py-8">
                
                <div className="blog-detail-container">
                    <div className="blog-detail-content">
                        <div className="article-header">
                            <h1 className="article-title">{article.title}</h1>
                            <div className="article-meta">
                                <span className="author">{article.author}</span>
                                <span className="date">{article.date}</span>
                                <span className="read-time">{article.readTime}</span>
                                <span className="category">{article.category}</span>
                            </div>
                            <img src={article.image} alt={article.title} className="blog-article-image" />
                        </div>

                        <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}