# S3 Permissions Fix Guide

## Problem
The error shows that the IAM user `bloodline-s3-group` has an explicit deny for `s3:ListAllMyBuckets` action, which was causing the S3 connection test to fail.

## Root Cause
The `testConnection()` method in `S3Service.java` was calling `listBuckets()` which requires the `s3:ListAllMyBuckets` permission. However, your IAM user has an explicit deny for this action.

## Solution Applied

### 1. Code Changes Made
- Modified `S3Service.java` to use `listObjects(bucketName)` instead of `listBuckets()`
- This change affects the following methods:
  - `testConnection()`
  - `testCredentials()`
  - `testS3Operations()`
  - `testRegions()`

### 2. IAM Policy Fix
Use the following IAM policy for your `bloodline-s3-group` user:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "BloodlineDNAS3Access",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket",
                "s3:GetObjectVersion",
                "s3:PutObjectAcl",
                "s3:GetObjectAcl"
            ],
            "Resource": [
                "arn:aws:s3:::bloodline-dna-files-v3",
                "arn:aws:s3:::bloodline-dna-files-v3/*"
            ]
        }
    ]
}
```

## Steps to Apply the Fix

### 1. Update IAM Policy
1. Go to AWS IAM Console
2. Find the user `bloodline-s3-group`
3. Remove any existing policies that have explicit denies for `s3:ListAllMyBuckets`
4. Attach the new policy above or create a new policy with the JSON content

### 2. Test the Fix
After applying the IAM policy changes, test the upload functionality again. The error should be resolved.

## Alternative Solution (if IAM changes are not possible)
If you cannot modify the IAM policy, the code changes already made should resolve the issue by avoiding the `listBuckets()` call entirely.

## Verification
To verify the fix is working:
1. Try uploading an avatar again
2. Check the logs for "S3Service: Kiểm tra kết nối thành công"
3. The upload should complete successfully

## Expected Log Output After Fix
```
=== UserService: Bắt đầu upload avatar ===
User ID: 1
User found: Minh Khanh
File name: z6499966260933_8cd47fbbd01275001b5bd63b4d72b9c5.jpg
File size: 450674
UserService: Testing S3 connection...
=== S3Service: Tạo S3 client ===
S3Service: Access Key ID: AKIARUOBQEWWN7ZYJ2UL
S3Service: Secret Key Length: 40
S3Service: Region: ap-southeast-2
S3Service: Bucket Name: bloodline-dna-files-v3
S3Service: Tạo S3 client thành công
S3Service: Kiểm tra kết nối thành công
UserService: S3 connection test result: true
UserService: File uploaded to S3: https://bloodline-dna-files-v3.s3.ap-southeast-2.amazonaws.com/...
UserService: Avatar URL saved to database
=== UserService: Upload avatar thành công ===
``` 