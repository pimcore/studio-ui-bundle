// Live check of preview mode (F15): logs in to a real Studio with the public demo login, opens the Grid Configuration
// modal and the Data Hub webhook `car-changes-webhook` schema modal (and its migration view), and takes screenshots
// with preview mode off and on. Read-only: never clicks Save/Apply/Confirm. Exit 1 names the failed step.
// Usage: node run.mjs [out-dir]   env: SCREENS_BASE_URL (default http://localhost), SCREENS_HOST_MAP ("MAP a b"),
// SCREENS_STUDIO_USER / SCREENS_STUDIO_PASSWORD (default admin / admin), CHROMIUM_BIN (absolute path; else chromium
// from /usr/bin, /usr/local/bin or /snap/bin); needs node >= 22. Without an out-dir a new folder under the OS temp
// folder is made; an out-dir must lie inside the OS temp folder or the current folder.
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, isAbsolute, join, relative, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const { consoleErrorMessage } = createRequire(import.meta.url)('./assertions.cjs')
const base = (process.env.SCREENS_BASE_URL || 'http://localhost').replace(/\/$/, '')
const user = process.env.SCREENS_STUDIO_USER || 'admin'
const password = process.env.SCREENS_STUDIO_PASSWORD || 'admin'
const hostMap = process.env.SCREENS_HOST_MAP || ''
const STEP_TIMEOUT = 120000
const port = 9344
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let step = 'start'
let chrome, prof, ws, out
const consoleErrors = []

const fail = async (message) => {
  console.log(`FAIL at step "${step}": ${message}`)
  try { await shot('failure') } catch {}
  if (process.env.PREVIEW_DEBUG) {
    try { console.log(await evaluate(String.raw`Array.from(document.querySelectorAll('[data-testid^=tree-node-label]')).map((e) => e.textContent).join('\n')`)) } catch {}
  }
  await quit(1)
}
async function quit (code) {
  if (chrome) {
    const exited = new Promise((r) => chrome.once('exit', r))
    chrome.kill()
    await Promise.race([exited, sleep(5000)])
  }
  if (prof) { try { rmSync(prof, { recursive: true, force: true, maxRetries: 5 }) } catch {} }
  process.exit(code)
}
process.on('unhandledRejection', (e) => { void fail(String(e?.message || e)) })

const isInside = (dir, parent) => {
  const rel = relative(parent, dir)
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel))
}
const isFile = (file) => existsSync(file) && statSync(file).isFile()
const CHROMIUM_DIRS = ['/usr/bin', '/usr/local/bin', '/snap/bin']
const findChromium = () => {
  const given = process.env.CHROMIUM_BIN
  if (given && isAbsolute(given) && isFile(given)) return given
  return CHROMIUM_DIRS.flatMap((dir) => ['chromium', 'chromium-browser'].map((name) => join(dir, name))).find(isFile)
}
// The names a screenshot may have: one per modal and state, plus the failure shot.
const SHOT_NAMES = new Set(['failure', ...['grid-config', 'schema', 'schema-migration']
  .flatMap((prefix) => ['preview-off', 'preview-on', 'preview-collapsed'].map((state) => `${prefix}-${state}`))])

const requestedOut = process.argv[2] ? resolve(process.argv[2]) : null
if (requestedOut && !isInside(requestedOut, tmpdir()) && !isInside(requestedOut, process.cwd())) {
  await fail(`out-dir ${requestedOut} is outside the temp folder ${tmpdir()} and the current folder ${process.cwd()}`)
}
const chromiumBin = findChromium()
if (!chromiumBin) await fail('chromium is missing on this machine')

if (requestedOut) {
  mkdirSync(requestedOut, { recursive: true })
  out = requestedOut
} else {
  out = mkdtempSync(join(tmpdir(), 'preview-mode-live-'))
}
console.log(`out-dir: ${out}`)
prof = mkdtempSync(join(tmpdir(), 'preview-mode-live-profile-'))
const args = ['--headless=new', '--no-sandbox', '--disable-gpu', '--window-size=1600,1000', `--user-data-dir=${prof}`,
  `--remote-debugging-port=${port}`]
