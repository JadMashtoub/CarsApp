
IF OBJECT_ID('cars') IS NOT NULL
DROP TABLE cars
GO
IF OBJECT_ID('locations') IS NOT NULL
DROP TABLE locations
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
    keyNo [NVARCHAR](50) NOT NULL,
    [location] [NVARCHAR](100) NULL,
    vin [NVARCHAR](50)  NULL,
    colour [NVARCHAR](50)  NULL,
    damage BIT NULL,

);

 CREATE TABLE locations 
 (
    locationsID INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL
 );

GO
-- dummy data
INSERT INTO cars ([name],model,hasPlates,plateNo,keyNo,hasBooks,[location],vin, colour, damage)
VALUES  ('Honda Civic','2015','True','ABC123','4','False', 'berwick','123','123213','12312'),
        ('TEST','TEST','True','TEST12','1','True','','','','');
        -- ('Toyota Corolla','2008','True','WML755','1','True',''),
        -- ('Honda Civic','2015','True','ABC123','4','False','');

INSERT INTO locations(name)
VALUES ('PD'),
('Evolution Drive'),
('Mcm')
select * from locations
select * FROM cars


-- ALTER TABLE cars ADD vin NVARCHAR(100) NULL;
-- ALTER TABLE cars ADD colour NVARCHAR(50) NULL;
-- ALTER TABLE cars ADD damage NVARCHAR(50) NULL;