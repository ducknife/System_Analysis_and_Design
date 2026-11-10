# -*- coding: utf-8 -*-
"""Sinh 13 trang giao dien cho bai cua Nguyen Tuan Anh - He thong quan ly thu vien.

Ban ay dung JSP nen cac trang duoc dung theo dang trang server render co dien:
font he thong, khung vien mong, bang ke co duong ke, nut dang input submit.
Ten file dat dung ten .jsp trong tai lieu de nguoi doc doi chieu duoc.
"""
import io
import os

THU_MUC = os.path.dirname(os.path.abspath(__file__))

CSS = """
* { box-sizing: border-box; }
body { margin: 0; background: #e9eaec; font: 14px/1.5 Arial, Helvetica, sans-serif; color: #1d1f22; }
.page { width: 980px; margin: 0 auto; background: #fff; border: 1px solid #b9bcc2;
        border-top: none; min-height: 560px; }
.topbar { background: #2f4f7a; color: #fff; padding: 10px 18px; display: flex;
          justify-content: space-between; align-items: center; }
.topbar .ten { font-size: 17px; font-weight: bold; letter-spacing: .2px; }
.topbar .ai { font-size: 12.5px; opacity: .92; }
.crumb { background: #f3f4f6; border-bottom: 1px solid #d8dade; padding: 7px 18px;
         font-size: 12.5px; color: #55595f; }
.body { padding: 18px; }
h1 { font-size: 18px; margin: 0 0 14px; padding-bottom: 8px; border-bottom: 2px solid #2f4f7a; }
h2 { font-size: 14.5px; margin: 18px 0 8px; color: #2f4f7a; }
table.form { border-collapse: collapse; }
table.form td { padding: 5px 8px 5px 0; vertical-align: middle; }
table.form td.l { width: 190px; color: #35383d; }
input[type=text], input[type=password], input[type=date], input[type=number], select {
  border: 1px solid #9aa0a6; padding: 4px 6px; font: 13.5px Arial, sans-serif;
  background: #fff; }
input[type=text], input[type=password], input[type=date] { width: 260px; }
input[type=number] { width: 70px; }
select { width: 180px; }
.btn { border: 1px solid #7a7f86; background: linear-gradient(#fdfdfd,#e3e5e8);
       padding: 5px 16px; font: 13.5px Arial, sans-serif; cursor: pointer; }
.btn.chinh { border-color: #2f4f7a; background: linear-gradient(#4a6f9f,#2f4f7a); color: #fff;
             font-weight: bold; }
.btn.nho { padding: 2px 9px; font-size: 12.5px; }
table.ke { border-collapse: collapse; width: 100%; margin-top: 6px; }
table.ke th, table.ke td { border: 1px solid #c3c6cb; padding: 6px 8px; font-size: 13px; }
table.ke th { background: #eef1f5; text-align: left; font-weight: bold; }
table.ke td.s { text-align: center; }
.hop { border: 1px solid #c9ccd1; background: #fafbfc; padding: 12px 14px; margin-bottom: 14px; }
.ok { border: 1px solid #a4c9a4; background: #eef7ee; color: #27602a; padding: 8px 12px;
      margin-bottom: 14px; }
.loi { border: 1px solid #d3a3a3; background: #fbefef; color: #8d2b2b; padding: 8px 12px;
       margin-bottom: 14px; }
.ghi { color: #6a6e74; font-size: 12.5px; }
.menu a { display: block; border: 1px solid #c3c6cb; background: #f7f8fa; padding: 11px 14px;
          margin-bottom: 8px; text-decoration: none; color: #1d1f22; width: 340px; }
.menu a b { color: #2f4f7a; }
.nut-hang { margin-top: 16px; display: flex; gap: 8px; }
.cot2 { display: flex; gap: 18px; }
.cot2 > div { flex: 1; }
.tong { margin-top: 8px; font-size: 13.5px; }
.kyten { margin-top: 18px; display: flex; gap: 60px; font-size: 13px; }
.kyten div { flex: 1; text-align: center; }
.kyten .duong { margin-top: 42px; border-top: 1px dotted #8b9099; }
"""


