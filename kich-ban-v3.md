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
50. Quản lý yêu cầu khách hàng xác nhận thông tin
51. Khách hàng xác nhận thông tin là chính xác
52. Quản lý click nút Tiếp nhận trên dòng xe cần sửa
53. SearchCustomerInfo.tsx lưu vào session: appointmentDetailID
54. SearchCustomerInfo.tsx gọi ServiceSlipInfo.tsx
55. ServiceSlipInfo.tsx lấy từ session: appointmentDetailID
56. ServiceSlipInfo.tsx gọi lớp HTTPClient
57. Lớp HTTPClient thực hiện hàm fetch()
58. Lớp HTTPClient gọi lớp RESTController
59. Lớp RESTController thực hiện hàm requestMapping()
60. Lớp RESTController gọi lớp ServiceSlipDAO
61. Lớp ServiceSlipDAO thực hiện hàm createServiceSlip()
62. Lớp ServiceSlipDAO gọi lớp ServiceSlip
63. Lớp ServiceSlip thực hiện hàm khởi tạo, setter()
64. Lớp ServiceSlip trả kết quả cho lớp ServiceSlipDAO
65. Lớp ServiceSlipDAO trả kết quả cho lớp RESTController
66. Lớp RESTController gọi lớp AppointmentDAO
67. Lớp AppointmentDAO thực hiện hàm updateAppointmentStatus()
68. Lớp AppointmentDAO gọi lớp Appointment
69. Lớp Appointment thực hiện hàm setter()
70. Lớp Appointment trả kết quả cho lớp AppointmentDAO
71. Lớp AppointmentDAO trả kết quả cho lớp RESTController
72. Lớp RESTController trả kết quả cho lớp HTTPClient
73. Lớp HTTPClient trả kết quả cho ServiceSlipInfo.tsx
74. ServiceSlipInfo.tsx lưu vào session: serviceSlipID
75. ServiceSlipInfo.tsx hiển thị phiếu dịch vụ cho quản lý
76. Quản lý click nút Thêm dịch vụ
77. ServiceSlipInfo.tsx gọi SearchService.tsx
78. SearchService.tsx lấy từ session: serviceSlipID
79. SearchService.tsx hiển thị giao diện cho quản lý
80. Quản lý nhập từ khóa tên dịch vụ và click Tìm kiếm
81. SearchService.tsx gọi lớp HTTPClient
82. Lớp HTTPClient thực hiện hàm fetch()
83. Lớp HTTPClient gọi lớp RESTController
84. Lớp RESTController thực hiện hàm requestMapping()
85. Lớp RESTController gọi lớp ServiceDAO
86. Lớp ServiceDAO thực hiện hàm findServicesByKeyword()
87. Lớp ServiceDAO gọi lớp Service
88. Lớp Service thực hiện hàm khởi tạo, setter()
89. Lớp Service trả kết quả cho lớp ServiceDAO
90. Lớp ServiceDAO trả kết quả cho lớp RESTController
91. Lớp RESTController trả kết quả cho lớp HTTPClient
92. Lớp HTTPClient trả kết quả cho SearchService.tsx
93. SearchService.tsx hiển thị danh sách dịch vụ tìm được cho quản lý
94. Quản lý click chọn một dịch vụ
95. SearchService.tsx gọi lớp HTTPClient
96. Lớp HTTPClient thực hiện hàm fetch()
97. Lớp HTTPClient gọi lớp RESTController
98. Lớp RESTController thực hiện hàm requestMapping()
99. Lớp RESTController gọi lớp ServiceSlipDAO
100. Lớp ServiceSlipDAO thực hiện hàm addServiceToSlip()
101. Lớp ServiceSlipDAO gọi lớp ServiceDetail
102. Lớp ServiceDetail thực hiện hàm khởi tạo, setter()
103. Lớp ServiceDetail trả kết quả cho lớp ServiceSlipDAO
104. Lớp ServiceSlipDAO trả kết quả cho lớp RESTController
105. Lớp RESTController trả kết quả cho lớp HTTPClient
106. Lớp HTTPClient trả kết quả cho SearchService.tsx
107. SearchService.tsx gọi ServiceSlipInfo.tsx
108. ServiceSlipInfo.tsx hiển thị phiếu dịch vụ đã cập nhật cho quản lý
109. Quản lý click nút Thêm phụ tùng
110. ServiceSlipInfo.tsx gọi AddComponent.tsx
111. AddComponent.tsx lấy từ session: serviceSlipID
112. AddComponent.tsx gọi lớp HTTPClient
113. Lớp HTTPClient thực hiện hàm fetch()
114. Lớp HTTPClient gọi lớp RESTController
115. Lớp RESTController thực hiện hàm requestMapping()
116. Lớp RESTController gọi lớp ComponentDAO
117. Lớp ComponentDAO thực hiện hàm findComponentByKeyword()
118. Lớp ComponentDAO gọi lớp Component
119. Lớp Component thực hiện hàm khởi tạo, setter()
120. Lớp Component trả kết quả cho lớp ComponentDAO
121. Lớp ComponentDAO trả kết quả cho lớp RESTController
122. Lớp RESTController trả kết quả cho lớp HTTPClient
123. Lớp HTTPClient trả kết quả cho AddComponent.tsx
124. AddComponent.tsx hiển thị danh sách phụ tùng kèm số lượng tồn kho cho quản lý
125. Quản lý nhập số lượng và click nút Thêm
126. AddComponent.tsx gọi lớp HTTPClient
127. Lớp HTTPClient thực hiện hàm fetch()
128. Lớp HTTPClient gọi lớp RESTController
129. Lớp RESTController thực hiện hàm requestMapping()
130. Lớp RESTController gọi lớp ServiceSlipDAO
131. Lớp ServiceSlipDAO thực hiện hàm addComponentToSlip()
132. Lớp ServiceSlipDAO gọi lớp ComponentDetail
133. Lớp ComponentDetail thực hiện hàm khởi tạo, setter()
134. Lớp ComponentDetail trả kết quả cho lớp ServiceSlipDAO
135. Lớp ServiceSlipDAO trả kết quả cho lớp RESTController
136. Lớp RESTController gọi lớp ComponentDAO
137. Lớp ComponentDAO thực hiện hàm updateInventoryQty()
138. Lớp ComponentDAO trả kết quả cho lớp RESTController
139. Lớp RESTController trả kết quả cho lớp HTTPClient
140. Lớp HTTPClient trả kết quả cho AddComponent.tsx
141. AddComponent.tsx gọi ServiceSlipInfo.tsx
142. ServiceSlipInfo.tsx hiển thị phiếu dịch vụ đã cập nhật cho quản lý
143. Quản lý click nút Lưu phiếu
144. ServiceSlipInfo.tsx gọi lớp HTTPClient
145. Lớp HTTPClient thực hiện hàm fetch()
146. Lớp HTTPClient gọi lớp RESTController
147. Lớp RESTController thực hiện hàm requestMapping()
148. Lớp RESTController gọi lớp ServiceSlipDAO
149. Lớp ServiceSlipDAO thực hiện hàm saveServiceSlip()
150. Lớp ServiceSlipDAO gọi lớp ServiceSlip
151. Lớp ServiceSlip thực hiện hàm setter()
152. Lớp ServiceSlip trả kết quả cho lớp ServiceSlipDAO
153. Lớp ServiceSlipDAO trả kết quả cho lớp RESTController
154. Lớp RESTController trả kết quả cho lớp HTTPClient
155. Lớp HTTPClient trả kết quả cho ServiceSlipInfo.tsx
156. ServiceSlipInfo.tsx gọi ManagerHome.tsx
157. ManagerHome.tsx hiển thị giao diện cho quản lý

