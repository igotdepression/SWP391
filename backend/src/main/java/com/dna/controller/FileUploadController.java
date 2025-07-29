package com.dna.controller;

import com.dna.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileUploadController {

    @Autowired
    private S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            System.out.println("=== FileUploadController: Bắt đầu upload ===");
            System.out.println("Tên file: " + file.getOriginalFilename());
            System.out.println("Kích thước file: " + file.getSize());
            System.out.println("Loại file: " + file.getContentType());
            System.out.println("File có rỗng không: " + file.isEmpty());
            
            if (file.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "File rỗng");
                return ResponseEntity.badRequest().body(response);
            }
            
            String fileUrl = s3Service.uploadFile(file);
            
            System.out.println("Upload file thành công: " + fileUrl);
            
            Map<String, String> response = new HashMap<>();
            response.put("url", fileUrl);
            response.put("message", "Upload file thành công");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("=== FileUploadController: Lỗi upload file ===");
            System.err.println("Thông báo lỗi: " + e.getMessage());
            System.err.println("Loại lỗi: " + e.getClass().getSimpleName());
            e.printStackTrace();
            
            Map<String, String> response = new HashMap<>();
            response.put("error", "Không thể upload file: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{fileName}")
    public ResponseEntity<Map<String, String>> deleteFile(@PathVariable String fileName) {
        try {
            s3Service.deleteFile(fileName);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Xóa file thành công");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Không thể xóa file: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/test-s3-connection")
    public ResponseEntity<Map<String, Object>> testS3Connection() {
        try {
            System.out.println("=== Testing S3 Connection ===");
            
            // Validate credentials first
            s3Service.validateCredentials();
            
            // Test connection
            boolean isConnected = s3Service.testConnection();
            
            // Test upload
            String uploadUrl = s3Service.testUpload();
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("connection", isConnected);
            response.put("testUpload", uploadUrl != null ? uploadUrl : "failed");
            response.put("message", "S3 connection test completed");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("S3 Connection Test Failed: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "S3 connection test failed: " + e.getMessage());
            response.put("error", e.getClass().getSimpleName());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/test-upload")
    public ResponseEntity<Map<String, String>> testUpload() {
        try {
            String uploadUrl = s3Service.testUpload();
            Map<String, String> response = new HashMap<>();
            if (uploadUrl != null) {
                response.put("status", "success");
                response.put("message", "Test upload thành công");
                response.put("url", uploadUrl);
            } else {
                response.put("status", "error");
                response.put("message", "Test upload thất bại");
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Test upload thất bại: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/test-s3-simple")
    public ResponseEntity<Map<String, Object>> testS3Simple() {
        try {
            System.out.println("=== Simple S3 Test ===");
            
            // Test basic connection
            boolean isConnected = s3Service.testConnection();
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("connected", isConnected);
            response.put("region", "us-east-1");
            response.put("bucket", "bloodline-dna-files");
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            response.put("errorType", e.getClass().getSimpleName());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/test-credentials")
    public ResponseEntity<Map<String, Object>> testCredentials() {
        try {
            System.out.println("=== Testing AWS Credentials ===");
            
            // Validate credentials format first
            s3Service.validateCredentials();
            
            // Test credentials with STS
            boolean credentialsValid = s3Service.testCredentials();
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("credentialsValid", credentialsValid);
            response.put("message", credentialsValid ? "AWS credentials are valid" : "AWS credentials are invalid");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Credentials test failed: " + e.getMessage());
            response.put("errorType", e.getClass().getSimpleName());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/test-regions")
    public ResponseEntity<Map<String, Object>> testRegions() {
        try {
            System.out.println("=== Testing AWS Regions ===");
            
            Map<String, Boolean> regionResults = s3Service.testRegions();
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("regionResults", regionResults);
            response.put("message", "Region testing completed");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Region testing failed: " + e.getMessage());
            response.put("errorType", e.getClass().getSimpleName());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/bucket-policy")
    public ResponseEntity<Map<String, String>> getBucketPolicy() {
        try {
            String policy = s3Service.getCurrentBucketPolicy();
            Map<String, String> response = new HashMap<>();
            if (policy != null) {
                response.put("status", "success");
                response.put("policy", policy);
            } else {
                response.put("status", "error");
                response.put("message", "Không thể đọc bucket policy");
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Lỗi đọc bucket policy: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/update-bucket-policy")
    public ResponseEntity<Map<String, String>> updateBucketPolicy() {
        try {
            boolean success = s3Service.updateBucketPolicy();
            Map<String, String> response = new HashMap<>();
            if (success) {
                response.put("status", "success");
                response.put("message", "Đã cập nhật bucket policy thành công");
            } else {
                response.put("status", "error");
                response.put("message", "Không thể cập nhật bucket policy");
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Lỗi cập nhật bucket policy: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/test-s3-operations")
    public ResponseEntity<Map<String, Object>> testS3Operations() {
        try {
            System.out.println("=== Testing S3 Operations ===");
            
            boolean operationsOk = s3Service.testS3Operations();
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("operationsOk", operationsOk);
            response.put("message", operationsOk ? "S3 operations are working" : "S3 operations failed");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "S3 operations test failed: " + e.getMessage());
            response.put("errorType", e.getClass().getSimpleName());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
} 