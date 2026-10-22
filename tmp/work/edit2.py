# -*- coding: utf-8 -*-
import lxml.etree as ET
from helpers import *
from find import idx, one

t = ET.parse('unpacked/word/document.xml'); b = body(t)

# ================= III. Biểu đồ trạng thái: bổ sung xử lý của BE vào phần mô tả =========
rebuild(one(b,'Nếu thông tin đúng, hệ thống lấy thông tin'),
  'Nếu thông tin đúng, hệ thống kiểm tra tài khoản, lấy thông tin và hiển thị lên GD chính của QL ')

rebuild(one(b,'Nếu tìm thấy, hệ thống hiển thị danh sách phụ tùng tìm thấy'),
  'Nếu tìm thấy, hệ thống hiển thị danh sách phụ tùng tìm thấy, QL chọn các phụ tùng cần dùng, '
  'hệ thống trừ số lượng phụ tùng trong kho và cộng dồn chi phí phụ tùng vào phiếu dịch vụ')

rebuild(one(b,'QL chọn Xác nhận phiếu dịch vụ'),
  'QL chọn Xác nhận phiếu dịch vụ, hệ thống lưu đầy đủ thông tin phiếu dịch vụ, tính tổng chi phí tạm tính, '
  'chuyển trạng thái phiếu sang “Chờ phân công” và hiện thông báo “Thêm phiếu dịch vụ thành công”, '
  'QL chọn OK, hệ thống quay lại GD chính của QL ')

# --- CN2: thêm nhánh chọn slot kỹ thuật vào phần mô tả trạng thái ---
rebuild(one(b,'Nếu chưa chọn đủ các nhân viên cho danh sách dịch vụ'),
  'Nếu chưa chọn đủ các nhân viên cho danh sách dịch vụ, hệ thống hiện thông báo '
  '“Vui lòng chọn nhân viên cho tất cả dịch vụ trong phiếu trước khi xác nhận” ')

p_ok = one(b,'Nếu đã chọn đủ các nhân viên cho danh sách')
rebuild(p_ok, 'Nếu đã chọn đủ các nhân viên cho danh sách dịch vụ, hệ thống hiển thị GD danh sách slot kỹ thuật đang trống')
p_lv1 = one(b,'Tại GD chứa danh sách nhân viên phục vụ:')      # ilvl 0
p_lv3 = one(b,'Nếu chưa chọn đủ các nhân viên')                 # ilvl 2
insert_after(p_ok, [
    clone(p_lv1, 'Tại GD danh sách slot kỹ thuật:'),
    clone(p_lv3, 'Nếu không còn slot kỹ thuật trống, hệ thống thông báo “Hiện không còn slot kỹ thuật trống, '
                 'vui lòng chờ”, QL chọn OK, hệ thống quay lại GD chứa danh sách nhân viên phục vụ'),
    clone(p_lv3, 'Nếu còn slot trống, QL chọn một slot và nhấn Chọn, hệ thống gán nhân viên cho từng dịch vụ, '
                 'gán slot cho phiếu, chuyển trạng thái slot thành “Đang sử dụng”, cập nhật trạng thái phiếu '
                 'thành “Đang thực hiện”, gửi thông báo phân công cho nhân viên phục vụ và thông báo '
                 '“Phân công thành công”, QL chọn OK, hệ thống quay lại GD chính của QL'),
])

# ================= IV.1 CN1: gán hàm về đúng lớp =========
anchor = one(b,'owned class: Service')      # cuối findServicesByKeyword
tpl1 = one(b,'Tìm kiếm dịch vụ theo từ khoá')                  # ilvl 1
tpl2 = one(b,'findServicesByKeyword()')                        # ilvl 2
insert_after(anchor, [
    clone(tpl1,'Thêm dịch vụ đã chọn vào phiếu dịch vụ:'),
    clone(tpl2,'addServiceToSlip():'),
    clone(tpl2,'input: ServiceSlip, Service'),
    clone(tpl2,'output: Boolean'),
    clone(tpl2,'owned class: ServiceDetail'),
])