def trang(ten_file, tieu_de, crumb, than, ai='Khách'):
    html = """<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<title>%s</title><link rel="stylesheet" href="chung.css"></head>
<body><div class="page">
<div class="topbar"><div class="ten">HỆ THỐNG QUẢN LÝ THƯ VIỆN</div><div class="ai">%s</div></div>
<div class="crumb">%s</div>
<div class="body"><h1>%s</h1>
%s
</div></div></body></html>
""" % (ten_file, ai, crumb, tieu_de, than)
    io.open(os.path.join(THU_MUC, ten_file + '.html'), 'w',
            encoding='utf-8', newline='\n').write(html)
    return ten_file


def o(nhan, the):
    return '<tr><td class="l">%s</td><td>%s</td></tr>' % (nhan, the)


def bang(cot, dong):
    th = ''.join('<th>%s</th>' % c for c in cot)
    tr = ''.join('<tr>%s</tr>' % ''.join(
        ('<td class="s">%s</td>' % c) if c.startswith('@') is False and len(c) < 14
        else '<td>%s</td>' % c for c in d) for d in dong)
    return '<table class="ke"><tr>%s</tr>%s</table>' % (th, tr)


def bang2(cot, dong, giua=()):
    """giua: chi so cot can can giua."""
    th = ''.join('<th>%s</th>' % c for c in cot)
    ra = []
    for d in dong:
        td = ''.join('<td%s>%s</td>' % (' class="s"' if i in giua else '', v)
                     for i, v in enumerate(d))
        ra.append('<tr>%s</tr>' % td)
    return '<table class="ke"><tr>%s</tr>%s</table>' % (th, ''.join(ra))


io.open(os.path.join(THU_MUC, 'chung.css'), 'w', encoding='utf-8', newline='\n').write(CSS)

# ---------------- chuc nang 1: dang ky tai khoan ----------------
trang('GDChinhHeThong.jsp', 'Trang chủ hệ thống', 'Trang chủ', """
<p>Thư viện phục vụ tra cứu và mượn sách trực tuyến. Vui lòng đăng nhập để sử dụng,
hoặc đăng ký tài khoản nếu bạn chưa có.</p>
<div class="menu">
  <a href="#"><b>Đăng ký tài khoản</b><br><span class="ghi">Tạo tài khoản độc giả mới</span></a>
  <a href="#"><b>Đăng nhập</b><br><span class="ghi">Dành cho độc giả và nhân viên thư viện</span></a>
</div>
""")

trang('GDDangKyTaiKhoan.jsp', 'Đăng ký tài khoản độc giả',
      'Trang chủ &rsaquo; Đăng ký tài khoản', """
<div class="hop">
<table class="form">
%s
</table>
</div>
<div class="nut-hang">
  <input type="submit" class="btn chinh" value="Đăng ký">
  <input type="submit" class="btn" value="Quay lại">
</div>
<p class="ghi">Các trường có dấu * là bắt buộc.</p>
""" % ''.join([
    o('Tên đăng nhập *', '<input type="text" value="docgia01">'),
    o('Mật khẩu *', '<input type="password" value="••••••••">'),
    o('Xác nhận mật khẩu *', '<input type="password" value="••••••••">'),
    o('Họ và tên *', '<input type="text" value="Nguyễn Văn An">'),
    o('Ngày sinh *', '<input type="date" value="2003-05-12">'),
    o('Địa chỉ *', '<input type="text" value="Hà Đông, Hà Nội">'),
    o('Email *', '<input type="text" value="an.nv@gmail.com">'),
    o('Số điện thoại *', '<input type="text" value="0912345678">'),
]))

