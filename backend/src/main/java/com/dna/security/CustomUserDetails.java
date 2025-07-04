package com.dna.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User; // Import Spring Security's User class

import java.util.Collection;
import java.util.Collections; // Đảm bảo đã import Collections

@Getter // Lombok annotation để tự động tạo getter cho các trường
public class CustomUserDetails extends User {

    private final Integer userId; // Trường để lưu trữ userID
    // Bạn có thể thêm các trường khác từ entity User nếu muốn truy cập chúng sau này
    // private final String fullName;
    // private final String email;
    // private final String phoneNumber;

    public CustomUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities, Integer userId) {
        super(username, password, authorities);
        this.userId = userId;
        // this.fullName = fullName;
        // this.email = email;
        // this.phoneNumber = phoneNumber;
    }

    // Constructor tiện lợi nếu chỉ có một quyền hạn
    public CustomUserDetails(String username, String password, Integer userId, String roleName) {
        super(username, password, Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + roleName)));
        this.userId = userId;
    }

    // Constructor tiện lợi khác nếu bạn muốn đơn giản hóa việc tạo trong CustomUserDetailsService
    // public CustomUserDetails(com.dna.entity.User user) {
    //     super(user.getEmail(), user.getPassword(), Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().getRoleName())));
    //     this.userId = user.getUserID();
    // }
}