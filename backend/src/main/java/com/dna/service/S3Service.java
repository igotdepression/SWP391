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
                s3Client = AmazonS3ClientBuilder.standard()
                        .withRegion(region)
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
            System.out.println("S3Service: Bắt đầu upload...");
            System.out.println("S3Service: Access Key: " + accessKeyId);
            System.out.println("S3Service: Secret Key (10 ký tự đầu): " + (secretAccessKey != null ? secretAccessKey.substring(0, Math.min(10, secretAccessKey.length())) + "..." : "null"));
            System.out.println("S3Service: Khu vực: " + region);
            System.out.println("S3Service: Bucket: " + bucketName);
            
            String fileName = generateFileName(file.getOriginalFilename());
            System.out.println("S3Service: Tên file được tạo: " + fileName);
            
            File convertedFile = convertMultiPartToFile(file);
            System.out.println("S3Service: File đã chuyển đổi thành: " + convertedFile.getAbsolutePath());
            
            // Upload file không có ACL (bucket đã tắt ACL)
            getS3Client().putObject(new PutObjectRequest(bucketName, fileName, convertedFile));
            
            System.out.println("S3Service: File đã upload lên S3 thành công");
            convertedFile.delete();
            
            String fileUrl = getS3Client().getUrl(bucketName, fileName).toString();
            System.out.println("S3Service: URL file: " + fileUrl);
            
            return fileUrl;
        } catch (Exception e) {
            System.err.println("S3Service: Lỗi upload file lên S3: " + e.getMessage());
            System.err.println("S3Service: Chuyển sang lưu trữ cục bộ...");
            
            // Chuyển sang lưu trữ cục bộ
            try {
                String fileName = generateFileName(file.getOriginalFilename());
                String uploadDir = "uploads";
                File uploadDirectory = new File(uploadDir);
                if (!uploadDirectory.exists()) {
                    uploadDirectory.mkdirs();
                }
                
                File localFile = new File(uploadDirectory, fileName);
                try (FileOutputStream fos = new FileOutputStream(localFile)) {
                    fos.write(file.getBytes());
                }
                
                String fileUrl = "/uploads/" + fileName;
                System.out.println("S3Service: File đã lưu cục bộ: " + fileUrl);
                return fileUrl;
            } catch (Exception localError) {
                System.err.println("S3Service: Lưu trữ cục bộ cũng thất bại: " + localError.getMessage());
                throw new IOException("Không thể upload file cả lên S3 và cục bộ", e);
            }
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