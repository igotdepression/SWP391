package com.bloodline.bloodline_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Builder;
import java.time.LocalDate;

@Entity
@Table(name = "[User]")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private Integer userID;


    @NotEmpty(message = "Vui lòng điền thông tin họ và tên !!!")
    @Column(name = "FullName", nullable = false, length = 100)
    private String fullName;

    @NotEmpty(message = "")
    @Column(name = "Email", nullable = false, length = 100)
    private String email;

    @NotEmpty(message = "Vui lòng điền số điện thoại, không được bỏ trống !!!")
    @Size(min = 10, max = 11, message = "Số điện thoại Không hợp lệ !!!")
    @Column(name = "PhoneNumber", length = 11)
    private String phoneNumber;

    @Column(name = "Address", length = 200)
    private String address;

    @Column(name = "DateOfBirth")
    private LocalDate dateOfBirth;

    @Column(name = "Gender", length = 10)
    private String gender;

    @Column(name = "Status", length = 20)
    private String status;

    @OneToOne
    @JoinColumn(name = "AccountID")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "RoleID")
    @ToString.Exclude  // Để tránh vòng lặp vô hạn khi gọi toString()
    private Role role;

    // Constructor bổ sung nếu cần
    public User(Integer userID, String fullName, String email, String phoneNumber, String status, Account account) {
        this.userID = userID;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.status = status;
        this.account = account;
    }
}
