// Dung so do luong man hinh theo dung kieu bai cua Nguyen Thanh Dat:
// khung ngoai, moi man hinh mot o co vien, noi voi nhau bang mui ten khoi,
// khong tieu de, khong nhan ten file.
import { chromium } from 'playwright'
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'

const ANH = "D:/PTTKHT/assets/giao_dien_thu_vien"
const OUT = "D:/PTTKHT/assets/luong_giao_dien_thu_vien"
mkdirSync(OUT, { recursive: true })

const b64 = (ten) =>
  'data:image/png;base64,' + readFileSync(`${ANH}/${ten}.jsp.png`).toString('base64')

const man = (ten, span = 1) => ({ k: 'man', ten, span })
const mt = (huong, doi = false) => ({ k: 'mt', huong, doi })
const trong = () => ({ k: 'trong' })

const SO_DO = {
  luong_dang_ky_tai_khoan: [
    [man('GDChinhHeThong'), mt('phai'), man('GDDangKyTaiKhoan')],
    [mt('xuong'), trong(), mt('xuong')],
    [man('GDDangNhap', 3)],
  ],
  luong_tim_sach_dat_yeu_cau: [
    [man('GDChinhDocGia'), mt('phai'), man('GDTimKiemSach')],
    [trong(), trong(), mt('xuong', true)],
    [trong(), trong(), man('GDChiTietSach')],
    [trong(), trong(), mt('xuong')],
    [man('GDKetQuaYeuCau'), mt('trai'), man('GDDatYeuCauMuon')],
  ],
  luong_ghi_nhan_giao_sach: [
    [man('GDChinhNhanVienThuVien'), mt('phai'), man('GDTraCuuYeuCau')],
    [trong(), trong(), mt('xuong', true)],
    [man('GDTimSachTaiQuay'), mt('trai', true), man('GDXacNhanGiaoSach')],
    [trong(), trong(), mt('xuong')],
    [trong(), trong(), man('GDPhieuMuon')],
  ],
}

const GOC = { phai: 0, xuong: 90, trai: 180, len: 270 }
const NGUOC = { phai: 'trai', trai: 'phai', xuong: 'len', len: 'xuong' }

function muiTen(huong) {
  return `<svg class="ar" viewBox="0 0 100 56" style="transform:rotate(${GOC[huong]}deg)">
    <polygon points="1,15 57,15 57,1 99,28 57,55 57,41 1,41"
             fill="#fff" stroke="#222" stroke-width="2" stroke-linejoin="miter"/>
  </svg>`
}

function oMuiTen(o) {
  const ds = o.doi ? [o.huong, NGUOC[o.huong]] : [o.huong]
  const doc = o.huong === 'xuong' || o.huong === 'len'
  // Cap mui ten ngang xep chong len nhau, cap doc dat canh nhau - giong bai mau
  return `<div class="mt ${doc ? 'doc' : 'ngang'}">${ds.map(muiTen).join('')}</div>`
}

function html(hang) {
  const o = (c) => {
    if (c.k === 'trong') return '<div></div>'
    if (c.k === 'mt') return oMuiTen(c)
    const rong = c.span > 1 ? ' rong' : ''
    return `<div class="man${rong}" style="grid-column: span ${c.span}">
      <img src="${b64(c.ten)}" alt=""/>
    </div>`
  }
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><style>
  body { margin:0; background:#fff; }
  .khung { border:1.5px solid #222; margin:16px; padding:26px; display:inline-block; }
  .luoi { display:grid; grid-template-columns:1fr 180px 1fr; gap:20px 14px;
          align-items:center; justify-items:stretch; }
  .man { border:1.2px solid #222; padding:10px; background:#fff;
         height:230px; display:flex; align-items:center; justify-content:center; }
  .man.rong { width:58%; margin:0 auto; }
  .man img { max-width:100%; max-height:100%; object-fit:contain;
             border:1px solid #c8ccd2; display:block; }
  .mt { display:flex; justify-content:center; align-items:center; }
  .mt.ngang { flex-direction:column; gap:14px; }
  .mt.doc { flex-direction:row; gap:22px; }
  .ar { width:124px; height:70px; }
  .mt.doc .ar { width:70px; height:124px; }
  </style></head><body>
  <div class="khung"><div class="luoi">${hang.map((h) => h.map(o).join('')).join('')}</div></div>
  </body></html>`
}

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({
  viewport: { width: 1400, height: 900 },
  deviceScaleFactor: 2,
})

for (const [ten, hang] of Object.entries(SO_DO)) {
  const f = `${OUT}/${ten}.html`
  writeFileSync(f, html(hang), 'utf8')
  await page.goto('file:///' + f.replace(/\\/g, '/'), { waitUntil: 'networkidle' })
  await page.waitForTimeout(200)
  // clip chi cat trong khung nhin, nen phai noi khung nhin cho du chieu cao
  // truoc khi chup, neu khong so do dai se bi cat mat phan duoi
  let k = await page.locator('.khung').boundingBox()
  await page.setViewportSize({ width: 1400, height: Math.ceil(k.height) + 80 })
  await page.waitForTimeout(200)
  k = await page.locator('.khung').boundingBox()
  await page.screenshot({
    path: `${OUT}/${ten}.png`,
    clip: {
      x: Math.floor(k.x) - 2,
      y: Math.floor(k.y) - 2,
      width: Math.ceil(k.width) + 4,
      height: Math.ceil(k.height) + 4,
    },
  })
  console.log('chup', ten, Math.round(k.width) + 'x' + Math.round(k.height))
}

await browser.close()
console.log('xong')
