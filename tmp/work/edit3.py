# -*- coding: utf-8 -*-
import lxml.etree as ET
from helpers import *
from find import idx

t = ET.parse('unpacked/word/document.xml'); b = body(t)

CN1 = [
 'QL thực hiện đăng nhập tại LoginView',
 'Lớp LoginView gọi lớp User',
 'Lớp User gọi phương thức checkLogin()',
 'Lớp User trả kết quả về cho LoginView',
 'Lớp LoginView gọi lớp ManagerView',
 'Lớp ManagerView hiển thị cho QL',
 'Tại ManagerView, QL chọn chức năng Tiếp nhận xe và chọn dịch vụ/phụ tùng',
 'Lớp ManagerView gọi lớp SearchCustomerInfoView',
 'Lớp SearchCustomerInfoView hiển thị cho QL',
 'QL nhập SĐT và nhấn tìm kiếm',
 'Lớp SearchCustomerInfoView gọi lớp Customer',
 'Lớp Customer gọi phương thức findCustomerInfoByPhone()',
 'Lớp Customer trả kết quả về cho SearchCustomerInfoView',
 'Lớp SearchCustomerInfoView gọi lớp Car',
 'Lớp Car gọi phương thức findCarInfosOfCustomer()',
 'Lớp Car trả kết quả về cho SearchCustomerInfoView',
 'Lớp SearchCustomerInfoView gọi lớp Appointment',
 'Lớp Appointment gọi phương thức findAppointmentsOfCustomer()',
 'Lớp Appointment trả kết quả về cho SearchCustomerInfoView',
 'Lớp SearchCustomerInfoView hiển thị kết quả cho QL',
 'QL yêu cầu Khách hàng xác nhận thông tin khách hàng/xe',
 'Khách hàng xác nhận thông tin là chính xác',
 'QL chọn lịch hẹn mà KH muốn và nhấn Tiếp nhận',
 'Lớp SearchCustomerInfoView gọi lớp ServiceSlip',
 'Lớp ServiceSlip gọi phương thức createServiceSlip()',
 'Lớp ServiceSlip trả kết quả về cho SearchCustomerInfoView',
 'Lớp SearchCustomerInfoView gọi lớp ServiceSlipInfoView',
 'Lớp ServiceSlipInfoView hiển thị cho QL',
 'QL chọn Thêm dịch vụ tại ServiceSlipInfoView',
 'Lớp ServiceSlipInfoView gọi lớp SearchServiceView',
 'Lớp SearchServiceView hiển thị cho QL',
 '@(Từ bước 32 → 40 lặp lại cho đến khi chọn xong dịch vụ)',
 'QL nhập thông tin dịch vụ và nhấn tìm kiếm',
 'Lớp SearchServiceView gọi lớp Service',
 'Lớp Service gọi phương thức findServicesByKeyword()',
 'Lớp Service trả kết quả về cho SearchServiceView',
 'Lớp SearchServiceView hiển thị danh sách dịch vụ cho QL',
 'QL chọn dịch vụ cần thiết và nhấn Chọn',
 'Lớp SearchServiceView gọi lớp ServiceDetail',
 'Lớp ServiceDetail gọi phương thức addServiceToSlip()',
 'Lớp ServiceDetail trả kết quả về cho SearchServiceView',
 'QL chọn Thêm phụ tùng tại SearchServiceView',
 'Lớp SearchServiceView gọi lớp AddComponentView',
 'Lớp AddComponentView hiển thị cho QL',
 '@(Từ bước 44 → 55 lặp lại cho đến khi chọn xong phụ tùng)',
 'QL nhập thông tin phụ tùng và nhấn tìm kiếm',
 'Lớp AddComponentView gọi lớp Component',
 'Lớp Component gọi phương thức findComponentByKeyword()',
 'Lớp Component trả kết quả cho AddComponentView',
 'Lớp AddComponentView hiển thị danh sách phụ tùng tìm thấy cho QL',
 'QL chọn phụ tùng cần thiết và chọn Thêm',
 'Lớp AddComponentView gọi lớp ComponentDetail',
 'Lớp ComponentDetail gọi phương thức addComponentToSlip()',
 'Lớp ComponentDetail trả kết quả về cho AddComponentView',
 'Lớp AddComponentView gọi lớp Component',
 'Lớp Component gọi phương thức updateInventoryQty()',
 'Lớp Component trả kết quả về cho AddComponentView',
 'QL chọn Xác nhận lưu phiếu dịch vụ',
 'Lớp AddComponentView gọi lớp ServiceSlip',
 'Lớp ServiceSlip gọi phương thức saveServiceSlip()',
 'Lớp ServiceSlip trả kết quả về cho AddComponentView',
 'Lớp AddComponentView hiển thị thông báo thành công cho QL',
 'QL chọn OK',
 'Lớp AddComponentView gọi lớp ManagerView',
 'Lớp ManagerView hiển thị cho QL',
]