trang('GDDangNhap.jsp', 'Đăng nhập hệ thống',
      'Trang chủ &rsaquo; Đăng nhập', """
<div class="ok">Đăng ký thành công. Mã độc giả của bạn là <b>DG000127</b>.
Vui lòng đăng nhập để tiếp tục.</div>
<div class="hop">
<table class="form">
%s
</table>
</div>
<div class="nut-hang">
  <input type="submit" class="btn chinh" value="Đăng nhập">
  <input type="submit" class="btn" value="Quay lại">
</div>
""" % ''.join([
    o('Tên đăng nhập', '<input type="text" value="docgia01">'),
    o('Mật khẩu', '<input type="password" value="••••••••">'),
]))

# ---------------- chuc nang 2: tim sach va dat yeu cau muon ----------------
AI_DG = 'Độc giả: Nguyễn Văn An (DG000127) | Đăng xuất'

trang('GDChinhDocGia.jsp', 'Trang chính của độc giả', 'Trang chính', """
<p>Xin chào <b>Nguyễn Văn An</b>. Bạn đang mượn <b>2</b> bản, còn được mượn thêm
<b>3</b> bản.</p>
<div class="menu">
  <a href="#"><b>Tìm sách và đặt yêu cầu mượn</b><br>
     <span class="ghi">Tra cứu đầu sách và gửi yêu cầu mượn tới thư viện</span></a>
  <a href="#"><b>Yêu cầu mượn của tôi</b><br>
     <span class="ghi">Xem trạng thái các yêu cầu đã gửi</span></a>
  <a href="#"><b>Đăng xuất</b></a>
</div>
""", ai=AI_DG)

trang('GDTimKiemSach.jsp', 'Tìm kiếm sách',
      'Trang chính &rsaquo; Tìm sách', """
<div class="hop">
<table class="form">
  <tr>
    <td class="l">Từ khóa</td><td><input type="text" value="lập trình java"></td>
    <td class="l" style="width:90px">Thể loại</td>
    <td><select><option>Công nghệ thông tin</option></select></td>
  </tr>
  <tr>
    <td class="l">Tình trạng</td>
    <td><select><option>Còn bản khả dụng</option></select></td>
    <td colspan="2"><input type="submit" class="btn chinh" value="Tìm"></td>
  </tr>
</table>
</div>
<h2>Kết quả tìm kiếm: 3 đầu sách</h2>
%s
<div class="nut-hang"><input type="submit" class="btn" value="Quay lại"></div>
""" % bang2(
    ['Mã sách', 'Tên sách', 'Năm XB', 'Tác giả', 'Thể loại', 'Nhà xuất bản',
     'Số bản khả dụng', ''],
    [['S001', 'Lập trình Java cơ bản', '2020', 'Nguyễn Văn Bình', 'CNTT',
      'NXB Giáo dục', '4', '<input type="submit" class="btn nho" value="Chọn">'],
     ['S002', 'Java nâng cao', '2021', 'Trần Thị Hoa', 'CNTT',
      'NXB Bách khoa', '2', '<input type="submit" class="btn nho" value="Chọn">'],
     ['S003', 'Lập trình hướng đối tượng', '2019', 'Lê Minh Quân', 'CNTT',
      'NXB Thống kê', '0', '<input type="submit" class="btn nho" value="Chọn">']],
    giua=(0, 2, 6, 7)), ai=AI_DG)

trang('GDChiTietSach.jsp', 'Chi tiết đầu sách',
      'Trang chính &rsaquo; Tìm sách &rsaquo; Chi tiết sách', """
<div class="hop">
<table class="form">
%s
</table>
</div>
<div class="hop">
<table class="form">
  <tr><td class="l">Số lượng muốn mượn</td>
      <td><input type="number" value="1"> bản</td></tr>
</table>
</div>
<div class="nut-hang">
  <input type="submit" class="btn chinh" value="Thêm vào danh sách">
  <input type="submit" class="btn" value="Quay lại">
</div>
""" % ''.join([
    o('Mã sách', '<b>S001</b>'),
    o('Tên sách', 'Lập trình Java cơ bản'),
    o('Tác giả', 'Nguyễn Văn Bình'),
    o('Thể loại', 'Công nghệ thông tin'),
    o('Nhà xuất bản', 'NXB Giáo dục'),
    o('Năm xuất bản', '2020'),
    o('Số bản khả dụng', '<b>4</b> bản tại thời điểm tra cứu'),
]), ai=AI_DG)

