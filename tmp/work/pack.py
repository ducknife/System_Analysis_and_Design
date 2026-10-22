# -*- coding: utf-8 -*-
import os, sys, zipfile

src = 'unpacked'
out = sys.argv[1] if len(sys.argv) > 1 else 'out.docx'
if os.path.exists(out):
    os.remove(out)

# [Content_Types].xml must come first
names = []
for root, dirs, files in os.walk(src):
    for f in files:
        p = os.path.join(root, f)
        rel = os.path.relpath(p, src).replace(os.sep, '/')
        names.append(rel)
names.sort(key=lambda n: (n != '[Content_Types].xml', n))

with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    for rel in names:
        z.write(os.path.join(src, rel.replace('/', os.sep)), rel)
print('wrote', out, os.path.getsize(out), 'bytes,', len(names), 'entries')
