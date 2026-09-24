# Keyboard Navigation & Accessibility — Implementation Status

**Date:** 2026-09-02
**Relates to:** https://github.com/pimcore/product-management/issues/372
**Standard:** WCAG 2.1 Level AA + Pimcore Studio UI interaction rules

---

## Pimcore Studio UI Keyboard Rules

| Interaction | Keystroke |
|-------------|-----------|
| Press a button, link, decision making | Enter / Return |
| Activate element for drag & drop | Spacebar |
| Navigate within an element | Arrow keys |
| Expand / Collapse (folder in tree, dropdown level) | Arrow Left / Right |
| Shift focus from one element to another | Tab (Shift+Tab backwards) |
| Open a context menu | Shift+F10 |

---

## Implemented (First Batch — Quick Wins)

### PR #4046 — Sidebar Tab Keyboard Fix
**WCAG:** 2.1.1 (Keyboard)
- Sidebar `onKeyDown` no longer fires on every keypress — restricted to Enter and Space
- Arrow keys (Down/Up/Left/Right) move focus between sidebar tabs with wrapping
- Roving tabindex: active tab gets `tabIndex=0`, others `-1`

### PR #4047 — Sort Button Key Guard
**WCAG:** 2.1.1 (Keyboard)
- Sort button only triggers on Enter and Space (was: any key)
- Changed from `onKeyUp` to `onKeyDown` so Space `preventDefault` fires before browser scroll

### PR #4048 — Tree Keyboard Navigation (Full Rewrite)
**WCAG:** 2.1.1 (Keyboard), 2.4.3 (Focus Order), 2.4.7 (Focus Visible)
- **DOM-based traversal** — all navigation uses `querySelectorAll` on the live DOM, not the broken `nodeOrder()` sorting
- **Roving tabindex** — selected node (or first visible) gets `tabIndex=0`, all others `-1`
- **Arrow Down/Up** — sequential navigation through all visible nodes across levels
- **Arrow Right** — expand folder (if collapsed) / move to first child (if expanded)
- **Arrow Left** — collapse folder (if expanded) / move to parent (if collapsed)
- **Home/End** — jump to first/last visible node
- **Enter** — select/open node
- **Focus-visible ring** — blue outline on keyboard focus, hidden on mouse click (`:focus-visible` / `:focus:not(:focus-visible)`)

### PR #4049 — Grid Escape to Cancel Edit
**WCAG:** 2.1.1 (Keyboard)
- Escape key exits grid cell edit mode and returns focus to the cell
- Focus deferred via `requestAnimationFrame` to prevent editor `onBlur` saving stale value

---

## Implemented (Second Batch — High Impact)

### PR #4055 — Shift+F10 Context Menu
**WCAG:** 2.1.1 (Keyboard)
- Shift+F10 opens context menu from any focused element wrapped by `ContextMenuWrapper`
- Dispatches synthetic `contextmenu` MouseEvent at the element's bounding rect for correct positioning
- `getPopupContainer={() => document.body}` prevents clipping by `overflow: hidden` ancestors
- First menu item receives focus automatically so ArrowDown/Up works immediately
- Centralized — all context menus (trees, tabs, grids) benefit from this single change

### PR #4056 — ARIA Tree Roles
**WCAG:** 4.1.2 (Name, Role, Value), 1.3.1 (Info and Relationships)
- Tree container: `role="tree"` with translated `aria-label` ("Asset Tree", "Document Tree", "Data Object Tree")
- Tree nodes: `role="treeitem"` (replaces `role="button"`)
- Child lists: `<ul role="group">` (semantic element satisfies SonarCloud S6819)
- `aria-expanded` on expandable nodes (true/false, omitted on leaves)
- `aria-selected` on all nodes
- `aria-level` reflecting nesting depth (clamped to minimum 1 for root)

### PR #4058 — Search Results Keyboard Navigation
**WCAG:** 2.1.1 (Keyboard), 4.1.2 (Name, Role, Value)
- Arrow Down/Up navigates between search results
- Enter opens the focused result
- `role="listbox"` on container, `role="option"` on items
- `aria-selected` on the active/previewed item
- First item gets `tabIndex=0` as keyboard entry point (only when no item is active, preventing dual tabIndex)

### PR #4059 — Skip-to-Content Link
**WCAG:** 2.4.1 (Bypass Blocks)
- Visually hidden "Skip to content" link at the top of the base layout
- Appears on Tab focus, positioned with `z-index: 9999`
- Links to `#main-content` wrapping the WidgetManagerContainer
- Target has `tabIndex={-1}` so focus actually moves (not just scroll)
- Styled with brand primary color, disappears when unfocused

### PR #4060 — Grid Tab Within Bounds
**WCAG:** 2.1.1 (Keyboard), 2.4.3 (Focus Order)
- Tab moves to next cell within the grid (wraps to first cell of next row)
- Shift+Tab moves to previous cell (wraps to last cell of previous row)
- Tab exits the grid only at the very first cell (Shift+Tab) or last cell (Tab)
- Arrow keys unchanged

