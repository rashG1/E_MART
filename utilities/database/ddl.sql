# Remember to uncomment delimiter lines if you are using MySQL Workbench
drop schema if exists scms;
create schema scms;
use scms;

CREATE TABLE `Store`
(
    `StoreID` INT AUTO_INCREMENT,
    `City`    VARCHAR(45) NOT NULL,
    PRIMARY KEY (`StoreID`)
);

CREATE TABLE `Employee`
(
    `EmployeeID`   INT AUTO_INCREMENT,
    `Name`         VARCHAR(100)                                          NOT NULL,
    `Username`     VARCHAR(50)                                           NOT NULL,
    `Address`      VARCHAR(100),
    `Contact`      VARCHAR(15),
    `PasswordHash` VARCHAR(200)                                          NOT NULL,
    `Type`         ENUM ('Admin', 'StoreManager', 'Driver', 'Assistant') NOT NULL,
    `StoreID`      INT,
    PRIMARY KEY (`EmployeeID`),
    FOREIGN KEY (`StoreID`) REFERENCES Store (`StoreID`)
);


CREATE TABLE `Driver`
(
    `DriverID`       INT AUTO_INCREMENT,
    `EmployeeID`     INT NOT NULL,
    `WorkingHours`   INT,
    `CompletedHours` INT,
    `Status`         ENUM ('Available', 'Busy'),
    PRIMARY KEY (`DriverID`),
    FOREIGN KEY (`EmployeeID`) REFERENCES `Employee` (`EmployeeID`)
);

CREATE TABLE `Assistant`
(
    `AssistantID`    INT AUTO_INCREMENT,
    `EmployeeID`     INT NOT NULL,
    `WorkingHours`   INT,
    `CompletedHours` INT,
    `Status`         ENUM ('Available', 'Busy'),
    PRIMARY KEY (`AssistantID`),
    FOREIGN KEY (`EmployeeID`) REFERENCES `Employee` (`EmployeeID`)
);

CREATE TABLE `Product`
(
    `ProductID`                INT AUTO_INCREMENT,
    `Name`                     VARCHAR(100)   NOT NULL,
    `TrainCapacityConsumption` DECIMAL(10, 2) NOT NULL,
    `Price`                    DECIMAL(10, 2) NOT NULL,
    `Type`                     ENUM ('clothes', 'Groceries', 'Electronics', 'Cosmetics', 'KitchenItems','Home Appliances', 'Others', 'Furniture') NOT NULL,
    PRIMARY KEY (`ProductID`)
);

CREATE TABLE `Train`
(
    `TrainID`      INT AUTO_INCREMENT,
    `FullCapacity` DECIMAL(10, 2) NOT NULL,
    `StoreID`      INT            NOT NULL,
    `Time`         TIME           NOT NULL,
    `Day`          ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    PRIMARY KEY (`TrainID`),
    FOREIGN KEY (`StoreID`) REFERENCES Store (`StoreID`)
);

CREATE TABLE `TrainSchedule`
(
    `TrainScheduleID`  INT AUTO_INCREMENT,
    `FilledCapacity`   DECIMAL(10, 2) NOT NULL,
    `TrainID`          INT            NOT NULL,
    `ScheduleDateTime` TIMESTAMP      NOT NULL,
    `Status`           ENUM ('Not Completed', 'Completed', 'In Progress'),
    PRIMARY KEY (`TrainScheduleID`),
    FOREIGN KEY (`TrainID`) REFERENCES `Train` (`TrainID`)
);

create table `Train_Contains`
(
    `TrainScheduleID` INT,
    `OrderID`         INT,
    PRIMARY KEY (`TrainScheduleID`, `OrderID`),
    FOREIGN KEY (`TrainScheduleID`) REFERENCES `TrainSchedule` (`TrainScheduleID`)
);


CREATE TABLE `Truck`
(
    `TruckID`      INT AUTO_INCREMENT,
    `StoreID`      INT        NOT NULL,
    `LicencePlate` VARCHAR(8) NOT NULL,
    `Status`       ENUM ('Available', 'Busy'),
    PRIMARY KEY (`TruckID`),
    FOREIGN KEY (`StoreID`) REFERENCES Store (`StoreID`)
);

