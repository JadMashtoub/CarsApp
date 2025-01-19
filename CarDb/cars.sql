
IF OBJECT_ID('cars') IS NOT NULL
DROP TABLE cars
GO
CREATE TABLE cars
(
    carID int NOT NULL IDENTITY(1,1), --PK AUTOINCREMENT
    PRIMARY KEY(CarID),
    [name] [NVARCHAR](50) NOT NULL,
    model [NVARCHAR](50) NOT NULL,
    hasPlates BIT NOT NULL, 
    hasBooks BIT  NOT NULL, 
    plateNo [NVARCHAR](50),
    keyNo [NVARCHAR](50) NOT NULL
);
GO
-- dummy data
INSERT INTO cars ([name],model,hasPlates,plateNo,keyNo,hasBooks)
VALUES ('Toyota Corolla','2008','True','WML755','1','True'),
        ('Honda Civic','2015','True','ABC123','4','False');

-- hasplates doesnt accept none
-- has books doesnt accept either (no text conversion)
select * FROM cars