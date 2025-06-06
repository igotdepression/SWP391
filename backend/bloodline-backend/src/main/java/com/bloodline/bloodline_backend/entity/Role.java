package com.bloodline.bloodline_backend.entity;

import java.util.HashSet;
import java.util.Set;

// Sử dụng các import riêng lẻ thay vì import *
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity // Đánh dấu đây là một entity (thực thể) trong cơ sở dữ liệu
@Table(name = "Role") // Liên kết với bảng "Role" trong cơ sở dữ liệu
public class Role {

    @Id // Đánh dấu đây là khóa chính
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động tạo giá trị (auto increment)
    @Column(name = "RoleID") // Liên kết với cột "RoleID" trong bảng
    private Integer roleID; // ID của vai trò

    @Column(name = "RoleName", nullable = false, unique = true) // Liên kết với cột "RoleName", không được null và phải duy nhất
    private String roleName; // Tên vai trò

    @OneToMany( // Quan hệ một-nhiều (một vai trò có nhiều người dùng)
            mappedBy = "role", // Được ánh xạ bởi trường "role" trong entity User
            fetch = FetchType.LAZY, // Chỉ tải dữ liệu khi cần thiết (để tối ưu hiệu suất)
            cascade = CascadeType.ALL, // Các thao tác trên Role sẽ ảnh hưởng đến các User liên quan
            orphanRemoval = true // Xóa các User không còn liên kết với Role này
    )
    @JsonIgnore // Không hiển thị danh sách User khi chuyển đổi Role thành JSON (tránh vòng lặp vô hạn)
    private Set<User> users = new HashSet<>(); // Danh sách người dùng có vai trò này

    // Constructor mặc định theo yêu cầu của JPA
    public Role() {
    }

    // Constructor với tất cả các trường
    public Role(Integer roleID, String roleName, Set<User> users) {
        this.roleID = roleID;
        this.roleName = roleName;
        this.users = users != null ? users : new HashSet<>(); // Nếu users là null thì tạo một HashSet mới
    }

    // Constructor không bao gồm users
    public Role(Integer roleID, String roleName) {
        this.roleID = roleID;
        this.roleName = roleName;
        this.users = new HashSet<>(); // Tạo một HashSet mới rỗng
    }

    // Các getter và setter
    public Integer getRoleID() {
        return roleID;
    }

    public void setRoleID(Integer roleID) {
        this.roleID = roleID;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Role{"
                + "roleID=" + roleID
                + ", roleName='" + roleName + '\''
                + '}'; // Không hiển thị users để tránh vòng lặp vô hạn
    }
}