trang('GDDatYeuCauMuon.jsp', 'Danh sách sách muốn mượn',
      'Trang chính &rsaquo; Tìm sách &rsaquo; Đặt yêu cầu mượn', """
%s
<div class="tong">Tổng số bản trong danh sách: <b>3</b></div>
<div class="hop" style="margin-top:14px">
<table class="form">
  <tr><td class="l">Ngày dự kiến nhận</td>
      <td><input type="date" value="2026-10-25"></td></tr>
</table>
</div>
<div class="nut-hang">
  <input type="submit" class="btn chinh" value="Gửi yêu cầu">
  <input type="submit" class="btn" value="Tiếp tục tìm">
  <input type="submit" class="btn" value="Quay lại">
</div>
""" % bang2(
    ['Mã sách', 'Tên sách', 'Tác giả', 'Số lượng', 'Thao tác'],
    [['S001', 'Lập trình Java cơ bản', 'Nguyễn Văn Bình',
      '<input type="submit" class="btn nho" value="−"> 2 '
      '<input type="submit" class="btn nho" value="+">',
      '<input type="submit" class="btn nho" value="Bỏ">'],
     ['S002', 'Java nâng cao', 'Trần Thị Hoa',
      '<input type="submit" class="btn nho" value="−"> 1 '
      '<input type="submit" class="btn nho" value="+">',
      '<input type="submit" class="btn nho" value="Bỏ">']],
    giua=(0, 3, 4)), ai=AI_DG)

trang('GDKetQuaYeuCau.jsp', 'Phiếu mượn tạm',
      'Trang chính &rsaquo; Đặt yêu cầu mượn &rsaquo; Kết quả', """
<div class="ok">Gửi yêu cầu mượn thành công. Vui lòng đến thư viện nhận sách trước hạn.</div>
<div class="hop">
<table class="form">
%s
</table>
</div>
<h2>Danh sách đầu sách trong yêu cầu</h2>
%s
<div class="tong">Tổng số bản yêu cầu: <b>3</b></div>
<div class="nut-hang">
  <input type="submit" class="btn chinh" value="In phiếu">
  <input type="submit" class="btn" value="Quay lại">
</div>
""" % (''.join([
    o('Mã yêu cầu', '<b>YC000083</b>'),
    o('Độc giả', 'Nguyễn Văn An (DG000127)'),
    o('Ngày tạo yêu cầu', '22/10/2026'),
    o('Ngày dự kiến nhận', '25/10/2026'),
    o('Hạn nhận', '27/10/2026'),
    o('Trạng thái', 'Chờ duyệt'),
]), bang2(
    ['Mã sách', 'Tên sách', 'Tác giả', 'Số lượng'],
    [['S001', 'Lập trình Java cơ bản', 'Nguyễn Văn Bình', '2'],
     ['S002', 'Java nâng cao', 'Trần Thị Hoa', '1']],
    giua=(0, 3))), ai=AI_DG)

# ---------------- chuc nang 3: ghi nhan giao sach ----------------
AI_NV = 'Nhân viên thư viện: Phạm Thu Hà (NV0007) | Đăng xuất'

trang('GDChinhNhanVienThuVien.jsp', 'Trang chính của nhân viên thư viện',
      'Trang chính', """
<p>Xin chào <b>Phạm Thu Hà</b>. Hôm nay có <b>5</b> yêu cầu mượn đang chờ giao sách.</p>
<div class="menu">
  <a href="#"><b>Ghi nhận giao sách cho độc giả</b><br>
     <span class="ghi">Tra cứu yêu cầu mượn và lập phiếu mượn</span></a>
  <a href="#"><b>Ghi nhận trả sách</b></a>
  <a href="#"><b>Đăng xuất</b></a>
</div>
""", ai=AI_NV)

