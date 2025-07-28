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
            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);
            s3Client = AmazonS3ClientBuilder.standard()
                    .withRegion(region)
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .build();
        }
        return s3Client;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        try {
            System.out.println("S3Service: Starting upload...");
            System.out.println("S3Service: Access Key: " + accessKeyId);
            System.out.println("S3Service: Region: " + region);
            System.out.println("S3Service: Bucket: " + bucketName);
            
            String fileName = generateFileName(file.getOriginalFilename());
            System.out.println("S3Service: Generated filename: " + fileName);
            
            File convertedFile = convertMultiPartToFile(file);
            System.out.println("S3Service: File converted to: " + convertedFile.getAbsolutePath());
            
                    // Upload file without ACL (bucket has ACL disabled)
        getS3Client().putObject(new PutObjectRequest(bucketName, fileName, convertedFile));
            
            System.out.println("S3Service: File uploaded to S3");
            convertedFile.delete();
            
            String fileUrl = getS3Client().getUrl(bucketName, fileName).toString();
            System.out.println("S3Service: File URL: " + fileUrl);
            
            return fileUrl;
        } catch (Exception e) {
            System.err.println("S3Service: Error uploading file: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public void deleteFile(String fileName) {
        getS3Client().deleteObject(bucketName, fileName);
    }

    public S3Object getFile(String fileName) {
        return getS3Client().getObject(bucketName, fileName);
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