### PR #4061 — Modal Focus Restoration
**WCAG:** 2.4.3 (Focus Order)
- Captures `document.activeElement` when modal opens
- Restores focus to that element when modal closes via `requestAnimationFrame`
- Ant Design's `rc-dialog` already traps focus within the modal; this completes the cycle

---

## Pre-existing (Already Worked Before Our Changes)

| Feature | Status | Notes |
|---------|--------|-------|
| Tree arrow key navigation (up/down) | Was working | But used broken `nodeOrder()` — now rewritten to DOM traversal |
| Grid cell arrow navigation | Working | Up/Down/Left/Right between cells |
| Grid column resize via keyboard | Working | Arrow Left/Right on resizer (±5px) |
| Global keyboard shortcuts | Working | Save, publish, search, navigation — user-configurable |
| Ant Design components (Select, Checkbox, Tabs, Form) | Working | Inherit good keyboard defaults |
| Toolstrip escape-to-collapse | Working | Escape collapses expanded toolstrip |
| Iframe key forwarding | Working | Document editor shortcuts work inside iframe |
| ESLint jsx-a11y rules | Enforced | Prevents basic accessibility regressions |
| Rule builder drag & drop | Working | Has KeyboardSensor with spacebar + arrow keys |

---

## Known Limitations (Deferred)

| Issue | Why deferred | Ticket |
|-------|-------------|--------|
| Drag & drop keyboard support (core `Draggable` component) | Large effort — requires replacing native HTML5 drag with @dnd-kit KeyboardSensor across the app | Future batch |
| TreeList `role="group"` not owned by parent `role="treeitem"` | Requires major DOM restructuring of tree node hierarchy | Structural limitation |
| Grid Tab skips custom cells (checkbox/drag handle) | Custom cells don't have `data-grid-*` attributes | Edge case — arrow keys handle those columns |
| WindowModal conditional mount bypasses focus restoration | `edit-modal-mode-cell.tsx` unmounts modal while `open` is still true | Edge case — standard Modal path works |
| Toolbar roving tabindex pattern | Each button is a separate tab stop instead of arrow keys within toolbar | P2 enhancement |
| Label association (htmlFor/id) incomplete | Some form labels not programmatically associated | Needs audit across form components |

---

## WCAG 2.1 Coverage Summary

| Criterion | Level | Status | Implementation |
|-----------|-------|--------|---------------|
| **1.3.1** Info and Relationships | A | ✅ Implemented | ARIA tree roles, listbox/option roles |
| **2.1.1** Keyboard | A | ✅ Implemented | All major UI areas keyboard-accessible |
| **2.1.2** No Keyboard Trap | A | ✅ OK | No traps identified; grid Tab exits at boundaries |
| **2.4.1** Bypass Blocks | A | ✅ Implemented | Skip-to-content link |
| **2.4.3** Focus Order | A | ✅ Implemented | Roving tabindex, grid Tab bounds, modal focus restoration |
| **2.4.7** Focus Visible | AA | ✅ Implemented | Tree focus ring; Ant Design defaults elsewhere |
| **4.1.2** Name, Role, Value | A | ✅ Implemented | Tree roles, search listbox, aria-expanded/selected/level |
| **2.1.3** Keyboard (No Exception) | AAA | ⚠️ Partial | Core drag & drop still mouse-only |

---

## PR Reference

| PR | Title | Batch | Priority |
|----|-------|-------|----------|
| [#4046](https://github.com/pimcore/studio-ui-bundle/pull/4046) | Sidebar tab keyboard fix | 1st | P1 |
| [#4047](https://github.com/pimcore/studio-ui-bundle/pull/4047) | Sort button key guard | 1st | P1 |
| [#4048](https://github.com/pimcore/studio-ui-bundle/pull/4048) | Tree keyboard navigation rewrite | 1st | P0 |
| [#4049](https://github.com/pimcore/studio-ui-bundle/pull/4049) | Grid Escape cancel edit | 1st | P1 |
| [#4055](https://github.com/pimcore/studio-ui-bundle/pull/4055) | Shift+F10 context menu | 2nd | P0 |
| [#4056](https://github.com/pimcore/studio-ui-bundle/pull/4056) | ARIA tree roles | 2nd | P0 |
| [#4058](https://github.com/pimcore/studio-ui-bundle/pull/4058) | Search results keyboard nav | 2nd | P0 |
| [#4059](https://github.com/pimcore/studio-ui-bundle/pull/4059) | Skip-to-content link | 2nd | P2 |
| [#4060](https://github.com/pimcore/studio-ui-bundle/pull/4060) | Grid Tab within bounds | 2nd | P1 |
| [#4061](https://github.com/pimcore/studio-ui-bundle/pull/4061) | Modal focus restoration | 2nd | P1 |