trang('GDTraCuuYeuCau.jsp', 'Tra cứu yêu cầu mượn',
      'Trang chính &rsaquo; Ghi nhận giao sách', """
<div class="hop">
<table class="form">
  <tr>
    <td class="l">Mã yêu cầu</td><td><input type="text" value="YC000083"></td>
    <td class="l" style="width:110px">Mã độc giả</td>
    <td><input type="text" value="" style="width:180px"></td>
    <td><input type="submit" class="btn chinh" value="Tra cứu"></td>
  </tr>
</table>
<p class="ghi" style="margin:6px 0 0">Nhập mã yêu cầu hoặc mã độc giả để tra cứu.</p>
</div>
<h2>Kết quả tra cứu: 1 yêu cầu</h2>
%s
<div class="nut-hang"><input type="submit" class="btn" value="Quay lại"></div>
""" % bang2(
    ['Mã yêu cầu', 'Độc giả', 'Ngày dự kiến nhận', 'Hạn nhận', 'Trạng thái', ''],
    [['YC000083', 'Nguyễn Văn An (DG000127)', '25/10/2026', '27/10/2026',
      'Chờ giao', '<input type="submit" class="btn nho" value="Chọn">']],
    giua=(0, 2, 3, 4, 5)), ai=AI_NV)

trang('GDXacNhanGiaoSach.jsp', 'Xác nhận giao sách',
      'Trang chính &rsaquo; Tra cứu yêu cầu &rsaquo; Xác nhận giao sách', """
<div class="hop">
<table class="form">
  <tr><td class="l">Mã yêu cầu</td><td><b>YC000083</b></td>
      <td class="l" style="width:110px">Độc giả</td>
      <td>Nguyễn Văn An (DG000127)</td></tr>
  <tr><td class="l">Hạn nhận</td><td>27/10/2026</td>
      <td class="l">Trạng thái</td><td>Chờ giao</td></tr>
</table>
</div>
<h2>Danh sách đầu sách chốt giao</h2>
%s
<div class="nut-hang" style="margin-top:10px">
  <input type="submit" class="btn" value="Thêm sách">
</div>
<h2>Bản sao khả dụng của đầu sách đang chọn (S001)</h2>
<table class="form" style="margin-bottom:4px">
  <tr><td class="l">Quét mã vạch</td>
      <td><input type="text" value=""> <input type="submit" class="btn nho" value="Tìm"></td></tr>
</table>
%s
<div class="nut-hang">
  <input type="submit" class="btn chinh" value="Xác nhận giao sách">
  <input type="submit" class="btn" value="Quay lại">
</div>
""" % (bang2(
    ['Mã sách', 'Tên sách', 'Nguồn', 'SL ban đầu', 'SL chốt', 'Đã giao', 'Còn lại',
     'Thao tác'],
    [['S001', 'Lập trình Java cơ bản', 'Theo yêu cầu', '2', '2', '0', '2',
      '<input type="submit" class="btn nho" value="−"> '
      '<input type="submit" class="btn nho" value="+"> '
      '<input type="submit" class="btn nho" value="Bỏ">'],
     ['S003', 'Lập trình hướng đối tượng', 'Tại quầy', '0', '1', '0', '1',
      '<input type="submit" class="btn nho" value="−"> '
      '<input type="submit" class="btn nho" value="+"> '
      '<input type="submit" class="btn nho" value="Bỏ">']],
    giua=(0, 2, 3, 4, 5, 6, 7)), bang2(
    ['Chọn', 'Mã vạch', 'Đầu sách', 'Vị trí kệ', 'Tình trạng'],
    [['<input type="checkbox" checked>', 'BS001', 'Lập trình Java cơ bản',
      'Kệ A2 - Tầng 1', 'Tốt'],
     ['<input type="checkbox" checked>', 'BS010', 'Lập trình Java cơ bản',
      'Kệ A2 - Tầng 1', 'Tốt'],
     ['<input type="checkbox">', 'BS014', 'Lập trình Java cơ bản',
      'Kệ A3 - Tầng 1', 'Bình thường']],
    giua=(0, 1, 4))), ai=AI_NV)

