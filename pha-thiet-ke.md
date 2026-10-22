# VII. Biểu đồ lớp thực thể (pha thiết kế)

## Bước 1: Thêm ID vào các lớp không kế thừa từ lớp khác

- Lớp User => thêm `userID`. Ba lớp Customer, Manager, Staff kế thừa User nên không thêm ID riêng.
- Lớp Car => thêm `carID`
- Lớp Appointment => đổi `appId` thành `appointmentID`
- Lớp Slot => đổi `slotId` thành `slotID`
- Lớp ServiceSlip => đổi `ssId` thành `serviceSlipID`
- Lớp Service => thêm `serviceID`
- Lớp Component => thêm `componentID`
- Lớp SalaryTable => thêm `salaryTableID`
- Hai lớp ServiceDetail và ComponentDetail là lớp trung gian, không thêm ID riêng mà dùng khóa chính kết hợp từ hai khóa ngoại.

## Bước 2: Bổ sung kiểu dữ liệu cho các thuộc tính

| Lớp | Thuộc tính |
|---|---|
| User | `userID : int`, `username : string`, `password : string`, `fullname : string`, `phone : string`, `email : string` |
| Customer | `address : string` |
| Manager | `employeeCode : string`, `specialization : string` |
| Staff | `employeeCode : string`, `specialization : string`, `bankAccount : string` |
| Car | `carID : int`, `licensePlate : string`, `brand : string`, `model : string`, `year : int` |
| Appointment | `appointmentID : int`, `time : DateTime`, `status : string` |
| Slot | `slotID : int`, `location : string`, `status : string` |
| ServiceSlip | `serviceSlipID : int`, `time : DateTime`, `status : string`, `totalCost : double` |
| ServiceDetail | `price : double`, `laborContent : double`, `startedAt : DateTime`, `finishedAt : DateTime` |
| Service | `serviceID : int`, `name : string`, `price : double`, `laborContent : double` |
| Component | `componentID : int`, `name : string`, `price : double`, `inventoryQty : int` |
| ComponentDetail | `qty : int`, `price : double` |
| SalaryTable | `salaryTableID : int`, `month : int`, `year : int`, `laborUnitPrice : double`, `paymentMethod : string`, `isReceived : boolean`, `status : string` |

## Bước 3: Chuyển các quan hệ association thành aggregation/composition tương ứng

- ServiceSlip + Service => ServiceDetail được chuyển thành: Service là thành phần của ServiceDetail, ServiceDetail là thành phần của ServiceSlip.
- ServiceSlip + Component => ComponentDetail được chuyển thành: Component là thành phần của ComponentDetail, ComponentDetail là thành phần của ServiceSlip.
- ServiceSlip + Staff => ServiceDetail được chuyển thành: Staff là thành phần của ServiceDetail.
- Car + Slot => ServiceSlip được chuyển thành: Car là thành phần của ServiceSlip, Slot là thành phần của ServiceSlip.

Hai quan hệ ServiceSlip với ServiceDetail và ServiceSlip với ComponentDetail dùng **composition** (hình thoi đặc), vì một dòng dịch vụ hay một dòng phụ tùng không tồn tại độc lập, xoá phiếu dịch vụ là chúng mất theo. Các quan hệ còn lại dùng **aggregation** (hình thoi rỗng) vì phần tử bên trong vẫn tồn tại độc lập.

## Bước 4: Bổ sung thuộc tính đối tượng tương ứng theo quan hệ thành phần

- Customer là thành phần của Car, quan hệ 1 - n => Car có một Customer.
- Customer là thành phần của Appointment, quan hệ 1 - n => Appointment có một Customer.
- Car là thành phần của Appointment, quan hệ 1 - n => Appointment có một Car.
- Car là thành phần của ServiceSlip, quan hệ 1 - n => ServiceSlip có một Car.
- Appointment là thành phần của ServiceSlip, quan hệ 1 - 1 => ServiceSlip có một Appointment.
- Manager là thành phần của ServiceSlip, quan hệ 1 - n => ServiceSlip có một Manager.
- Slot là thành phần của ServiceSlip, quan hệ 1 - n => ServiceSlip có một Slot.
- ServiceDetail là thành phần của ServiceSlip, quan hệ n - 1 => ServiceSlip có một List\<ServiceDetail\>.
- ComponentDetail là thành phần của ServiceSlip, quan hệ n - 1 => ServiceSlip có một List\<ComponentDetail\>.
- Service là thành phần của ServiceDetail, quan hệ 1 - n => ServiceDetail có một Service.
- Staff là thành phần của ServiceDetail, quan hệ 1 - n => ServiceDetail có một Staff.
- Component là thành phần của ComponentDetail, quan hệ 1 - n => ComponentDetail có một Component.
- Staff là thành phần của SalaryTable, quan hệ 1 - n => SalaryTable có một Staff.
- Manager là thành phần của SalaryTable, quan hệ 1 - n => SalaryTable có một Manager.

