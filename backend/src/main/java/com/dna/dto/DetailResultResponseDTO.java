package com.dna.dto;

import java.math.BigDecimal;

/**
 * DTO for DetailResult response
 */
public class DetailResultResponseDTO {
    private Integer detailResultID;
    private Integer testResultID;
    private String locusName;
    private String p1Allele1;
    private String p1Allele2;
    private String p2Allele1;
    private String p2Allele2;
    private BigDecimal paternityIndex;

    // Default constructor
    public DetailResultResponseDTO() {
    }

    // Constructor with all parameters
    public DetailResultResponseDTO(Integer detailResultID, Integer testResultID, String locusName, 
                                  String p1Allele1, String p1Allele2, String p2Allele1, 
                                  String p2Allele2, BigDecimal paternityIndex) {
        this.detailResultID = detailResultID;
        this.testResultID = testResultID;
        this.locusName = locusName;
        this.p1Allele1 = p1Allele1;
        this.p1Allele2 = p1Allele2;
        this.p2Allele1 = p2Allele1;
        this.p2Allele2 = p2Allele2;
        this.paternityIndex = paternityIndex;
    }

    // Getters and Setters
    public Integer getDetailResultID() {
        return detailResultID;
    }

    public void setDetailResultID(Integer detailResultID) {
        this.detailResultID = detailResultID;
    }

    public Integer getTestResultID() {
        return testResultID;
    }

    public void setTestResultID(Integer testResultID) {
        this.testResultID = testResultID;
    }

    public String getLocusName() {
        return locusName;
    }

    public void setLocusName(String locusName) {
        this.locusName = locusName;
    }

    public String getP1Allele1() {
        return p1Allele1;
    }

    public void setP1Allele1(String p1Allele1) {
        this.p1Allele1 = p1Allele1;
    }

    public String getP1Allele2() {
        return p1Allele2;
    }

    public void setP1Allele2(String p1Allele2) {
        this.p1Allele2 = p1Allele2;
    }

    public String getP2Allele1() {
        return p2Allele1;
    }

    public void setP2Allele1(String p2Allele1) {
        this.p2Allele1 = p2Allele1;
    }

    public String getP2Allele2() {
        return p2Allele2;
    }

    public void setP2Allele2(String p2Allele2) {
        this.p2Allele2 = p2Allele2;
    }

    public BigDecimal getPaternityIndex() {
        return paternityIndex;
    }

    public void setPaternityIndex(BigDecimal paternityIndex) {
        this.paternityIndex = paternityIndex;
    }
}
