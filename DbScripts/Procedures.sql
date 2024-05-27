CREATE PROCEDURE usp_validateUser
(
	@email varchar(50),
	@password varchar(20),
	@role varchar(20) out
)
as
 begin
	begin try
		if not exists(select * from Customer where EmailId=@email)
			return -1
		else if exists(select * from Customer where EmailId=@email and Password=@password)
		begin
			select @role=r.RoleName from Customer c, Roles r where r.RoleId=(select RoleId from Customer where EmailId=@email and Password=@password)
		    return 1
		end
		else
		return -2
	end try
	begin catch
		return -99
	end catch
 end

 go

 CREATE PROCEDURE usp_addPackage
 (
	@email varchar(50),
	@subid tinyint,
	@cn numeric,
	@addr varchar(20),
	@td date,
	@adults smallint,
	@children smallint,
	@bookId bigInt out
 )
 as
  begin
		begin try
			insert into BookPackage values(@email,@subid,@cn,@addr,@td,@adults,@children,'booked');
			set @bookId=@@IDENTITY;
			return 1;
		end try
		begin catch
			set @bookId=-1;
			return -99;
		end catch
  end
go

CREATE FUNCTION [dbo].[ufn_GetCountByCategory]()
RETURNS TABLE
AS
  RETURN (SELECT p.categoryname as ProductCategory, count(*) as count from Packages p, SubPackages s, BookPackage b where p.PackageId=s.PackageId and s.SubPackageId=b.SubPackageId group by p.CategoryName)
GO

CREATE FUNCTION [dbo].[ufn_GetCountByPackage]()
RETURNS TABLE
AS
  RETURN (SELECT p.PackageName as PackageCategory, count(*) as count from Packages p, SubPackages s, BookPackage b where p.PackageId=s.PackageId and s.SubPackageId=b.SubPackageId group by p.PackageName)
GO

CREATE FUNCTION [dbo].[ufn_GetCountByMonth]()
RETURNS TABLE
AS
  RETURN (SELECT s.SubPackageId as PackageId, MONTH(b.TravelDate) as Month,YEAR(b.TravelDate) as Year,COUNT(*) as Count from  SubPackages s, BookPackage b where  s.SubPackageId=b.SubPackageId group by s.SubPackageId,MONTH(b.TravelDate),YEAR(b.TravelDate))
GO

CREATE FUNCTION [dbo].[ufn_GetRevenueByMonth]()
RETURNS TABLE
AS
  RETURN (SELECT  MONTH(b.TravelDate) as Month,YEAR(b.TravelDate) as Year,SUM(p.Amount) as Amount from  Payment p, BookPackage b where  b.BookingId=p.BookingId group by MONTH(b.TravelDate),YEAR(b.TravelDate))
GO

CREATE FUNCTION [dbo].[ufn_getAmount]
(
  @typ varchar(20),
  @id bigint
)
returns numeric
as
	begin
		declare @amt int;
		if(@typ='Single')
			SELECT @amt=Single from Hotel where HotelId=@id;
		else if(@typ='Double')
			SELECT @amt=Doub from Hotel where HotelId=@id;
		else if(@typ='Deluxe')
			SELECT @amt=Dulex from Hotel where HotelId=@id;
		else if(@typ='Suite')
			SELECT @amt=Suite from Hotel where HotelId=@id;
		return @amt;
	end
go