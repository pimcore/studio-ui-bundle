// Assertion helpers of the preview-mode live check (run.mjs). Plain CommonJS and DOM-only, so Jest runs them on
// fixture DOM snapshots and run.mjs injects the same source into the page. Every helper takes an Element (the modal).
'use strict'

const ROW = '[data-testid="preview-mode-column-preview-row"]'
const SWITCH_LABEL = /^(preview mode|vorschaumodus|förhandsvisningsläge)$/i
const ITEM_BUTTON = /^(preview item|vorschauelement|förhandsvisningsobjekt)$/i
const FORBIDDEN_CLICK = /^\s*(save|apply|confirm)/i

const text = (el) => (el.textContent || '').replace(/\s+/g, ' ').trim()

// What a modal currently shows: one plain object, so a failed run can print it.
function inspectModal (root) {
  const switches = Array.from(root.querySelectorAll('[role="switch"]'))
  const previewSwitch = switches.find((s) => {
    const scope = s.parentElement
    return scope !== null && SWITCH_LABEL.test(text(scope))
  }) || null
  const itemButton = Array.from(root.querySelectorAll('button')).find((b) => ITEM_BUTTON.test(text(b))) || null
  const description = itemButton === null || itemButton.parentElement === null
    ? undefined
    : Array.from(itemButton.parentElement.querySelectorAll('span, div')).find((e) => /^ID:/.test(text(e)))
  const barText = description !== undefined ? text(description) : ''
  const idMatch = /^ID:\s*(\d+)/.exec(barText)
  const pathMatch = /│\s*(.+)$/.exec(barText)
  return {
    languageSwitch: root.querySelector('.language-select') !== null,
    previewSwitch: previewSwitch !== null,
    previewOn: previewSwitch !== null && previewSwitch.getAttribute('aria-checked') === 'true',
    bar: itemButton !== null,
    barId: idMatch !== null ? idMatch[1] : null,
    barPath: pathMatch !== null ? pathMatch[1].trim() : null,
    rows: root.querySelectorAll(ROW).length,
    expandedAdvanced: root.querySelectorAll('.ant-collapse-item-active').length
  }
}

// The problems of one state against the expected one (an empty list = fine).
function checkState (state, { previewOn }) {
  const problems = []
  if (!state.languageSwitch) problems.push('language switch is missing')
  if (!state.previewSwitch) problems.push('"Preview mode" switch is missing')
  if (state.previewSwitch && state.previewOn !== previewOn) {
    problems.push(`"Preview mode" switch is ${state.previewOn ? 'on' : 'off'}, expected ${previewOn ? 'on' : 'off'}`)
  }
  if (!previewOn) {
    if (state.bar) problems.push('the preview bar shows with preview mode off')
    if (state.rows > 0) problems.push(`${state.rows} Preview row(s) show with preview mode off`)
    return problems
  }
  if (!state.bar) problems.push('the bar with the "Preview item" button is missing')
  if (state.bar && state.barId === null) problems.push('the bar shows no item ID')
  if (state.bar && state.barId !== null && !state.barPath) problems.push('the bar shows no short path')
  if (state.rows === 0) problems.push('no Preview row shows with preview mode on')
  return problems
}

// The short path in the bar is the last two parts of the tooltip's full path.
function checkTooltip (tooltip, state) {
  if (!tooltip) return ['no tooltip with the full path on the bar']
  const full = tooltip.trim()
  if (!full.startsWith('/')) return [`tooltip "${full}" is not a full path`]
  const last = full.split('/').filter(Boolean).slice(-2).join('/')
  // the bar writes "…/ a/ b" (the truncated path) or "a/ b"
  const short = (state.barPath || '').replace(/\s+/g, '').replace(/^\.+\//, '')
  return short !== '' && last.endsWith(short) ? [] : [`short path "${state.barPath}" does not end the full path "${full}"`]
}

// run.mjs asks this before every click: Save/Apply (and Confirm migration) are never clicked.
const isForbiddenClick = (label) => FORBIDDEN_CLICK.test(label || '')

// The final step of run.mjs: any JS error or console.error during the run fails the check.
const consoleErrorMessage = (errors) => (errors.length ? [...new Set(errors)].slice(0, 10).join(' | ') : null)

module.exports = { inspectModal, checkState, checkTooltip, isForbiddenClick, consoleErrorMessage }
