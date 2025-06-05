package com.bloodline.bloodline_backend.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;  // ROLE_ADMIN, ROLE_CUSTOMER, ROLE_STAFF, ROLE_MANAGER, ROLE_GUEST
}
