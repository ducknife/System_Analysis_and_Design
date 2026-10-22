# -*- coding: utf-8 -*-
import lxml.etree as ET
from helpers import *
t = ET.parse('unpacked/word/document.xml'); b = body(t)
B = list(b)
def chk(i, frag):
    s = ptext(B[i])
    assert frag in s, (i, s)
# khối addServiceToSlip đang nằm nhầm ở SearchCustomerInfoView
for i,f in [(320,'Thêm dịch vụ đã chọn'),(321,'addServiceToSlip'),(322,'input: ServiceSlip, Service'),
            (323,'output: Boolean'),(324,'owned class: ServiceDetail')]: chk(i,f)
chk(340,'owned class: Service')
blk1 = B[320:325]
# khối ChooseMonthView đang nằm nhầm trong StaffListView
for i,f in [(415,'Các hành động ở ChooseMonthView'),(416,'Kiểm tra tháng'),(417,'checkSalaryTableOfMonth'),
            (418,'input: month, year'),(419,'output: Boolean'),(420,'owned class: SalaryTable')]: chk(i,f)
chk(463,'Nút chọn: subChoose')
blk2 = B[415:421]
for e in blk1 + blk2: b.remove(e)
insert_after(B[340], blk1)
insert_after(B[463], blk2)
t.write('unpacked/word/document.xml', xml_declaration=True, encoding='UTF-8', standalone=True)
print('fix1 done')
