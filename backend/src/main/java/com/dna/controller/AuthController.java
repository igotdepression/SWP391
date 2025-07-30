package com.dna.controller; // Khai báo package chứa controller

import com.dna.dto.LoginRequest; // Import class LoginRequest
import com.dna.dto.LoginResponse; // Import class LoginResponse
import com.dna.dto.RegisterRequest; // Import class RegisterRequest
import com.dna.dto.ForgotPasswordRequest; // Import class ForgotPasswordRequest
import com.dna.dto.ResetPasswordRequest; // Import class ResetPasswordRequest
import com.dna.entity.Role; // Import entity Role
import com.dna.entity.User; // Import entity User
import com.dna.repository.RoleRepository; // Import repository RoleRepository
import com.dna.repository.UserRepository; // Import repository UserRepository
import com.dna.repository.PasswordResetTokenRepository; // Import repository PasswordResetTokenRepository
import com.dna.entity.PasswordResetToken; // Import entity PasswordResetToken
import com.dna.security.JwtTokenProvider; // Import class JwtTokenProvider để tạo JWT
import jakarta.validation.Valid; // Import annotation Valid để validate dữ liệu
import org.slf4j.Logger; // Import Logger để ghi log
import org.slf4j.LoggerFactory; // Import LoggerFactory để tạo logger
import org.springframework.beans.factory.annotation.Autowired; // Import Autowired để tự động inject bean
import org.springframework.http.ResponseEntity; // Import ResponseEntity để trả về response
import org.springframework.security.authentication.AuthenticationManager; // Import AuthenticationManager để xác thực
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; // Import UsernamePasswordAuthenticationToken để xác thực bằng username và password
import org.springframework.security.core.Authentication; // Import Authentication để lưu thông tin xác thực
import org.springframework.security.core.context.SecurityContextHolder; // Import SecurityContextHolder để lưu context xác thực
import org.springframework.security.crypto.password.PasswordEncoder; // Import PasswordEncoder để mã hóa mật khẩu
import org.springframework.web.bind.annotation.*; // Import các annotation cho REST controller
import org.springframework.web.bind.annotation.PathVariable; // Import PathVariable
import java.time.LocalDateTime; // Import LocalDateTime

@RestController // Đánh dấu class là REST controller
@RequestMapping("/api/auth") // Định nghĩa route gốc cho controller này
@CrossOrigin(origins = "*") // Cho phép truy cập từ mọi domain (CORS)
public class AuthController { // Định nghĩa class AuthController

    private static final Logger log = LoggerFactory.getLogger(AuthController.class); // Tạo logger cho class

    @Autowired // Inject AuthenticationManager
    private AuthenticationManager authenticationManager; // Quản lý xác thực

    @Autowired // Inject UserRepository
    private UserRepository userRepository; // Repository thao tác với user

    @Autowired // Inject RoleRepository
    private RoleRepository roleRepository; // Repository thao tác với role

    @Autowired // Inject PasswordEncoder
    private PasswordEncoder passwordEncoder; // Mã hóa mật khẩu

    @Autowired // Inject JwtTokenProvider
    private JwtTokenProvider tokenProvider; // Tạo và xác thực JWT
    
    @Autowired // Inject PasswordResetTokenRepository
    private PasswordResetTokenRepository passwordResetTokenRepository; // Repository thao tác với password reset tokens

