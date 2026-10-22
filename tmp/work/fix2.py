# -*- coding: utf-8 -*-
import lxml.etree as ET
from helpers import *
t = ET.parse('unpacked/word/document.xml'); b = body(t)
REP = [
 ('Slot 1 — n ServiceSlip', 'Slot 1 – n ServiceSlip'),
 ('hai đường liền ServiceSlip — Service, ServiceSlip — Component',
  'hai đường nối thẳng ServiceSlip với Service và ServiceSlip với Component'),
 ('ServiceSlip 1 — n ServiceDetail n — 1 Service', 'ServiceSlip 1 – n ServiceDetail n – 1 Service'),
 ('ServiceSlip 1 — n ComponentDetail n — 1 Component', 'ServiceSlip 1 – n ComponentDetail n – 1 Component'),
 ('Staff 1 — n ServiceDetail', 'Staff 1 – n ServiceDetail'),
]
n = 0
for p in b.iter(q('p')):
    s = ptext(p)
    if '—' not in s: continue
    new = s
    for a, c in REP: new = new.replace(a, c)
    new = new.replace('—', ',')
    if new != s:
        rebuild(p, new); n += 1
t.write('unpacked/word/document.xml', xml_declaration=True, encoding='UTF-8', standalone=True)
print('sua', n, 'doan co em dash')