CREATE TABLE `Route`
(
    `RouteID`       INT AUTO_INCREMENT,
    `Time_duration` TIME NOT NULL,
    `Description`   TEXT,
    `StoreID`       INT  NOT NULL,
    `Distance`      DECIMAL(5, 2),
    PRIMARY KEY (`RouteID`),
    FOREIGN KEY (`StoreID`) REFERENCES Store (`StoreID`)
);

CREATE TABLE `Order_status`
(
    `Status` VARCHAR(50),
    PRIMARY KEY (`Status`)
);

CREATE TABLE `Customer`
(
    `CustomerID`   INT AUTO_INCREMENT,
    `Username`     VARCHAR(50),
    `Name`         VARCHAR(100)             NOT NULL,
    `Address`      VARCHAR(100),
    `Contact`      VARCHAR(15),
    `Type`         ENUM ('End', 'Retailer') NOT NULL,
    `City`         VARCHAR(50),
    `PasswordHash` VARCHAR(200),
    PRIMARY KEY (`CustomerID`)
);

CREATE TABLE `Order`
(
    `OrderID`      INT AUTO_INCREMENT,
    `CustomerID`   INT            NOT NULL,
    `Value`        DECIMAL(10, 2) NOT NULL,
    `OrderDate`    DATE           NOT NULL,
    `DeliveryDate` DATE,
    `RouteID`      INT            NOT NULL,
    `TotalVolume`  DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (`OrderID`),
    FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`CustomerID`),
    FOREIGN KEY (`RouteID`) REFERENCES `Route` (`RouteID`)
);