CN2 = [
 'Tại ManagerView, QL chọn chức năng Phân công nhân viên phục vụ',
 'Lớp ManagerView gọi lớp SearchNeededServiceSlipView',
 'Lớp SearchNeededServiceSlipView hiển thị cho QL',
 'QL nhập thông tin phiếu dịch vụ và nhấn tìm kiếm',
 'Lớp SearchNeededServiceSlipView gọi lớp ServiceSlip',
 'Lớp ServiceSlip gọi phương thức findServiceSlipByKeyword()',
 'Lớp ServiceSlip trả kết quả cho SearchNeededServiceSlipView',
 'Lớp SearchNeededServiceSlipView hiển thị thông tin phiếu dịch vụ cho QL',
 'QL chọn nút Phân công tại SearchNeededServiceSlipView',
 'Lớp SearchNeededServiceSlipView gọi lớp StaffListView',
 'Lớp StaffListView gọi lớp Staff',
 'Lớp Staff gọi phương thức getStaffList()',
 'Lớp Staff trả kết quả về cho StaffListView',
 'Lớp StaffListView hiển thị cho QL',
 '@(Từ bước 15 → 18 lặp lại cho tới khi phân công xong nhân viên cho tất cả dịch vụ trong phiếu)',
 'QL chọn nhân viên phục vụ phù hợp với dịch vụ trong phiếu',
 'Lớp StaffListView gọi lớp ServiceDetail',
 'Lớp ServiceDetail gọi phương thức assignStaffToServiceDetail()',
 'Lớp ServiceDetail trả kết quả về cho StaffListView',
 'QL chọn Xác nhận phân công tại StaffListView',
 'Lớp StaffListView gọi lớp ChooseSlotView',
 'Lớp ChooseSlotView gọi lớp Slot',
 'Lớp Slot gọi phương thức getAvailableSlots()',
 'Lớp Slot trả kết quả về cho ChooseSlotView',
 'Lớp ChooseSlotView hiển thị danh sách slot kỹ thuật đang trống cho QL',
 'QL chọn slot kỹ thuật và nhấn Chọn',
 'Lớp ChooseSlotView gọi lớp Slot',
 'Lớp Slot gọi phương thức updateSlotStatus()',
 'Lớp Slot trả kết quả về cho ChooseSlotView',
 'Lớp ChooseSlotView gọi lớp ServiceSlip',
 'Lớp ServiceSlip gọi phương thức updateServiceSlip()',
 'Lớp ServiceSlip trả kết quả về cho ChooseSlotView',
 'Lớp ChooseSlotView thông báo cho Nhân viên phục vụ về các dịch vụ được phân công',
 'Lớp ChooseSlotView hiển thị cho QL thông báo phân công thành công',
 'QL chọn OK',
 'Lớp ChooseSlotView gọi lớp ManagerView',
 'Lớp ManagerView hiển thị cho QL',
]