Sau bước 4, các lớp có thêm thuộc tính đối tượng như sau:

| Lớp | Thuộc tính đối tượng thêm vào |
|---|---|
| Car | `customer : Customer` |
| Appointment | `customer : Customer`, `car : Car` |
| ServiceSlip | `car : Car`, `appointment : Appointment`, `manager : Manager`, `slot : Slot`, `listServiceDetail : List<ServiceDetail>`, `listComponentDetail : List<ComponentDetail>` |
| ServiceDetail | `serviceSlipID : int`, `serviceID : int`, `staffID : int`, `service : Service`, `staff : Staff` |
| ComponentDetail | `serviceSlipID : int`, `componentID : int`, `component : Component` |
| SalaryTable | `staff : Staff`, `manager : Manager` |

Ta có biểu đồ lớp thực thể pha thiết kế như sau:

---

# VIII. Thiết kế cơ sở dữ liệu

## Bước 1: Mỗi lớp thực thể tương ứng với một bảng dữ liệu có tên dạng tbl\<tên lớp thực thể\>

- Lớp User => bảng `tblUser`
- Lớp Customer => bảng `tblCustomer`
- Lớp Manager => bảng `tblManager`
- Lớp Staff => bảng `tblStaff`
- Lớp Car => bảng `tblCar`
- Lớp Appointment => bảng `tblAppointment`
- Lớp Slot => bảng `tblSlot`
- Lớp ServiceSlip => bảng `tblServiceSlip`
- Lớp ServiceDetail => bảng `tblServiceDetail`
- Lớp Service => bảng `tblService`
- Lớp Component => bảng `tblComponent`
- Lớp ComponentDetail => bảng `tblComponentDetail`
- Lớp SalaryTable => bảng `tblSalaryTable`

## Bước 2: Các thuộc tính không phải đối tượng của lớp nào thì chuyển thành cột của bảng tương ứng

Kiểu dữ liệu từng cột xem trên lược đồ: `integer(10)`, `varchar(255)`, `timestamp`, `double(15)`, `bit`.

- `tblUser`: userID, username, password, fullname, phone, email
- `tblCustomer`: address
- `tblManager`: employeeCode, specialization
- `tblStaff`: employeeCode, specialization, bankAccount
- `tblCar`: carID, licensePlate, brand, model, year
- `tblAppointment`: appointmentID, time, status
- `tblSlot`: slotID, location, status
- `tblServiceSlip`: serviceSlipID, time, status, totalCost
- `tblServiceDetail`: price, laborContent, startedAt, finishedAt
- `tblService`: serviceID, name, price, laborContent
- `tblComponent`: componentID, name, price, inventoryQty
- `tblComponentDetail`: qty, price
- `tblSalaryTable`: salaryTableID, month, year, laborUnitPrice, paymentMethod, isReceived, status

## Bước 3: Chuyển quan hệ số lượng giữa các lớp thành quan hệ số lượng giữa các bảng tương ứng

- 1 `tblUser` - 1 `tblCustomer`
- 1 `tblUser` - 1 `tblManager`
- 1 `tblUser` - 1 `tblStaff`
- 1 `tblCustomer` - n `tblCar`
- 1 `tblCustomer` - n `tblAppointment`
- 1 `tblCar` - n `tblAppointment`
- 1 `tblCar` - n `tblServiceSlip`
- 1 `tblAppointment` - 1 `tblServiceSlip`
- 1 `tblManager` - n `tblServiceSlip`
- 1 `tblSlot` - n `tblServiceSlip`
- 1 `tblServiceSlip` - n `tblServiceDetail`
- 1 `tblService` - n `tblServiceDetail`
- 1 `tblStaff` - n `tblServiceDetail`
- 1 `tblServiceSlip` - n `tblComponentDetail`
- 1 `tblComponent` - n `tblComponentDetail`
- 1 `tblStaff` - n `tblSalaryTable`
- 1 `tblManager` - n `tblSalaryTable`