create table `Contains`
(
    `OrderID`   INT NOT NULL,
    `ProductID` INT NOT NULL,
    `Amount`    INT NOT NULL,
    PRIMARY KEY (`OrderID`, `ProductID`),
    FOREIGN KEY (`OrderID`) REFERENCES `Order` (`OrderID`),
    FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`)
);


CREATE TABLE `Shipment`
(
    `ShipmentID`     INT AUTO_INCREMENT,
    `CreatedDate`    DATE           NOT NULL,
    `Capacity`       DECIMAL(10, 2) NOT NULL,
    `RouteID`        INT            NOT NULL,
    `FilledCapacity` DECIMAL(10, 2),
    `Status`         ENUM ('Ready', 'NotReady', 'Completed'),
    PRIMARY KEY (`ShipmentID`),
    FOREIGN KEY (`RouteID`) REFERENCES `Route` (`RouteID`)
);

create table `Shipment_contains`
(
    `ShipmentID` INT NOT NULL,
    `OrderID`    INT NOT NULL,
    PRIMARY KEY (`ShipmentID`, `OrderID`),
    FOREIGN KEY (`ShipmentID`) REFERENCES `Shipment` (`ShipmentID`)
);


CREATE TABLE `TruckSchedule`
(
    `TruckScheduleID`  INT AUTO_INCREMENT,
    `StoreID`          INT       NOT NULL,
    `ShipmentID`       INT       NOT NULL,
    `ScheduleDateTime` TIMESTAMP NOT NULL,
    `RouteID`          INT       NOT NULL,
    `AssistantID`      INT       NOT NULL,
    `DriverID`         INT       NOT NULL,
    `TruckID`          INT       NOT NULL,
    `Hours`            TIME,
    `Status`           ENUM ('Not Completed', 'In Progress', 'Completed'),
    PRIMARY KEY (`TruckScheduleID`),
    FOREIGN KEY (`StoreID`) REFERENCES Store (`StoreID`),
    FOREIGN KEY (`RouteID`) REFERENCES `Route` (`RouteID`),
    FOREIGN KEY (`DriverID`) REFERENCES `Driver` (`DriverID`),
    FOREIGN KEY (`TruckID`) REFERENCES `Truck` (`TruckID`),
    FOREIGN KEY (`AssistantID`) REFERENCES `Assistant` (`AssistantID`),
    FOREIGN KEY (`ShipmentID`) REFERENCES `Shipment` (`ShipmentID`)
);

CREATE TABLE `Order_Tracking`
(
    `OrderID`   INT         NOT NULL,
    `TimeStamp` TIMESTAMP   NOT NULL,
    `Status`    VARCHAR(50) NOT NULL,
    PRIMARY KEY (`OrderID`, `TimeStamp`),
    FOREIGN KEY (`OrderID`) REFERENCES `Order` (`OrderID`),
    foreign key (`Status`) references `Order_status` (`Status`)
);


# Triggers

# Remember to comment this trigger when running order creation script
DELIMITER //

CREATE TRIGGER after_order_insert
    AFTER INSERT
    ON `Order`
    FOR EACH ROW
BEGIN
    INSERT INTO Order_Tracking (OrderID, TimeStamp, Status)
    VALUES (NEW.OrderID, NOW(), 'Pending');
END;
//


CREATE TRIGGER update_order_totals
    AFTER INSERT
    ON Contains
    FOR EACH ROW
BEGIN
    DECLARE productVolume DECIMAL(10, 2);
    DECLARE productPrice DECIMAL(10, 2);
    DECLARE newVolume DECIMAL(10, 2);
    DECLARE newValue DECIMAL(10, 2);

    -- Fetch the Product's volume and price
    SELECT TrainCapacityConsumption, Price
    INTO productVolume, productPrice
    FROM Product
    WHERE ProductID = NEW.ProductID;

    -- Calculate the additional volume and value
    SET newVolume = productVolume * NEW.Amount;
    SET newValue = productPrice * NEW.Amount;

    -- Update the Order's total volume and value
    UPDATE `Order`
    SET TotalVolume = TotalVolume + newVolume,
        Value       = Value + newValue
    WHERE OrderID = NEW.OrderID;
END;
//


CREATE TRIGGER before_train_contains_insert
    BEFORE INSERT
    ON Train_Contains
    FOR EACH ROW
BEGIN
    DECLARE total_volume DECIMAL(10, 2);
    DECLARE full_capacity DECIMAL(10, 2);
    DECLARE new_filled_capacity DECIMAL(10, 2);

    -- Get the TotalVolume of the Order being added
    SELECT TotalVolume
    INTO total_volume
    FROM `Order`
    WHERE OrderID = NEW.OrderID;

    -- Get the FullCapacity of the Train
    SELECT t.FullCapacity
    INTO full_capacity
    FROM Train t
             JOIN TrainSchedule ts ON t.TrainID = ts.TrainID
    WHERE ts.TrainScheduleID = NEW.TrainScheduleID;

    -- Calculate the new filled capacity
    SELECT FilledCapacity + total_volume
    INTO new_filled_capacity
    FROM TrainSchedule
    WHERE TrainScheduleID = NEW.TrainScheduleID;

    -- Check if the new filled capacity exceeds the full capacity
    IF new_filled_capacity > full_capacity THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Error: Adding this order would exceed the train\'s full capacity.';
    ELSE
        -- Update the FilledCapacity in the TrainSchedule table
        UPDATE TrainSchedule
        SET FilledCapacity = new_filled_capacity
        WHERE TrainScheduleID = NEW.TrainScheduleID;
    END IF;
END;
//


# Views

CREATE VIEW Order_Details_With_Latest_Status AS
SELECT o.OrderID,
       o.CustomerID,
       c.Name       AS CustomerName,
       c.Type       AS CustomerType,
       o.Value,
       o.TotalVolume,
       o.OrderDate,
       r.StoreID,
       s.City       AS StoreCity,
       o.RouteID,
       ot.Status    AS LatestStatus,
       ot.TimeStamp AS LatestTimeStamp,
       sc.ShipmentID,
       ts.TruckScheduleID,
       a.AssistantID,
       a.Name       AS AssistantName,
       d.DriverID,
       d.Name       AS DriverName,
       t.TruckID,
       t.LicencePlate,
       sh.Status    AS ShipmentStatus

FROM `Order` o
         JOIN
     `Route` r ON o.RouteID = r.RouteID
         JOIN
     `Store` s ON r.StoreID = s.StoreID
         JOIN
     `Order_Tracking` ot ON o.OrderID = ot.OrderID
         JOIN
     (SELECT OrderID,
             MAX(TimeStamp) AS LatestTimeStamp
      FROM `Order_Tracking`
      GROUP BY OrderID) AS latest ON ot.OrderID = latest.OrderID AND ot.TimeStamp = latest.LatestTimeStamp
         join customer c on o.CustomerID = c.CustomerID
         left outer join shipment_contains sc on o.OrderID = sc.OrderID
         left outer join truckschedule ts on sc.ShipmentID = ts.ShipmentID
         left outer join shipment sh on sc.ShipmentID = sh.ShipmentID
         left outer join (select Truck.TruckID, Truck.LicencePlate
                          from truckschedule
                                   join truck on truckschedule.TruckID = truck.TruckID) t on ts.TruckID = t.TruckID
         left outer join (select AssistantID, employee.Name
                          from assistant
                                   join employee on assistant.EmployeeID = employee.EmployeeID) a
                         on ts.AssistantID = a.AssistantID
         left outer join (select DriverID, employee.Name
                          from driver
                                   join employee on driver.EmployeeID = employee.EmployeeID) d
                         on ts.DriverID = d.DriverID;
//

CREATE VIEW Quarterly_Product_Report AS
SELECT YEAR(o.OrderDate)       AS Year,
       QUARTER(o.OrderDate)    AS Quarter,
       p.ProductID,
       p.Name                  AS ProductName,
       p.Type                  AS ProductType,
       SUM(c.Amount)           AS TotalQuantity,
       SUM(c.Amount * p.Price) AS TotalRevenue
FROM `Order` o
         JOIN Contains c ON o.OrderID = c.OrderID
         JOIN Product p ON c.ProductID = p.ProductID
         JOIN (SELECT OrderID, MAX(TimeStamp) AS LatestTimestamp
               FROM order_tracking
               GROUP BY OrderID) latest_status ON o.OrderID = latest_status.OrderID
         JOIN order_tracking ot ON latest_status.OrderID = ot.OrderID
    AND latest_status.LatestTimestamp = ot.TimeStamp
WHERE ot.Status != 'Cancelled'
   or ot.Status != 'Attention'
GROUP BY YEAR(o.OrderDate),
         QUARTER(o.OrderDate),
         p.ProductID
ORDER BY Quarter,
         TotalRevenue DESC;
//

CREATE VIEW Quarterly_Store_Report AS
SELECT YEAR(o.OrderDate)    AS Year,
       QUARTER(o.OrderDate) AS Quarter,
       s.StoreID,
       s.City               AS StoreCity,
       COUNT(o.OrderID)     AS NumberOfOrders,
       SUM(o.Value)         AS TotalRevenue
FROM `Order` o
         JOIN
     `Route` r ON o.RouteID = r.RouteID
         JOIN
     `Store` s ON r.StoreID = s.StoreID
         JOIN
     `Order_Tracking` ot ON o.OrderID = ot.OrderID
WHERE ot.Status not in ('Cancelled', 'Attention')
GROUP BY YEAR(o.OrderDate), QUARTER(o.OrderDate), s.StoreID;

create view Train_Schedule_With_Destinations as
select ts.TrainScheduleID,
       (t.FullCapacity - ts.FilledCapacity)       as RemainingCapacity,
       t.FullCapacity,
       (ts.FilledCapacity / t.FullCapacity) * 100 as `FilledPercentage`,
       ts.TrainID,
       ts.ScheduleDateTime,
       ts.Status,
       t.StoreID,
       t.Time,
       t.Day,
       s.City                                     as StoreCity,
       COUNT(c.OrderID)                           as TotalOrders
from TrainSchedule ts
         join Train t on ts.TrainID = t.TrainID
         join Store s on t.StoreID = s.StoreID
         left outer join train_contains c on ts.TrainScheduleID = c.TrainScheduleID
group by ts.TrainScheduleID;
;
//

create view customer_report as
select c.CustomerID,
       c.Name,
       c.Username,
       c.Address,
       c.Type,
       c.City,
       count(o.OrderID) as TotalOrders,
       sum(o.Value)     as TotalRevenue
from Customer c
         join
     `Order` O on c.CustomerID = O.CustomerID
group by c.CustomerID;
//

create view truck_report as
select t.TruckID, t.LicencePlate, sum(r.Distance) as TotalDistance, sum(r.Time_duration) as TotalDuration, s.City
from truck t
         join
     truckschedule ts on t.TruckID = ts.TruckID
         join
     route r on ts.RouteID = r.RouteID
         join store s on t.StoreID = s.StoreID
where ts.Status = 'Completed'
group by t.TruckID;
//

-- to get the daily store sales (sales on a date for each store)
CREATE VIEW v_daily_store_sales AS
SELECT 
    s.StoreID,
    s.City AS StoreCity,
    DATE(o.OrderDate) AS SaleDate,
    COUNT(o.OrderID) AS NumberOfOrders,
    SUM(o.Value) AS TotalRevenue
FROM 
    `Order` o
JOIN 
    Route r ON o.RouteID = r.RouteID
JOIN 
    Store s ON r.StoreID = s.StoreID
JOIN 
    Order_Tracking ot ON o.OrderID = ot.OrderID
WHERE 
    ot.Status NOT IN ('Cancelled', 'Attention')
GROUP BY 
    s.StoreID, s.City, DATE(o.OrderDate)
ORDER BY 
    SaleDate DESC, TotalRevenue DESC
;















# Functions

-- This function adds future train schedules for the next 30 days
-- These two functions will be implemented in the back end later. They are here for testing purposes
CREATE FUNCTION AddFutureTrains()
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE end_date DATE;
    DECLARE start_date DATE;
    DECLARE done INT DEFAULT FALSE;
    DECLARE train_id INT;
    DECLARE full_capacity DECIMAL(10, 2);
    DECLARE store_id INT;
    DECLARE train_time TIME;
    DECLARE train_day ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
    DECLARE schedules_added INT DEFAULT 0;
    DECLARE date_ptr DATE;

    DECLARE train_cursor CURSOR FOR
        SELECT TrainID, FullCapacity, StoreID, Time, Day
        FROM Train;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Set the end date to 30 days from now
    SET end_date = DATE_ADD(CURDATE(), INTERVAL 30 DAY);

    -- Set the start date to the last scheduled date or today
    SELECT COALESCE(MAX(DATE(ScheduleDateTime)), CURDATE())
    INTO start_date
    FROM TrainSchedule
    WHERE ScheduleDateTime >= CURDATE();


    -- CLOSE FUNCTION IF ALREADY SCHEDULED FOR 30 DAYS
    IF start_date >= end_date THEN
        RETURN 0;
    END IF;

    -- Loop through each train
    OPEN train_cursor;
    read_loop:
    LOOP
        FETCH train_cursor INTO train_id, full_capacity, store_id, train_time, train_day;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Add schedules for this train
        SET date_ptr = start_date;
        WHILE date_ptr <= end_date
            DO
                IF DAYNAME(date_ptr) = train_day THEN
                    INSERT IGNORE INTO TrainSchedule (FilledCapacity, TrainID, ScheduleDateTime, Status)
                    VALUES (0, train_id, TIMESTAMP(CONCAT(date_ptr, ' ', train_time)), 'Not Completed');
                    SET schedules_added = schedules_added + 1;
                END IF;
                SET date_ptr = DATE_ADD(date_ptr, INTERVAL 1 DAY);
            END WHILE;
    END LOOP;

    CLOSE train_cursor;

    RETURN schedules_added;
END;
//


-- This function adds future train schedules for the next 7 days only for testing purposes
CREATE FUNCTION AddFutureTrainsTest()
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE end_date DATE;
    DECLARE start_date DATE;
    DECLARE done INT DEFAULT FALSE;
    DECLARE train_id INT;
    DECLARE full_capacity DECIMAL(10, 2);
    DECLARE store_id INT;
    DECLARE train_time TIME;
    DECLARE train_day ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
    DECLARE schedules_added INT DEFAULT 0;
    DECLARE date_ptr DATE;

    DECLARE train_cursor CURSOR FOR
        SELECT TrainID, FullCapacity, StoreID, Time, Day
        FROM Train;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Set the end date to 30 days from now
    SET end_date = DATE_ADD(CURDATE(), INTERVAL 7 DAY);

    -- Set the start date to the last scheduled date or today
    SELECT COALESCE(MAX(DATE(ScheduleDateTime)), CURDATE())
    INTO start_date
    FROM TrainSchedule
    WHERE ScheduleDateTime >= CURDATE();

#     -- Decrease 1 day from start date
#     SET start_date = DATE_SUB(start_date, INTERVAL 1 DAY);


    -- CLOSE FUNCTION IF ALREADY SCHEDULED FOR 30 DAYS
    IF start_date >= end_date THEN
        RETURN 0;
    END IF;

    -- Loop through each train
    OPEN train_cursor;
    read_loop:
    LOOP
        FETCH train_cursor INTO train_id, full_capacity, store_id, train_time, train_day;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Add schedules for this train
        SET date_ptr = start_date;
        WHILE date_ptr <= end_date
            DO
                IF DAYNAME(date_ptr) = train_day THEN
                    INSERT IGNORE INTO TrainSchedule (FilledCapacity, TrainID, ScheduleDateTime, Status)
                    VALUES (0, train_id, TIMESTAMP(CONCAT(date_ptr, ' ', train_time)), 'Not Completed');
                    SET schedules_added = schedules_added + 1;
                END IF;
                SET date_ptr = DATE_ADD(date_ptr, INTERVAL 1 DAY);
            END WHILE;
    END LOOP;

    CLOSE train_cursor;

    RETURN schedules_added;
END;
//

DELIMITER ;


-----------------------------------Procedures-------------------------------------


-- Stored Procedures new ones here
DELIMITER $$

CREATE PROCEDURE CreateOrderWithItems (
    IN p_CustomerID INT,
    IN p_Value DECIMAL(10, 2),
    IN p_OrderDate DATE,
    IN p_DeliveryDate DATE,
    IN p_RouteID INT,
    IN p_TotalVolume DECIMAL(10, 2),
    IN p_Products JSON  -- JSON array to store multiple products (ProductID, Amount)
)
BEGIN
    DECLARE productID INT;
    DECLARE amount INT;
    DECLARE productIndex INT DEFAULT 0;
    DECLARE productCount INT;

    -- Start transaction
    START TRANSACTION;

    -- Insert into the order table
    INSERT INTO `Order` (`CustomerID`, `Value`, `OrderDate`, `DeliveryDate`, `RouteID`, `TotalVolume`)
    VALUES (p_CustomerID, p_Value, IFNULL(p_OrderDate, CURDATE()), p_DeliveryDate, p_RouteID, p_TotalVolume);

    -- Get the last inserted OrderID
    SET @lastOrderID = LAST_INSERT_ID();

    -- Calculate the number of products in the JSON array
    SET productCount = JSON_LENGTH(p_Products);

    -- Loop through the products and insert them into the Contains table
    WHILE productIndex < productCount DO
        -- Extract ProductID and Amount from JSON array
        SET productID = JSON_UNQUOTE(JSON_EXTRACT(p_Products, CONCAT('$[', productIndex, '].ProductID')));
        SET amount = JSON_UNQUOTE(JSON_EXTRACT(p_Products, CONCAT('$[', productIndex, '].Amount')));

        -- Insert into Contains table
        INSERT INTO `Contains` (`OrderID`, `ProductID`, `Amount`)
        VALUES (@lastOrderID, productID, amount);

        -- Increment index
        SET productIndex = productIndex + 1;
    END WHILE;

    -- Commit the transaction
    COMMIT;
END$$

DELIMITER ;

-- Stored Procedure to get routes by city

DELIMITER //
CREATE PROCEDURE GetRoutesByCity(IN cityName VARCHAR(255))
BEGIN
    SELECT RouteID, Description 
    FROM route 
    LEFT JOIN store USING (StoreID) 
    WHERE City = cityName;
END //
DELIMITER ;






#indexes for the tables
-- Create index on Username for faster lookup
CREATE INDEX idx_username ON customer (Username);