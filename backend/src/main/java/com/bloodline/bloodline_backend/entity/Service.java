package com.bloodline.bloodline_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "Service")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Service {
    @Id
    @Column(name = "serviceID")
    private Integer serviceID;

    @ManyToOne
    @JoinColumn(name = "surchargeID", referencedColumnName = "surchargeID")
    private Surcharge surcharge;

    @Column(name = "serviceName", nullable = false, length = 100)
    private String serviceName;

    @Column(name = "typeOfService", nullable = false, length = 100)
    private String typeOfService;

    @Column(name = "typeOfCollection", length = 100)
    private String typeOfCollection;

    @Column(name = "price")
    private Double price;

    @Column(name = "3rdSamplePrice")
    private Double thirdSamplePrice;
} 