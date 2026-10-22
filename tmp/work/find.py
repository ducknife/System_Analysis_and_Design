# -*- coding: utf-8 -*-
from helpers import *
def idx(b, frag, start=0):
    hits=[i for i,e in enumerate(list(b)) if i>=start and e.tag==q('p') and frag in ptext(e)]
    if len(hits)==0: raise SystemExit('NOT FOUND: '+frag)
    return hits[0]
def one(b, frag, start=0):
    return list(b)[idx(b,frag,start)]
