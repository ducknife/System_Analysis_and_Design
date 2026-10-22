import re,sys
d=open('unpacked/word/document.xml',encoding='utf-8').read()
body=d[d.index('<w:body>'):]
# split top-level paragraphs and tables naively by scanning
import xml.etree.ElementTree as ET
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
root=ET.fromstring(d)
b=root.find('w:body',ns)
def txt(el):
    return ''.join(t.text or '' for t in el.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'))
def hasimg(el):
    return any(True for _ in el.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}drawing'))
start=int(sys.argv[1]) if len(sys.argv)>1 else 0
end=int(sys.argv[2]) if len(sys.argv)>2 else 10**9
for i,el in enumerate(list(b)):
    if i<start or i>end: continue
    tag=el.tag.split('}')[1]
    if tag=='tbl':
        rows=el.findall('w:tr',ns)
        print(f'[{i}] TBL rows={len(rows)} :: '+txt(el)[:120].replace('\n',' '))
    elif tag=='p':
        t=txt(el).strip()
        img=' [IMG]' if hasimg(el) else ''
        if t or img: print(f'[{i}] P{img} :: {t[:160]}')
    else:
        print(f'[{i}] {tag}')
