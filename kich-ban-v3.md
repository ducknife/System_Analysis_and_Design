# Kịch bản chuẩn v.3 cho 3 chức năng của module

Kịch bản v.3 mô tả từng thông điệp giữa các đối tượng trong hệ thống: tác nhân, các
trang giao diện `.tsx`, lớp `HTTPClient`, lớp `RESTController`, các lớp DAO và các
lớp thực thể. Tên hàm lấy đúng theo biểu đồ lớp chi tiết ở mục III.

---

## 1. Chức năng: Tiếp nhận xe của khách và chọn dịch vụ/phụ tùng

1. Quản lý đăng nhập với username, password và click Đăng nhập trên Login.tsx
2. Login.tsx gọi lớp HTTPClient
3. Lớp HTTPClient thực hiện hàm fetch()
4. Lớp HTTPClient gọi lớp RESTController
5. Lớp RESTController thực hiện hàm requestMapping()
6. Lớp RESTController gọi lớp UserDAO
7. Lớp UserDAO thực hiện hàm checkLogin()
8. Lớp UserDAO gọi lớp User
9. Lớp User thực hiện hàm khởi tạo, setter()
10. Lớp User trả kết quả cho lớp UserDAO
11. Lớp UserDAO gọi lớp Manager
12. Lớp Manager thực hiện hàm khởi tạo, setter()
13. Lớp Manager trả kết quả cho lớp UserDAO
14. Lớp UserDAO trả kết quả cho lớp RESTController
15. Lớp RESTController trả kết quả cho lớp HTTPClient
16. Lớp HTTPClient trả kết quả cho Login.tsx
17. Login.tsx lưu vào session: Manager
18. Login.tsx gọi tới giao diện ManagerHome.tsx
19. ManagerHome.tsx lấy từ session: Manager
20. ManagerHome.tsx hiển thị giao diện cho quản lý
21. Quản lý click chức năng tiếp nhận xe và chọn dịch vụ/phụ tùng
22. ManagerHome.tsx gọi SearchCustomerInfo.tsx
23. SearchCustomerInfo.tsx hiển thị giao diện cho quản lý
24. Quản lý nhập số điện thoại khách hàng và click Tìm kiếm
25. SearchCustomerInfo.tsx gọi lớp HTTPClient
26. Lớp HTTPClient thực hiện hàm fetch()
27. Lớp HTTPClient gọi lớp RESTController
28. Lớp RESTController thực hiện hàm requestMapping()
29. Lớp RESTController gọi lớp CustomerDAO
30. Lớp CustomerDAO thực hiện hàm findCustomerInfoByPhone()
31. Lớp CustomerDAO gọi lớp Customer
32. Lớp Customer thực hiện hàm khởi tạo, setter()
33. Lớp Customer trả kết quả cho lớp CustomerDAO
34. Lớp CustomerDAO trả kết quả cho lớp RESTController
35. Lớp RESTController gọi lớp CarDAO
36. Lớp CarDAO thực hiện hàm findCarsOfCustomer()
37. Lớp CarDAO gọi lớp Car
38. Lớp Car thực hiện hàm khởi tạo, setter()
39. Lớp Car trả kết quả cho lớp CarDAO
40. Lớp CarDAO trả kết quả cho lớp RESTController
41. Lớp RESTController gọi lớp AppointmentDAO
42. Lớp AppointmentDAO thực hiện hàm findAppointmentsOfCustomer()
43. Lớp AppointmentDAO gọi lớp Appointment
44. Lớp Appointment thực hiện hàm khởi tạo, setter()
45. Lớp Appointment trả kết quả cho lớp AppointmentDAO
46. Lớp AppointmentDAO trả kết quả cho lớp RESTController
47. Lớp RESTController trả kết quả cho lớp HTTPClient
48. Lớp HTTPClient trả kết quả cho SearchCustomerInfo.tsx
49. SearchCustomerInfo.tsx hiển thị thông tin khách hàng, danh sách xe và lịch hẹn cho quản lý
50. Quản lý click nút Tiếp nhận trên dòng xe cần sửa
51. SearchCustomerInfo.tsx lưu vào session: carID
52. SearchCustomerInfo.tsx gọi ServiceSlipInfo.tsx
53. ServiceSlipInfo.tsx lấy từ session: carID
54. ServiceSlipInfo.tsx gọi lớp HTTPClient
55. Lớp HTTPClient thực hiện hàm fetch()
56. Lớp HTTPClient gọi lớp RESTController
57. Lớp RESTController thực hiện hàm requestMapping()
58. Lớp RESTController gọi lớp ServiceSlipDAO
59. Lớp ServiceSlipDAO thực hiện hàm createServiceSlip()
60. Lớp ServiceSlipDAO gọi lớp ServiceSlip
61. Lớp ServiceSlip thực hiện hàm khởi tạo, setter()
62. Lớp ServiceSlip trả kết quả cho lớp ServiceSlipDAO
63. Lớp ServiceSlipDAO trả kết quả cho lớp RESTController
64. Lớp RESTController trả kết quả cho lớp HTTPClient
65. Lớp HTTPClient trả kết quả cho ServiceSlipInfo.tsx
66. ServiceSlipInfo.tsx lưu vào session: serviceSlipID
67. ServiceSlipInfo.tsx hiển thị phiếu dịch vụ cho quản lý
68. Quản lý click nút Thêm dịch vụ
69. ServiceSlipInfo.tsx gọi SearchService.tsx
70. SearchService.tsx lấy từ session: serviceSlipID
71. SearchService.tsx hiển thị giao diện cho quản lý
72. Quản lý nhập từ khóa tên dịch vụ và click Tìm kiếm
73. SearchService.tsx gọi lớp HTTPClient
74. Lớp HTTPClient thực hiện hàm fetch()
75. Lớp HTTPClient gọi lớp RESTController
76. Lớp RESTController thực hiện hàm requestMapping()
77. Lớp RESTController gọi lớp ServiceDAO
78. Lớp ServiceDAO thực hiện hàm findServicesByKeyword()
79. Lớp ServiceDAO gọi lớp Service
80. Lớp Service thực hiện hàm khởi tạo, setter()
81. Lớp Service trả kết quả cho lớp ServiceDAO
82. Lớp ServiceDAO trả kết quả cho lớp RESTController
83. Lớp RESTController trả kết quả cho lớp HTTPClient
84. Lớp HTTPClient trả kết quả cho SearchService.tsx
85. SearchService.tsx hiển thị danh sách dịch vụ tìm được cho quản lý
86. Quản lý click chọn một dịch vụ
87. SearchService.tsx gọi lớp HTTPClient
88. Lớp HTTPClient thực hiện hàm fetch()
89. Lớp HTTPClient gọi lớp RESTController
90. Lớp RESTController thực hiện hàm requestMapping()
91. Lớp RESTController gọi lớp ServiceDetailDAO
92. Lớp ServiceDetailDAO thực hiện hàm addServiceToSlip()
93. Lớp ServiceDetailDAO gọi lớp ServiceDetail
94. Lớp ServiceDetail thực hiện hàm khởi tạo, setter()
95. Lớp ServiceDetail trả kết quả cho lớp ServiceDetailDAO
96. Lớp ServiceDetailDAO trả kết quả cho lớp RESTController
97. Lớp RESTController trả kết quả cho lớp HTTPClient
98. Lớp HTTPClient trả kết quả cho SearchService.tsx
99. SearchService.tsx gọi ServiceSlipInfo.tsx
100. ServiceSlipInfo.tsx hiển thị phiếu dịch vụ đã cập nhật cho quản lý
101. Quản lý click nút Thêm phụ tùng
102. ServiceSlipInfo.tsx gọi AddComponent.tsx
103. AddComponent.tsx lấy từ session: serviceSlipID
104. AddComponent.tsx gọi lớp HTTPClient
105. Lớp HTTPClient thực hiện hàm fetch()
106. Lớp HTTPClient gọi lớp RESTController
107. Lớp RESTController thực hiện hàm requestMapping()
108. Lớp RESTController gọi lớp ComponentDAO
109. Lớp ComponentDAO thực hiện hàm findComponentByKeyword()
110. Lớp ComponentDAO gọi lớp Component
111. Lớp Component thực hiện hàm khởi tạo, setter()
112. Lớp Component trả kết quả cho lớp ComponentDAO
113. Lớp ComponentDAO trả kết quả cho lớp RESTController
114. Lớp RESTController trả kết quả cho lớp HTTPClient
115. Lớp HTTPClient trả kết quả cho AddComponent.tsx
116. AddComponent.tsx hiển thị danh sách phụ tùng kèm số lượng tồn kho cho quản lý
117. Quản lý nhập số lượng và click nút Thêm
118. AddComponent.tsx gọi lớp HTTPClient
119. Lớp HTTPClient thực hiện hàm fetch()
120. Lớp HTTPClient gọi lớp RESTController
121. Lớp RESTController thực hiện hàm requestMapping()
122. Lớp RESTController gọi lớp ComponentDetailDAO
123. Lớp ComponentDetailDAO thực hiện hàm addComponentToSlip()
124. Lớp ComponentDetailDAO gọi lớp ComponentDetail
125. Lớp ComponentDetail thực hiện hàm khởi tạo, setter()
126. Lớp ComponentDetail trả kết quả cho lớp ComponentDetailDAO
127. Lớp ComponentDetailDAO trả kết quả cho lớp RESTController
128. Lớp RESTController gọi lớp ComponentDAO
129. Lớp ComponentDAO thực hiện hàm updateInventoryQty()
130. Lớp ComponentDAO trả kết quả cho lớp RESTController
131. Lớp RESTController trả kết quả cho lớp HTTPClient
132. Lớp HTTPClient trả kết quả cho AddComponent.tsx
133. AddComponent.tsx gọi ServiceSlipInfo.tsx
134. ServiceSlipInfo.tsx hiển thị phiếu dịch vụ đã cập nhật cho quản lý
135. Quản lý click nút Lưu phiếu
136. ServiceSlipInfo.tsx gọi lớp HTTPClient
137. Lớp HTTPClient thực hiện hàm fetch()
138. Lớp HTTPClient gọi lớp RESTController
139. Lớp RESTController thực hiện hàm requestMapping()
140. Lớp RESTController gọi lớp ServiceSlipDAO
141. Lớp ServiceSlipDAO thực hiện hàm saveServiceSlip()
142. Lớp ServiceSlipDAO gọi lớp ServiceSlip
143. Lớp ServiceSlip thực hiện hàm setter()
144. Lớp ServiceSlip trả kết quả cho lớp ServiceSlipDAO
145. Lớp ServiceSlipDAO trả kết quả cho lớp RESTController
146. Lớp RESTController trả kết quả cho lớp HTTPClient
147. Lớp HTTPClient trả kết quả cho ServiceSlipInfo.tsx
148. ServiceSlipInfo.tsx gọi ManagerHome.tsx
149. ManagerHome.tsx hiển thị giao diện cho quản lý

