// Chup anh man hinh tung trang de dua vao bao cao.
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const OUT = 'D:/PTTKHT/assets/giao_dien'
const BASE = 'http://localhost:5180'

const TRANG = [
  ['Login', '/'],
  ['ManagerHome', '/manager-home'],
  ['SearchCustomerInfo', '/search-customer'],
  ['AddCustomer', '/add-customer'],
  ['ServiceSlipInfo', '/service-slip'],
  ['SearchService', '/search-service'],
  ['AddComponent', '/add-component'],
  ['SearchNeededServiceSlip', '/search-needed-slip'],
  ['StaffList', '/staff-list'],
  ['ChooseSlot', '/choose-slot'],
  ['ChooseMonth', '/choose-month'],
  ['SummarySheet', '/summary-sheet'],
  ['DetailSheet', '/detail-sheet'],
  ['ChooseMethod', '/choose-method'],
  ['ConfirmReceived', '/confirm-received'],
]

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({
  viewport: { width: 1180, height: 800 },
  deviceScaleFactor: 2,
})

for (const [ten, duong] of TRANG) {
  await page.goto(BASE + duong, { waitUntil: 'networkidle' })
  await page.waitForTimeout(250)
  // cat sat noi dung, tranh de lai mang trang lon o duoi anh
  const cao = await page.evaluate(() => {
    const el = document.querySelector('.page') || document.querySelector('.login-wrap')
    return Math.ceil(el.getBoundingClientRect().bottom + 24)
  })
  const file = `${OUT}/${ten}.png`
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 1180, height: cao } })
  console.log('chup', ten.padEnd(26), duong, cao + 'px')
}

await browser.close()
console.log('xong', TRANG.length, 'anh')
