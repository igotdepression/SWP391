--CREATE DATABASE DNATestingService
--GO


-- ================== XÓA BẢNG NẾU ĐÃ TỒN TẠI ==================
-- Phải theo thứ tự ngược lại với thứ tự phụ thuộc
IF OBJECT_ID('Sample') IS NOT NULL DROP TABLE Sample;
IF OBJECT_ID('Participant') IS NOT NULL DROP TABLE Participant;
IF OBJECT_ID('TestResult') IS NOT NULL DROP TABLE TestResult;
IF OBJECT_ID('Feedback') IS NOT NULL DROP TABLE Feedback;
IF OBJECT_ID('Payment') IS NOT NULL DROP TABLE Payment;
IF OBJECT_ID('Booking') IS NOT NULL DROP TABLE Booking;
IF OBJECT_ID('BlogPost') IS NOT NULL DROP TABLE BlogPost;
IF OBJECT_ID('Service') IS NOT NULL DROP TABLE Service;
IF OBJECT_ID('Surcharge') IS NOT NULL DROP TABLE Surcharge;
IF OBJECT_ID('[User]') IS NOT NULL DROP TABLE [User];
IF OBJECT_ID('Account') IS NOT NULL DROP TABLE Account;
IF OBJECT_ID('Role') IS NOT NULL DROP TABLE Role;
GO

-- ================== TẠO LẠI CÁC BẢNG ==================

-- Bảng Role
CREATE TABLE Role (
    roleID INT PRIMARY KEY IDENTITY(1,1),
    roleName VARCHAR(50) NOT NULL
);
GO

-- Bảng Account
CREATE TABLE Account (
    AccountID INT PRIMARY KEY IDENTITY(1,1),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);
GO

-- Bảng User
CREATE TABLE [User] (
    userID INT PRIMARY KEY IDENTITY(1,1),
    roleID INT,
    AccountID INT UNIQUE,
    fullName VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15),
    email VARCHAR(100) NOT NULL,
    status VARCHAR(20),
    FOREIGN KEY (roleID) REFERENCES Role(roleID),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);
GO

-- Bảng Surcharge
CREATE TABLE Surcharge (
    surchargeID INT PRIMARY KEY ,
    typeSample VARCHAR(100) NOT NULL,
    priceSur MONEY NOT NULL
);
GO

-- Bảng Service
CREATE TABLE Service (
    serviceID INT PRIMARY KEY ,
    surchargeID INT,
    serviceName VARCHAR(100) NOT NULL,
    typeOfService VARCHAR(100) NOT NULL,
    typeOfCollection VARCHAR(100) NOT NULL,
    price MONEY,
    [3rdSamplePrice] MONEY,
    FOREIGN KEY (surchargeID) REFERENCES Surcharge(surchargeID)
);
GO

-- Bảng Booking (không tạo FK tới Feedback/TestResult để tránh vòng lặp)
CREATE TABLE Booking (
    bookingID INT PRIMARY KEY IDENTITY(1,1),
    userID INT,
    serviceID INT,
    feedbackID INT NULL,
    resultID INT NULL,
    bookingDate DATE,
    status VARCHAR(20),
    paymentID INT NULL,
    totalPrice MONEY,
    FOREIGN KEY (userID) REFERENCES [User](userID),
    FOREIGN KEY (serviceID) REFERENCES Service(serviceID)
);
GO

-- Bảng Payment
CREATE TABLE Payment (
    paymentID INT PRIMARY KEY IDENTITY(1,1),
    bookingID INT,
    paymentDate DATE,
    amount MONEY,
    paymentMethod VARCHAR(50),
    status VARCHAR(20),
    FOREIGN KEY (bookingID) REFERENCES Booking(bookingID)
);
GO

-- Bảng Feedback
CREATE TABLE Feedback (
    feedbackID INT PRIMARY KEY IDENTITY(1,1),
    bookingID INT,
    comments TEXT,
    rating INT,
    createDate DATE,
    FOREIGN KEY (bookingID) REFERENCES Booking(bookingID)
);
GO

-- Bảng TestResult
CREATE TABLE TestResult (
    testResultID INT PRIMARY KEY IDENTITY(1,1),
    bookingID INT,
    resultDate DATE,
    resultStatus VARCHAR(50),
    resultContent TEXT,
    FOREIGN KEY (bookingID) REFERENCES Booking(bookingID)
);
GO

-- Bảng Participant
CREATE TABLE Participant (
    participantID INT PRIMARY KEY IDENTITY(1,1),
    fullName VARCHAR(100) NOT NULL,
    dateOfBirth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    relationshipToCustomer VARCHAR(100),
    identityNumber VARCHAR(20),
    phoneNumber VARCHAR(15),
    address VARCHAR(200),
    note TEXT

);
GO

-- Bảng Sample
CREATE TABLE Sample (
    sampleID INT PRIMARY KEY IDENTITY(1,1),
    bookingID INT,
	userID int,
    participantID INT UNIQUE, -- mỗi sample chỉ có 1 participant
    sampleType VARCHAR(100) NOT NULL,
    receivedDate DATE,
    status VARCHAR(100) NOT NULL,
	FOREIGN KEY (userID) REFERENCES [User](userID),
    FOREIGN KEY (bookingID) REFERENCES Booking(bookingID),
    FOREIGN KEY (participantID) REFERENCES Participant(participantID)
);
GO

-- Bảng BlogPost
CREATE TABLE BlogPost (
    postID INT PRIMARY KEY,
    userID INT,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    FOREIGN KEY (userID) REFERENCES [User](userID)
);
GO

CREATE Table Consultant(
  consultantID int PRIMARY KEY,
  userID int not null,
  consultantDate datetime not null,
  notes text,
  status varchar(20),
  FOREIGN KEY (userID) REFERENCES [User](userID),
);


