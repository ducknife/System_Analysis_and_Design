import sys
import xml.etree.ElementTree as ET
W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
ns={'w':W[1:-1]}
d=open('unpacked/word/document.xml',encoding='utf-8').read()
root=ET.fromstring(d); b=root.find('w:body',ns)
el=list(b)[int(sys.argv[1])]
r=int(sys.argv[2]); c=int(sys.argv[3])
tc=el.findall('w:tr',ns)[r].findall('w:tc',ns)[c]
n=0
for pi,p in enumerate(tc.findall('w:p',ns)):
    t=''.join(x.text or '' for x in p.iter(W+'t'))
    npr=p.find('w:pPr/w:numPr',ns)
    mark=''
    if npr is not None:
        ilvl=npr.find('w:ilvl',ns); nid=npr.find('w:numId',ns)
        mark=f"NUM(ilvl={ilvl.get(W+'val') if ilvl is not None else '-'},id={nid.get(W+'val') if nid is not None else '-'})"
        if ilvl is not None and ilvl.get(W+'val')=='0': n+=1; mark+=f' #{n}'
    st=p.find('w:pPr/w:pStyle',ns)
    sty=st.get(W+'val') if st is not None else ''
    print(f'p{pi:3d} [{sty}] {mark:28s} {t[:110]}')