if (hostMap) args.push(`--host-resolver-rules=${hostMap}`)
chrome = spawn(chromiumBin, [...args, 'about:blank'], { stdio: 'ignore' })

step = 'start chromium'
// Probe until it returns something truthy or the deadline passes (null); an error counts as "not yet".
const retry = async (probe, deadline, interval) => {
  try {
    const value = await probe()
    if (value) return value
  } catch {}
  if (Date.now() >= deadline) return null
  await sleep(interval)
  return retry(probe, deadline, interval)
}
await sleep(250)
const target = await retry(async () => (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'),
  Date.now() + 39 * 250, 250)
if (!target) await fail('chromium did not start')

ws = new WebSocket(target.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
ws.onmessage = ({ data }) => {
  const m = JSON.parse(data)
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return }
  const p = m.params
  if (m.method === 'Runtime.exceptionThrown') {
    consoleErrors.push(`JS error: ${(p.exceptionDetails.exception?.description || p.exceptionDetails.text).split('\n')[0]}`)
  } else if (m.method === 'Runtime.consoleAPICalled' && p.type === 'error') {
    consoleErrors.push(`console.error: ${p.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 300)}`)
  }
}
await new Promise((r) => (ws.onopen = r))
const send = (method, params = {}) => new Promise((resolve) => {
  const mid = ++id
  pending.set(mid, resolve)
  ws.send(JSON.stringify({ id: mid, method, params }))
})
for (const m of ['Runtime.enable', 'Page.enable']) await send(m)
await send('Emulation.setDeviceMetricsOverride', { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false })

const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (r.result?.exceptionDetails) throw new Error(`page script failed: ${r.result.exceptionDetails.exception?.description?.split('\n')[0]}`)
  return r.result?.result?.value
}

// The helpers of assertions.cjs run in the page, from the same source Jest tests.
const helperSource = readFileSync(join(here, 'assertions.cjs'), 'utf8')
await evaluate('0') // page exists
const installHelpers = () => evaluate(`window.__pm = (() => { const module = { exports: {} }; ${helperSource}; return module.exports })(); true`)

const waitFor = async (what, expression, timeout = STEP_TIMEOUT) => {
  if (await retry(() => evaluate(expression), Date.now() + timeout, 500)) return
  throw new Error(`timed out after ${timeout / 1000}s waiting for ${what}`)
}
const quiet = () => sleep(2500) // Studio is slow here: a quiet wait after each step

// Click an element by CSS selector, optionally the one whose text matches; Save/Apply/Confirm are refused.
const click = async (selector, { text } = {}) => {
  const what = text ? `${selector} "${text}"` : selector
  await waitFor(what, `(() => !!window.__pmFind(${JSON.stringify(selector)}, ${JSON.stringify(text || null)}))()`)
  const result = await evaluate(`(() => {
    const el = window.__pmFind(${JSON.stringify(selector)}, ${JSON.stringify(text || null)})
    const label = (el.textContent || '').trim()
    if (window.__pm && window.__pm.isForbiddenClick(label)) return 'forbidden:' + label
    el.scrollIntoView({ block: 'center' }); el.click(); return 'ok'
  })()`)
  if (result !== 'ok') throw new Error(`refused to click ${selector}: ${result}`)
  await quiet()
}
const fillInput = (selector, value) => evaluate(`(() => {
  const el = document.querySelector(${JSON.stringify(selector)})
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, ${JSON.stringify(value)})
  el.dispatchEvent(new Event('input', { bubbles: true })); return true })()`)
const shot = async (name) => {
  if (!SHOT_NAMES.has(name)) throw new Error(`unknown screenshot name ${name}`)
  const file = join(out, `${name}.png`)
  const r = await send('Page.captureScreenshot', { format: 'png' })
  writeFileSync(file, Buffer.from(r.result.data, 'base64'))
  console.log(`screenshot: ${file}`)
}
const run = async (name, fn) => {
  step = name
  console.log(`step: ${name}`)
  await Promise.race([fn(), sleep(STEP_TIMEOUT * 3).then(() => { throw new Error('step timed out') })])
}
const problemsOf = (list) => { if (list.length) throw new Error(list.join('; ')) }

