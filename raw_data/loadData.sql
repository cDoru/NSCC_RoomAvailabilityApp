CREATE DATABASE IF NOT EXISTS nsccschedule;
CONNECT nsccschedule;

CREATE USER IF NOT EXISTS 'root'@'localhost'
  IDENTIFIED BY 'inet2005';
GRANT ALL PRIVILEGES ON nsccschedule TO 'root'@'localhost' WITH GRANT OPTION; 

DROP TABLE IF EXISTS CourseDelivery_TEMP;

CREATE TABLE CourseDelivery_TEMP (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	faculty VARCHAR(255) NOT NULL,
	department VARCHAR(255) NOT NULL,
	course VARCHAR(255) NOT NULL,
	sectionNo VARCHAR(255) NOT NULL,
	term VARCHAR(255) NOT NULL,
	componentType VARCHAR(255) NOT NULL,
	component VARCHAR(255) NOT NULL,
	deliveryId VARCHAR(255) NOT NULL,
	enrollment INT NOT NULL,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	intervalNo INT NOT NULL,
	days VARCHAR(7) NOT NULL,
	startTime TIME,
	endTime TIME,
	duration TIME NOT NULL,
	reservationType VARCHAR(255) NOT NULL,
	componentDesc VARCHAR(255) NOT NULL,
	deliveryDesc VARCHAR(255) NOT NULL,
	regStatus INT
);

LOAD DATA LOCAL INFILE 
'Delivery_2016-11-06_19.01.00.txt' 
INTO TABLE CourseDelivery_TEMP
(@row)
SET faculty = TRIM(SUBSTR(@row,1,30)),
    department = TRIM(SUBSTR(@row,31,30)),
	 course = TRIM(SUBSTR(@row,61,30)),
    sectionNo = TRIM(SUBSTR(@row,91,13)),
	 term = TRIM(SUBSTR(@row,121,13)),
	 componentType = TRIM(SUBSTR(@row,151,13)),
	 component = TRIM(SUBSTR(@row,181,13)),
	 deliveryId = TRIM(SUBSTR(@row,211,13)),
	 enrollment = TRIM(SUBSTR(@row,241,13)),
	 startDate = TRIM(SUBSTR(@row,251,10)),
	 endDate = TRIM(SUBSTR(@row,261,10)),
	 intervalNo = TRIM(SUBSTR(@row,271,2)),
	 days = TRIM(SUBSTR(@row,273,7)),
	 startTime = TRIM(SUBSTR(@row,280,5)),
	 endTime = TRIM(SUBSTR(@row,285,5)),
	 duration = TRIM(SUBSTR(@row,290,5)),
	 reservationType = TRIM(SUBSTR(@row,295,30)),
	 componentDesc = TRIM(SUBSTR(@row,325,35)),
	 deliveryDesc = TRIM(SUBSTR(@row,360,255)),
	 regStatus = TRIM(SUBSTR(@row,870,1))
;

DROP TABLE IF EXISTS RoomDelivery_TEMP;
CREATE TABLE RoomDelivery_TEMP (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	faculty VARCHAR(255) NOT NULL,
	department VARCHAR(255) NOT NULL,
	course VARCHAR(255) NOT NULL,
	sectionNo VARCHAR(255) NOT NULL,
	term VARCHAR(255) NOT NULL,
	componentType VARCHAR(255) NOT NULL,
	component VARCHAR(255) NOT NULL,
	deliveryId VARCHAR(255) NOT NULL,
	campus VARCHAR(255) NOT NULL,
	building VARCHAR(255) NOT NULL,
	floorNm VARCHAR(255) NOT NULL,
	room VARCHAR(255) NOT NULL,
	status CHAR(1) NOT NULL
);

LOAD DATA LOCAL INFILE 
'Delivery_Room_2016-11-06_19.01.00.txt' 
INTO TABLE RoomDelivery_TEMP
(@row)
SET faculty = TRIM(SUBSTR(@row,1,30)),
    department = TRIM(SUBSTR(@row,31,30)),
	course = TRIM(SUBSTR(@row,61,30)),
    sectionNo = TRIM(SUBSTR(@row,91,13)),
	 term = TRIM(SUBSTR(@row,121,13)),
	 componentType = TRIM(SUBSTR(@row,151,13)),
	 component = TRIM(SUBSTR(@row,181,13)),
	 deliveryId = TRIM(SUBSTR(@row,211,13)),
	 campus = TRIM(SUBSTR(@row,241,13)),
	 building = TRIM(SUBSTR(@row,271,13)),
	 floorNm = TRIM(SUBSTR(@row,301,13)),
	 room = TRIM(SUBSTR(@row,331,13)),
	 status = TRIM(SUBSTR(@row,361,13))
;

SET SQL_SAFE_UPDATES = 0;

DROP TABLE IF EXISTS daysLU;
CREATE TABLE daysLU
(
	id INT,
    dayChar CHAR(1)
);

INSERT INTO daysLU VALUES
(1, 'U');
INSERT INTO daysLU VALUES
(2, 'M');
INSERT INTO daysLU VALUES
(3, 'T');
INSERT INTO daysLU VALUES
(4, 'W');
INSERT INTO daysLU VALUES
(5, 'R');
INSERT INTO daysLU VALUES
(6, 'F');
INSERT INTO daysLU VALUES
(7, 'S');

DROP VIEW IF EXISTS nsccSchedule;
CREATE VIEW nsccSchedule AS 
  (SELECT cd.*, 
          rd.campus, 
          rd.building, 
          rd.floornm,
          rd.room,
          rd.status
   FROM   CourseDelivery_TEMP as cd 
          INNER JOIN RoomDelivery_TEMP as rd 
		  ON cd.faculty = rd.faculty and
			cd.department = rd.department and
			cd.course = rd.course and
			cd.sectionno = rd.sectionno and
			cd.term = rd.term and
			cd.component = rd.component and
			cd.deliveryId = rd.deliveryId);

/*
[todo:] Need to do something here to create a
table of all the Classrooms
so we can find classrooms WITHOUT classes
 */