trang('GDTimSachTaiQuay.jsp', 'Tìm sách tại quầy',
      'Trang chính &rsaquo; Xác nhận giao sách &rsaquo; Tìm sách tại quầy', """
<div class="hop">
<table class="form">
  <tr>
    <td class="l">Từ khóa</td><td><input type="text" value="hướng đối tượng"></td>
    <td class="l" style="width:90px">Thể loại</td>
    <td><select><option>Công nghệ thông tin</option></select></td>
    <td><input type="submit" class="btn chinh" value="Tìm"></td>
  </tr>
</table>
</div>
<h2>Kết quả tìm kiếm: 1 đầu sách</h2>
%s
<div class="nut-hang"><input type="submit" class="btn" value="Quay lại"></div>
<p class="ghi">Đầu sách đã có trong danh sách chốt sẽ được cộng dồn vào cùng một dòng.</p>
""" % bang2(
    ['Mã sách', 'Tên sách', 'Tác giả', 'Số bản khả dụng', 'Số lượng thêm', ''],
    [['S003', 'Lập trình hướng đối tượng', 'Lê Minh Quân', '2',
      '<input type="number" value="1">',
      '<input type="submit" class="btn nho" value="Thêm">']],
    giua=(0, 3, 4, 5)), ai=AI_NV)

trang('GDPhieuMuon.jsp', 'Phiếu mượn sách',
      'Trang chính &rsaquo; Xác nhận giao sách &rsaquo; Phiếu mượn', """
<div class="ok">Ghi nhận giao sách thành công. Phiếu mượn đã được lưu.</div>
<div class="hop">
<table class="form">
  <tr><td class="l">Mã phiếu mượn</td><td><b>PM000045</b></td>
      <td class="l" style="width:130px">Yêu cầu nguồn</td><td>YC000083</td></tr>
  <tr><td class="l">Độc giả</td><td>Nguyễn Văn An (DG000127)</td>
      <td class="l">Nhân viên giao</td><td>Phạm Thu Hà (NV0007)</td></tr>
  <tr><td class="l">Ngày mượn</td><td>22/10/2026</td>
      <td class="l">Hạn trả</td><td>22/11/2026</td></tr>
</table>
</div>
<h2>Các bản sao đã giao</h2>
%s
<div class="tong">Tổng số bản đã giao: <b>3</b> &nbsp;|&nbsp;
Trạng thái yêu cầu: <b>Đã giao đủ</b> &nbsp;|&nbsp; Phần chưa giao: <b>0</b></div>
<div class="kyten">
  <div>Người giao<div class="duong">Phạm Thu Hà</div></div>
  <div>Người nhận<div class="duong">Nguyễn Văn An</div></div>
</div>
<div class="nut-hang">
  <input type="submit" class="btn chinh" value="In phiếu">
  <input type="submit" class="btn" value="Tiếp tục">
</div>
""" % bang2(
    ['STT', 'Mã vạch', 'Đầu sách', 'Vị trí kệ', 'Tình trạng khi giao'],
    [['1', 'BS001', 'Lập trình Java cơ bản', 'Kệ A2 - Tầng 1', 'Tốt'],
     ['2', 'BS010', 'Lập trình Java cơ bản', 'Kệ A2 - Tầng 1', 'Tốt'],
     ['3', 'BS021', 'Lập trình hướng đối tượng', 'Kệ B1 - Tầng 2', 'Bình thường']],
    giua=(0, 1, 4)), ai=AI_NV)

print('da sinh 13 trang + chung.css trong', THU_MUC)
