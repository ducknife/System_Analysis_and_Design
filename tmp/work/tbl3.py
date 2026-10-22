import sys
import xml.etree.ElementTree as ET
W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
ns={'w':W[1:-1]}
d=open('unpacked/word/document.xml',encoding='utf-8').read()
root=ET.fromstring(d); b=root.find('w:body',ns)
el=list(b)[int(sys.argv[1])]
r=int(sys.argv[2]); c=int(sys.argv[3])
tc=el.findall('w:tr',ns)[r].findall('w:tc',ns)[c]
def txt(e): return ''.join(x.text or '' for x in e.iter(W+'t'))
for i,ch in enumerate(list(tc)):
    tag=ch.tag.split('}')[1]
    if tag=='tbl':
        print(f'--- child{i} NESTED TABLE ---')
        for ri,tr in enumerate(ch.findall('w:tr',ns)):
            cells=[txt(x).strip() for x in tr.findall('w:tc',ns)]
            print(f'  r{ri}: {" | ".join(cells)}')
    elif tag=='p':
        t=txt(ch).strip()
        if t: print(f'child{i} P: {t[:130]}')