Có thể lặp lại các bước 68 đến 100 để thêm nhiều dịch vụ và lặp các bước 101 đến 134
để thêm nhiều phụ tùng, tới khi phiếu đủ nội dung thì quản lý mới lưu phiếu.

---

## 2. Chức năng: Phân công nhân viên phục vụ

1. Sau khi đăng nhập và vào được giao diện ManagerHome.tsx, quản lý click chức năng phân công nhân viên phục vụ
2. ManagerHome.tsx gọi SearchNeededServiceSlip.tsx
3. SearchNeededServiceSlip.tsx gọi lớp HTTPClient
4. Lớp HTTPClient thực hiện hàm fetch()
5. Lớp HTTPClient gọi lớp RESTController
6. Lớp RESTController thực hiện hàm requestMapping()
7. Lớp RESTController gọi lớp ServiceSlipDAO
8. Lớp ServiceSlipDAO thực hiện hàm findServiceSlipByKeyword()
9. Lớp ServiceSlipDAO gọi lớp ServiceSlip
10. Lớp ServiceSlip thực hiện hàm khởi tạo, setter()
11. Lớp ServiceSlip gọi lớp Car
12. Lớp Car thực hiện hàm khởi tạo, setter()
13. Lớp Car trả kết quả cho lớp ServiceSlip
14. Lớp ServiceSlip trả kết quả cho lớp ServiceSlipDAO
15. Lớp ServiceSlipDAO trả kết quả cho lớp RESTController
16. Lớp RESTController trả kết quả cho lớp HTTPClient
17. Lớp HTTPClient trả kết quả cho SearchNeededServiceSlip.tsx
18. SearchNeededServiceSlip.tsx hiển thị danh sách phiếu chờ phân công cho quản lý
19. Quản lý click nút Phân công trên một phiếu
20. SearchNeededServiceSlip.tsx lưu vào session: serviceSlipID
21. SearchNeededServiceSlip.tsx gọi StaffList.tsx
22. StaffList.tsx lấy từ session: serviceSlipID
23. StaffList.tsx gọi lớp HTTPClient
24. Lớp HTTPClient thực hiện hàm fetch()
25. Lớp HTTPClient gọi lớp RESTController
26. Lớp RESTController thực hiện hàm requestMapping()
27. Lớp RESTController gọi lớp StaffDAO
28. Lớp StaffDAO thực hiện hàm getStaffList()
29. Lớp StaffDAO gọi lớp Staff
30. Lớp Staff thực hiện hàm khởi tạo, setter()
31. Lớp Staff trả kết quả cho lớp StaffDAO
32. Lớp StaffDAO trả kết quả cho lớp RESTController
33. Lớp RESTController trả kết quả cho lớp HTTPClient
34. Lớp HTTPClient trả kết quả cho StaffList.tsx
35. StaffList.tsx hiển thị danh sách dòng dịch vụ và danh sách nhân viên cho quản lý
36. Quản lý chọn nhân viên phục vụ cho từng dòng dịch vụ
37. StaffList.tsx gọi lớp HTTPClient
38. Lớp HTTPClient thực hiện hàm fetch()
39. Lớp HTTPClient gọi lớp RESTController
40. Lớp RESTController thực hiện hàm requestMapping()
41. Lớp RESTController gọi lớp ServiceDetailDAO
42. Lớp ServiceDetailDAO thực hiện hàm assignStaffToServiceDetail()
43. Lớp ServiceDetailDAO gọi lớp ServiceDetail
44. Lớp ServiceDetail thực hiện hàm setter()
45. Lớp ServiceDetail trả kết quả cho lớp ServiceDetailDAO
46. Lớp ServiceDetailDAO trả kết quả cho lớp RESTController
47. Lớp RESTController trả kết quả cho lớp HTTPClient
48. Lớp HTTPClient trả kết quả cho StaffList.tsx
49. Quản lý click nút Tiếp tục chọn khoang sửa
50. StaffList.tsx gọi ChooseSlot.tsx
51. ChooseSlot.tsx lấy từ session: serviceSlipID
52. ChooseSlot.tsx gọi lớp HTTPClient
53. Lớp HTTPClient thực hiện hàm fetch()
54. Lớp HTTPClient gọi lớp RESTController
55. Lớp RESTController thực hiện hàm requestMapping()
56. Lớp RESTController gọi lớp SlotDAO
57. Lớp SlotDAO thực hiện hàm getAvailableSlots()
58. Lớp SlotDAO gọi lớp Slot
59. Lớp Slot thực hiện hàm khởi tạo, setter()
60. Lớp Slot trả kết quả cho lớp SlotDAO
61. Lớp SlotDAO trả kết quả cho lớp RESTController
62. Lớp RESTController trả kết quả cho lớp HTTPClient
63. Lớp HTTPClient trả kết quả cho ChooseSlot.tsx
64. ChooseSlot.tsx hiển thị danh sách khoang sửa chữa cho quản lý
65. Quản lý click chọn một khoang còn trống và click Lưu phân công
66. ChooseSlot.tsx gọi lớp HTTPClient
67. Lớp HTTPClient thực hiện hàm fetch()
68. Lớp HTTPClient gọi lớp RESTController
69. Lớp RESTController thực hiện hàm requestMapping()
70. Lớp RESTController gọi lớp SlotDAO
71. Lớp SlotDAO thực hiện hàm updateSlotStatus()
72. Lớp SlotDAO gọi lớp Slot
73. Lớp Slot thực hiện hàm setter()
74. Lớp Slot trả kết quả cho lớp SlotDAO
75. Lớp SlotDAO trả kết quả cho lớp RESTController
76. Lớp RESTController gọi lớp ServiceSlipDAO
77. Lớp ServiceSlipDAO thực hiện hàm updateServiceSlip()
78. Lớp ServiceSlipDAO gọi lớp ServiceSlip
79. Lớp ServiceSlip thực hiện hàm setter()
80. Lớp ServiceSlip trả kết quả cho lớp ServiceSlipDAO
81. Lớp ServiceSlipDAO trả kết quả cho lớp RESTController
82. Lớp RESTController trả kết quả cho lớp HTTPClient
83. Lớp HTTPClient trả kết quả cho ChooseSlot.tsx
84. ChooseSlot.tsx gọi SearchNeededServiceSlip.tsx
85. SearchNeededServiceSlip.tsx hiển thị danh sách phiếu đã cập nhật cho quản lý

