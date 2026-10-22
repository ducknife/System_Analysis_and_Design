# -*- coding: utf-8 -*-
import lxml.etree as ET
from helpers import *

t = ET.parse('unpacked/word/document.xml'); b = body(t)

imgs = [e for e in list(b) if e.tag == q('p') and e.find('.//' + q('drawing')) is not None]
print('so anh trong than bai:', len(imgs))
assert len(imgs) == 15, len(imgs)

NOTES = {
 5: ('Cần sửa hình. Biểu đồ lớp thực thể chung. Thầy ghi: “n-n”, “sai quan hệ”, “sai quan hệ, thiếu lớp slot kỹ thuật”.', [
    '1. Thêm lớp Slot gồm slotId, location, status. Nối Slot 1 — n ServiceSlip, hình thoi đặt ở ServiceSlip.',
    '2. Xoá ba thuộc tính serviceList, componentList, staffList khỏi ServiceSlip. Thêm thuộc tính totalCost.',
    '3. Bỏ hai đường nét đứt kiểu association class và hai đường liền ServiceSlip — Service, ServiceSlip — Component. Vẽ lại thành ba cặp quan hệ có ghi số lượng ở cả hai đầu: ServiceSlip 1 — n ServiceDetail n — 1 Service; ServiceSlip 1 — n ComponentDetail n — 1 Component; Staff 1 — n ServiceDetail.',
    '4. Thêm các hình thoi còn thiếu, đặt ở lớp chứa: Car chứa Customer; ServiceDetail chứa Staff; ServiceDetail chứa Service; ComponentDetail chứa Component; SalaryTable chứa Staff; ServiceSlip chứa Appointment; ServiceSlip chứa Slot.',
    '5. Soát lại lần cuối: mọi đường nối đều phải ghi số lượng ở hai đầu và đều phải có một dòng tương ứng ở mục 5.',
 ]),
 6: ('Cần sửa hình. Biểu đồ trạng thái chức năng 1. Thầy ghi: “thiếu các action xử lí của BE”.', [
    '1. Thêm vế sau dấu gạch chéo cho các chuyển trạng thái: [QL nhập thông tin đăng nhập và nhấn login] / kiểm tra tài khoản; [QL chọn dịch vụ cần dùng] / cộng dồn chi phí dịch vụ vào phiếu; [QL chọn phụ tùng cần dùng] / trừ số lượng phụ tùng trong kho, cộng dồn chi phí phụ tùng; [chọn xác nhận lưu phiếu dịch vụ] / lưu phiếu, tính tổng chi phí tạm tính, chuyển trạng thái phiếu sang “Chờ phân công”.',
    '2. Từ trạng thái “Hiện GD chính của QL” vẽ thêm mũi tên [chọn Đăng xuất] về trạng thái kết thúc.',
 ]),
 7: ('Cần sửa hình. Biểu đồ trạng thái chức năng 2.', [
    '1. Thêm trạng thái “Hiện GD danh sách slot kỹ thuật đang trống”, đi vào bằng [QL chọn Xác nhận phân công] / lấy danh sách slot đang trống.',
    '2. Từ trạng thái đó vẽ [QL chọn slot] / gán nhân viên cho từng dịch vụ, gán slot cho phiếu, chuyển slot sang “Đang sử dụng”, chuyển phiếu sang “Đang thực hiện”, gửi thông báo cho NVPV.',
    '3. Thêm nhánh ngoại lệ [không còn slot trống] sang trạng thái “Hiện thông báo không còn slot kỹ thuật trống”, rồi [chọn OK] quay lại GD danh sách nhân viên phục vụ.',
    '4. Thêm vế sau dấu gạch chéo cho các chuyển trạng thái còn lại và thêm trạng thái kết thúc.',
 ]),
 8: ('Cần sửa hình. Biểu đồ trạng thái chức năng 3.', [
    '1. Thêm vế sau dấu gạch chéo: [QL chọn tháng/năm và nhấn Chọn] / kiểm tra tháng đã chốt, truy vấn phiếu “Đã hoàn thành” và tổng hợp công; [QL chọn hình thức trả lương] / lưu hình thức trả lương; [QL chọn Xác nhận chốt bảng lương] / lưu bảng lương của tháng.',
    '2. Thêm trạng thái “Hiện GD xác nhận đã nhận lương của NVPV” cho ngoại lệ 9, đi ra bằng [NVPV click Đã nhận] / cập nhật trạng thái đã nhận lương.',
    '3. Thêm trạng thái kết thúc.',
 ]),
 9: ('Cần sửa hình. Biểu đồ lớp chức năng 1. Thầy ghi: “trình bày khó theo dõi”, “sai từ bước thực thể nên các hàm bị sai lớp theo”.', [
    '1. Áp dụng toàn bộ sửa đổi của biểu đồ lớp thực thể chung ở mục II.',
    '2. Gán lại hàm cho đúng lớp: addServiceToSlip() về ServiceDetail, addComponentToSlip() về ComponentDetail, updateInventoryQty() về Component. createServiceSlip() và saveServiceSlip() giữ nguyên ở ServiceSlip.',
    '3. Xếp lại sơ đồ: đặt mỗi lớp giao diện ngay cạnh lớp thực thể mà nó gọi để các đường nối không chạy vòng ra mép trang và cắt chéo nhau. Dùng Layout, Auto Layout trong Visual Paradigm rồi chỉnh tay.',
 ]),
 10: ('Cần sửa hình. Biểu đồ lớp chức năng 2.', [
    '1. Áp dụng toàn bộ sửa đổi của biểu đồ lớp thực thể chung.',
    '2. Thêm lớp giao diện ChooseSlotView gồm outSlotList, subChoose, subBack và lớp thực thể Slot với getAvailableSlots(), updateSlotStatus().',
    '3. Thêm hàm assignStaffToServiceDetail() vào lớp ServiceDetail. Lớp này hiện chưa có hàm nào. updateServiceSlip() vẫn để ở ServiceSlip để cập nhật slot và trạng thái phiếu.',
 ]),
 11: ('Cần sửa hình. Biểu đồ lớp chức năng 3. Thầy ghi: “thiếu GD và hàm xử lí ngoại lệ”.', [
    '1. Thêm lớp giao diện ConfirmReceivedView gồm outSalaryInfo, subReceived. Đây là màn hình NVPV bấm “Đã nhận” ở ngoại lệ 9. Thêm hàm updateIsReceived() vào lớp SalaryTable.',
    '2. Thêm hàm checkSalaryTableOfMonth() vào lớp SalaryTable cho ngoại lệ 3 “Tháng lương đã được tính”.',
    '3. Đổi getServiceDetailOfStaffInMonth() thành getServiceDetailsOfStaffInMonth().',
    '4. Xoá serviceList, componentList, staffList khỏi ServiceSlip. Chức năng này không cần Component, ComponentDetail, Appointment, Customer và Slot.',
 ]),
 12: ('Cần sửa hình. Biểu đồ cộng tác chức năng 1. Thầy ghi: “thiếu actor”.', [
    '1. Thêm tác nhân Khách hàng, nối với SearchCustomerInfoView bằng hai thông điệp 21 và 22 trong kịch bản v.2.',
    '2. Thêm các thông điệp mới: addServiceToSlip() tới ServiceDetail, addComponentToSlip() tới ComponentDetail, updateInventoryQty() tới Component.',
    '3. Thêm hai thông điệp cuối: AddComponentView gọi ManagerView và ManagerView hiển thị cho QL.',
    '4. Đánh lại số thứ tự thông điệp từ 1 đến 63 cho khớp kịch bản v.2 ở trên.',
 ]),
 13: ('Cần sửa hình. Biểu đồ cộng tác chức năng 2. Thầy ghi: “thiếu actor”.', [
    '1. Thêm tác nhân Nhân viên phục vụ, nhận thông điệp 33 “thông báo về các dịch vụ được phân công”.',
    '2. Thêm lớp ChooseSlotView và lớp Slot với getAvailableSlots(), updateSlotStatus().',
    '3. Bước gán nhân viên gọi assignStaffToServiceDetail() ở ServiceDetail thay vì updateServiceSlip(). updateServiceSlip() chuyển sang dùng cho việc cập nhật slot và trạng thái phiếu.',
    '4. Thêm hai thông điệp cuối: ChooseSlotView gọi ManagerView và ManagerView hiển thị cho QL. Đánh lại số thứ tự từ 1 đến 36.',
 ]),
 14: ('Cần sửa hình. Biểu đồ cộng tác chức năng 3. Thầy ghi: “thiếu actor”.', [
    '1. Thêm tác nhân Nhân viên phục vụ và lớp ConfirmReceivedView. Chuỗi thông điệp 26 đến 31: ChooseMethodView gọi ConfirmReceivedView, ConfirmReceivedView hiển thị cho NVPV, NVPV chọn Đã nhận, ConfirmReceivedView gọi SalaryTable, SalaryTable gọi updateIsReceived(), SalaryTable trả kết quả.',
    '2. Đổi getServiceDetailOfStaffInMonth() thành getServiceDetailsOfStaffInMonth().',
    '3. Thêm hai thông điệp cuối: SummarySheetView gọi ManagerView và ManagerView hiển thị cho QL. Đánh lại số thứ tự từ 1 đến 44.',
 ]),
}

for k in sorted(NOTES, reverse=True):
    title, lines = NOTES[k]
    insert_after(imgs[k], note_block(b, title, lines))

t.write('unpacked/word/document.xml', xml_declaration=True, encoding='UTF-8', standalone=True)
print('edit4 done')
