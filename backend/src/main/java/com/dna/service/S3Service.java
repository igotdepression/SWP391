package com.dna.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    @Value("${aws.access.key.id}")
    private String accessKeyId;

    @Value("${aws.secret.access.key}")
    private String secretAccessKey;

    @Value("${aws.s3.region}")
    private String region;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    private AmazonS3 s3Client;

    private AmazonS3 getS3Client() {
        if (s3Client == null) {
            try {
                System.out.println("S3Service: Đang tạo S3 client...");
                System.out.println("S3Service: Độ dài Access Key: " + (accessKeyId != null ? accessKeyId.length() : "null"));
                System.out.println("S3Service: Độ dài Secret Key: " + (secretAccessKey != null ? secretAccessKey.length() : "null"));
                System.out.println("S3Service: Khu vực: " + region);
                System.out.println("S3Service: Bucket: " + bucketName);
                
                BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);
                
                // Sử dụng cấu hình chuẩn với region ap-southeast-2
                s3Client = AmazonS3ClientBuilder.standard()
                        .withRegion("ap-southeast-2") // Đảm bảo đúng region Sydney
                        .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                        .build();
                
                // Kiểm tra kết nối
                s3Client.listBuckets();
                System.out.println("S3Service: Tạo S3 client thành công");
            } catch (Exception e) {
                System.err.println("S3Service: Lỗi tạo S3 client: " + e.getMessage());
                e.printStackTrace();
                throw new RuntimeException("Không thể tạo S3 client: " + e.getMessage(), e);
            }
        }
        return s3Client;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        try {
            System.out.println("=== S3Service: Bắt đầu upload ===");
            System.out.println("S3Service: Access Key: " + accessKeyId);
            System.out.println("S3Service: Secret Key (10 ký tự đầu): " + (secretAccessKey != null ? secretAccessKey.substring(0, Math.min(10, secretAccessKey.length())) + "..." : "null"));
            System.out.println("S3Service: Khu vực: " + region);
            System.out.println("S3Service: Bucket: " + bucketName);
            System.out.println("S3Service: Tên file gốc: " + file.getOriginalFilename());
            System.out.println("S3Service: Kích thước file: " + file.getSize());
            System.out.println("S3Service: Content Type: " + file.getContentType());
            
            String fileName = generateFileName(file.getOriginalFilename());
            System.out.println("S3Service: Tên file được tạo: " + fileName);
            
            File convertedFile = convertMultiPartToFile(file);
            System.out.println("S3Service: File đã chuyển đổi thành: " + convertedFile.getAbsolutePath());
            System.out.println("S3Service: File tồn tại: " + convertedFile.exists());
            System.out.println("S3Service: Kích thước file sau chuyển đổi: " + convertedFile.length());
            
            // Test connection trước khi upload
            System.out.println("S3Service: Kiểm tra kết nối S3...");
            getS3Client().listBuckets();
            System.out.println("S3Service: Kết nối S3 OK");
            
            // Upload file với logging chi tiết
            System.out.println("S3Service: Bắt đầu upload lên S3...");
            System.out.println("S3Service: Bucket: " + bucketName);
            System.out.println("S3Service: Key: " + fileName);
            
            PutObjectRequest putRequest = new PutObjectRequest(bucketName, fileName, convertedFile);
            getS3Client().putObject(putRequest);
            
            System.out.println("S3Service: File đã upload lên S3 thành công");
            convertedFile.delete();
            
            String fileUrl = getS3Client().getUrl(bucketName, fileName).toString();
            System.out.println("S3Service: URL file: " + fileUrl);
            System.out.println("=== S3Service: Upload hoàn tất ===");
            
            return fileUrl;
        } catch (Exception e) {
            System.err.println("=== S3Service: Lỗi upload file ===");
            System.err.println("S3Service: Loại lỗi: " + e.getClass().getSimpleName());
            System.err.println("S3Service: Message: " + e.getMessage());
            System.err.println("S3Service: Stack trace:");
            e.printStackTrace();
            
            // Thêm thông tin debug
            if (e.getMessage() != null && e.getMessage().contains("SignatureDoesNotMatch")) {
                System.err.println("S3Service: Đây là lỗi SignatureDoesNotMatch - kiểm tra:");
                System.err.println("1. Region có đúng ap-southeast-2 không");
                System.err.println("2. Access Key và Secret Key có đúng không");
                System.err.println("3. Thời gian hệ thống có đồng bộ không");
            }
            
            throw new IOException("Không thể upload file lên S3: " + e.getMessage(), e);
        }
    }

    public void deleteFile(String fileName) {
        getS3Client().deleteObject(bucketName, fileName);
    }

    public S3Object getFile(String fileName) {
        return getS3Client().getObject(bucketName, fileName);
    }

    // Kiểm tra kết nối S3
    public boolean testConnection() {
        try {
            getS3Client().listBuckets();
            System.out.println("S3Service: Kiểm tra kết nối thành công");
            return true;
        } catch (Exception e) {
            System.err.println("S3Service: Kiểm tra kết nối thất bại: " + e.getMessage());
            return false;
        }
    }

    // Kiểm tra credentials chi tiết
    public void validateCredentials() {
        System.out.println("=== S3Service: Kiểm tra thông tin credentials ===");
        System.out.println("Access Key ID: " + accessKeyId);
        System.out.println("Secret Access Key (10 ký tự đầu): " + (secretAccessKey != null ? secretAccessKey.substring(0, Math.min(10, secretAccessKey.length())) + "..." : "null"));
        System.out.println("Region: " + region);
        System.out.println("Bucket Name: " + bucketName);
        System.out.println("Secret Key Length: " + (secretAccessKey != null ? secretAccessKey.length() : "null"));
        System.out.println("Access Key Length: " + (accessKeyId != null ? accessKeyId.length() : "null"));
        System.out.println("================================================");
    }

    // Test upload một file nhỏ
    public String testUpload() {
        try {
            System.out.println("S3Service: Bắt đầu test upload...");
            
            // Tạo một file test nhỏ
            String testContent = "Test upload from Bloodline DNA System";
            String testFileName = "test-upload-" + System.currentTimeMillis() + ".txt";
            
            // Upload trực tiếp
            getS3Client().putObject(bucketName, testFileName, testContent);
            
            String fileUrl = getS3Client().getUrl(bucketName, testFileName).toString();
            System.out.println("S3Service: Test upload thành công: " + fileUrl);
            
            return fileUrl;
        } catch (Exception e) {
            System.err.println("S3Service: Test upload thất bại: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Cập nhật bucket policy để cho phép upload
    public boolean updateBucketPolicy() {
        try {
            System.out.println("S3Service: Đang cập nhật bucket policy...");
            
            String policy = "{\n" +
                    "    \"Version\": \"2012-10-17\",\n" +
                    "    \"Statement\": [\n" +
                    "        {\n" +
                    "            \"Sid\": \"PublicReadGetObject\",\n" +
                    "            \"Effect\": \"Allow\",\n" +
                    "            \"Principal\": \"*\",\n" +
                    "            \"Action\": \"s3:GetObject\",\n" +
                    "            \"Resource\": \"arn:aws:s3:::" + bucketName + "/*\"\n" +
                    "        },\n" +
                    "        {\n" +
                    "            \"Sid\": \"AllowUpload\",\n" +
                    "            \"Effect\": \"Allow\",\n" +
                    "            \"Principal\": {\n" +
                    "                \"AWS\": \"arn:aws:iam::*:user/*\"\n" +
                    "            },\n" +
                    "            \"Action\": [\n" +
                    "                \"s3:PutObject\",\n" +
                    "                \"s3:PutObjectAcl\"\n" +
                    "            ],\n" +
                    "            \"Resource\": \"arn:aws:s3:::" + bucketName + "/*\"\n" +
                    "        }\n" +
                    "    ]\n" +
                    "}";
            
            getS3Client().setBucketPolicy(bucketName, policy);
            System.out.println("S3Service: Đã cập nhật bucket policy thành công");
            return true;
        } catch (Exception e) {
            System.err.println("S3Service: Không thể cập nhật bucket policy: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    // Kiểm tra bucket policy hiện tại
    public String getCurrentBucketPolicy() {
        try {
            com.amazonaws.services.s3.model.BucketPolicy bucketPolicy = getS3Client().getBucketPolicy(bucketName);
            return bucketPolicy.getPolicyText();
        } catch (Exception e) {
            System.err.println("S3Service: Không thể đọc bucket policy: " + e.getMessage());
            return null;
        }
    }

    private String generateFileName(String originalFileName) {
        return UUID.randomUUID().toString() + "_" + originalFileName;
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        }
        return convertedFile;
    }
} 