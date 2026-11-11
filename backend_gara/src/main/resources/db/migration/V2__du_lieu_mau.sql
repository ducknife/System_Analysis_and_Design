INSERT INTO tblUser (userID, username, password, fullname, phone, email) VALUES
    (1, 'A', '123a123@', 'Nguyễn Văn Hùng', '0901000001', 'hung@gara.vn'),
    (2, 'ql2', '123a123@', 'Trần Thị Lan', '0901000002', 'lan@gara.vn'),
    (3, 'nvc', '123a123@', 'Nguyễn Văn C', '0902000001', 'c@gara.vn'),
    (4, 'nvd', '123a123@', 'Nguyễn Văn D', '0902000002', 'd@gara.vn'),
    (5, 'nve', '123a123@', 'Nguyễn Văn E', '0902000003', 'e@gara.vn'),
    (6, '0888666888', '', 'Nguyễn Văn B', '0888666888', 'B@gmail.com'),
    (7, '0912345678', '', 'Trần Minh Quân', '0912345678', 'quan@gmail.com'),
    (8, '0977111222', '', 'Lê Thị Mai', '0977111222', 'mai@gmail.com'),
    (9, '0966333444', '', 'Phạm Văn Đức', '0966333444', 'duc@gmail.com');

INSERT INTO tblManager (userID, employeeCode, specialization) VALUES
    (1, 'QL001', 'Quản lý xưởng'),
    (2, 'QL002', 'Quản lý dịch vụ');

INSERT INTO tblStaff (userID, employeeCode, specialization, bankAccount) VALUES
    (3, 'NV001', 'Sửa chữa ô tô & thay vỏ xe', '0123456789'),
    (4, 'NV002', 'Bảo dưỡng nhanh & thay dầu nhớt', '9876543210'),
    (5, 'NV003', 'Sửa chữa gầm máy ô tô', '');

INSERT INTO tblCustomer (userID, address) VALUES
    (6, 'Hà Đông, Hà Nội'),
    (7, 'Cầu Giấy, Hà Nội'),
    (8, 'Thanh Xuân, Hà Nội'),
    (9, 'Long Biên, Hà Nội');

INSERT INTO tblCar (carID, customerID, licensePlate, brand, model, year) VALUES
    (1, 6, '88A-88888', 'Nissan', 'Nissan GTR R35', 2010),
    (2, 6, '88A-88889', 'Toyota', 'Vios', 2019),
    (3, 7, '30A-12345', 'Toyota', 'Vios', 2018),
    (4, 8, '29H-56789', 'Honda', 'City', 2021),
    (5, 8, '30G-24680', 'Mazda', 'CX-5', 2020),
    (6, 9, '51F-11223', 'Ford', 'Ranger', 2022);

INSERT INTO tblAppointment (appointmentID, customerID, time, status) VALUES
    (1, 6, date_trunc('day', localtimestamp) + interval '8 hours', 'Đã xác nhận'),
    (2, 7, date_trunc('month', localtimestamp) - interval '1 month' + interval '4 days 9 hours', 'Đã tiếp nhận'),
    (3, 8, date_trunc('month', localtimestamp) - interval '1 month' + interval '8 days 9 hours', 'Đã tiếp nhận'),
    (4, 8, localtimestamp - interval '1 day', 'Đã tiếp nhận'),
    (5, 9, localtimestamp - interval '2 days', 'Đã tiếp nhận');

INSERT INTO tblAppointmentDetail (appointmentDetailID, appointmentID, carID) VALUES
    (1, 1, 1),
    (2, 1, 2),
    (3, 2, 3),
    (4, 3, 4),
    (5, 4, 5),
    (6, 5, 6);

INSERT INTO tblSlot (slotID, location, status) VALUES
    (1, 'Khoang A1', 'Trống'),
    (2, 'Khoang A2', 'Đang sử dụng'),
    (3, 'Khoang B1', 'Trống'),
    (4, 'Khoang B2', 'Trống');

INSERT INTO tblService (serviceID, name, price, laborContent) VALUES
    (1, 'Thay dầu động cơ', 350000, 1.0),
    (2, 'Bảo dưỡng phanh trước', 450000, 1.5),
    (3, 'Thay vỏ xe', 500000, 3.0),
    (4, 'Thay lốp xe', 300000, 2.0),
    (5, 'Cân chỉnh thước lái', 400000, 1.5),
    (6, 'Sửa chữa gầm máy', 1500000, 4.0),
    (7, 'Bảo dưỡng định kỳ 10.000 km', 800000, 2.5);