Có thể lặp lại các bước 76 đến 108 để thêm nhiều dịch vụ và lặp các bước 109 đến 142
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
41. Lớp RESTController gọi lớp ServiceSlipDAO
42. Lớp ServiceSlipDAO thực hiện hàm assignStaffToServiceDetail()
43. Lớp ServiceSlipDAO gọi lớp ServiceDetail
44. Lớp ServiceDetail thực hiện hàm setter()
45. Lớp ServiceDetail trả kết quả cho lớp ServiceSlipDAO
46. Lớp ServiceSlipDAO trả kết quả cho lớp RESTController
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
84. ChooseSlot.tsx gửi thông báo phân công tới nhân viên phục vụ
85. ChooseSlot.tsx gọi SearchNeededServiceSlip.tsx
86. SearchNeededServiceSlip.tsx hiển thị danh sách phiếu đã cập nhật cho quản lý

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
30. Lớp RESTController gọi lớp StaffDAO
31. Lớp StaffDAO thực hiện hàm getServiceDetailsOfStaffInMonth()
32. Lớp StaffDAO gọi lớp ServiceDetail
33. Lớp ServiceDetail thực hiện hàm khởi tạo, setter()
34. Lớp ServiceDetail gọi lớp Service
35. Lớp Service thực hiện hàm khởi tạo, setter()
36. Lớp Service trả kết quả cho lớp ServiceDetail
37. Lớp ServiceDetail trả kết quả cho lớp StaffDAO
38. Lớp StaffDAO trả kết quả cho lớp RESTController
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
50. Lớp RESTController gọi lớp StaffDAO
51. Lớp StaffDAO thực hiện hàm getServiceDetailsOfStaffInMonth()
52. Lớp StaffDAO gọi lớp ServiceDetail
53. Lớp ServiceDetail thực hiện hàm khởi tạo, setter()
54. Lớp ServiceDetail trả kết quả cho lớp StaffDAO
55. Lớp StaffDAO trả kết quả cho lớp RESTController
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
