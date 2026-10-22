import sys
import xml.etree.ElementTree as ET
W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
ns={'w':W[1:-1]}
d=open('unpacked/word/document.xml',encoding='utf-8').read()
root=ET.fromstring(d); b=root.find('w:body',ns)
el=list(b)[int(sys.argv[1])]
for ri,tr in enumerate(el.findall('w:tr',ns)):
    for ci,tc in enumerate(tr.findall('w:tc',ns)):
        paras=tc.findall('w:p',ns)
        for pi,p in enumerate(paras):
            t=''.join(x.text or '' for x in p.iter(W+'t'))
            print(f'r{ri}c{ci}p{pi}: {t}')