anchor = one(b,'owned class: Component')
insert_after(anchor, [
    clone(tpl1,'Thêm phụ tùng đã chọn vào phiếu dịch vụ:'),
    clone(tpl2,'addComponentToSlip():'),
    clone(tpl2,'input: ServiceSlip, Component, số lượng'),
    clone(tpl2,'output: Boolean'),
    clone(tpl2,'owned class: ComponentDetail'),
    clone(tpl1,'Trừ số lượng phụ tùng trong kho:'),
    clone(tpl2,'updateInventoryQty():'),
    clone(tpl2,'input: Component, số lượng'),
    clone(tpl2,'output: Boolean'),
    clone(tpl2,'owned class: Component'),
])

# ================= IV.2 CN2: thêm assignStaffToServiceDetail + ChooseSlotView =========
anchor = one(b,'owned class: Staff')
tplA = one(b,'c, Giao diện chứa danh sách nhân viên phục vụ (StaffListView):')
tplB = one(b,'Danh sách nhân viên phục vụ: outStaffListInfo')
tplC = one(b,'Các hành động ở StaffListView:')
tplD = one(b,'Lấy danh sách nhân viên phục vụ:')
tplE = one(b,'getStaffList():')
insert_after(anchor, [
    clone(tplD,'Gán nhân viên phục vụ cho từng dịch vụ trong phiếu:'),
    clone(tplE,'assignStaffToServiceDetail():'),
    clone(tplE,'input: ServiceDetail, Staff'),
    clone(tplE,'output: Boolean'),
    clone(tplE,'owned class: ServiceDetail'),
    clone(tplA,'d, Giao diện danh sách slot kỹ thuật (ChooseSlotView):'),
    clone(tplB,'Danh sách các slot kỹ thuật đang trống: outSlotList'),
    clone(tplB,'Nút chọn: subChoose'),
    clone(tplB,'Nút quay lại: subBack'),
    clone(tplC,'Các hành động ở ChooseSlotView:'),
    clone(tplD,'Lấy danh sách các slot kỹ thuật đang trống:'),
    clone(tplE,'getAvailableSlots():'),
    clone(tplE,'input: trống'),
    clone(tplE,'output: Danh sách các slot đang trống (List<Slot>)'),
    clone(tplE,'owned class: Slot'),
    clone(tplD,'Cập nhật trạng thái slot kỹ thuật:'),
    clone(tplE,'updateSlotStatus():'),
    clone(tplE,'input: Slot'),
    clone(tplE,'output: Boolean'),
    clone(tplE,'owned class: Slot'),
])

# ================= IV.3 CN3 =========
rebuild(one(b,'getServiceDetailOfStaffInMonth():'), 'getServiceDetailsOfStaffInMonth(): ')

anchor = one(b,'Nút chọn: subChoose')     # ChooseMonthView
insert_after(anchor, [
    clone(tplC,'Các hành động ở ChooseMonthView:'),
    clone(tplD,'Kiểm tra tháng đã chốt bảng lương hay chưa:'),
    clone(tplE,'checkSalaryTableOfMonth():'),
    clone(tplE,'input: month, year'),
    clone(tplE,'output: Boolean'),
    clone(tplE,'owned class: SalaryTable'),
])

i_meth = idx(b,'e, Giao diện chọn hình thức trả lương')
anchor = list(b)[idx(b,'owned class: SalaryTable', i_meth)]
insert_after(anchor, [
    clone(tplA,'f, Giao diện xác nhận đã nhận lương của NVPV (ConfirmReceivedView):'),
    clone(tplB,'Thông tin bảng lương của nhân viên phục vụ: outSalaryInfo'),
    clone(tplB,'Nút Đã nhận: subReceived'),
    clone(tplC,'Các hành động ở ConfirmReceivedView:'),
    clone(tplD,'Cập nhật trạng thái đã nhận lương của nhân viên phục vụ:'),
    clone(tplE,'updateIsReceived():'),
    clone(tplE,'input: SalaryTable'),
    clone(tplE,'output: Boolean'),
    clone(tplE,'owned class: SalaryTable'),
])

t.write('unpacked/word/document.xml', xml_declaration=True, encoding='UTF-8', standalone=True)
print('edit2 done')