CN3 = [
 'Tại ManagerView, QL chọn chức năng Tính công trả lương cho nhân viên phục vụ theo tháng',
 'Lớp ManagerView gọi lớp ChooseMonthView',
 'Lớp ChooseMonthView hiển thị cho QL',
 'QL chọn tháng và năm sau đó nhấn Chọn',
 'Lớp ChooseMonthView gọi lớp SalaryTable',
 'Lớp SalaryTable gọi phương thức checkSalaryTableOfMonth()',
 'Lớp SalaryTable trả kết quả về cho ChooseMonthView',
 'Lớp ChooseMonthView gọi lớp SummarySheetView',
 'Lớp SummarySheetView gọi lớp SalaryTable',
 'Lớp SalaryTable gọi phương thức getSalaryTablesOfMonth()',
 'Lớp SalaryTable trả kết quả cho SummarySheetView',
 'Lớp SummarySheetView hiển thị cho QL',
 '@(Từ bước 13 → 36 lặp lại cho đến khi xử lý xong cho tất cả nhân viên phục vụ)',
 'QL chọn vào 1 dòng nhân viên',
 'Lớp SummarySheetView gọi lớp DetailSheetView',
 'Lớp DetailSheetView gọi lớp ServiceDetail',
 'Lớp ServiceDetail gọi phương thức getServiceDetailsOfStaffInMonth()',
 'Lớp ServiceDetail trả kết quả về cho DetailSheetView',
 'Lớp DetailSheetView hiển thị cho QL',
 'QL chọn Hình thức trả lương tại DetailSheetView',
 'Lớp DetailSheetView gọi lớp ChooseMethodView',
 'Lớp ChooseMethodView hiển thị danh sách hình thức trả lương cho QL',
 'QL chọn hình thức trả lương tương ứng',
 'Lớp ChooseMethodView gọi lớp SalaryTable',
 'Lớp SalaryTable gọi phương thức savePaymentMethod()',
 'Lớp SalaryTable trả kết quả về cho ChooseMethodView',
 '@(Các bước 26 → 31 chỉ chạy khi QL chọn hình thức trả lương là Tiền mặt, theo ngoại lệ 9)',
 'Lớp ChooseMethodView gọi lớp ConfirmReceivedView',
 'Lớp ConfirmReceivedView hiển thị cho Nhân viên phục vụ',
 'Nhân viên phục vụ chọn Đã nhận tại ConfirmReceivedView',
 'Lớp ConfirmReceivedView gọi lớp SalaryTable',
 'Lớp SalaryTable gọi phương thức updateIsReceived()',
 'Lớp SalaryTable trả kết quả về cho ConfirmReceivedView',
 'Lớp ChooseMethodView gọi lớp DetailSheetView',
 'Lớp DetailSheetView hiển thị cho QL',
 'QL chọn Quay lại',
 'Lớp DetailSheetView gọi lớp SummarySheetView',
 'Lớp SummarySheetView hiển thị cho QL',
 'QL chọn Xác nhận chốt bảng lương',
 'Lớp SummarySheetView gọi lớp SalaryTable',
 'Lớp SalaryTable gọi phương thức saveAllSalaryTableOfMonth()',
 'Lớp SalaryTable trả kết quả về cho SummarySheetView',
 'Lớp SummarySheetView thông báo cho QL là thành công',
 'QL chọn OK',
 'Lớp SummarySheetView gọi lớp ManagerView',
 'Lớp ManagerView hiển thị cho QL',
]


def numbered(items):
    out = []
    n = 0
    for s in items:
        if s.startswith('@'):
            out.append(s[1:])
        else:
            n += 1
            out.append(str(n) + ', ' + s)
    return out, n


JOBS = [
    ('1, QL thực hiện đăng nhập tại LoginView', '50, QL chọn OK', CN1),
    ('1, Tại ManagerView, QL chọn chức năng Phân công', '21, QL chọn OK', CN2),
    ('1, Tại ManagerView, QL chọn chức năng Tính công', '33, QL chọn OK', CN3),
]

for first_frag, last_frag, items in JOBS:
    i = idx(b, first_frag)
    j = idx(b, last_frag, i)
    texts, n = numbered(items)
    print(first_frag[:45], '->', n, 'buoc; thay', j - i + 1, 'doan bang', len(texts))
    replace_range(b, list(b)[i], list(b)[j], texts)

t.write('unpacked/word/document.xml', xml_declaration=True, encoding='UTF-8', standalone=True)
print('edit3 done')
