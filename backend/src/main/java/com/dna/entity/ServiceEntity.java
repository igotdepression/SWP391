package com.dna.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Service")
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer serviceID;

    @NotBlank(message="Service name is not blank!!!")
    @Column(name = "serviceName")
    private String serviceName;

    @Column(name = "serviceType")
    private String serviceType; //dan su, hanh chinh

    @Column(name = "packageType")
    private String packageType; // tieu chuan , lay nhanh

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "status")
    private String status;

    @Column(name = "extraSampleFee")
    private BigDecimal extraSampleFee;

    @ManyToMany
    @JoinTable(
        name = "IncludeSurcharge",
        joinColumns = @JoinColumn(name = "serviceID"),
        inverseJoinColumns = @JoinColumn(name = "surchargeID")
    )
    @JsonIgnore
    private Set<SurchargePrice> surcharges;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Booking> bookings;
} 