INSERT INTO tblComponent (componentID, name, price, inventoryQty) VALUES
    (1, 'Dầu động cơ Castrol 4L', 780000, 25),
    (2, 'Má phanh trước Bosch', 1150000, 10),
    (3, 'Vỏ xe Michelin 17 inch', 2500000, 8),
    (4, 'Lốp xe Bridgestone 16 inch', 2200000, 6),
    (5, 'Lọc gió động cơ', 250000, 15),
    (6, 'Ắc quy GS 60Ah', 1800000, 0);

INSERT INTO tblServiceSlip (serviceSlipID, appointmentDetailID, slotID, time, status, totalCost) VALUES
    (1, 3, 1, date_trunc('month', localtimestamp) - interval '1 month' + interval '4 days 9 hours', 'Đã hoàn thành', 5100000),
    (2, 4, 3, date_trunc('month', localtimestamp) - interval '1 month' + interval '8 days 9 hours', 'Đã hoàn thành', 3230000),
    (3, 5, NULL, localtimestamp - interval '1 day', 'Chờ phân công', 1930000),
    (4, 6, 2, localtimestamp - interval '2 days', 'Đang thực hiện', 1500000);

INSERT INTO tblServiceDetail (serviceSlipID, serviceID, staffID, price, laborContent, startedAt, finishedAt) VALUES
    (1, 5, 4, 400000, 1.5, date_trunc('month', localtimestamp) - interval '1 month' + interval '4 days 10 hours', date_trunc('month', localtimestamp) - interval '1 month' + interval '5 days 11 hours'),
    (1, 4, 5, 300000, 2.0, date_trunc('month', localtimestamp) - interval '1 month' + interval '4 days 10 hours', date_trunc('month', localtimestamp) - interval '1 month' + interval '5 days 15 hours'),
    (2, 1, 3, 350000, 1.0, date_trunc('month', localtimestamp) - interval '1 month' + interval '8 days 10 hours', date_trunc('month', localtimestamp) - interval '1 month' + interval '9 days 11 hours'),
    (2, 2, 4, 450000, 1.5, date_trunc('month', localtimestamp) - interval '1 month' + interval '8 days 10 hours', date_trunc('month', localtimestamp) - interval '1 month' + interval '9 days 14 hours'),
    (2, 3, 3, 500000, 3.0, date_trunc('month', localtimestamp) - interval '1 month' + interval '8 days 10 hours', date_trunc('month', localtimestamp) - interval '1 month' + interval '10 days 16 hours'),
    (3, 7, NULL, 800000, 2.5, NULL, NULL),
    (3, 1, NULL, 350000, 1.0, NULL, NULL),
    (4, 6, 5, 1500000, 4.0, localtimestamp - interval '2 days', NULL);

INSERT INTO tblComponentDetail (serviceSlipID, componentID, qty, price) VALUES
    (1, 4, 2, 2200000),
    (2, 1, 1, 780000),
    (2, 2, 1, 1150000),
    (3, 1, 1, 780000);

INSERT INTO tblSlipHandling (serviceSlipID, managerID, role, handledAt) VALUES
    (1, 1, 'Tiếp nhận', date_trunc('month', localtimestamp) - interval '1 month' + interval '4 days 9 hours'),
    (1, 2, 'Phân công', date_trunc('month', localtimestamp) - interval '1 month' + interval '4 days 10 hours'),
    (2, 1, 'Tiếp nhận', date_trunc('month', localtimestamp) - interval '1 month' + interval '8 days 9 hours'),
    (2, 1, 'Phân công', date_trunc('month', localtimestamp) - interval '1 month' + interval '8 days 10 hours'),
    (3, 2, 'Tiếp nhận', localtimestamp - interval '1 day'),
    (4, 1, 'Tiếp nhận', localtimestamp - interval '2 days'),
    (4, 2, 'Phân công', localtimestamp - interval '2 days');

SELECT setval(pg_get_serial_sequence('tbluser', 'userid'), (SELECT max(userID) FROM tblUser));
SELECT setval(pg_get_serial_sequence('tblcar', 'carid'), (SELECT max(carID) FROM tblCar));
SELECT setval(pg_get_serial_sequence('tblappointment', 'appointmentid'), (SELECT max(appointmentID) FROM tblAppointment));
SELECT setval(pg_get_serial_sequence('tblappointmentdetail', 'appointmentdetailid'), (SELECT max(appointmentDetailID) FROM tblAppointmentDetail));
SELECT setval(pg_get_serial_sequence('tblslot', 'slotid'), (SELECT max(slotID) FROM tblSlot));
SELECT setval(pg_get_serial_sequence('tblservice', 'serviceid'), (SELECT max(serviceID) FROM tblService));
SELECT setval(pg_get_serial_sequence('tblcomponent', 'componentid'), (SELECT max(componentID) FROM tblComponent));
SELECT setval(pg_get_serial_sequence('tblserviceslip', 'serviceslipid'), (SELECT max(serviceSlipID) FROM tblServiceSlip));