Có thể lặp lại các bước 36 đến 48 cho tới khi mọi dòng dịch vụ của phiếu đều đã có
nhân viên phụ trách thì quản lý mới sang bước chọn khoang sửa chữa.

---

## 3. Chức năng: Tính công trả lương cho nhân viên phục vụ theo tháng

1. Sau khi đăng nhập và vào được giao diện ManagerHome.tsx, quản lý click chức năng tính công trả lương theo tháng
2. ManagerHome.tsx gọi ChooseMonth.tsx
3. ChooseMonth.tsx hiển thị giao diện cho quản lý
4. Quản lý chọn tháng, năm, nhập đơn giá một công và click Xem bảng công
5. ChooseMonth.tsx lưu vào session: month, year, laborUnitPrice
6. ChooseMonth.tsx gọi lớp HTTPClient
7. Lớp HTTPClient thực hiện hàm fetch()
8. Lớp HTTPClient gọi lớp RESTController
9. Lớp RESTController thực hiện hàm requestMapping()
10. Lớp RESTController gọi lớp SalaryTableDAO
11. Lớp SalaryTableDAO thực hiện hàm checkSalaryTableOfMonth()
12. Lớp SalaryTableDAO gọi lớp SalaryTable
13. Lớp SalaryTable thực hiện hàm khởi tạo, setter()
14. Lớp SalaryTable trả kết quả cho lớp SalaryTableDAO
15. Lớp SalaryTableDAO trả kết quả cho lớp RESTController
16. Lớp RESTController trả kết quả cho lớp HTTPClient
17. Lớp HTTPClient trả kết quả cho ChooseMonth.tsx
18. ChooseMonth.tsx gọi SummarySheet.tsx
19. SummarySheet.tsx lấy từ session: month, year, laborUnitPrice
20. SummarySheet.tsx gọi lớp HTTPClient
21. Lớp HTTPClient thực hiện hàm fetch()
22. Lớp HTTPClient gọi lớp RESTController
23. Lớp RESTController thực hiện hàm requestMapping()
24. Lớp RESTController gọi lớp StaffDAO
25. Lớp StaffDAO thực hiện hàm getStaffList()
26. Lớp StaffDAO gọi lớp Staff
27. Lớp Staff thực hiện hàm khởi tạo, setter()
28. Lớp Staff trả kết quả cho lớp StaffDAO
29. Lớp StaffDAO trả kết quả cho lớp RESTController
30. Lớp RESTController gọi lớp ServiceDetailDAO
31. Lớp ServiceDetailDAO thực hiện hàm getServiceDetailsOfStaffInMonth()
32. Lớp ServiceDetailDAO gọi lớp ServiceDetail
33. Lớp ServiceDetail thực hiện hàm khởi tạo, setter()
34. Lớp ServiceDetail gọi lớp Service
35. Lớp Service thực hiện hàm khởi tạo, setter()
36. Lớp Service trả kết quả cho lớp ServiceDetail
37. Lớp ServiceDetail trả kết quả cho lớp ServiceDetailDAO
38. Lớp ServiceDetailDAO trả kết quả cho lớp RESTController
39. Lớp RESTController trả kết quả cho lớp HTTPClient
40. Lớp HTTPClient trả kết quả cho SummarySheet.tsx
41. SummarySheet.tsx hiển thị bảng tổng hợp công cho quản lý
42. Quản lý click nút Xem chi tiết công của một nhân viên
43. SummarySheet.tsx lưu vào session: staffID
44. SummarySheet.tsx gọi DetailSheet.tsx
45. DetailSheet.tsx lấy từ session: staffID, month, year
46. DetailSheet.tsx gọi lớp HTTPClient
47. Lớp HTTPClient thực hiện hàm fetch()
48. Lớp HTTPClient gọi lớp RESTController
49. Lớp RESTController thực hiện hàm requestMapping()
50. Lớp RESTController gọi lớp ServiceDetailDAO
51. Lớp ServiceDetailDAO thực hiện hàm getServiceDetailsOfStaffInMonth()
52. Lớp ServiceDetailDAO gọi lớp ServiceDetail
53. Lớp ServiceDetail thực hiện hàm khởi tạo, setter()
54. Lớp ServiceDetail trả kết quả cho lớp ServiceDetailDAO
55. Lớp ServiceDetailDAO trả kết quả cho lớp RESTController
56. Lớp RESTController trả kết quả cho lớp HTTPClient
57. Lớp HTTPClient trả kết quả cho DetailSheet.tsx
58. DetailSheet.tsx hiển thị chi tiết công của nhân viên cho quản lý
59. Quản lý click nút Quay lại bảng công
60. DetailSheet.tsx gọi SummarySheet.tsx
61. SummarySheet.tsx hiển thị bảng công cho quản lý
62. Quản lý click nút Lưu bảng công
63. SummarySheet.tsx gọi lớp HTTPClient
64. Lớp HTTPClient thực hiện hàm fetch()
65. Lớp HTTPClient gọi lớp RESTController
66. Lớp RESTController thực hiện hàm requestMapping()
67. Lớp RESTController gọi lớp SalaryTableDAO
68. Lớp SalaryTableDAO thực hiện hàm saveAllSalaryTableOfMonth()
69. Lớp SalaryTableDAO gọi lớp SalaryTable
70. Lớp SalaryTable thực hiện hàm khởi tạo, setter()
71. Lớp SalaryTable trả kết quả cho lớp SalaryTableDAO
72. Lớp SalaryTableDAO trả kết quả cho lớp RESTController
73. Lớp RESTController trả kết quả cho lớp HTTPClient
74. Lớp HTTPClient trả kết quả cho SummarySheet.tsx
75. SummarySheet.tsx gọi ChooseMethod.tsx
76. ChooseMethod.tsx hiển thị danh sách nhân viên và hình thức trả cho quản lý
77. Quản lý chọn hình thức trả lương cho từng nhân viên và click Lưu hình thức trả
78. ChooseMethod.tsx gọi lớp HTTPClient
79. Lớp HTTPClient thực hiện hàm fetch()
80. Lớp HTTPClient gọi lớp RESTController
81. Lớp RESTController thực hiện hàm requestMapping()
82. Lớp RESTController gọi lớp SalaryTableDAO
83. Lớp SalaryTableDAO thực hiện hàm savePaymentMethod()
84. Lớp SalaryTableDAO gọi lớp SalaryTable
85. Lớp SalaryTable thực hiện hàm setter()
86. Lớp SalaryTable trả kết quả cho lớp SalaryTableDAO
87. Lớp SalaryTableDAO trả kết quả cho lớp RESTController
88. Lớp RESTController trả kết quả cho lớp HTTPClient
89. Lớp HTTPClient trả kết quả cho ChooseMethod.tsx
90. ChooseMethod.tsx gọi ConfirmReceived.tsx
91. ConfirmReceived.tsx gọi lớp HTTPClient
92. Lớp HTTPClient thực hiện hàm fetch()
93. Lớp HTTPClient gọi lớp RESTController
94. Lớp RESTController thực hiện hàm requestMapping()
95. Lớp RESTController gọi lớp SalaryTableDAO
96. Lớp SalaryTableDAO thực hiện hàm getSalaryTablesOfMonth()
97. Lớp SalaryTableDAO gọi lớp SalaryTable
98. Lớp SalaryTable thực hiện hàm khởi tạo, setter()
99. Lớp SalaryTable trả kết quả cho lớp SalaryTableDAO
100. Lớp SalaryTableDAO trả kết quả cho lớp RESTController
101. Lớp RESTController trả kết quả cho lớp HTTPClient
102. Lớp HTTPClient trả kết quả cho ConfirmReceived.tsx
103. ConfirmReceived.tsx hiển thị danh sách nhận lương cho quản lý
104. Quản lý tích xác nhận nhân viên đã nhận lương và click Xác nhận
105. ConfirmReceived.tsx gọi lớp HTTPClient
106. Lớp HTTPClient thực hiện hàm fetch()
107. Lớp HTTPClient gọi lớp RESTController
108. Lớp RESTController thực hiện hàm requestMapping()
109. Lớp RESTController gọi lớp SalaryTableDAO
110. Lớp SalaryTableDAO thực hiện hàm updateIsReceived()
111. Lớp SalaryTableDAO gọi lớp SalaryTable
112. Lớp SalaryTable thực hiện hàm setter()
113. Lớp SalaryTable trả kết quả cho lớp SalaryTableDAO
114. Lớp SalaryTableDAO trả kết quả cho lớp RESTController
115. Lớp RESTController trả kết quả cho lớp HTTPClient
116. Lớp HTTPClient trả kết quả cho ConfirmReceived.tsx
117. ConfirmReceived.tsx gọi ManagerHome.tsx
118. ManagerHome.tsx hiển thị giao diện cho quản lý

Có thể lặp lại các bước 42 đến 61 để xem chi tiết công của từng nhân viên trước khi
lưu bảng công, và lặp các bước 104 đến 116 cho tới khi mọi nhân viên đều đã xác nhận
nhận lương thì bảng công của tháng mới chuyển sang trạng thái hoàn tất.