## Bước 4: Bổ sung khóa của bảng

Khóa chính tương ứng với thuộc tính id của bảng, trừ các bảng được xây dựng dựa trên lớp kế thừa và các bảng trung gian. Khóa ngoại được thiết lập dựa vào quan hệ số lượng với các bảng khác.

- 1 `tblUser` - 1 `tblCustomer` => bảng `tblCustomer` có khóa ngoại `userID`, đồng thời `userID` là khóa chính của bảng `tblCustomer`.
- 1 `tblUser` - 1 `tblManager` => bảng `tblManager` có khóa ngoại `userID`, đồng thời `userID` là khóa chính của bảng `tblManager`.
- 1 `tblUser` - 1 `tblStaff` => bảng `tblStaff` có khóa ngoại `userID`, đồng thời `userID` là khóa chính của bảng `tblStaff`.
- 1 `tblCustomer` - n `tblCar` => bảng `tblCar` có khóa ngoại `customerID`.
- 1 `tblCustomer` - n `tblAppointment` => bảng `tblAppointment` có khóa ngoại `customerID`.
- 1 `tblCar` - n `tblAppointment` => bảng `tblAppointment` có khóa ngoại `carID`.
- 1 `tblCar` - n `tblServiceSlip` => bảng `tblServiceSlip` có khóa ngoại `carID`.
- 1 `tblAppointment` - 1 `tblServiceSlip` => bảng `tblServiceSlip` có khóa ngoại `appointmentID`.
- 1 `tblManager` - n `tblServiceSlip` => bảng `tblServiceSlip` có khóa ngoại `managerID`.
- 1 `tblSlot` - n `tblServiceSlip` => bảng `tblServiceSlip` có khóa ngoại `slotID`.
- 1 `tblServiceSlip` - n `tblServiceDetail` => bảng `tblServiceDetail` có khóa ngoại `serviceSlipID`.
- 1 `tblService` - n `tblServiceDetail` => bảng `tblServiceDetail` có khóa ngoại `serviceID`.
- Hai thuộc tính `serviceSlipID` và `serviceID` tạo thành khóa chính kết hợp của bảng `tblServiceDetail`.
- 1 `tblStaff` - n `tblServiceDetail` => bảng `tblServiceDetail` có khóa ngoại `staffID`.
- 1 `tblServiceSlip` - n `tblComponentDetail` => bảng `tblComponentDetail` có khóa ngoại `serviceSlipID`.
- 1 `tblComponent` - n `tblComponentDetail` => bảng `tblComponentDetail` có khóa ngoại `componentID`.
- Hai thuộc tính `serviceSlipID` và `componentID` tạo thành khóa chính kết hợp của bảng `tblComponentDetail`.
- 1 `tblStaff` - n `tblSalaryTable` => bảng `tblSalaryTable` có khóa ngoại `staffID`.
- 1 `tblManager` - n `tblSalaryTable` => bảng `tblSalaryTable` có khóa ngoại `managerID`.

## Bước 5: Loại bỏ các thuộc tính dư thừa

- `tblServiceSlip.totalCost` là thuộc tính dẫn xuất, tính được bằng tổng `tblServiceDetail.price` cộng tổng `tblComponentDetail.qty * tblComponentDetail.price` của cùng phiếu. Vẫn giữ lại vì giao diện bảng công và phiếu dịch vụ phải hiển thị tổng chi phí tạm tính ngay, truy vấn lại mỗi lần sẽ chậm.
- `tblServiceDetail.price` và `tblServiceDetail.laborContent` trùng giá trị với `tblService` tại thời điểm lập phiếu, `tblComponentDetail.price` trùng với `tblComponent.price`. Không bỏ, vì đây là bản chụp giá tại lúc tiếp nhận; giá trong danh mục thay đổi thì các phiếu cũ vẫn phải giữ nguyên giá cũ.
- Không lưu tổng tiền lương trong `tblSalaryTable` vì tính được từ `laborUnitPrice` nhân tổng định mức công của các `tblServiceDetail` thuộc nhân viên đó trong tháng.
- Ngoài ra không còn thuộc tính dư thừa nào khác.

Ta được biểu đồ cơ sở dữ liệu như sau:
