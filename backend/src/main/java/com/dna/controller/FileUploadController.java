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

    @GetMapping("/test-s3")
    public ResponseEntity<Map<String, String>> testS3Connection() {
        try {
            // Hiển thị thông tin credentials trước
            s3Service.validateCredentials();
            
            boolean isConnected = s3Service.testConnection();
            Map<String, String> response = new HashMap<>();
            if (isConnected) {
                response.put("status", "success");
                response.put("message", "Kết nối S3 thành công");
            } else {
                response.put("status", "error");
                response.put("message", "Kết nối S3 thất bại");
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Kiểm tra kết nối S3 thất bại: " + e.getMessage());
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
} 