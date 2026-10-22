# -*- coding: utf-8 -*-
import lxml.etree as ET
from helpers import *

t = ET.parse('unpacked/word/document.xml')
b = body(t)
B = list(b)

# ---------- I. Kịch bản: ô Actors ----------
tbl1, tbl2, tbl3 = B[148], B[152], B[156]
rebuild(cps(cell(tbl1,1,1))[0], 'Nhân viên quản lý, Khách hàng')
rebuild(cps(cell(tbl2,1,1))[0], 'Nhân viên quản lý, Nhân viên phục vụ')

# ---------- CN2 main events: chèn bước chọn slot kỹ thuật ----------
me2 = cell(tbl2,4,1)
ps = cps(me2)
p_choose_staff = ps[22]          # "QL nhấn nút chọn ở dòng nhân viên phù hợp..."
p_assign       = ps[23]          # "Hệ thống gán nhân viên phụ trách..."
p_sub          = ps[7]           # mẫu gạch đầu dòng numId=8

insert_after(p_choose_staff, [
    clone(p_choose_staff, 'QL nhấn nút Xác nhận phân công'),
    clone(p_choose_staff, 'Hệ thống hiển thị giao diện danh sách các slot kỹ thuật đang trống gồm mã slot, vị trí, trạng thái, nút Chọn, nút Quay lại'),
    clone(p_sub, 'S01, Khoang A1, Trống'),
    clone(p_sub, 'S03, Khoang B2, Trống'),
    clone(p_choose_staff, 'QL chọn slot S01 và nhấn Chọn'),
])
rebuild(p_assign,
    'Hệ thống gán nhân viên phụ trách cho từng dịch vụ trong phiếu, gán slot S01 cho phiếu dịch vụ, '
    'chuyển trạng thái slot S01 thành "Đang sử dụng", cập nhật trạng thái phiếu dịch vụ thành "Đang thực hiện", '
    'gửi thông báo phân công tới các nhân viên phục vụ được chọn và báo phân công thành công')

# ---------- CN2 exception: đánh lại số + thêm ngoại lệ hết slot ----------
ex2 = cell(tbl2,5,1)
ps = cps(ex2)
replace_range(ex2, ps[6], ps[13], [
    '8. QL chưa chọn hết nhân viên phục vụ cho các dịch vụ tương ứng trong phiếu dịch vụ mà đã nhấn Xác nhận phân công',
    '8.1. Hệ thống báo “Vui lòng chọn nhân viên cho tất cả dịch vụ trong phiếu trước khi xác nhận”',
    '8.2. QL nhấn OK',
    '8.3. Hệ thống quay về giao diện chứa danh sách nhân viên phục vụ',
    '8.4. QL chọn nhân viên cho tất cả dịch vụ sau đó nhấn Xác nhận phân công',
    '8.5. Tiếp tục luồng nghiệp vụ như main-events từ bước 9',
    '',
    '9. Hệ thống báo “Hiện không còn slot kỹ thuật trống, vui lòng chờ”',
    '9.1. QL nhấn OK',
    '9.2. Hệ thống quay về giao diện chứa danh sách nhân viên phục vụ, phiếu dịch vụ giữ nguyên trạng thái “Chờ phân công”',
    '9.3. Khi có slot được giải phóng, QL làm lại luồng nghiệp vụ như main-events từ bước 8',
], tpl=ps[6])

# ---------- CN3: sửa số liệu công cho khớp bảng chi tiết ----------
me3 = cell(tbl3,4,1)
tbls = me3.findall(q('tbl'))
sum_tbl, det_tbl = tbls[1], tbls[2]
def setrow(tbl, r, vals):
    tcs = tbl.findall(q('tr'))[r].findall(q('tc'))
    for ci, v in vals.items():
        rebuild(tcs[ci].findall(q('p'))[0], v)
setrow(sum_tbl, 1, {4:'74', 6:'37.000.000'})
setrow(sum_tbl, 2, {4:'78', 6:'31.200.000'})
setrow(sum_tbl, 3, {4:'70', 6:'31.500.000'})
setrow(det_tbl, 0, {2:'Biển số xe'})
for p in me3.findall(q('p')):
    s = ptext(p)
    if s.strip().startswith('Tổng định mức công tháng'):
        rebuild(p, 'Tổng định mức công tháng 9/2026: 74')
    elif s.strip().startswith('Tổng thành tiền lương'):
        rebuild(p, 'Tổng thành tiền lương: 37.000.000 ')

