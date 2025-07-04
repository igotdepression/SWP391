# Bloodline DNA Testing Service Management System

Phần mềm quản lý dịch vụ xét nghiệm ADN huyết thống cho cơ sở y tế.

## Roles
- **Guest**: Khách truy cập
- **Customer**: Khách hàng đặt dịch vụ
- **Staff**: Nhân viên xét nghiệm
- **Manager**: Quản lý
- **Admin**: Quản trị hệ thống

## Features

- **Quản lý người dùng**: Đăng ký, đăng nhập, phân quyền theo role
- **Đặt dịch vụ xét nghiệm ADN**: Khách hàng có thể đặt các dịch vụ xét nghiệm dân sự và hành chính
- **Quản lý mẫu xét nghiệm**: Thu thập mẫu tại nhà hoặc tại cơ sở y tế
- **Quản lý kết quả xét nghiệm**: Tạo, cập nhật và xem kết quả chi tiết
- **Quản lý thanh toán**: Xử lý thanh toán dịch vụ
- **Feedback và đánh giá**: Thu thập phản hồi từ khách hàng
- **Blog và tư vấn**: Chia sẻ kiến thức và tư vấn trực tuyến
- **Dashboard và báo cáo**: Thống kê và quản lý tổng quan

## Workflow

### Quy trình tự thu mẫu (Dịch vụ dân sự):
1. Đăng ký đặt hẹn dịch vụ xét nghiệm
2. Nhận bộ kit xét nghiệm
3. Thu thập mẫu xét nghiệm tại nhà
4. Chuyển mẫu đến cơ sở y tế
5. Thực hiện xét nghiệm và ghi nhận kết quả
6. Trả kết quả xét nghiệm

### Quy trình thu mẫu tại cơ sở:
1. Đăng ký đặt hẹn dịch vụ xét nghiệm
2. Nhân viên cơ sở y tế thu thập mẫu và cập nhật đơn yêu cầu
3. Thực hiện xét nghiệm và ghi nhận kết quả
4. Trả kết quả xét nghiệm

## Tech Stack

### Frontend
- React.js
- React Router
- Context API for state management
- Bootstrap for styling

### Backend
- Spring Boot 3.5.0
- Spring Security với JWT Authentication
- Spring Data JPA
- SQL Server Database
- Maven build tool

## Database Schema

Hệ thống bao gồm các bảng chính:
- **User & Role**: Quản lý người dùng và phân quyền
- **Service & Booking**: Quản lý dịch vụ và đặt lịch
- **Sample**: Quản lý mẫu xét nghiệm
- **TestResult & DetailResult**: Quản lý kết quả xét nghiệm chi tiết
- **Payment**: Quản lý thanh toán
- **Feedback**: Quản lý phản hồi
- **BlogPost & Consultant**: Quản lý blog và tư vấn

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Java JDK 17 or higher
- SQL Server 2019 or higher
- Maven 3.6 or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/igotdepression/SWP391.git
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd backend
mvn install
```

4. Configure the database
- Create a SQL Server database
- Update the database configuration in `backend/src/main/resources/application.properties`

5. Run the application
- Frontend:
```bash
cd frontend
npm start
```
- Backend:
```bash
cd backend
mvn spring-boot:run
```

## API Testing với Swagger

### 1. Khởi động Backend Server

#### Option 1: Sử dụng H2 In-Memory Database (Khuyến nghị cho test)
```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=test
```

#### Option 2: Sử dụng SQL Server Database
```bash
cd backend
mvn spring-boot:run
```

### 2. Truy cập Swagger UI

Khi server đã khởi động thành công, truy cập:

**Swagger UI**: http://localhost:8080/swagger-ui.html

**API Docs (JSON)**: http://localhost:8080/api-docs

**H2 Console** (nếu dùng profile test): http://localhost:8080/h2-console

### 3. Authentication trong Swagger

Để test các API cần authentication:

1. **Đăng ký tài khoản mới** qua `/api/auth/register`
2. **Đăng nhập** qua `/api/auth/login` để lấy JWT token
3. **Authorization**: Click nút "Authorize" trong Swagger UI
4. **Nhập token**: `Bearer {your-jwt-token}`

### 4. Test Sample Management APIs

#### Tạo mẫu mới:
```json
POST /api/samples
{
  "bookingID": 1,
  "userID": 1,
  "participantID": 1,
  "typeOfCollection": "Tại nhà",
  "sampleType": "Nước bọt",
  "receivedDate": "2025-07-04"
}
```

#### Lấy danh sách mẫu:
```
GET /api/samples
```

### 5. Test TestResult Management APIs

#### Tạo kết quả xét nghiệm:
```json
POST /api/test-results
{
  "bookingID": 1,
  "resultDate": "2025-07-04",
  "createdBy": "Dr. Smith",
  "resultConclution": "Kết quả xét nghiệm cho thấy...",
  "resultFile": "result_001.pdf",
  "detailResults": [
    {
      "locusName": "D8S1179",
      "p1Allele1": "12",
      "p1Allele2": "13",
      "p2Allele1": "12",
      "p2Allele2": "14",
      "paternityIndex": 1.25
    }
  ]
}
```

### 6. Test DetailResult Management APIs

#### Tạo kết quả chi tiết:
```json
POST /api/detail-results/test-result/1
{
  "locusName": "D21S11",
  "p1Allele1": "28",
  "p1Allele2": "29",
  "p2Allele1": "28",
  "p2Allele2": "30",
  "paternityIndex": 0.85
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
