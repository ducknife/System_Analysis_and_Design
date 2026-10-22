# -*- coding: utf-8 -*-
import copy, lxml.etree as ET
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
XS = '{http://www.w3.org/XML/1998/namespace}space'
def q(n): return W + n

def body(tree):
    return tree.getroot().find(q('body'))

def ptext(p):
    out=[]
    for e in p.iter():
        if e.tag==q('t'): out.append(e.text or '')
        elif e.tag==q('sym'): out.append('→')
    return ''.join(out)

def rebuild(p, text):
    """Replace every run of p with one run carrying `text`; '→' becomes a Wingdings sym."""
    runs = p.findall(q('r'))
    rpr = None
    for r in runs:
        rp = r.find(q('rPr'))
        if rp is not None:
            rpr = copy.deepcopy(rp); break
    for r in runs: p.remove(r)
    nr = p.makeelement(q('r'), {})
    if rpr is not None: nr.append(rpr)
    parts = text.split('→')
    for i, seg in enumerate(parts):
        if i:
            s = ET.SubElement(nr, q('sym')); s.set(q('font'),'Wingdings'); s.set(q('char'),'F0E0')
        if seg != '':
            t = ET.SubElement(nr, q('t')); t.set(XS,'preserve'); t.text = seg
    p.append(nr)
    return p

def clone(tpl, text):
    np = copy.deepcopy(tpl)
    for a in list(np.attrib):
        if a.endswith('}paraId') or a.endswith('}textId'): del np.attrib[a]
    for bk in np.findall(q('bookmarkStart')) + np.findall(q('bookmarkEnd')):
        np.remove(bk)
    return rebuild(np, text)

def insert_after(anchor, elems):
    parent = anchor.getparent()
    i = parent.index(anchor)
    for k, e in enumerate(elems):
        parent.insert(i + 1 + k, e)
    return elems

def replace_range(parent, first, last, texts, tpl=None):
    """Delete elements first..last (inclusive) and put cloned paragraphs with `texts` there."""
    i = parent.index(first); j = parent.index(last)
    tpl = tpl if tpl is not None else first
    tpl = copy.deepcopy(tpl)
    for e in list(parent)[i:j+1]: parent.remove(e)
    for k, txt in enumerate(texts):
        parent.insert(i + k, clone(tpl, txt))

def red_para(ctx, text, bold=False, size=24):
    p = ctx.makeelement(q('p'), {})
    pPr = ET.SubElement(p, q('pPr'))
    sp = ET.SubElement(pPr, q('spacing')); sp.set(q('before'),'40'); sp.set(q('after'),'40'); sp.set(q('line'),'276'); sp.set(q('lineRule'),'auto')
    ind = ET.SubElement(pPr, q('ind')); ind.set(q('left'),'284'); ind.set(q('firstLine'),'0')
    jc = ET.SubElement(pPr, q('jc')); jc.set(q('val'),'left')
    rpr0 = ET.SubElement(pPr, q('rPr'))
    f0 = ET.SubElement(rpr0, q('rFonts')); f0.set(q('ascii'),'Times New Roman'); f0.set(q('hAnsi'),'Times New Roman'); f0.set(q('cs'),'Times New Roman')
    if bold: ET.SubElement(rpr0, q('b'))
    c0 = ET.SubElement(rpr0, q('color')); c0.set(q('val'),'C00000')
    s0 = ET.SubElement(rpr0, q('sz')); s0.set(q('val'),str(size))
    sc0 = ET.SubElement(rpr0, q('szCs')); sc0.set(q('val'),str(size))
    r = ET.SubElement(p, q('r'))
    rpr = ET.SubElement(r, q('rPr'))
    f = ET.SubElement(rpr, q('rFonts')); f.set(q('ascii'),'Times New Roman'); f.set(q('hAnsi'),'Times New Roman'); f.set(q('cs'),'Times New Roman')
    if bold: ET.SubElement(rpr, q('b'))
    c = ET.SubElement(rpr, q('color')); c.set(q('val'),'C00000')
    s = ET.SubElement(rpr, q('sz')); s.set(q('val'),str(size))
    sc = ET.SubElement(rpr, q('szCs')); sc.set(q('val'),str(size))
    t = ET.SubElement(r, q('t')); t.set(XS,'preserve'); t.text = text
    return p

def note_block(ctx, title, lines):
    out = [red_para(ctx, title, bold=True, size=24)]
    for ln in lines:
        out.append(red_para(ctx, ln, bold=False, size=24))
    return out

def cell(tbl, r, c):
    return tbl.findall(q('tr'))[r].findall(q('tc'))[c]

def cps(tc):
    return tc.findall(q('p'))
