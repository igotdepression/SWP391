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
        String fileName = generateFileName(file.getOriginalFilename());
        File convertedFile = convertMultiPartToFile(file);
        
        // Set ACL to public-read so files can be accessed publicly
        getS3Client().putObject(new PutObjectRequest(bucketName, fileName, convertedFile)
                .withCannedAcl(com.amazonaws.services.s3.model.CannedAccessControlList.PublicRead));
        convertedFile.delete();
        
        return getS3Client().getUrl(bucketName, fileName).toString();
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