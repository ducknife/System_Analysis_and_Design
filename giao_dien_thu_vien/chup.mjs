// Chup anh 13 trang giao dien cho bai cua Nguyen Tuan Anh.
// Mo thang file html bang file:// nen khong can dung may chu.
import { chromium } from 'playwright'
import { mkdirSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const OUT = 'D:/PTTKHT/assets/giao_dien_thu_vien'
mkdirSync(OUT, { recursive: true })

const TRANG = readdirSync('.').filter((f) => f.endsWith('.jsp.html')).sort()

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({
  viewport: { width: 1020, height: 800 },
  deviceScaleFactor: 2,
})

for (const f of TRANG) {
  const ten = f.replace(/\.html$/, '')
  await page.goto('file:///' + resolve(f).replace(/\\/g, '/'), { waitUntil: 'load' })
  await page.waitForTimeout(120)
  // cat sat day noi dung, tranh chua mang trang lon o duoi
  const cao = await page.evaluate(() => {
    const el = document.querySelector('.page')
    return Math.ceil(el.getBoundingClientRect().bottom + 20)
  })
  await page.setViewportSize({ width: 1020, height: cao })
  await page.screenshot({ path: `${OUT}/${ten}.png`, clip: { x: 0, y: 0, width: 1020, height: cao } })
  console.log('   ' + ten + '.png  cao ' + cao)
}

await browser.close()
console.log('da chup ' + TRANG.length + ' trang vao ' + OUT)
