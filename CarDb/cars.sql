
IF OBJECT_ID('cars') IS NOT NULL
DROP TABLE cars
GO
CREATE TABLE cars
(
    -- carID int AUTO_INCREMENT PRIMARY KEY, --PK AUTOINCREMENT
    [name] [NVARCHAR](50) NOT NULL,
    model [NVARCHAR](50) NOT NULL,
    hasPlates [NVARCHAR](50) NOT NULL, --Can actually be null
    plateNo [NVARCHAR](50) NOT NULL,
    keyNo [NVARCHAR](50) NOT NULL
    PRIMARY KEY (name)
);
GO

INSERT INTO cars ([name],model,hasPlates,plateNo,keyNo)
VALUES ('Toyota Corolla','2008','True','WML755','1'),
        ('Honda Civic','2015','True','ABC123','4');


select * FROM cars