package com.dna.repository;

import com.dna.entity.DetailResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface DetailResultRepository extends JpaRepository<DetailResult, Integer> {
    
    /**
     * Find detail results by test result ID
     */
    List<DetailResult> findByTestResultTestResultID(Integer testResultID);
    
    /**
     * Find detail results by locus name
     */
    List<DetailResult> findByLocusName(String locusName);
    
    /**
     * Find detail results by locus name containing text
     */
    List<DetailResult> findByLocusNameContaining(String locusName);
    
    /**
     * Find detail results by paternity index greater than or equal to value
     */
    List<DetailResult> findByPaternityIndexGreaterThanEqual(BigDecimal minIndex);
    
    /**
     * Find detail results by paternity index between values
     */
    List<DetailResult> findByPaternityIndexBetween(BigDecimal minIndex, BigDecimal maxIndex);
    
    /**
     * Delete detail results by test result ID
     */
    void deleteByTestResultTestResultID(Integer testResultID);
    
    /**
     * Find detail results by P1 alleles
     */
    @Query("SELECT dr FROM DetailResult dr WHERE dr.p1Allele1 = :allele1 AND dr.p1Allele2 = :allele2")
    List<DetailResult> findByP1Alleles(@Param("allele1") String allele1, @Param("allele2") String allele2);
    
    /**
     * Find detail results by P2 alleles
     */
    @Query("SELECT dr FROM DetailResult dr WHERE dr.p2Allele1 = :allele1 AND dr.p2Allele2 = :allele2")
    List<DetailResult> findByP2Alleles(@Param("allele1") String allele1, @Param("allele2") String allele2);
    
    /**
     * Count detail results by test result ID
     */
    long countByTestResultTestResultID(Integer testResultID);
    
    /**
     * Find detail results with high paternity index
     */
    @Query("SELECT dr FROM DetailResult dr WHERE dr.paternityIndex >= :threshold ORDER BY dr.paternityIndex DESC")
    List<DetailResult> findHighPaternityIndex(@Param("threshold") BigDecimal threshold);
}
