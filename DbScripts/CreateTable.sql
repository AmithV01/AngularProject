USE master
GO 

DROP DATABASE TravelAway
GO

CREATE DATABASE TravelAway
GO

USE TravelAway


CREATE TABLE [dbo].[Roles] (
	[RoleId] TINYINT IDENTITY (1, 1) NOT NULL,
	[RoleName] VARCHAR (20) NULL, 
	CONSTRAINT [pk_RoleId] PRIMARY KEY CLUSTERED ([RoleId] ASC),
	CONSTRAINT [uq_RoleName] UNIQUE NONCLUSTERED ([RoleName] ASC)
);
go

CREATE TABLE [dbo].[Customer] (
	[EmailId] VARCHAR (50) NOT NULL, 
	[Password] VARCHAR (20) NOT NULL,
	[FirstName] VARCHAR (50) NOT NULL,
	[LastName] VARCHAR (50) NOT NULL,
	[RoleId] TINYINT  NULL,
    [Gender] CHAR (1) NOT NULL,
	[Address] VARCHAR (200) NOT NULL,
	[DOB] DATE NOT NULL,
	[ContactNumber] NUMERIC(10) NOT NULL, 
	CONSTRAINT [pk_EmailId] PRIMARY KEY CLUSTERED ([EmailId] ASC),
	CONSTRAINT [fk_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([RoleId]),
	CONSTRAINT [chk_Gender] CHECK ([Gender]='F' OR [Gender] = 'M')
);
go

CREATE TABLE [dbo].[Vehicle] (
	[VehicleId] BIGINT IDENTITY (1, 1) NOT NULL,
    [VehicleName] VARCHAR (50) NOT NULL,
	[VehicleType] VARCHAR (50) NOT NULL,
	[CostPerHour] DECIMAL (18) NOT NULL,
	[CostPerKm] DECIMAL (18) NOT NULL,
	CONSTRAINT [pk_VehicleId] PRIMARY KEY CLUSTERED ([VehicleId] ASC)
);
GO

CREATE TABLE [dbo].[Hotel] (
	[HotelId] BIGINT IDENTITY (1, 1) NOT NULL,
    [HotelName] NVARCHAR (MAX) NULL,
	[Single] DECIMAL(18) NOT NULL,
	[Doub] DECIMAL (18) NOT NULL,
	[Dulex] DECIMAL (18) NOT NULL,
	[Suite] DECIMAL (18) NOT NULL,
	[City] VARCHAR (50) NOT NULL,
	[Rating] TINYINT NULL,
	CONSTRAINT [pk_HotelId] PRIMARY KEY CLUSTERED ([HotelId] ASC)
);
GO


CREATE TABLE [dbo].[Packages] (
	[PackageId]	TINYINT	IDENTITY (1, 1) NOT NULL,
	[PackageName] VARCHAR (58) NOT NULL,
	[PackageDescription] NVARCHAR (MAX) NULL,
	[CategoryName] VARCHAR (20) NOT NULL,
	[ImageSrc] VARCHAR (200) NOT NULL,
	CONSTRAINT [pk_PackageId] PRIMARY KEY CLUSTERED ([PackageId] ASC), 
	CONSTRAINT [uq_PackageName] UNIQUE NONCLUSTERED ([PackageName] ASC)
);
go

CREATE TABLE [dbo].[SubPackages] (
	[SubPackageId] TINYINT IDENTITY (1, 1) NOT NULL,
	[PackageId] TINYINT NULL,
	[PlacesToVisit] NVARCHAR (MAX) NULL,
	[PackageDescription] NVARCHAR (MAX) NULL,
	[DaysAndNights] CHAR(4) NOT NULL,
	[SubPackagePricePerAdult] NUMERIC (10) NULL,
    [Accomodation] VARCHAR (30) NOT NULL,
	[ImageSrc] VARCHAR (200) NOT NULL,
	CONSTRAINT [pk_SubPackageId] PRIMARY KEY CLUSTERED ([SubPackageId] ASC),
	CONSTRAINT [Fk_PackageId1] FOREIGN KEY ([PackageId]) REFERENCES [dbo].[Packages] ([PackageId]) ON DELETE CASCADE,
	CHECK ([Accomodation]='Available' OR [Accomodation]='Unavailable')
);
GO

CREATE TABLE [dbo].[BookPackage] (
	[BookingId] BIGINT IDENTITY (10000, 1) NOT NULL,
	[EmailId] VARCHAR (50) NOT NULL,
	[SubPackageId] TINYINT NULL,
	[ContactNumber] NUMERIC (10) NOT NULL,
	[Address] VARCHAR (200) NOT NULL,
	[TravelDate] DATE NOT NULL,
	[NoOfChildren] SMALLINT NULL,
	[NoOfAdults] SMALLINT NULL,
	[Status] VARCHAR (10) NULL,
	CONSTRAINT [pk BookingId] PRIMARY KEY CLUSTERED ([BookingId] ASC),
	CONSTRAINT [Fk_Email1d1] FOREIGN KEY ([EmailId]) REFERENCES [dbo].[Customer] ([EmailId]),
	CONSTRAINT [fk_SubPackageId1] FOREIGN KEY ([SubPackageId]) REFERENCES [dbo].[SubPackages] ([SubPackageId]) ON DELETE CASCADE,
	CONSTRAINT [chk_TravelDate]  CHECK  ([TravelDate]>getdate())
);
GO



CREATE TABLE [dbo].[Payment] (
	[PaymentId] INT IDENTITY (1, 1) NOT NULL, 
	[BookingId] BIGINT NULL,
	[Amount] NUMERIC (10) NULL,
	[Status] VARCHAR (10) NULL,
	CONSTRAINT [pk_PaymentId] PRIMARY KEY CLUSTERED ([PaymentId] ASC),
	CONSTRAINT [fk_BookingId2] FOREIGN KEY ([BookingId]) REFERENCES [dbo].[BookPackage]([BookingId]) ON DELETE CASCADE
	);
GO

CREATE TABLE [dbo].[BookVehicle] (
	[VehicleBookId] INT IDENTITY (1, 1) NOT NULL,
	[TravelDate] DATE NULL,
	[PickupTime] VARCHAR (28) NOT NULL,
	[NoOfHrs] INT NULL,
	[NoofKm] DECIMAL (18) NULL, 
	[EstimatedCost] NUMERIC (10) NULL, 
	[VehicleId] BIGINT NULL,
	[VehicleType] VARCHAR (58) NOT NULL,
	CONSTRAINT [pk_VehicleBookId] PRIMARY KEY CLUSTERED ([VehicleBookId] ASC),
	CONSTRAINT [fk_VehicleId1] FOREIGN KEY ([VehicleId]) REFERENCES [dbo].[Vehicle] ([VehicleId]) ON DELETE CASCADE
);
GO

CREATE TABLE [dbo].[BookAccomodation] ( 
	[AccomodationId] BIGINT IDENTITY (1, 1) NOT NULL,
	[NoofRooms] TINYINT NULL,
	[HotelId] BIGINT NULL,
	[bookingId] BIGINT NULL,
	CONSTRAINT [pk_AccomodationId] PRIMARY KEY CLUSTERED ([AccomodationId] ASC), 
	CONSTRAINT [fk_BookingId4] FOREIGN KEY ([bookingId]) REFERENCES [dbo].[BookPackage] ([BookingId]),
	CONSTRAINT [FK_HotelId1] FOREIGN KEY ([HotelId]) REFERENCES [dbo].[Hotel] ([HotelId]) ON DELETE CASCADE
);
GO

CREATE TABLE [dbo].[Rating] (
	[RatingId] INT IDENTITY (1, 1) NOT NULL,
	[BookingId] BIGINT NULL,
	[Rating] INT NOT NULL,
	[ReviewComments] NVARCHAR (MAX) NULL,
	CONSTRAINT [pk_RatingId] PRIMARY KEY CLUSTERED ([RatingId] ASC), 
	CONSTRAINT [fk_BookingId3] FOREIGN KEY ([BookingId]) REFERENCES [dbo].[BookPackage] ([BookingId])
);
go

CREATE TABLE [dbo].[CustomerCare] (
	[CustomerCareId] INT IDENTITY (1, 1) NOT NULL,
	[emailId] VARCHAR(50) NOT NULL,
	[Question] NVARCHAR (MAX) NULL,
	[Response] NVARCHAR (MAX) NULL,
	[Status] VARCHAR (50) NULL,
	CONSTRAINT [Pk_CustomerCareId] PRIMARY KEY CLUSTERED ([CustomerCareId] ASC),
	CONSTRAINT [fk_emailId3] FOREIGN KEY ([emailId]) REFERENCES [dbo].[Customer] ([EmailId])
);
GO


