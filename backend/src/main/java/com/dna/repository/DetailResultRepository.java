package com.dna.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dna.entity.DetailResult;

@Repository
public interface DetailResultRepository extends JpaRepository<DetailResult, Integer> {
    
    // Tìm detail result theo testResultID
    List<DetailResult> findByTestResultTestResultID(Integer testResultID);
    
    // Tìm detail result theo locus name
    List<DetailResult> findByLocusName(String locusName);
    
    // Tìm detail result theo paternity index
    List<DetailResult> findByPaternityIndexGreaterThan(BigDecimal paternityIndex);
    
    // Tìm detail result theo test result ID và locus name
    List<DetailResult> findByTestResultTestResultIDAndLocusName(Integer testResultID, String locusName);
    
    // Đếm số lượng detail result cho một test result
    @Query("SELECT COUNT(dr) FROM DetailResult dr WHERE dr.testResult.testResultID = :testResultID")
    Long countByTestResultID(@Param("testResultID") Integer testResultID);
    
    // Xóa tất cả detail result theo test result ID
    void deleteByTestResultTestResultID(Integer testResultID);
    
    // Tìm detail result với paternity index trong khoảng
    List<DetailResult> findByPaternityIndexBetween(BigDecimal minIndex, BigDecimal maxIndex);
}
