# -*- coding: utf-8 -*-
"""Thay anh moi vao file Word va go cac ghi chu mau do."""
import os
import shutil
import lxml.etree as ET
from PIL import Image

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
A = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
WP = '{http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'

ROOT = r'D:\PTTKHT'
CT = os.path.join(ROOT, 'assets', 'bieu_do_cong_tac')
PV = os.path.join(ROOT, 'vpp', 'preview')
ST = os.path.join(ROOT, 'assets', 'bieu_do_trang_thai')

# thu tu anh trong than bai -> file nguon
THAY = {
    5:  os.path.join(CT, 'entity_class_analysis.png'),
    6:  os.path.join(ST, 'tiep_nhan.png'),
    7:  os.path.join(ST, 'phan_cong_nhan_vien_phuc_vu.png'),
    8:  os.path.join(ST, 'tinh_cong_tra_luong_cho_nv.png'),
    9:  os.path.join(CT, 'chi_tiet_phan_tich_tiep_nhan.png'),
    10: os.path.join(CT, 'chi_tiet_phan_cong_nhan_vien_phuc_vu.png'),
    11: os.path.join(CT, 'chi_tiet_tinh_cong.png'),
    12: os.path.join(CT, 'tiep_nhan.png'),
    13: os.path.join(CT, 'chi_tiet_phan_cong.png'),
    14: os.path.join(CT, 'tinh_cong_tra_luong.png'),
}
CX_MAX = 5940425          # be rong khung anh san co trong file
CY_MAX = 7000000          # chieu cao toi da cho vua mot trang

rels = ET.parse('unpacked/word/_rels/document.xml.rels')
media = {x.get('Id'): x.get('Target') for x in rels.getroot()}

t = ET.parse('unpacked/word/document.xml')
body = t.getroot().find(W + 'body')

k = 0
for el in list(body):
    if el.tag != W + 'p':
        continue
    d = el.find('.//' + W + 'drawing')
    if d is None:
        continue
    if k in THAY:
        src = THAY[k]
        blip = d.find('.//' + A + 'blip')
        dich = os.path.join('unpacked', 'word', media[blip.get(R + 'embed')].replace('/', os.sep))
        shutil.copyfile(src, dich)
        w, h = Image.open(src).size
        cx = CX_MAX
        cy = int(cx * h / w)
        if cy > CY_MAX:
            cy = CY_MAX
            cx = int(cy * w / h)
        for tag in ('.//' + WP + 'extent', './/' + A + 'ext'):
            for e in d.findall(tag):
                e.set('cx', str(cx))
                e.set('cy', str(cy))
        print('THAY anh %-2d <- %-46s %dx%d -> cx=%d cy=%d'
              % (k, os.path.basename(src), w, h, cx, cy))
    k += 1

# ---- go cac doan ghi chu mau do ----
go = 0
for p in list(body):
    if p.tag != W + 'p':
        continue
    mau = [c.get(W + 'val') for c in p.iter(W + 'color')]
    if mau and all(v == 'C00000' for v in mau):
        body.remove(p)
        go += 1
print('da go %d doan ghi chu mau do' % go)

t.write('unpacked/word/document.xml', xml_declaration=True, encoding='UTF-8', standalone=True)
print('xong')