// The last open modal (an antd modal on top of the grid or the schema modal).
const MODAL = `(() => { const m = document.querySelectorAll('.ant-modal-wrap:not([style*="display: none"]) .ant-modal'); return m[m.length - 1] })()`
const inspect = () => evaluate(`window.__pm.inspectModal(${MODAL})`)
const expectState = async (previewOn, label) => {
  const state = await inspect()
  console.log(`${label}: ${JSON.stringify(state)}`)
  problemsOf(await evaluate(`window.__pm.checkState(${JSON.stringify(state)}, { previewOn: ${previewOn} })`))
  return state
}
const switchPreview = async (on) => {
  await click('.ant-modal [role=switch]')
  await waitFor(`preview switch ${on ? 'on' : 'off'}`, `${MODAL}.querySelector('[role=switch]').getAttribute('aria-checked') === '${on}'`)
  if (on) await waitFor('a Preview row', `${MODAL}.querySelectorAll('[data-testid="preview-mode-column-preview-row"]').length > 0`)
  await quiet()
}
// Expand every collapsed advanced card first (DR-P10 A will widen this to collapsed cards later).
const expandAdvanced = () => evaluate(`(() => { const headers = ${MODAL}.querySelectorAll('.ant-collapse-header[aria-expanded=false]')
  headers.forEach((h) => h.click()); return headers.length })()`)
// F18: before any card is expanded, a collapsed advanced card shows a non-empty Preview row (shot as `<prefix>-collapsed`).
// `closeOne` (grid modal: its advanced cards open expanded): click one open header closed first, nothing is saved.
const checkCollapsedCard = async (prefix, { closeOne = false } = {}) => {
  step = `${prefix}: collapsed advanced card`
  if (closeOne) {
    const closeHeader = () => evaluate(`(() => { const h = ${MODAL}.querySelector('.stack-list-item .ant-collapse-header[aria-expanded=true]')
      if (!h) return false; h.click(); return true })()`)
    if (!(await closeHeader())) {
      // no advanced column in this config: convert one column in the modal (the transformation button; unsaved), then close it
      const converted = await evaluate(`(() => { const i = ${MODAL}.querySelector('.pimcore-icon-transformation'); const b = i && i.closest('button')
        if (!b) return false; b.click(); return true })()`)
      if (!converted) throw new Error('no advanced card to collapse, and no column can be converted to an advanced one (unsaved)')
      await quiet()
      if (!(await closeHeader())) throw new Error('the unsaved advanced column did not appear')
    }
    await quiet()
  }
  const state = await evaluate(`window.__pm.inspectCollapsed(${MODAL})`)
  console.log(`${prefix} collapsed: ${JSON.stringify(state)}`)
  problemsOf(await evaluate(`window.__pm.checkCollapsed(${JSON.stringify(state)}, { exactlyOne: ${closeOne} })`))
  await shot(`${prefix}-preview-collapsed`)
}
const checkOnOff = async (prefix, { closeOne = false } = {}) => {
  await expectState(false, `${prefix} off`)
  await shot(`${prefix}-preview-off`)
  await switchPreview(true)
  // the migration view repeats the schema modal's cards; the collapsed case is asserted once per modal
  if (prefix !== 'schema-migration') await checkCollapsedCard(prefix, { closeOne })
  await expandAdvanced()
  await quiet()
  const state = await expectState(true, `${prefix} on`)
  const tooltip = await hoverTooltip()
  problemsOf(await evaluate(`window.__pm.checkTooltip(${JSON.stringify(tooltip)}, ${JSON.stringify(state)})`))
  await shot(`${prefix}-preview-on`)
}
const hoverTooltip = async () => {
  const pos = await evaluate(`(() => { const d = Array.from(${MODAL}.querySelectorAll('span, div')).find((e) => /^ID:/.test((e.textContent || '').trim()) && e.children.length === 0)
    if (!d) return null; const r = d.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 } })()`)
  if (!pos) return null
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: pos.x, y: pos.y })
  await sleep(1500)
  const tip = await evaluate(`(() => { const t = document.querySelector('.ant-tooltip:not(.ant-tooltip-hidden) .ant-tooltip-inner'); return t ? t.textContent : null })()`)
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5 })
  return tip
}