    @PostMapping("/login") // Định nghĩa endpoint POST /login
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) { // Hàm xử lý đăng nhập
        Authentication authentication = authenticationManager.authenticate( // Xác thực thông tin đăng nhập
                new UsernamePasswordAuthenticationToken( // Tạo token xác thực từ email và password
                        loginRequest.getEmail(), // Lấy email từ request
                        loginRequest.getPassword() // Lấy password từ request
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication); // Lưu thông tin xác thực vào context
        String jwt = tokenProvider.generateToken(authentication); // Sinh JWT từ thông tin xác thực

        User user = userRepository.findByEmail(loginRequest.getEmail()) // Tìm user theo email
                .orElseThrow(() -> new RuntimeException("User not found")); // Nếu không tìm thấy thì ném lỗi

        return ResponseEntity.ok(new LoginResponse(jwt, user.getEmail(), user.getFullName(), user.getRole().getRoleName(), user.getUserID(), user.getAvatarUrl())); // Trả về response chứa JWT và thông tin user
    }

    @PostMapping("/register") // Định nghĩa endpoint POST /register
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) { // Hàm xử lý đăng ký
        try {
            log.info("Attempting to register user with email: {}", registerRequest.getEmail()); // Ghi log khi bắt đầu đăng ký
            
            if (userRepository.existsByEmail(registerRequest.getEmail())) { // Kiểm tra email đã tồn tại chưa
                log.warn("Registration failed: Email {} is already taken", registerRequest.getEmail()); // Ghi log nếu email đã tồn tại
                return ResponseEntity.badRequest().body("Email đã được sử dụng!"); // Trả về lỗi nếu email đã tồn tại
            }

            // Create user
            User user = new User(); // Tạo đối tượng user mới
            user.setEmail(registerRequest.getEmail()); // Gán email cho user
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Mã hóa và gán password
            user.setFullName(registerRequest.getFullName()); // Gán tên đầy đủ
            user.setPhoneNumber(registerRequest.getPhoneNumber()); // Gán số điện thoại
            user.setAddress(registerRequest.getAddress()); // Gán địa chỉ
            user.setStatus("Active"); // Gán trạng thái mặc định là Active

            // Set default role (CUSTOMER)
            Role userRole = roleRepository.findByRoleName("CUSTOMER") // Tìm role CUSTOMER
                    .orElseThrow(() -> {
                        log.error("Registration failed: CUSTOMER role not found"); // Ghi log nếu không tìm thấy role
                        return new RuntimeException("Không tìm thấy vai trò CUSTOMER"); // Ném lỗi nếu không tìm thấy role
                    });
            user.setRole(userRole); // Gán role cho user

            userRepository.save(user); // Lưu user vào database
            log.info("User registered successfully: {}", user.getEmail()); // Ghi log khi đăng ký thành công

            return ResponseEntity.ok("Đăng ký thành công!"); // Trả về thông báo thành công
        } catch (Exception e) {
            log.error("Registration failed: {}", e.getMessage(), e); // Ghi log khi đăng ký thất bại
            return ResponseEntity.badRequest().body("Đăng ký thất bại: " + e.getMessage()); // Trả về lỗi khi đăng ký thất bại
        }
    }

    @GetMapping("/test") // Định nghĩa endpoint GET /test
    public ResponseEntity<?> testConnection() { // Hàm kiểm tra kết nối backend
        log.info("Test endpoint called"); // Ghi log khi gọi endpoint test
        return ResponseEntity.ok("Backend connection successful!"); // Trả về thông báo kết nối thành công
    }
    
    @PostMapping("/forgot-password") // Định nghĩa endpoint POST /forgot-password
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) { // Hàm xử lý quên mật khẩu
        try {
            log.info("Forgot password request for email: {}", request.getEmail()); // Ghi log khi có yêu cầu quên mật khẩu
            
            // Kiểm tra email có tồn tại trong hệ thống không
            User user = userRepository.findByEmail(request.getEmail())
                    .orElse(null);
            
            if (user == null) {
                log.warn("Forgot password failed: Email {} not found", request.getEmail()); // Ghi log nếu email không tồn tại
                return ResponseEntity.badRequest().body("Email không tồn tại trong hệ thống"); // Trả về lỗi nếu email không tồn tại
            }
            
            // Xóa các token cũ của user này
            passwordResetTokenRepository.deleteByUser_UserID(user.getUserID());
            
            // Tạo token mới
            String token = java.util.UUID.randomUUID().toString();
            LocalDateTime expiryDate = LocalDateTime.now().plusHours(1); // Token có hiệu lực 1 giờ
            
            PasswordResetToken resetToken = new PasswordResetToken(token, user, expiryDate);
            passwordResetTokenRepository.save(resetToken);
            
            // TODO: Implement email sending logic here
            // Send email with reset link: /reset-password?token={token}
            
            log.info("Forgot password email sent successfully for: {}", request.getEmail()); // Ghi log khi gửi email thành công
            return ResponseEntity.ok("Đã gửi email hướng dẫn đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn."); // Trả về thông báo thành công
            
        } catch (Exception e) {
            log.error("Forgot password failed: {}", e.getMessage(), e); // Ghi log khi quên mật khẩu thất bại
            return ResponseEntity.badRequest().body("Có lỗi xảy ra. Vui lòng thử lại sau."); // Trả về lỗi khi quên mật khẩu thất bại
        }
    }
    
    @PostMapping("/reset-password") // Định nghĩa endpoint POST /reset-password
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) { // Hàm xử lý đặt lại mật khẩu
        try {
            log.info("Reset password request for token: {}", request.getToken()); // Ghi log khi có yêu cầu đặt lại mật khẩu
            
            // Tìm token trong database
            PasswordResetToken resetToken = passwordResetTokenRepository.findByTokenAndUsedFalse(request.getToken())
                    .orElse(null);
            
            if (resetToken == null) {
                log.warn("Reset password failed: Invalid token {}", request.getToken()); // Ghi log nếu token không hợp lệ
                return ResponseEntity.badRequest().body("Token không hợp lệ"); // Trả về lỗi nếu token không hợp lệ
            }
            
            // Kiểm tra token có hết hạn không
            if (resetToken.isExpired()) {
                log.warn("Reset password failed: Expired token {}", request.getToken()); // Ghi log nếu token đã hết hạn
                passwordResetTokenRepository.delete(resetToken); // Xóa token hết hạn
                return ResponseEntity.badRequest().body("Token đã hết hạn"); // Trả về lỗi nếu token đã hết hạn
            }
            
            // Cập nhật mật khẩu cho user
            User user = resetToken.getUser();
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);
            
            // Đánh dấu token đã sử dụng
            resetToken.setUsed(true);
            passwordResetTokenRepository.save(resetToken);
            
            log.info("Password reset successfully for user: {}", user.getEmail()); // Ghi log khi đặt lại mật khẩu thành công
            return ResponseEntity.ok("Đặt lại mật khẩu thành công!"); // Trả về thông báo thành công
            
        } catch (Exception e) {
            log.error("Reset password failed: {}", e.getMessage(), e); // Ghi log khi đặt lại mật khẩu thất bại
            return ResponseEntity.badRequest().body("Có lỗi xảy ra. Vui lòng thử lại sau."); // Trả về lỗi khi đặt lại mật khẩu thất bại
        }
    }
    
    @GetMapping("/verify-reset-token/{token}") // Định nghĩa endpoint GET /verify-reset-token/{token}
    public ResponseEntity<?> verifyResetToken(@PathVariable String token) { // Hàm xác thực token reset
        try {
            log.info("Verifying reset token: {}", token); // Ghi log khi xác thực token
            
            // Tìm token trong database
            PasswordResetToken resetToken = passwordResetTokenRepository.findByTokenAndUsedFalse(token)
                    .orElse(null);
            
            if (resetToken == null) {
                log.warn("Token verification failed: Invalid token {}", token); // Ghi log nếu token không hợp lệ
                return ResponseEntity.badRequest().body("Token không hợp lệ"); // Trả về lỗi nếu token không hợp lệ
            }
            
            // Kiểm tra token có hết hạn không
            if (resetToken.isExpired()) {
                log.warn("Token verification failed: Expired token {}", token); // Ghi log nếu token đã hết hạn
                passwordResetTokenRepository.delete(resetToken); // Xóa token hết hạn
                return ResponseEntity.badRequest().body("Token đã hết hạn"); // Trả về lỗi nếu token đã hết hạn
            }
            
            log.info("Reset token verified successfully: {}", token); // Ghi log khi xác thực token thành công
            return ResponseEntity.ok("Token hợp lệ"); // Trả về thông báo token hợp lệ
            
        } catch (Exception e) {
            log.error("Token verification failed: {}", e.getMessage(), e); // Ghi log khi xác thực token thất bại
            return ResponseEntity.badRequest().body("Token không hợp lệ hoặc đã hết hạn"); // Trả về lỗi khi token không hợp lệ
        }
    }
} // Kết thúc class AuthController