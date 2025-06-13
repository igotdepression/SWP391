-- Create Role table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Role')
BEGIN
    CREATE TABLE Role (
        id INT IDENTITY(1,1) PRIMARY KEY,
        roleName VARCHAR(50) NOT NULL UNIQUE
    );
END

-- Create Account table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Account')
BEGIN
    CREATE TABLE Account (
        id INT IDENTITY(1,1) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );
END

-- Create User table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'User')
BEGIN
    CREATE TABLE [User] (
        id INT IDENTITY(1,1) PRIMARY KEY,
        fullName NVARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        address NVARCHAR(MAX),
        status VARCHAR(50) DEFAULT 'ACTIVE',
        accountId INT NOT NULL,
        roleId INT NOT NULL,
        FOREIGN KEY (accountId) REFERENCES Account(id),
        FOREIGN KEY (roleId) REFERENCES Role(id)
    );
END 