try {
  await run('open Studio and log in', async () => {
    await send('Page.navigate', { url: `${base}/pimcore-studio/` })
    await waitFor('the login form', `!!document.querySelector('input[name=username]')`)
    await evaluate(`window.__pmFind = (selector, text) => Array.from(document.querySelectorAll(selector)).find((e) => !text || new RegExp(text, 'i').test((e.textContent || '').trim())) || null; true`)
    await installHelpers()
    await fillInput('input[name=username]', user)
    await fillInput('input[name=password]', password)
    await click('button[type=submit]') // the login button; the guard only refuses Save/Apply/Confirm labels
    await waitFor('the main navigation', `!!document.querySelector('[data-testid=main-nav-trigger]')`)
    await evaluate(`window.__pmFind = (selector, text) => Array.from(document.querySelectorAll(selector)).find((e) => !text || new RegExp(text, 'i').test((e.textContent || '').trim())) || null; true`)
    await installHelpers()
  })

  await run('open the Grid Configuration modal', async () => {
    await click('[data-testid=border-button-studio-data-object-tree-widget]')
    await click('[data-testid^=tree-node-label-]', { text: '^sports car$' })
    await waitFor('the class select', `!!document.querySelector('[data-testid=listing-class-definition-select]')`)
    await sleep(2000)
    const carSelected = await evaluate(String.raw`/\bCar\b/.test((document.querySelector('[data-testid=listing-class-definition-select]') || {}).textContent || '')`)
    if (!carSelected) { // the grid opens on Car by itself when the tree folder holds only cars
      await click('[data-testid=listing-class-definition-select] .ant-select-selector')
      await click('.ant-select-item-option[name=Car]')
    }
    await waitFor('the grid sidebar', `!!document.querySelector('.sidebar__navigation__tabs .pimcore-icon-settings')`)
    await click('.sidebar__navigation__tabs .pimcore-icon-settings')
    await click('.pimcore-icon-show-details')
    await waitFor('the modal', `!!document.querySelector('.ant-modal')`)
    await quiet()
  })
  await run('grid modal: preview off and on', () => checkOnOff('grid-config', { closeOne: true }))
  await run('close the Grid Configuration modal', async () => {
    await evaluate(`(() => { const c = ${MODAL}.querySelector('.ant-modal-close'); if (c) c.click(); return true })()`)
    await quiet()
  })

  await run('open the Data Hub schema modal', async () => {
    await evaluate(`window.location.reload()`)
    await waitFor('the main navigation', `!!document.querySelector('[data-testid=main-nav-trigger]')`, STEP_TIMEOUT)
    await evaluate(`window.__pmFind = (selector, text) => Array.from(document.querySelectorAll(selector)).find((e) => !text || new RegExp(text, 'i').test((e.textContent || '').trim())) || null; true`)
    await installHelpers()
    await click('[data-testid=main-nav-trigger]')
    await click('[data-testid=nav-button-automationintegration]')
    await click('[data-testid=nav-button-automationintegration-datahub]')
    await click('[title=car-changes-webhook] button')
    await click('button[data-tab-key=events-schema]')
    await waitFor('the schema row', `!!document.querySelector('[data-testid=cell-0-settings] button')`)
    await click('[data-testid=cell-0-settings] button')
    await waitFor('the modal', `!!document.querySelector('.ant-modal')`)
    await quiet()
  })
  await run('schema modal: preview off and on', () => checkOnOff('schema'))

  await run('schema modal: migration view', async () => {
    const hasMigration = await evaluate(`Array.from(${MODAL}.querySelectorAll('button')).some((b) => /migrat/i.test(b.textContent) && !/confirm|cancel/i.test(b.textContent))`)
    if (!hasMigration) {
      console.log('note: this config has no legacy blob, so the migration view is not offered; not shot')
      return
    }
    await click('.ant-modal button', { text: 'migrat' }) // "Start migration"; "Confirm migration" would match the guard
    await waitFor('the split view', `!!${MODAL}.querySelector('[role=switch]')`)
    await checkOnOff('schema-migration')
  })
} catch (e) {
  await fail(e.message)
}

step = 'console errors'
if (consoleErrorMessage(consoleErrors)) await fail(consoleErrorMessage(consoleErrors))
console.log(`preview-mode live check green; screenshots in ${out}`)
await quit(0)
