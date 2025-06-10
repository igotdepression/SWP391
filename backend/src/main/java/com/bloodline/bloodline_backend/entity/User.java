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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "AppUser")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email;

    private String phoneNumber;

    private String status;

    @OneToOne
    @JoinColumn(name = "AccountID")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "roleID")
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