# ---------- II.1 đoạn văn chức năng 2 ----------
rebuild(B[163],
    'Tại GD chính, QL chọn chức năng Phân công nhân viên phục vụ. HT hiển thị GD tìm phiếu dịch vụ. '
    'QL nhập thông tin phiếu dịch vụ và nhấn tìm kiếm. HT hiển thị thông tin phiếu dịch vụ (nếu tìm thấy). '
    'QL chọn Phân công. HT hiển thị GD chứa danh sách NVPV kèm trạng thái hiện tại của họ. '
    'QL chọn các NVPV phù hợp với các dịch vụ trong phiếu, sau khi chọn xong thì QL chọn Xác nhận phân công. '
    'HT hiển thị GD danh sách các slot kỹ thuật đang trống. QL chọn một slot để đưa xe vào sửa. '
    'Nếu không còn slot kỹ thuật trống, HT thông báo và phiếu dịch vụ giữ nguyên trạng thái Chờ phân công. '
    'HT gán NVPV cho từng dịch vụ trong phiếu, gán slot cho phiếu, chuyển trạng thái slot thành Đang sử dụng, '
    'cập nhật trạng thái phiếu thành “Đang thực hiện”, gửi thông báo phân công cho NVPV và báo phân công thành công. '
    'QL chọn OK. HT quay về GD chính của QL. ')

# ---------- II.2 trích danh từ ----------
rebuild(B[167],
    'Bước, thông tin, hệ thống, quản lý, khách hàng, nhân viên phục vụ, xe, giao diện, phụ tùng, dịch vụ, '
    'phiếu dịch vụ, slot kỹ thuật, số lượng, trạng thái, lịch hẹn, công, lương, tiền, tháng, năm, hình thức, '
    'bảng lương, bảng tổng hợp. ')

# ---------- II.3 đánh giá danh từ ----------
rebuild(B[174], 'Lịch hẹn → Lớp Appointment gồm mã lịch hẹn, giờ hẹn, trạng thái. '
                'Khách hàng và xe là quan hệ với lớp khác nên xét ở bước 4 và 5')
rebuild(B[177], 'Phiếu dịch vụ → Lớp ServiceSlip gồm mã phiếu dịch vụ, thời gian tiếp nhận, trạng thái, '
                'tổng chi phí tạm tính. Xe, người lập, slot kỹ thuật, danh sách dịch vụ và phụ tùng đã chọn '
                'là quan hệ với lớp khác nên xét ở bước 4 và 5')
rebuild(B[178], 'Bảng lương của nhân viên phục vụ → Lớp SalaryTable gồm tháng, năm tính lương, đơn giá công, '
                'hình thức trả lương, trạng thái đã nhận lương, trạng thái chốt bảng lương')
insert_after(B[181], [clone(B[181], 'Slot kỹ thuật → Lớp Slot gồm mã slot, vị trí, trạng thái')])

# ---------- II.4 quan hệ số lượng ----------
rebuild(B[188], 'Một xe có thể có nhiều phiếu dịch vụ. Mỗi lần tiếp nhận chỉ lập một phiếu cho đúng một xe '
                '→ Car và ServiceSlip là 1 – n ')
insert_after(B[188], [clone(B[188],
    'Một slot kỹ thuật tại một thời điểm chỉ nhận một xe vào sửa, nhưng qua nhiều lần tiếp nhận thì phục vụ '
    'nhiều xe khác nhau. Một xe qua nhiều lần vào gara cũng có thể nằm ở nhiều slot khác nhau → Car và Slot '
    'là n – n → Lấy luôn ServiceSlip làm lớp trung gian vì mỗi phiếu ứng với đúng một xe nằm trong đúng một '
    'slot, quan hệ giữa Car và ServiceSlip là 1 – n, Slot và ServiceSlip là 1 – n ')])

# ---------- II.5 quan hệ đối tượng ----------
insert_after(B[199], [clone(B[199], s) for s in [
    'Car chứa thông tin khách hàng',
    'ServiceSlip chứa thông tin lịch hẹn',
    'ServiceSlip chứa thông tin slot kỹ thuật',
    'ServiceSlip chứa các ServiceDetail và các ComponentDetail',
    'ServiceDetail chứa thông tin dịch vụ và thông tin nhân viên phục vụ thực hiện dịch vụ đó',
    'ComponentDetail chứa thông tin phụ tùng',
    'SalaryTable chứa thông tin nhân viên phục vụ',
]])

t.write('unpacked/word/document.xml', xml_declaration=True, encoding='UTF-8', standalone=True)
print('edit1 done')
